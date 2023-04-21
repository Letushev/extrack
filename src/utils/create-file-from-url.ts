export const createFileFromUrl = async (url: string, name: string, type: string = 'image/jpeg') => {
  const response = await fetch(url)
  const data = await response.blob()
  return new File([data], name, { type })
}
