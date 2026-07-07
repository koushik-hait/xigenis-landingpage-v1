'use client'

import { useState, useTransition } from 'react'
import {
    getUsers,
    deleteUser,
    updateUserRole,
    type ClerkUser,
    type GetUsersResult,
} from './actions'
import { useAdminTracking } from '@/hooks/use-admin-tracking'

export default function UsersTable({ initialData }: { initialData: GetUsersResult }) {
    const [data, setData] = useState(initialData)
    const [page, setPage] = useState(1)
    const [query, setQuery] = useState('')
    const [isPending, startTransition] = useTransition()
    const [actionPendingId, setActionPendingId] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const { trackDelete, trackUpdate } = useAdminTracking()

    function fetchUsers(newPage: number, newQuery: string) {
        startTransition(async () => {
            const result = await getUsers(newPage, newQuery)
            setData(result)
            setPage(newPage)
            setQuery(newQuery)
        })
    }

    function handleDelete(user: ClerkUser) {
        if (!confirm(`Delete ${user.firstName} ${user.lastName}? This cannot be undone.`)) return
        setError(null)
        setActionPendingId(user.id)
        startTransition(async () => {
            try {
                await deleteUser(user.id)
                trackDelete('users', `Deleted user ${user.firstName} ${user.lastName} (${user.email})`, { userId: user.id, email: user.email })
                // Refresh current page (step back if last item on page)
                const newPage = data.users.length === 1 && page > 1 ? page - 1 : page
                const result = await getUsers(newPage, query)
                setData(result)
                setPage(newPage)
            } catch (e: any) {
                setError(e.message)
            } finally {
                setActionPendingId(null)
            }
        })
    }

    function handleRoleChange(user: ClerkUser, role: 'admin' | 'user') {
        setError(null)
        setActionPendingId(user.id)
        startTransition(async () => {
            try {
                await updateUserRole(user.id, role)
                trackUpdate('users', `Changed role for ${user.firstName} ${user.lastName} to ${role}`, { userId: user.id, email: user.email, newRole: role, previousRole: user.role || 'none' })
                // Optimistically update the row
                setData((prev) => ({
                    ...prev,
                    users: prev.users.map((u) =>
                        u.id === user.id ? { ...u, role } : u
                    ),
                }))
            } catch (e: any) {
                setError(e.message)
            } finally {
                setActionPendingId(null)
            }
        })
    }

    return (
        <>
            {/* Search */}
            <input
                type="text"
                placeholder="Search by name, email, username..."
                className="border rounded px-3 py-2 text-sm mb-4 w-72"
                defaultValue={query}
                onChange={(e) => fetchUsers(1, e.target.value)}
            />

            {/* Error banner */}
            {error && (
                <div className="mb-4 px-4 py-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded">
                    {error}
                    <button className="ml-2 underline" onClick={() => setError(null)}>dismiss</button>
                </div>
            )}

            {/* Table */}
            <div className={isPending ? 'opacity-50 pointer-events-none' : ''}>
                <table className="w-full text-sm border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-3">User</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Joined</th>
                            <th className="p-3">Last Sign In</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Role</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.users.map((user: ClerkUser) => {
                            const isRowPending = actionPendingId === user.id
                            return (
                                <tr
                                    key={user.id}
                                    className={`border-t ${isRowPending ? 'opacity-50' : 'hover:bg-gray-50'}`}
                                >
                                    <td className="p-3">
                                        <div className="flex items-center gap-2">
                                            <img src={user.imageUrl} alt="" className="w-8 h-8 rounded-full" />
                                            <span>{user.firstName} {user.lastName}</span>
                                        </div>
                                    </td>
                                    <td className="p-3 text-gray-600">{user.email}</td>
                                    <td className="p-3 text-gray-500">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="p-3 text-gray-500">
                                        {user.lastSignInAt
                                            ? new Date(user.lastSignInAt).toLocaleDateString()
                                            : 'Never'}
                                    </td>
                                    <td className="p-3">
                                        {user.banned ? (
                                            <span className="text-xs font-medium text-red-500">Banned</span>
                                        ) : (
                                            <span className="text-xs font-medium text-green-500">Active</span>
                                        )}
                                    </td>

                                    {/* Role */}
                                    <td className="p-3">
                                        <select
                                            value={user.role ?? 'user'}
                                            disabled={isRowPending}
                                            onChange={(e) =>
                                                handleRoleChange(user, e.target.value as 'admin' | 'user')
                                            }
                                            className="border rounded px-2 py-1 text-xs"
                                        >
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </td>

                                    {/* Delete */}
                                    <td className="p-3">
                                        <button
                                            onClick={() => handleDelete(user)}
                                            disabled={isRowPending}
                                            className="text-xs text-red-500 hover:text-red-700 disabled:opacity-40 border border-red-200 rounded px-2 py-1"
                                        >
                                            {isRowPending ? 'Working...' : 'Delete'}
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center gap-3 mt-4">
                <button
                    onClick={() => fetchUsers(page - 1, query)}
                    disabled={page === 1 || isPending}
                    className="px-3 py-1 border rounded disabled:opacity-40"
                >
                    Previous
                </button>
                <span className="text-sm text-gray-600">
                    Page {page} of {data.totalPages}
                </span>
                <button
                    onClick={() => fetchUsers(page + 1, query)}
                    disabled={page === data.totalPages || isPending}
                    className="px-3 py-1 border rounded disabled:opacity-40"
                >
                    Next
                </button>
            </div>
        </>
    )
}