'use client';

import React, { useState } from 'react';

// 卡片类型定义
export type Card = {
  id: number;
  name: string;
  symbol: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
  value: number;
  color: string;
};

// 奖励等级定义
export type RewardLevel = {
  level: string;
  description: string;
  multiplier: number;
};

interface CardGameProps {
  onGameComplete: (result: GameResult) => void;
  onGameStart?: () => boolean;
}

export type GameResult = {
  cards: Card[];
  rewardLevel: RewardLevel;
  winAmount: number;
};

// 卡片数据
const CARDS: Card[] = [
  { id: 1, name: '钻石', symbol: '💎', rarity: 'legendary', value: 5, color: '#9c54d5' },
  { id: 2, name: '金币', symbol: '🪙', rarity: 'rare', value: 3, color: '#e6b422' },
  { id: 3, name: '星星', symbol: '⭐', rarity: 'uncommon', value: 2, color: '#39a0ed' },
  { id: 4, name: '月亮', symbol: '🌙', rarity: 'common', value: 1, color: '#718096' },
  { id: 5, name: '太阳', symbol: '☀️', rarity: 'uncommon', value: 2, color: '#f6ad55' },
  { id: 6, name: '地球', symbol: '🌍', rarity: 'rare', value: 3, color: '#38b2ac' },
];

// 奖励等级
const REWARD_LEVELS: RewardLevel[] = [
  { level: '大奖', description: '三张卡片完全相同', multiplier: 5 },
  { level: '二等奖', description: '两张卡片相同', multiplier: 2 },
  { level: '未中奖', description: '三张卡片都不同', multiplier: 0 },
];

const CardGame: React.FC<CardGameProps> = ({ onGameComplete, onGameStart }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<boolean[]>([false, false, false]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [result, setResult] = useState<GameResult | null>(null);

  // 重置游戏状态
  const resetGame = () => {
    setCards([]);
    setFlipped([false, false, false]);
    setResult(null);
  };

  // 随机选择卡片
  const selectRandomCards = (): Card[] => {
    const selectedCards: Card[] = [];
    
    // 随机选择三张卡片
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * CARDS.length);
      selectedCards.push(CARDS[randomIndex]);
    }
    
    return selectedCards;
  };

  // 分析结果
  const analyzeResult = (selectedCards: Card[]): RewardLevel => {
    // 计算卡片ID出现的次数
    const cardCounts = selectedCards.reduce((acc, card) => {
      acc[card.id] = (acc[card.id] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);
    
    // 找出出现最多次的卡片ID及其出现次数
    const maxCount = Math.max(...Object.values(cardCounts));
    
    // 根据最大出现次数确定奖励等级
    if (maxCount === 3) {
      // 三张相同 - 大奖
      return REWARD_LEVELS[0];
    } else if (maxCount === 2) {
      // 两张相同 - 二等奖
      return REWARD_LEVELS[1];
    } else {
      // 三张都不同 - 未中奖
      return REWARD_LEVELS[2];
    }
  };

  // 开始游戏
  const startGame = () => {
    // 如果有onGameStart回调且返回false，则不开始游戏
    if (onGameStart && !onGameStart()) {
      return;
    }

    resetGame();
    setIsPlaying(true);
    
    // 选择随机卡片
    const selectedCards = selectRandomCards();
    setCards(selectedCards);
    
    // 模拟翻牌动画
    setTimeout(() => setFlipped([true, false, false]), 500);
    setTimeout(() => setFlipped([true, true, false]), 1000);
    setTimeout(() => setFlipped([true, true, true]), 1500);
    
    // 游戏结束后计算结果
    setTimeout(() => {
      const rewardLevel = analyzeResult(selectedCards);
      
      // 计算总价值
      const totalValue = selectedCards.reduce((sum, card) => sum + card.value, 0);
      
      // 根据奖励等级计算最终奖励
      const gameResult: GameResult = {
        cards: selectedCards,
        rewardLevel,
        winAmount: totalValue * rewardLevel.multiplier,
      };
      
      setResult(gameResult);
      setIsPlaying(false);
      onGameComplete(gameResult);
    }, 2000);
  };

  // 渲染卡片（带翻转动画）
  const renderCard = (index: number) => {
    const isFlippedCard = flipped[index];
    const card = cards[index];

    return (
      <div className="card-container" key={`card-${index}`}>
        <div 
          className={`card ${isFlippedCard ? 'flipped' : ''}`}
          style={{
            transformStyle: 'preserve-3d',
            transition: 'transform 0.6s',
            transform: isFlippedCard ? 'rotateY(180deg)' : 'rotateY(0deg)',
            position: 'relative',
            width: '100%',
            height: '100%',
          }}
        >
          {/* 卡片背面 */}
          <div 
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
            }}
            className="w-24 h-32 md:w-32 md:h-44 bg-indigo-800 rounded-lg shadow-lg flex items-center justify-center cursor-not-allowed"
          >
            <div className="absolute inset-2 border-2 border-dashed border-indigo-400 rounded-md"></div>
            <span className="text-4xl text-indigo-200">?</span>
          </div>

          {/* 卡片正面 - 只有在有卡片时才渲染 */}
          {card && (
            <div 
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                borderColor: card.color
              }}
              className={`w-24 h-32 md:w-32 md:h-44 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-lg overflow-hidden border-2`}
            >
              <div className="flex flex-col items-center justify-between h-full p-2">
                <div className="text-xs font-bold text-white w-full text-center truncate">
                  {card.name}
                </div>
                
                <div className="flex-grow flex items-center justify-center">
                  <span className="text-5xl md:text-6xl">{card.symbol}</span>
                </div>
                
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs bg-black/30 px-1 rounded text-white">{card.rarity}</span>
                  <span className="text-xs bg-yellow-500 text-black px-1 rounded">x{card.value}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center">
      {/* 卡片区域 */}
      <div className="relative w-full">
        <div className="flex justify-center gap-4 my-8">
          {[0, 1, 2].map((index) => (
            <div className="w-24 h-32 md:w-32 md:h-44" key={`wrapper-${index}`}>
              {renderCard(index)}
            </div>
          ))}
        </div>
      </div>

      {/* 结果显示区域 */}
      {result && (
        <div className="mt-4 p-4 bg-gray-800/80 rounded-lg text-center max-w-md">
          <h3 className={`text-xl font-bold ${result.rewardLevel.multiplier > 0 ? 'text-yellow-400' : 'text-gray-400'}`}>
            {result.rewardLevel.level}！
          </h3>
          <p className="text-gray-300 text-sm mt-1">
            {result.rewardLevel.description}
          </p>
          {result.rewardLevel.multiplier > 0 && (
            <p className="text-green-400 font-bold mt-2">
              赢得 {result.winAmount.toFixed(2)} SOL
            </p>
          )}
        </div>
      )}

      {/* 开始按钮 */}
      <button
        onClick={startGame}
        disabled={isPlaying}
        className={`mt-8 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-full shadow-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 ${isPlaying ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isPlaying ? '游戏中...' : '开始游戏'}
      </button>
    </div>
  );
};

export default CardGame; 