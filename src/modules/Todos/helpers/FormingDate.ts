import { Dayjs } from "dayjs"

type Date = string | number

export function FormingDate (date: Dayjs) {
    let year = date.year()
    let month: Date = date.month() + 1
    let day: Date = date.date()
    let minute: Date = date.minute()
    let hour: Date = date.hour()

    if(month < 10) {
        month = '0' + month
    }
    if(day < 10) {
        day = '0' + day
    }
    if(minute < 10) {
        minute = '0' + minute
    }
    if(hour < 10) {
        hour = '0' + hour
    }
    return `${day}.${month}.${year} ${hour}:${minute}`
}