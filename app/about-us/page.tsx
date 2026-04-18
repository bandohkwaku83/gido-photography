'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navigation from '../components/Navigation';
import ScrollAnimation from '../components/ScrollAnimation';
import FloatingElements from '../components/FloatingElements';
import Footer from '../components/Footer';

const FILTERS = ['Wedding', 'Studio', 'Portraits', 'Birthdays', 'Brands', 'Graduations'] as const;
const S3_BUCKET_HTTP_BASE = 'https://gidophotography-images.s3.us-east-1.amazonaws.com';

const WEDDING_IMAGE_FILES = [
  'GIDO7922.CR3-2.JPG', 'GIDO9935.JPG', 'IMG_1630.JPG', 'GIDO6772.JPG', 'GIDO9512.JPG',
  'GIDO9729.JPG', 'GIDO98710.JPG', 'GIDO7246.JPG', 'GIDO9552.JPG', '_IDO0914.jpg',
  'GIDO9818.JPG', 'IMG_5882.JPG', 'IMG_0381.JPG', 'IMG_1627.JPG', 'GIDO4014.JPG',
  'GIDO9696.JPG', 'GIDO9936.JPG', 'IMG_5831.JPG', 'GIDO7837.CR3-13.JPG', 'GIDO99341.JPG',
  'IMG_1635.JPG', 'GIDO9537.JPG', 'GIDO9584.JPG', 'GIDO1744.JPG', 'GIDO7858.CR3-16.jpg-b-w.JPG',
  'GIDO0188.JPG', '_IDO9372.jpg', 'GIDO0682.JPG', 'IMG_1636.JPG', 'IMG_3574.JPG',
  'GIDO0685.JPG', 'IMG_1634.JPG', 'GIDO9333.JPG', 'GIDO9862.JPG', 'GIDO7523.JPG',
  'GIDO2274.jpg-1.JPG', 'RICH7430.JPG', 'GIDO9994.JPG', 'IMG_0549.JPG', 'GIDO0693.JPG',
  'IMG_2190.JPG', 'GIDO0763.JPG', 'GIDO4268.JPG', '_IDO8912.jpg', '_IDO9997.jpg',
  'GIDO0244.JPG', 'WOED0075.JPG', 'GIDO9343.JPG', 'GIDO6261.JPG', 'GIDO9951.JPG',
  'GIDO99315.JPG', 'IMG_1632.JPG', 'GIDO4328.JPG', 'GIDO0703.JPG', 'GIDO6992.JPG',
  'IMG_3594 2.JPG', 'GIDO6989.JPG', 'GIDO99166.JPG', '_IDO9060.jpg', 'GIDO8000.CR3-10.JPG',
  'GIDO96241.JPG', '_KAY9164.JPG', 'IMG_1464 2.JPG', 'GIDO4225.JPG', '_IDO1018.jpg',
  'IMG_5637.JPG', 'GIDO8008.CR3-11.JPG', 'GIDO0255.jpg-1.jpg', '_IDO4660.jpg', 'IMG_1631.JPG',
  'IMG_0315.JPG', 'IMG_1621 2.JPG', 'IMG_3503.JPG', 'GIDO0216.JPG', '_KAY9068.JPG',
  'GIDO9570.JPG', 'GIDO5444.JPG', '_KAY9796.JPG', 'GIDO0995 2.jpg', 'GIDO9915.JPG',
  'IMG_0373.JPG', 'GIDO7403-1.JPG', 'IMG_1629.JPG', 'GIDO9663.JPG', '_IDO8941.jpg',
  'GIDO7451.JPG', 'GIDO93512.JPG', 'GIDO9937.JPG', 'GIDO0156.jpg', 'IMG_3599.JPG',
  'GIDO4298.JPG', 'IMG_1637.JPG', 'GIDO7253.JPG', 'GIDO956711.JPG', 'GIDO6979.JPG',
  'GIDO7402-1.JPG', 'GIDO99519.JPG', 'GIDO00112.JPG', 'GIDO7170.JPG', 'GIDO9556.JPG',
  'IMG_1445 2.JPG', 'GIDO3989.JPG', 'GIDO7002.JPG', 'IMG_1638.JPG', '_KAY9227.JPG',
  'IMG_1628.JPG', 'IMG_0569.JPG', 'GIDO5384.JPG', 'GIDO9860.JPG', 'IMG_1633.JPG',
  'GIDO9840.JPG', 'RICH1933.JPG', 'IMG_1625.JPG', 'GIDO9653.JPG', 'GIDO7470.JPG',
  'GIDO9857.JPG', 'IMG_0348.jpg-1-.JPG', 'GIDO5460.JPG', 'GIDO98325.JPG', 'GIDO7509.JPG',
  'IMG_3149.JPG', 'IMG_3596 2.JPG', 'GIDO9953.JPG', 'GIDO7511.JPG', 'IMG_1623.JPG',
  'GIDO9357.JPG', 'GIDO7416-1.JPG', 'IMG_3184.JPG', '_IDO9201.jpg', 'GIDO9975.JPG',
  'GIDO9916.JPG', 'GIDO5369.JPG', 'GIDO96815.JPG', 'IMG_0565.JPG', 'GIDO9382.JPG',
  'GIDO7118.JPG', 'GIDO7280.JPG', 'GIDO5425.JPG', 'GIDO02061.JPG', 'IMG_5855.JPG',
  'GIDO4191.JPG', 'IMG_3179.JPG', 'GIDO9962.JPG', 'IMG_4303.JPG', 'GIDO9997.JPG',
  'GIDO9461.jpg', 'GIDO7385-2-1.JPG', 'GIDO9535.JPG', 'GIDO9547.JPG', 'IMG_3595.JPG',
  'GIDO00157.JPG', 'IMG_1442 2.JPG', 'GIDO9961.JPG', 'GIDO9524.JPG', 'GIDO6255.JPG',
  'IMG_3568.JPG', 'GIDO9932.JPG', 'IMG_5886.JPG', 'GIDO972114.JPG', 'IMG_1639.JPG',
  'IMG_3151.JPG', '_IDO9170.jpg', 'GIDO9564.JPG', '_IDO9305.jpg', 'GIDO9904.JPG',
  '_IDO9335.jpg', 'IMG_0317.JPG', '_IDO8879.jpg', 'GIDO9440.jpg', 'GIDO9998.JPG',
  'GIDO7194.JPG', 'IMG_1626.JPG', 'GIDO0221.JPG', 'GIDO4274.JPG', '_IDO1010.jpg',
  'IMG_3600.JPG', 'GIDO0920.JPG', 'IMG_5835.JPG', 'RICH1903.JPG', 'GIDO9993.JPG',
  'GIDO95625.JPG', 'GIDO79941.JPG', '_IDO9320.jpg', 'IMG_3148.JPG', 'GIDO7901.CR3-1.JPG',
  'GIDO0006.JPG', 'IMG_1620.JPG', 'IMG_3597 2.JPG', 'GIDO99164.JPG',
] as const;

