'use client';

import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import CardGame, { GameResult } from './CardGame';
import BetAmount from './BetAmount';
import dynamic from 'next/dynamic';

const GameContainerContent: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const wallet = useWallet();
  const [betAmount, setBetAmount] = useState<number>(0.1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Ensure component is only rendered on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Show loading state if not yet rendered on client
  if (!mounted) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center py-10">
          <p className="text-xl text-gray-400">Loading game...</p>
        </div>
      </div>
    );
  }

  // Only access wallet state after client-side rendering
  const { connected, publicKey } = wallet;

  const handleBetChange = (amount: number) => {
    setBetAmount(amount);
  };

  const handleGameStart = () => {
    if (!connected) {
      alert('Please connect your wallet first');
      return false;
    }
    setIsPlaying(true);
    return true;
  };

  const handleGameComplete = (result: GameResult) => {
    setIsPlaying(false);
    
    if (connected && publicKey) {
      // Process actual bet and result logic
      const winAmount = result.winAmount * betAmount;
      
      // Update the reward amount in game result
      result.winAmount = winAmount;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-full">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Lucky Card Game</h1>
            <p className="text-gray-300">Connect wallet, bet SOL, match cards to win rewards!</p>
          </div>
          
          {/* Card game component */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
            <CardGame
              onGameComplete={handleGameComplete}
              onGameStart={handleGameStart}
            />

            <BetAmount 
              onBetChange={handleBetChange} 
              disabled={isPlaying || !connected}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Dynamic import component, disable SSR
const GameContainer = dynamic(() => Promise.resolve(GameContainerContent), { ssr: false });

export default GameContainer; 