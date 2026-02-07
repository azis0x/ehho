export const NODE_ENV = process.env.NODE_ENV ?? "development"

export const IS_DEV = NODE_ENV === "development"
export const IS_PROD = NODE_ENV === "production"
export const IS_TEST = NODE_ENV === "test"

export const APP_NAME = "ehho"
export const API_VERSION = "v1"

export const DEFAULT_PORT = 3000
export const DEFAULT_HOST = "0.0.0.0"

export const TRUST_PROXY = true

export type Milliseconds = number & { readonly __brand: "ms" }
export type Seconds = number & { readonly __brand: "sec" }

const ms = (value: number) => value as Milliseconds
const sec = (value: number) => value as Seconds

export const SECOND = ms(1000)
export const MINUTE = ms(60 * 1000)
export const HOUR = ms(60 * 60 * 1000)
export const DAY = ms(24 * 60 * 60 * 1000)

export const SEVEN_DAYS = ms(7 * DAY)
export const THIRTY_DAYS = ms(30 * DAY)

export const ONE_SECOND = sec(1)
export const ONE_MINUTE = sec(60)
export const ONE_HOUR = sec(60 * 60)
export const ONE_DAY = sec(24 * 60 * 60)

export const HTTP_OK = 200
export const HTTP_CREATED = 201
export const HTTP_NO_CONTENT = 204

export const HTTP_BAD_REQUEST = 400
export const HTTP_UNAUTHORIZED = 401
export const HTTP_FORBIDDEN = 403
export const HTTP_NOT_FOUND = 404
export const HTTP_CONFLICT = 409
export const HTTP_UNPROCESSABLE_ENTITY = 422

export const HTTP_INTERNAL_SERVER_ERROR = 500

export type HTTPStatusCode =
  | typeof HTTP_OK
  | typeof HTTP_CREATED
  | typeof HTTP_NO_CONTENT
  | typeof HTTP_BAD_REQUEST
  | typeof HTTP_UNAUTHORIZED
  | typeof HTTP_FORBIDDEN
  | typeof HTTP_NOT_FOUND
  | typeof HTTP_CONFLICT
  | typeof HTTP_UNPROCESSABLE_ENTITY
  | typeof HTTP_INTERNAL_SERVER_ERROR

export const PAGINATION_DEFAULT_PAGE = 1
export const PAGINATION_DEFAULT_LIMIT = 20
export const PAGINATION_MAX_LIMIT = 100

export const ACCESS_TOKEN_TTL = "15m"
export const REFRESH_TOKEN_TTL = "30d"

export const COOKIE_ACCESS_TOKEN = "access_token"
export const COOKIE_REFRESH_TOKEN = "refresh_token"

export const RATE_LIMIT_WINDOW = MINUTE
export const RATE_LIMIT_MAX_REQUESTS = 100

export const USERNAME_MIN_LENGTH = 3
export const USERNAME_MAX_LENGTH = 20

export const PASSWORD_MIN_LENGTH = 8
export const PASSWORD_MAX_LENGTH = 72

export const REDACT_PATHS = ["password", "token", "accessToken", "refreshToken", "authorization"]

export const RESERVED_NAMES = [
  "user",
  "users",
  "password",
  "admin",
  "superuser",
  "superadmin",
  "root",
  "service",
  "services",
  "policy",
  "policies",
  "support",
  "team",
  "help",
  "privacy",
  "privacies",
  "hacker",
  "manager",
  "ceo",
  "super",
  "sudo",
  "sudouser",
  "sudoadmin",
]

export const HEADER_REQUEST_ID = "x-request-id"
export const HEADER_FORWARDED_FOR = "x-forwarded-for"
