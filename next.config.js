/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow unused imports in client components, helpful for wallet-adapter-react-ui styles import
  reactStrictMode: true,
  transpilePackages: ['@solana/wallet-adapter-react', '@solana/wallet-adapter-react-ui', '@solana/wallet-adapter-base'],
};

module.exports = nextConfig; 