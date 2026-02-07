import { ACCESS_TOKEN_TTL, JWT_ALG, REFRESH_TOKEN_TTL } from "@/constants"
import { jwtVerify, SignJWT, type JWTPayload as DefaultJWTPayload } from "jose"

if (!process.env.ACCESS_TOKEN_SECRET) {
  throw new Error("ACCESS_TOKEN_SECRET is not set")
}

if (!process.env.REFRESH_TOKEN_SECRET) {
  throw new Error("REFRESH_TOKEN_SECRET is not set")
}

const ACCESS_TOKEN_SECRET = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET)

const REFRESH_TOKEN_SECRET = new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET)

export type Role = "user" | "admin"

export type JWTPayload = DefaultJWTPayload & {
  sub: string // user id
  role: Role
}

export async function encryptAccessToken(payload: JWTPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: JWT_ALG })
    .setIssuedAt()
    .setExpirationTime(ACCESS_TOKEN_TTL)
    .sign(ACCESS_TOKEN_SECRET)
}

export async function decryptAccessToken(token: string | null) {
  if (!token) return null

  try {
    const { payload } = await jwtVerify(token, ACCESS_TOKEN_SECRET)

    return payload as JWTPayload
  } catch {
    return null
  }
}

export async function encryptRefreshToken(payload: JWTPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: JWT_ALG })
    .setIssuedAt()
    .setExpirationTime(REFRESH_TOKEN_TTL)
    .sign(REFRESH_TOKEN_SECRET)
}

export async function decryptRefreshToken(token: string | null) {
  if (!token) return null

  try {
    const { payload } = await jwtVerify(token, REFRESH_TOKEN_SECRET)

    return payload as JWTPayload
  } catch {
    return null
  }
}
