import {format, parseISO} from 'date-fns'

const dateFormatting = (date) => {
  const originalDate = parseISO(date, 'yyyy-M-d', new Date())
  return (format(originalDate, 'd MMM'))
}

export default dateFormatting