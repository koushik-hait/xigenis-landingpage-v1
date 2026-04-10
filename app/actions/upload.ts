'use server'

import { r2Client } from '@/lib/r2'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import crypto from 'crypto'

export async function uploadFile(formData: FormData) {
  try {
    const file = formData.get('file') as File
    if (!file) throw new Error('No file provided')

    const bucket = process.env.CLOUDFLARE_R2_BUCKET_NAME
    if (!bucket) throw new Error('Bucket name not configured')

    const uniqueId = crypto.randomUUID()
    const objectKey = `cms/${uniqueId}-${file.name.replace(/\s+/g, '-')}`

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: objectKey,
      Body: buffer,
      ContentType: file.type,
    })

    await r2Client.send(command)

    // Use the public r2.dev domain for the final URL
    const publicUrl = process.env.CLOUDFLARE_R2_PUBLIC_URL || 'https://pub-18a3a4375c514c64bedfd4c414fbfa08.r2.dev'
    const finalUrl = `${publicUrl}/${objectKey}`
    
    return { success: true, finalUrl }
  } catch (error) {
    console.error('Failed to upload file', error)
    return { success: false, error: 'Failed to upload file' }
  }
}