const BRAND_IMAGE_FILES = [
  'GIDO00013.JPG', 'GIDO0008.JPG', 'GIDO00119.JPG', 'GIDO00217.JPG', 'GIDO0023.JPG',
  'GIDO0030.JPG', 'GIDO0040.JPG', 'GIDO0041.JPG', 'GIDO0055.JPG', 'GIDO0069.JPG',
  'GIDO0076.JPG', 'GIDO0084.JPG', 'GIDO0093.JPG', 'GIDO01011.JPG', 'GIDO0102.JPG',
  'GIDO0105.JPG', 'GIDO0119.JPG', 'GIDO0148-1.JPG', 'GIDO0158.JPG', 'GIDO0174.JPG',
  'GIDO0196.JPG', 'GIDO0239.JPG', 'GIDO0247.JPG', 'GIDO0268.JPG', 'GIDO1190.JPG',
  'GIDO1305.JPG', 'GIDO1307.JPG', 'GIDO2661.JPG', 'GIDO2767-1.JPG', 'GIDO2931.JPG',
  'GIDO2960.JPG', 'GIDO3059.JPG', 'GIDO8744.JPG', 'GIDO8764.JPG', 'GIDO8811.JPG',
  'GIDO8815.JPG', 'GIDO9319.JPG', 'GIDO9762.JPG', 'IMG_3339.JPG', 'IMG_3340.JPG',
  'IMG_3341.JPG', 'IMG_3592.JPG', 'IMG_3593.JPG', 'IMG_3594.JPG', 'IMG_3601.JPG',
  'IMG_3602.JPG', 'IMG_3620.JPG', 'IMG_3660.JPG', 'IMG_3662.JPG', 'IMG_3666.JPG',
  'IMG_3699.JPG', 'IMG_3700.JPG', 'IMG_3703.JPG', 'IMG_3705.JPG', 'IMG_3707.JPG',
  'IMG_4239.JPG', 'IMG_4241.JPG', 'IMG_4242.JPG', 'IMG_4243.JPG', 'IMG_4344.JPG',
  'IMG_4345.JPG', 'IMG_4346.JPG', 'IMG_4347.JPG', 'IMG_4349.JPG', 'IMG_4350.JPG',
  'IMG_4358.JPG', 'IMG_4360.JPG', 'IMG_4361.JPG', 'IMG_4362.JPG', 'IMG_4641.JPG',
  'IMG_4643.JPG', 'IMG_4644.JPG', 'IMG_4648.JPG', 'IMG_4665.JPG', 'IMG_4666.JPG',
  'IMG_4667.JPG', 'IMG_4748.JPG', 'IMG_4765.JPG', 'IMG_7398.JPG', '_IDO0339.jpg',
  '_IDO0371.jpg', '_IDO0551.jpg', '_IDO0569.jpg', '_IDO9958.jpg',
] as const;

