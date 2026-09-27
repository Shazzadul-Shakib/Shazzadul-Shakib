const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

export class ImageUploadError extends Error {}

export async function uploadImageToCloudinary(file: File): Promise<string> {
  if (!file.type.startsWith('image/')) {
    throw new ImageUploadError('Please choose an image file.');
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new ImageUploadError('Image must be smaller than 5MB.');
  }

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
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: 'POST', body: formData },
  );

  if (!uploadRes.ok) {
    throw new ImageUploadError('Upload failed. Please try again.');
  }

  const data = await uploadRes.json();
  return data.secure_url as string;
}
