import {format, parse} from 'date-fns'
import { GPSCoordinatesType } from './interfaces'

async function getInitialCoord (): Promise<GPSCoordinatesType> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords // Storing in variable only lat and lon.
      resolve({ latitude, longitude })
    }, (error) => {
      reject(error)
    })
  })
}

const convertTemperature = (temperature: number, isCelsius: boolean): number => {
  if (isCelsius) {
    return Math.round((temperature - 32) * 5 / 9)
  } else  {
    return Math.round(temperature)
  }
}

const dateFormatting = (date: string): string => {
  const originalDate = parse(date, 'yyyy-M-d', new Date())
  return (format(originalDate, 'd MMM'))
}

const getIcon = (iconNeeded: string): string => {
  return `/assets/weatherIcons/${iconNeeded}.png`
}

const getWeekday = (date:string): string => {
  const [year, month, day] = date.split('-').map(Number);
  const dayOfTheWeek = new Date(year, month - 1, day);
  const today = new Date();

  today.setHours(0, 0, 0, 0);
  dayOfTheWeek.setHours(0, 0, 0, 0);

  const diffTime = dayOfTheWeek.getTime() - today.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';

  return dayOfTheWeek.toLocaleDateString('en-US', { weekday: 'long'})
}

export { convertTemperature, dateFormatting, getIcon, getInitialCoord, getWeekday }
