import { connectDB } from '@/lib/db';
import SiteSettings from '@/models/SiteSettings';
import { siteConfig } from '@/utils/constants';

export async function getResumeUrl(): Promise<string> {
  try {
    await connectDB();
    const settings = await SiteSettings.findOne({})
      .select('resumeUrl')
      .lean();
    return settings?.resumeUrl || siteConfig.resumeUrl;
  } catch {
    return siteConfig.resumeUrl;
  }
}
