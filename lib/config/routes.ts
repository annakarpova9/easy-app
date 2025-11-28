export const AppRoutes = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  TODOS: "/todos",

  RESET_PASSWORD_REQUEST: "/reset-password",

  AUTH_RESET_PASSWORD: "/auth/reset-password",
  AUTH_CALLBACK: "/auth/callback",
  AUTH_RESET_PASSWORD_CALLBACK: "/auth/reset-password-callback",
} as const;

export type AppRouteKey = keyof typeof AppRoutes;
