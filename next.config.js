/** @type {import('next').NextConfig} */
const nextConfig = {
  // 允许在客户端组件中使用未使用的导入，如样式导入
  // 这对解决wallet-adapter-react-ui样式导入很有帮助
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // 解决与crypto相关的问题
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        assert: require.resolve('assert'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        os: require.resolve('os-browserify'),
        buffer: require.resolve('buffer'),
      };
      config.resolve.alias = {
        ...config.resolve.alias,
        process: "process/browser"
      };
    }
    return config;
  },
  transpilePackages: ['@solana/wallet-adapter-react', '@solana/wallet-adapter-react-ui', '@solana/wallet-adapter-base'],
};

module.exports = nextConfig; 