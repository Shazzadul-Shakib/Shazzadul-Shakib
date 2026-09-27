const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
const MAX_RESUME_SIZE_BYTES = 10 * 1024 * 1024;

export class ImageUploadError extends Error {}

async function uploadToCloudinary(
  file: File,
  resourceType: 'image' | 'auto',
): Promise<string> {
  const sigRes = await fetch('/api/upload/signature', { method: 'POST' });
  if (!sigRes.ok) {
    throw new ImageUploadError('Could not start upload. Please log in again.');
  }
  const { timestamp, signature, apiKey, cloudName, folder } =
    await sigRes.json();

  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', apiKey);
  formData.append('timestamp', String(timestamp));
  formData.append('signature', signature);
  formData.append('folder', folder);

  const uploadRes = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
    { method: 'POST', body: formData },
  );

  if (!uploadRes.ok) {
    throw new ImageUploadError('Upload failed. Please try again.');
  }

  const data = await uploadRes.json();
  return data.secure_url as string;
}

export async function uploadImageToCloudinary(file: File): Promise<string> {
  if (!file.type.startsWith('image/')) {
    throw new ImageUploadError('Please choose an image file.');
  }
  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    throw new ImageUploadError('Image must be smaller than 5MB.');
  }
  return uploadToCloudinary(file, 'image');
}

export async function uploadResumeToCloudinary(file: File): Promise<string> {
  if (file.type !== 'application/pdf') {
    throw new ImageUploadError('Please choose a PDF file.');
  }
  if (file.size > MAX_RESUME_SIZE_BYTES) {
    throw new ImageUploadError('Resume must be smaller than 10MB.');
  }
  return uploadToCloudinary(file, 'auto');
}
