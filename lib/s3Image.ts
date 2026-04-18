export const S3_MEDIA_HOST = 'gidophotography-images.s3.us-east-1.amazonaws.com';

export const S3_MEDIA_ORIGIN = `https://${S3_MEDIA_HOST}`;

/**
 * Next.js fetches remote URLs inside `/_next/image` with a hard ~7s timeout.
 * Large originals on S3 often exceed that; loading the HTTPS URL directly avoids the optimizer fetch.
 */
export function shouldBypassImageOptimizer(resolvedSrc: string): boolean {
  return resolvedSrc.includes(S3_MEDIA_HOST);
}
