import dayjs from 'dayjs'

export function formatTimeToUtc(date: string, time: string) {
  const dateDays = date.split('/')
  const days = `${dateDays[2]}-${dateDays[1]}-${dateDays[0]}`
  const formatDate = new Date(days + 'T' + time)

  const newDate = dayjs(formatDate)

  return newDate
}