const BIRTHDAY_IMAGE_FILES = [
  'GIDO0051.JPG', 'GIDO0188.jpg-1.JPG', 'GIDO0194.jpg-1.JPG', 'GIDO0482.JPG', 'GIDO0494.JPG',
  'GIDO05341.JPG', 'GIDO0630.JPG', 'GIDO0643.JPG', 'GIDO06831.JPG', 'GIDO0930-min.JPG',
  'GIDO1383.jpg-1.JPG', 'GIDO1424.JPG', 'GIDO25108-min.JPG', 'GIDO3271-min.JPG', 'GIDO3965.JPG',
  'GIDO3977.JPG', 'GIDO8656-min.jpg', 'GIDO97251.JPG', 'GIDO9749.JPG', 'GIDO9794.JPG',
  'GIDO9827.JPG', 'GIDO98441.JPG', 'GIDO98471.JPG', 'GIDO9855.JPG', 'IMG_0445-min.JPG',
  'IMG_1087-min.JPG', 'IMG_1088-min.JPG', 'IMG_1255-min.JPG', 'IMG_3393.JPG', 'IMG_3395.JPG',
  'IMG_3396.JPG', 'IMG_3397.JPG', 'IMG_3399.JPG', 'IMG_3400.JPG', 'IMG_3404.JPG',
  'IMG_4645-min.JPG', 'IMG_4646-min.JPG', '_IDO0726.JPG',
] as const;

