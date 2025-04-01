'use client';

import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import CardGame, { GameResult } from './CardGame';
import BetAmount from './BetAmount';
import GameHistory from './GameHistory';
import GameRules from './GameRules';
import { v4 as uuidv4 } from 'uuid';
import dynamic from 'next/dynamic';

type HistoryItem = {
  id: string;
  playerAddress: string;
  result: string;
  winAmount: number;
  timestamp: Date;
};

const GameContainerContent: React.FC = () => {
  const { connected, publicKey } = useWallet();
  const [betAmount, setBetAmount] = useState<number>(0.1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [mounted, setMounted] = useState(false);

  // 确保只在客户端渲染组件
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleBetChange = (amount: number) => {
    setBetAmount(amount);
  };

  const handleGameStart = () => {
    if (!connected) {
      alert('请先连接钱包');
      return false;
    }
    setIsPlaying(true);
    return true;
  };

  const handleGameComplete = (result: GameResult) => {
    setIsPlaying(false);
    
    if (connected && publicKey) {
      // 处理实际下注和结果逻辑
      const winAmount = result.winAmount * betAmount;
      
      // 添加到历史记录
      const newHistoryItem: HistoryItem = {
        id: uuidv4(),
        playerAddress: publicKey.toString(),
        result: result.rewardLevel.level,
        winAmount: winAmount,
        timestamp: new Date(),
      };
      
      setHistory((prevHistory) => [newHistoryItem, ...prevHistory].slice(0, 10));
    }
  };

  // 如果还没在客户端渲染，使用加载状态
  if (!mounted) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center py-10">
          <p className="text-xl text-gray-400">加载游戏中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">幸运卡牌游戏</h1>
            <p className="text-gray-300">连接钱包，下注SOL，匹配卡牌赢取奖励！</p>
            <GameRules />
          </div>
          
          {/* 卡牌游戏组件 */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
            <CardGame
              onGameComplete={handleGameComplete}
              onGameStart={handleGameStart}
            />
          </div>
        </div>
        
        <div className="md:w-1/3 space-y-6">
          {/* 下注金额组件 */}
          <BetAmount 
            onBetChange={handleBetChange} 
            disabled={isPlaying || !connected} 
          />
          
          {/* 历史记录组件 */}
          <GameHistory history={history} />
        </div>
      </div>
    </div>
  );
};

// 动态导入组件，禁用SSR
const GameContainer = dynamic(() => Promise.resolve(GameContainerContent), { ssr: false });

export default GameContainer; 