'use client';

import GameContainer from '@/components/GameContainer';
import WalletConnect from '@/components/WalletConnect';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto p-4">
        <header className="py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-yellow-400">SOL Game</h1>
            <p className="text-gray-400">Lucky Card Game</p>
          </div>
          <WalletConnect />
        </header>
        
        <GameContainer />
        
        <footer className="mt-20 py-8 border-t border-gray-800 text-center text-gray-500">
          <p>© {new Date().getFullYear()} SOL Game. All rights reserved.</p>
          <p className="mt-2">Note: This game involves randomness. Please play responsibly.</p>
        </footer>
      </div>
    </main>
  );
}
