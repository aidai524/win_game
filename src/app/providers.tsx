'use client';

import React, { ReactNode, useMemo, useEffect, useState } from 'react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';

// 导入默认钱包样式
import '@solana/wallet-adapter-react-ui/styles.css';

export default function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  // 客户端挂载后才能使用钱包适配器
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // 网络可以是 'mainnet-beta', 'testnet', 'devnet', 'localnet'
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // 初始化可用钱包列表
  const wallets = useMemo(
    () => {
      if (typeof window === 'undefined') return [];
      return [
        new PhantomWalletAdapter(),
        new SolflareWalletAdapter(),
      ];
    },
    []
  );

  // 使用错误边界处理可能的钱包错误
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
} 