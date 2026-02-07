import { DEFAULT_PORT, NODE_ENV } from "@/constants"
import { logger } from "@/lib/logger"
import { httpLogger } from "@/middleware/http-logger"
import cookieParser from "cookie-parser"
import cors from "cors"
import express from "express"
import helmet from "helmet"

const app = express()

app.use(httpLogger)
app.use(helmet())
app.use(cors())
app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/", (_req, res) => {
  res.setHeader("Content-Type", "text/html")
  return res.send("OK")
})

app.listen(DEFAULT_PORT, () => {
  logger.info({ NODE_ENV, DEFAULT_PORT }, "server is running")
})
