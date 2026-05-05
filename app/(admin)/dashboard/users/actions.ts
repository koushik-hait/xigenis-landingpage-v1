'use server'

import { auth, clerkClient } from '@clerk/nextjs/server'

export type ClerkUser = {
  id: string
  firstName: string | null
  lastName: string | null
  email: string
  imageUrl: string
  createdAt: number
  lastSignInAt: number | null
  banned: boolean
  publicMetadata: Record<string, unknown>
}

export type GetUsersResult = {
  users: ClerkUser[]
  totalCount: number
  totalPages: number
}

export async function getUsers(
  page = 1,
  query = '',
  limit = 20
): Promise<GetUsersResult> {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')

  // Admin check
  const client = await clerkClient()
  const requestingUser = await client.users.getUser(userId)
  if (requestingUser.publicMetadata?.role !== 'admin') {
    throw new Error('Forbidden')
  }

  const offset = (page - 1) * limit
  const { data: users, totalCount } = await client.users.getUserList({
    limit,
    offset,
    orderBy: '-created_at',
    ...(query ? { query } : {}),
  })

  return {
    users: users.map((u) => ({
      id: u.id,
      firstName: u.firstName,
      lastName: u.lastName,
      email: u.emailAddresses[0]?.emailAddress ?? '',
      imageUrl: u.imageUrl,
      createdAt: u.createdAt,
      lastSignInAt: u.lastSignInAt,
      banned: u.banned,
      publicMetadata: u.publicMetadata as Record<string, unknown>,
    })),
    totalCount,
    totalPages: Math.ceil(totalCount / limit),
  }
}