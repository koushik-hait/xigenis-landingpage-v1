'use client'

import { useState, useTransition } from 'react'
import { getUsers, type ClerkUser, type GetUsersResult } from './actions'

export default function UsersTable({ initialData }: { initialData: GetUsersResult }) {
    const [data, setData] = useState(initialData)
    const [page, setPage] = useState(1)
    const [query, setQuery] = useState('')
    const [isPending, startTransition] = useTransition()

    function fetchUsers(newPage: number, newQuery: string) {
        startTransition(async () => {
            const result = await getUsers(newPage, newQuery)
            setData(result)
            setPage(newPage)
            setQuery(newQuery)
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
                        </tr>
                    </thead>
                    <tbody>
                        {data.users.map((user: ClerkUser) => (
                            <tr key={user.id} className="border-t hover:bg-gray-50">
                                <td className="p-3">
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={user.imageUrl}
                                            alt=""
                                            className="w-8 h-8 rounded-full"
                                        />
                                        <span>
                                            {user.firstName} {user.lastName}
                                        </span>
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
                            </tr>
                        ))}
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