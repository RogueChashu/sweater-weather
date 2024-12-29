const convertTemperature = (temperature, celsius) => {
  if (celsius) {
    return Math.round((temperature - 32) * 5 / 9)
  } else  {
    return Math.round(temperature)
  }
}

export default convertTemperature