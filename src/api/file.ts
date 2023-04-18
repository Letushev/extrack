import { uploadFile as upload } from '@uploadcare/upload-client'

export const uploadFile = async (file: File) => {
  try {
    const result = await upload(file, {
      publicKey: '6b32413ec590ea99cafa',
      store: 'auto',
      metadata: {
        subsystem: 'uploader',
        pet: 'cat'
      }
    })

    if (!result.cdnUrl) {
      throw 'cdnURL not found'
    }

    return result.cdnUrl
  } catch {
    throw 'Failed to upload the file. Please try again later.'
  }
}