const PORTRAIT_IMAGE_FILES = [
  'GIDO0049.JPG', 'GIDO00651.JPG', 'GIDO0089.JPG', 'GIDO0121.JPG', 'GIDO9179.JPG',
  'GIDO9212.JPG', 'GIDO_7619.JPG', 'IMG_1768.JPG', 'IMG_1792.JPG', 'IMG_1793.JPG',
  'IMG_2453.JPG', 'IMG_3070.JPG', 'IMG_3199.JPG', 'IMG_4057.JPG', 'IMG_4058.JPG',
  'IMG_4154.JPG', 'IMG_4667.JPG', 'IMG_7351.JPG',
] as const;

const STUDIO_IMAGE_FILES = [
  'GIDO0003-1.JPG', 'GIDO00248.JPG', 'GIDO0029-1.JPG', 'GIDO0031.JPG', 'GIDO0034.JPG',
  'GIDO0037.JPG', 'GIDO0057.JPG', 'GIDO0061.JPG', 'GIDO0071.JPG', 'GIDO0078.JPG',
  'GIDO0083.JPG', 'GIDO0096.JPG', 'GIDO0409.JPG', 'GIDO0476.JPG', 'GIDO0486.JPG',
  'GIDO0509.JPG', 'GIDO0533.JPG', 'GIDO0601.JPG', 'GIDO0620.JPG', 'GIDO0686.JPG',
  'GIDO0711.JPG', 'GIDO0720.JPG', 'GIDO0728.JPG', 'GIDO0741.JPG', 'GIDO0753.JPG',
  'GIDO0800.JPG', 'GIDO0822.JPG', 'GIDO0828.JPG', 'GIDO0838.JPG', 'GIDO0844-1.JPG',
  'GIDO0894.JPG', 'GIDO1023-1.JPG', 'GIDO14161.JPG', 'GIDO1437.JPG', 'GIDO14441.JPG',
  'GIDO1461.JPG', 'GIDO2612.JPG', 'GIDO3492.JPG', 'GIDO7601 2.JPG', 'GIDO8573.JPG',
  'GIDO9046.JPG', 'GIDO90591.JPG', 'GIDO9129.JPG', 'GIDO915511.JPG', 'GIDO9188.JPG',
  'GIDO9573.JPG', 'GIDO9587 2.JPG', 'GIDO9686.JPG', 'GIDO97470.JPG', 'GIDO9759.JPG',
  'GIDO9797.JPG', 'GIDO9867-2.JPG', 'GIDO9875-1-1-1.JPG', 'GIDO9972.JPG', 'GIDO9991-1.JPG',
  'GIDO_7786.JPG', 'Gido_3077.JPG', 'IMG_0863.JPG', 'IMG_0866.JPG', 'IMG_0873.JPG',
  'IMG_0874.JPG', 'IMG_1734.JPG', 'IMG_1767.JPG', 'IMG_1769.JPG', 'IMG_1770.JPG',
  'IMG_1773.JPG', 'IMG_1843.JPG', 'IMG_1863.JPG', 'IMG_2329.JPG', 'IMG_2360.JPG',
  'IMG_2453.JPG', 'IMG_2454.JPG', 'IMG_2458.JPG', 'IMG_3067.JPG', 'IMG_3070.JPG',
  'IMG_3072.JPG', 'IMG_3075.JPG', 'IMG_3200.JPG', 'IMG_3201.JPG', 'IMG_3204.JPG',
  'IMG_3210.JPG', 'IMG_3393.JPG', 'IMG_3397.JPG', 'IMG_3402.JPG', 'IMG_3403.JPG',
  'IMG_3588.JPG', 'IMG_3950.JPG', 'IMG_4647.JPG', 'IMG_4805.JPG', 'IMG_4901.JPG',
  'IMG_4902.JPG', 'IMG_4965.JPG', 'IMG_5264.JPG', 'IMG_5265.JPG', 'IMG_5512.JPG',
  'IMG_5527.JPG', 'IMG_5567.JPG', 'IMG_5571.JPG', 'IMG_5572.JPG', 'IMG_6603.JPG',
  'IMG_6838.JPG', 'IMG_7347.JPG', 'IMG_7349.JPG', '_IDO0588.JPG', '_IDO0671.jpg-1.JPG',
  '_IDO0705.JPG', '_KAY8234.jpg', '_KAY8275.jpg',
] as const;

