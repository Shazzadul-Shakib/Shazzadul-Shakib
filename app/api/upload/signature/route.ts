import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import cloudinary from '@/lib/cloudinary';

const UPLOAD_FOLDER = 'portfolio-uploads';

// POST /api/upload/signature - protected
// Issues a short-lived signature so the browser can upload an image
// directly to Cloudinary without ever seeing the API secret.
export async function POST() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      { error: 'Image upload is not configured' },
      { status: 500 },
    );
  }

  const timestamp = Math.round(Date.now() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder: UPLOAD_FOLDER },
    apiSecret,
  );

  return NextResponse.json({
    timestamp,
    signature,
    apiKey,
    cloudName,
    folder: UPLOAD_FOLDER,
  });
}
