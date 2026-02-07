import { DAY, SEVEN_DAYS, THIRTY_DAYS } from "@/constants"

export const oneDayFromNow = () => new Date(Date.now() + DAY)
export const sevenDaysFromNow = () => new Date(Date.now() + SEVEN_DAYS)
export const thirtyDaysFromNow = () => new Date(Date.now() + THIRTY_DAYS)
