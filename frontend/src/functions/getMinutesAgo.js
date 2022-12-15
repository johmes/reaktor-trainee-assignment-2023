const getMinutesAgo = (time) => {
  const currentTime = Date.now()
  const seconds = Math.floor((currentTime - time) / 1000)
  const interval = Math.floor(((seconds / 60) / 60) * 60)
  let timePassed = null;

  if (interval > 1) {
    timePassed = `${interval} minutes ago`
  } else {
    timePassed = "Now"
  }
  return timePassed
}

export default getMinutesAgo