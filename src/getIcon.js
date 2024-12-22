
 const getIcon = async (iconType) => {
  try {
    const icon = await import(`./assets/weatherIcons/${iconType}.png`)
    return icon.default
  } catch (error) {
    console.log(`Failed to load icon: ${iconType}`, error)
      return null
  }
}

export default getIcon