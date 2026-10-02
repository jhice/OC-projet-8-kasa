/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://s3-eu-west-1.amazonaws.com/**')],
  },
};

export default nextConfig;
