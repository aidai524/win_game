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
            <p className="text-gray-400">幸运转盘游戏</p>
          </div>
          <WalletConnect />
        </header>
        
        <GameContainer />
        
        <footer className="mt-20 py-8 border-t border-gray-800 text-center text-gray-500">
          <p>© {new Date().getFullYear()} SOL Game. 版权所有。</p>
          <p className="mt-2">注意：游戏具有随机性，请理性游戏。</p>
        </footer>
      </div>
    </main>
  );
}