const IMAGE_ARRAYS = {
  'Brands': [...BRAND_IMAGE_FILES.map((fileName) => `s3://gidophotography-images/website-media/brands/${fileName}`)],
  'Wedding': [
    ...WEDDING_IMAGE_FILES.map((fileName) => `s3://gidophotography-images/website-media/wedding/${fileName}`),
  ],
  'Birthdays': [...BIRTHDAY_IMAGE_FILES.map((fileName) => `s3://gidophotography-images/website-media/birthday/${fileName}`)],
  'Portraits': [...PORTRAIT_IMAGE_FILES.map((fileName) => `s3://gidophotography-images/website-media/portraits/${fileName}`)],
  'Graduations': [
    's3://gidophotography-images/website-media/graduation/HS3A9713.JPG',
    's3://gidophotography-images/website-media/graduation/IMG_9216.JPG',
    's3://gidophotography-images/website-media/graduation/KAYY3522.JPG',
    's3://gidophotography-images/website-media/graduation/GIDO3267.JPG',
    's3://gidophotography-images/website-media/graduation/GIDO0406.JPG',
    's3://gidophotography-images/website-media/graduation/IMG_9186.JPG',
    's3://gidophotography-images/website-media/graduation/GIDO0253.JPG',
    's3://gidophotography-images/website-media/graduation/TWIN0332.JPG',
    's3://gidophotography-images/website-media/graduation/GIDO3471.JPG',
    's3://gidophotography-images/website-media/graduation/GIDO02590.JPG',
    's3://gidophotography-images/website-media/graduation/IMG_8838.JPG',
    's3://gidophotography-images/website-media/graduation/IMG_0459.JPG',
    's3://gidophotography-images/website-media/graduation/IMG_7696.JPG',
    's3://gidophotography-images/website-media/graduation/GIDO04654.JPG',
    's3://gidophotography-images/website-media/graduation/IMG_7301.JPG',
    's3://gidophotography-images/website-media/graduation/TWIN0387.JPG',
    's3://gidophotography-images/website-media/graduation/IMG_3783.JPG',
    's3://gidophotography-images/website-media/graduation/IMG_9252.JPG',
    's3://gidophotography-images/website-media/graduation/GIDO0965.JPG',
    's3://gidophotography-images/website-media/graduation/IMG_8879.JPG',
    's3://gidophotography-images/website-media/graduation/IMG_8882.JPG',
    's3://gidophotography-images/website-media/graduation/IMG_0458.JPG',
    's3://gidophotography-images/website-media/graduation/GIDO0068.JPG',
    's3://gidophotography-images/website-media/graduation/GIDO8750.JPG',
    's3://gidophotography-images/website-media/graduation/IMG_7298.JPG',
    's3://gidophotography-images/website-media/graduation/IMG_7702.JPG',
    's3://gidophotography-images/website-media/graduation/GIDO1423.JPG',
    's3://gidophotography-images/website-media/graduation/GIDO8831.JPG',
    's3://gidophotography-images/website-media/graduation/IMG_3752.JPG',
    's3://gidophotography-images/website-media/graduation/HS3A9210.JPG',
    's3://gidophotography-images/website-media/graduation/GIDO0275.JPG',
    's3://gidophotography-images/website-media/graduation/GIDO3479.JPG',
    's3://gidophotography-images/website-media/graduation/GIDO0363.JPG',
    's3://gidophotography-images/website-media/graduation/GIDO3412.JPG',
    's3://gidophotography-images/website-media/graduation/KAYY3542.JPG',
    's3://gidophotography-images/website-media/graduation/GIDO6091.JPG',
    's3://gidophotography-images/website-media/graduation/IMG_3753.JPG',
    's3://gidophotography-images/website-media/graduation/IMG_9211.JPG',
    's3://gidophotography-images/website-media/graduation/IMG_8835.JPG',
    's3://gidophotography-images/website-media/graduation/GIDO9629.JPG',
    's3://gidophotography-images/website-media/graduation/GIDO0462.JPG',
    's3://gidophotography-images/website-media/graduation/IMG_9218.JPG',
    's3://gidophotography-images/website-media/graduation/IMG_7303.JPG',
    's3://gidophotography-images/website-media/graduation/IMG_9170.JPG',
    's3://gidophotography-images/website-media/graduation/TWIN0397.JPG',
    's3://gidophotography-images/website-media/graduation/GIDO3335.JPG',
    's3://gidophotography-images/website-media/graduation/HS3A9331.JPG',
    's3://gidophotography-images/website-media/graduation/IMG_4261.JPG',
    's3://gidophotography-images/website-media/graduation/GIDO0003%202.JPG',
    's3://gidophotography-images/website-media/graduation/IMG_8884.JPG',
    's3://gidophotography-images/website-media/graduation/GIDO9638.JPG',
    's3://gidophotography-images/website-media/graduation/GIDO3554.JPG',
    's3://gidophotography-images/website-media/graduation/GIDO3431.JPG',
    's3://gidophotography-images/website-media/graduation/IMG_9174.JPG',
    's3://gidophotography-images/website-media/graduation/IMG_8839.JPG',
  ],
  'Studio': [...STUDIO_IMAGE_FILES.map((fileName) => `s3://gidophotography-images/website-media/studio/${fileName}`)],
} as const;

