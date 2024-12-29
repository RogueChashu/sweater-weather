import {format, parseISO} from 'date-fns'

async function getInitialLocation () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords
      resolve({ latitude, longitude })
    }, (error) => {
      reject(error)
    })
  })
}

const convertTemperature = (temperature, celsius) => {
  if (celsius) {
    return Math.round((temperature - 32) * 5 / 9)
  } else  {
    return Math.round(temperature)
  }
}

const dateFormatting = (date) => {
  const originalDate = parseISO(date, 'yyyy-M-d', new Date())
  return (format(originalDate, 'd MMM'))
}

const getIcon = (iconNeeded) => {
  return `/assets/weatherIcons/${iconNeeded}.png`
}

export { convertTemperature, dateFormatting, getIcon, getInitialLocation }