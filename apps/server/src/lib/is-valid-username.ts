const isValidUsername = (username: string): boolean => {
  const isMoreThan3Characters = username.length > 3
  if (!isMoreThan3Characters) {
    return false
  }

  const isLessThanOrEqual15Characters = username.length <= 15
  if (!isLessThanOrEqual15Characters) {
    return false
  }

  const isAlphanumeric = /^[a-z0-9]+$/i.test(username)
  if (!isAlphanumeric) {
    return false
  }

  return true
}

export default isValidUsername