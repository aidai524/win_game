'use client';

import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import SpinningWheel from './SpinningWheel';
import BetAmount from './BetAmount';
import GameHistory from './GameHistory';
import { v4 as uuidv4 } from 'uuid';

type Segment = {
  id: number;
  text: string;
  value: number;
  color: string;
};

type HistoryItem = {
  id: string;
  playerAddress: string;
  result: string;
  winAmount: number;
  timestamp: Date;
};

const GameContainer: React.FC = () => {
  const { connected, publicKey } = useWallet();
  const [betAmount, setBetAmount] = useState<number>(0.1);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [mounted, setMounted] = useState(false);

  // 确保只在客户端渲染组件
  useEffect(() => {
    setMounted(true);
  }, []);

  // 转盘分区定义
  const segments: Segment[] = [
    { id: 1, text: '2X', value: 2, color: '#FF6384' },
    { id: 2, text: '0X', value: 0, color: '#36A2EB' },
    { id: 3, text: '1.5X', value: 1.5, color: '#FFCE56' },
    { id: 4, text: '0X', value: 0, color: '#4BC0C0' },
    { id: 5, text: '3X', value: 3, color: '#9966FF' },
    { id: 6, text: '0.5X', value: 0.5, color: '#FF9F40' },
    { id: 7, text: '0X', value: 0, color: '#36A2EB' },
    { id: 8, text: '5X', value: 5, color: '#9966FF' },
  ];

  const handleBetChange = (amount: number) => {
    setBetAmount(amount);
  };

  const handleSpinStart = () => {
    if (!connected) {
      alert('请先连接钱包');
      return false;
    }
    setIsSpinning(true);
    return true;
  };

  const handleSpinComplete = (segment: Segment) => {
    setIsSpinning(false);
    
    if (connected && publicKey) {
      // 处理实际下注和结果逻辑
      const winAmount = segment.value * betAmount;
      
      // 添加到历史记录
      const newHistoryItem: HistoryItem = {
        id: uuidv4(),
        playerAddress: publicKey.toString(),
        result: segment.text,
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
            <h1 className="text-3xl font-bold text-white mb-2">幸运转盘游戏</h1>
            <p className="text-gray-300">连接钱包，下注SOL，赢取更多奖励！</p>
          </div>
          
          {/* 转盘组件 */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
            <SpinningWheel
              segments={segments}
              onSpinComplete={handleSpinComplete}
              onSpinStart={handleSpinStart}
            />
          </div>
        </div>
        
        <div className="md:w-1/3 space-y-6">
          {/* 下注金额组件 */}
          <BetAmount 
            onBetChange={handleBetChange} 
            disabled={isSpinning || !connected} 
          />
          
          {/* 历史记录组件 */}
          <GameHistory history={history} />
        </div>
      </div>
    </div>
  );
};

export default GameContainer; 