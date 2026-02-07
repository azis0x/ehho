import * as schema from "@/db/schema"
import { neon, neonConfig } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import ws from "ws"

neonConfig.webSocketConstructor = ws

type DB = ReturnType<typeof drizzle<typeof schema>>

const globalForDb = globalThis as unknown as {
  db: DB | undefined
}

const sql = neon(process.env.DATABASE_URL)
const db = globalForDb.db ?? drizzle({ client: sql, schema })

if (process.env.NODE_ENV !== "production") globalForDb.db = db

export { db }
