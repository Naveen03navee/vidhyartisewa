/** @type {import('next').NextConfig} */
const nextConfig = {
 
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co', // This allows images from your Supabase project
      },
    ],
  },
  trailingSlash: true,
};

export default nextConfig;
