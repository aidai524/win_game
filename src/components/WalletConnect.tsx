'use client';

import React, { FC, useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

// 导入默认钱包样式
import '@solana/wallet-adapter-react-ui/styles.css';

const WalletConnect: FC = () => {
  const { connected, publicKey } = useWallet();
  const [mounted, setMounted] = useState(false);

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

export default WalletConnect; 