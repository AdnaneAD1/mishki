type UploadOptions = {
  folder?: string
}

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

if (!CLOUD_NAME) {
  console.warn('Cloudinary: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not set')
}
if (!UPLOAD_PRESET) {
  console.warn('Cloudinary: NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET is not set')
}

export async function uploadToCloudinary(file: File, options: UploadOptions = {}): Promise<string> {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error('Cloudinary is not configured correctly')
  }

  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', UPLOAD_PRESET)
  if (options.folder) {
    formData.append('folder', options.folder)
  }

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error('Upload vers Cloudinary échoué')
  }

  const data = await response.json()
  return data.secure_url as string
}