function resolveImageSrc(src: string) {
  if (!src.startsWith('s3://')) return src;
  const s3Path = src.replace(/^s3:\/\/[^/]+\//, '');
  return `${S3_BUCKET_HTTP_BASE}/${s3Path.split('/').map(encodeURIComponent).join('/')}`;
}

export default function AboutUs() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('Wedding');
  const [visibleCount, setVisibleCount] = useState(16);
  const currentImages = useMemo(
    () => IMAGE_ARRAYS[activeFilter as keyof typeof IMAGE_ARRAYS] || [],
    [activeFilter]
  );
  const visibleImages = useMemo(
    () => currentImages.slice(0, visibleCount),
    [currentImages, visibleCount]
  );

  useEffect(() => {
    setVisibleCount(16);
  }, [activeFilter]);

  return (
    <div className="min-h-screen bg-white dark:bg-black relative overflow-hidden">
      <Navigation />
      <FloatingElements />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 sm:px-8 lg:px-12 min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/GIDO9183.JPG"
            alt="About Us"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60 dark:bg-black/70"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <ScrollAnimation animationType="zoom">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 relative inline-block">
              <span className="relative z-10">About Us</span>
              <span className="absolute -inset-4 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 blur-2xl animate-pulse"></span>
            </h1>
          </ScrollAnimation>
          <ScrollAnimation animationType="fade-up" delay={200}>
            <p className="text-lg text-gray-200">
              Get to know the story behind Gido Photography
            </p>
          </ScrollAnimation>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-6 sm:px-8 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
            <ScrollAnimation animationType="fade-left">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white mb-6 relative inline-block">
                  <span className="relative z-10">Our Story</span>
                  <span className="absolute -bottom-2 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-30 animate-pulse"></span>
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed transform hover:translate-x-2 transition-transform duration-300">
                  With over a decade of experience in professional photography, Gido Photography 
                  specializes in capturing authentic moments that tell your unique story. Our 
                  approach combines technical excellence with artistic vision to create timeless images.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed transform hover:translate-x-2 transition-transform duration-300">
                  Founded with a passion for preserving life&apos;s most precious moments, we believe 
                  that every photograph should tell a story. Whether it&apos;s a wedding, portrait 
                  session, or special event, we bring dedication and attention to detail to every shoot.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed transform hover:translate-x-2 transition-transform duration-300">
                  Our mission is to create beautiful, meaningful photographs that you&apos;ll treasure 
                  for a lifetime. We work closely with each client to understand their vision and bring 
                  it to life through our lens.
                </p>
              </div>
            </ScrollAnimation>
            <ScrollAnimation animationType="fade-right">
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl group transform hover:scale-105 transition-all duration-500">
                <Image 
                  src="/images/team.JPG" 
                  alt="Team Photo" 
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 border-4 border-white/0 group-hover:border-white/30 rounded-2xl transition-all duration-500"></div>
              </div>
            </ScrollAnimation>
          </div>

          {/* Image Gallery Grid */}
          <div className="mb-24">
            <ScrollAnimation animationType="fade-up">
              {/* Filter Buttons */}
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                {FILTERS.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`text-base md:text-lg font-medium transition-colors duration-300 pb-2 relative ${
                      activeFilter === filter
                        ? 'text-black dark:text-white'
                        : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    {filter}
                    {activeFilter === filter && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black dark:bg-white"></span>
                    )}
                  </button>
                ))}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {visibleImages.map((imageSrc, index) => (
                  <div
                    key={index}
                    className="relative aspect-square overflow-hidden group cursor-pointer"
                    onClick={() => {
                      const params = new URLSearchParams({
                        images: JSON.stringify(currentImages),
                        index: index.toString(),
                        title: `${activeFilter} ${index + 1}`,
                      });
                      router.push(`/preview?${params.toString()}`);
                    }}
                  >
                    <Image
                      src={resolveImageSrc(imageSrc)}
                      alt={`${activeFilter} image ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                      <svg className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
              {visibleCount < currentImages.length && (
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 16)}
                    className="px-5 py-2.5 rounded-md border border-gray-300 dark:border-gray-700 text-sm md:text-base text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white transition-colors duration-300"
                  >
                    Load more
                  </button>
                </div>
              )}
            </ScrollAnimation>
          </div>

          {/* Stats Section */}
          <div className="mb-24">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20 rounded-3xl -z-10"></div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 p-6 md:p-8">
                {[
                  { value: '10+', label: 'Years Experience' },
                  { value: '500+', label: 'Happy Clients' },
                  { value: '2k+', label: 'Photos Captured' },
                  { value: '50+', label: 'Events Covered' },
                ].map((stat, index) => (
                  <ScrollAnimation 
                    key={index}
                    animationType="zoom"
                    delay={index * 150}
                  >
                    <div className="text-center group cursor-default">
                      <div className="relative inline-block mb-3">
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-900 via-yellow-900 to-amber-800 rounded-xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
                        <div className="relative bg-gradient-to-br from-amber-900 via-yellow-900 to-amber-800 text-white px-4 py-3 rounded-xl shadow-xl transform group-hover:scale-105 group-hover:rotate-1 transition-all duration-300 ring-1 ring-amber-700/50 group-hover:ring-amber-600/70">
                          <div className="text-2xl md:text-3xl font-bold drop-shadow-md">{stat.value}</div>
                        </div>
                      </div>
                      
                      <div className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white transition-colors duration-300">
                        {stat.label}
                      </div>
                      
                      <div className="mt-2 mx-auto w-10 h-0.5 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent group-hover:via-purple-500 transition-colors duration-300"></div>
                    </div>
                  </ScrollAnimation>
                ))}
              </div>
            </div>
          </div>

          {/* Video Section */}
          <div className="mb-24 relative w-full">
            <ScrollAnimation animationType="zoom">
              <div className="w-full rounded-2xl overflow-hidden shadow-2xl bg-black">
                <video 
                  className="w-full h-[500px]"
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src="https://gidophotography-images.s3.us-east-1.amazonaws.com/website-media/video/gido_video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>


      <Footer />
    </div>
  );
}