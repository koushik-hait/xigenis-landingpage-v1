'use server'

import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { desc, eq } from 'drizzle-orm'

export async function getAllUsers() {
  try {
    const { userId, sessionClaims } = await auth()

    if (!userId) {
      return { success: false, error: 'Unauthorized', users: [] }
    }

    const role = sessionClaims?.metadata?.role || 'user'
    if (role !== 'admin' && role !== 'manager') {
      return { success: false, error: 'Forbidden: Admin or Manager access required', users: [] }
    }

    const data = await db.select().from(users).orderBy(desc(users.createdAt))
    return { success: true, users: data }
  } catch (error) {
    console.error('Failed to fetch users:', error)
    return { success: false, error: 'Failed to fetch users', users: [] }
  }
}

export async function updateUserRole(userId: string, role: 'admin' | 'manager' | 'user') {
  try {
    await db.update(users)
      .set({ role, updatedAt: new Date() })
      .where(eq(users.id, userId))
    
    return { success: true }
  } catch (error) {
    console.error('Failed to update user role:', error)
    return { success: false, error: 'Failed to update user role' }
  }
}

export async function toggleUserStatus(userId: string, isActive: boolean) {
  try {
    await db.update(users)
      .set({ isActive, updatedAt: new Date() })
      .where(eq(users.id, userId))
    
    return { success: true }
  } catch (error) {
    console.error('Failed to toggle user status:', error)
    return { success: false, error: 'Failed to update user status' }
  }
}
