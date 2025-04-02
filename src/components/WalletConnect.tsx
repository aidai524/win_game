'use client';

import React, { FC, useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import dynamic from 'next/dynamic';

// 导入默认钱包样式
import '@solana/wallet-adapter-react-ui/styles.css';

const WalletConnectContent: FC = () => {
  const [mounted, setMounted] = useState(false);
  const wallet = useWallet();

  // 只在客户端渲染后显示
  useEffect(() => {
    setMounted(true);
  }, []);

  // 返回占位符，避免服务器渲染不匹配
  if (!mounted) {
    return (
      <div className="flex flex-col items-center gap-2">
        <button 
          className="px-6 py-2 rounded-md bg-gray-700 text-white cursor-not-allowed"
          disabled
        >
          加载钱包...
        </button>
      </div>
    );
  }

  // 只有在客户端渲染后才访问钱包状态
  const { connected, publicKey } = wallet;

  return (
    <div className="flex flex-col items-center gap-2">
      <WalletMultiButton className="!bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700" />
      {connected && publicKey && (
        <p className="text-sm text-gray-300">
          已连接: {publicKey.toString().slice(0, 4)}...{publicKey.toString().slice(-4)}
        </p>
      )}
    </div>
  );
};

// 动态导入组件，禁用SSR
const WalletConnect = dynamic(() => Promise.resolve(WalletConnectContent), { ssr: false });

export default WalletConnect; 