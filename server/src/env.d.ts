declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: "development" | "production" | "test"
      readonly CORS_ORIGIN: string
      readonly LOG_LEVEL: "info" | "debug" | "warn" | "error" | "trace"

      readonly DATABASE_URL: string

      readonly ACCESS_TOKEN_SECRET: string
      readonly REFRESH_TOKEN_SECRET: string

      readonly EMAIL_SERVICE: string
      readonly EMAIL_USER: string
      readonly EMAIL_PASS: string

      readonly BCRYPT_SALT_SECRET: number
    }
  }

  namespace Express {
    interface Request {
      user?: {
        sub: string
        role: "admin" | "user"
      }
    }
  }
}

export {}
