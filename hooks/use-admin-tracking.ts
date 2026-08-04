'use client'

import { useUser } from '@clerk/nextjs'
import { useCallback } from 'react'

export type AdminActionType = 'create' | 'update' | 'delete' | 'upload' | 'save' | 'view'

export interface AdminTrackEvent {
  action: AdminActionType
  section: string
  details?: string
  metadata?: Record<string, string | number | boolean>
}

export function useAdminTracking() {
  const { user, isLoaded } = useUser()

  const trackAdminAction = useCallback((event: AdminTrackEvent) => {
    if (typeof window === 'undefined' || !window.umami) {
      console.warn('[AdminTracking] Umami not available')
      return
    }

    if (!isLoaded || !user) {
      console.warn('[AdminTracking] User not loaded')
      return
    }

    const username = user.username || user.primaryEmailAddress?.emailAddress || user.id
    const timestamp = new Date().toISOString()

    const eventData = {
      username,
      action: event.action,
      section: event.section,
      details: event.details || '',
      timestamp,
      userId: user.id,
      email: user.primaryEmailAddress?.emailAddress || '',
      ...event.metadata,
    }

    window.umami.track('admin_action', eventData)
  }, [user, isLoaded])

  const trackCreate = useCallback((section: string, details?: string, metadata?: Record<string, string | number | boolean>) => {
    trackAdminAction({ action: 'create', section, details, metadata })
  }, [trackAdminAction])

  const trackUpdate = useCallback((section: string, details?: string, metadata?: Record<string, string | number | boolean>) => {
    trackAdminAction({ action: 'update', section, details, metadata })
  }, [trackAdminAction])

  const trackDelete = useCallback((section: string, details?: string, metadata?: Record<string, string | number | boolean>) => {
    trackAdminAction({ action: 'delete', section, details, metadata })
  }, [trackAdminAction])

  const trackUpload = useCallback((section: string, details?: string, metadata?: Record<string, string | number | boolean>) => {
    trackAdminAction({ action: 'upload', section, details, metadata })
  }, [trackAdminAction])

  const trackSave = useCallback((section: string, details?: string, metadata?: Record<string, string | number | boolean>) => {
    trackAdminAction({ action: 'save', section, details, metadata })
  }, [trackAdminAction])

  return {
    trackAdminAction,
    trackCreate,
    trackUpdate,
    trackDelete,
    trackUpload,
    trackSave,
    isReady: isLoaded && !!user,
    user,
  }
}
