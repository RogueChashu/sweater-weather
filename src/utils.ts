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

export { convertTemperature, dateFormatting, getIcon, getInitialCoord }
