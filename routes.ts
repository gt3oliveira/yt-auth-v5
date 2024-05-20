/**
 * Array de rotas públicas
 * Rotas que não precisam de autenticação
 * @type {string[]}
 */
export const publicRoutes = [
  "/",
  "/auth/new-verification",
]

/**
 * Array de rotas autenticadas
 * Rotas que direcionam o usuário logado para /settings
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
]

/**
 * prefix API de rotas autenticadas
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth"

/**
 * Redirecionamento padrão de path logado
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings"