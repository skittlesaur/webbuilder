// eslint-disable-next-line @typescript-eslint/no-explicit-any -- we don't know what the error will be
const getErrorMessage = (error: any): string => {
  return error.response.data.message || error.message || 'Something went wrong'
}

export default getErrorMessage