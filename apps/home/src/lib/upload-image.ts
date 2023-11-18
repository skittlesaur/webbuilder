const uploadImage = async (file: File | string) => {
  const CLOUDINARY_UPLOAD_PRESET = 'baraa-webbuilder'
  const CLOUDINARY_UPLOAD_URL =
    'https://api.cloudinary.com/v1_1/dy9mp2tho/image/upload'

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)

  const res = await fetch(CLOUDINARY_UPLOAD_URL, {
    method: 'POST',
    body: formData,
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
  })

  const data = await res.json()

  const { secure_url: secureUrl } = data
  const paths = secureUrl.split('/')
  const fileName = paths[paths.length - 1]
  const version = paths[paths.length - 3]
  return `${process.env.NEXT_PUBLIC_SITE_URL}/users/assets/${version}/${fileName}`
}

export default uploadImage