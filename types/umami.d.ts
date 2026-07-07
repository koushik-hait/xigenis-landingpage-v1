// types/umami.d.ts
declare global {
  interface Window {
    umami: {
      track: (eventName: string, props?: Record<string, string | number>) => void
    }
  }
}