'use client';

import React, { FC, useState, useEffect } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import dynamic from 'next/dynamic';

// Import default wallet styles
import '@solana/wallet-adapter-react-ui/styles.css';

const WalletConnectContent: FC = () => {
  const [mounted, setMounted] = useState(false);

  // Only show after client-side rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  // Return placeholder to avoid server rendering mismatch
  if (!mounted) {
    return (
      <div className="flex flex-col items-center gap-2">
        <button 
          className="px-6 py-2 rounded-md bg-gray-700 text-white cursor-not-allowed"
          disabled
        >
          Loading wallet...
        </button>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col items-center gap-2">
      <WalletMultiButton className="!bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700" />
    </div>
  );
};

// Dynamic import component, disable SSR
const WalletConnect = dynamic(() => Promise.resolve(WalletConnectContent), { ssr: false });

export default WalletConnect; 