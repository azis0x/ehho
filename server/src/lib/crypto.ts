import bcrypt from "bcrypt"

export const hash = async (raw: string) => bcrypt.hash(raw, process.env.BCRYPT_SALT_SECRET)

export const compare = bcrypt.compare
