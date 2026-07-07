export {}

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: "admin" | "manager" | "user";
    };
  }

  interface Window {
    umami?: {
      track: (eventName: string, eventData?: Record<string, unknown>) => void;
    };
  }
}
