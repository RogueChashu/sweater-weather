/*
 const getIcon = async (iconType) => {
  try {
    const icon = await import(`./assets/weatherIcons/${iconType}.png`)
    console.log(icon)
    return icon.default
  } catch (error) {
    console.log(`Failed to load icon: ${iconType}`, error)
      return null
  }
} */

  const getIcon = (iconNeeded) => {
    const icon = `./assets/weatherIcons/${iconNeeded}.png`
    console.log(icon)
    return icon.default
  }

export default getIcon