/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Enables Static Export
  output: 'export', 
  
  // 2. Disables the default Image Optimization API 
  // (Required for static export unless using an external provider)
  images: {
    unoptimized: true,
  },

  // Optional: If you use trailing slashes in your URLs
  // trailingSlash: true, 
};

export default nextConfig;