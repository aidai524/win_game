'use client';

import React, { useState } from 'react';
import GameHistory from './GameHistory';
import GameRules from './GameRules';

// 卡片类型定义
interface Card {
  name: string;
  symbol: string;
  rarity: Rarity;
  value: number;
  color: string;
}

// 奖励等级定义
export type RewardLevel = {
  level: string;
  description: string;
  multiplier: number;
  finalMultiplier: number;
};

export type CardRarity = "Legendary" | "Very Rare" | "Rare" | "Common";

interface CardGameProps {
  onGameComplete: (result: GameResult) => void;
  onGameStart?: () => boolean;
}

export type GameResult = {
  cards: Card[];
  rewardLevel: RewardLevel;
  winAmount: number;
};

// 定义稀有度类型
type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

// 定义稀有度对应的颜色
const RARITY_COLORS = {
  common: '#9e9e9e',     // 灰色（普通）
  uncommon: '#4caf50',   // 绿色（优秀）
  rare: '#2196f3',       // 蓝色（精良）
  epic: '#9c27b0',       // 紫色（史诗）
  legendary: '#ff9800'   // 橙色（传说）
};

// 定义每个符号可用的稀有度
const SYMBOL_RARITIES: Record<string, Rarity[]> = {
  crown: ['rare', 'epic', 'legendary'],
  diamond: ['uncommon', 'rare', 'epic'],
  coin: ['uncommon', 'rare', 'epic'],
  heart: ['uncommon', 'rare', 'epic'],
  clover: ['common', 'uncommon', 'rare'],
  star: ['common', 'uncommon', 'rare'],
  spade: ['common', 'uncommon', 'rare']
};

// 定义稀有度对应的奖励倍数
const RARITY_MULTIPLIERS: Record<Rarity, number> = {
  legendary: 5,    // 传说
  epic: 3,         // 史诗
  rare: 1.8,       // 精良
  uncommon: 1.2,   // 优秀
  common: 1        // 普通
};

// 定义稀有度的中文名称
const RARITY_NAMES: Record<Rarity, string> = {
  common: '普通',
  uncommon: '优秀',
  rare: '精良',
  epic: '史诗',
  legendary: '传说'
};

// 获取卡片背景颜色的函数
const getCardBgColor = (rarity: Rarity) => {
  switch (rarity) {
    case 'legendary':
      return 'bg-gradient-to-br from-orange-400 to-orange-600';
    case 'epic':
      return 'bg-gradient-to-br from-purple-400 to-purple-600';
    case 'rare':
      return 'bg-gradient-to-br from-blue-400 to-blue-600';
    case 'uncommon':
      return 'bg-gradient-to-br from-green-400 to-green-600';
    default:
      return 'bg-gradient-to-br from-gray-400 to-gray-600';
  }
};

// 生成指定符号的随机稀有度
const getRandomRarity = (symbol: string): Rarity => {
  const availableRarities = SYMBOL_RARITIES[symbol];
  const randomIndex = Math.floor(Math.random() * availableRarities.length);
  return availableRarities[randomIndex];
};

// 生成随机卡片
const generateRandomCard = (): Card => {
  const symbols = Object.keys(SYMBOL_RARITIES);
  const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
  const rarity = getRandomRarity(randomSymbol);
  
  return {
    symbol: randomSymbol,
    name: `${RARITY_NAMES[rarity]}的${randomSymbol}`,
    rarity: rarity,
    value: RARITY_MULTIPLIERS[rarity],
    color: RARITY_COLORS[rarity]
  };
};

// 奖励等级
const REWARD_LEVELS = [
  { level: '三连奖励', description: '三张相同卡片', multiplier: 1 },
  { level: '双连奖励', description: '两张相同卡片', multiplier: 0.5 },
  { level: '未中奖', description: '三张卡片都不同', multiplier: 0 },
];

export const CardGame: React.FC<CardGameProps> = ({ onGameComplete, onGameStart }) => {
  const [flipped, setFlipped] = useState<boolean[]>([false, false, false]);
  const [cards, setCards] = useState<Card[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [result, setResult] = useState<GameResult | null>(null);
  const [flippedCount, setFlippedCount] = useState(0);
  const [betAmount, setBetAmount] = useState(1);
  const [gameHistory, setGameHistory] = useState<GameResult[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // 开始新游戏
  const startNewGame = () => {
    if (betAmount <= 0) {
      alert('请输入有效的下注金额');
      return;
    }
    
    const newCards = Array(3).fill(null).map(() => generateRandomCard());
    setCards(newCards);
    setFlipped([false, false, false]);
    setResult(null);
    setFlippedCount(0);
    setIsPlaying(true);
    onGameStart?.();
  };

  // 分析游戏结果
  const analyzeResult = (selectedCards: Card[]) => {
    // 统计每个符号出现的次数
    const symbolCounts = selectedCards.reduce((counts, card) => {
      counts[card.symbol] = (counts[card.symbol] || 0) + 1;
      return counts;
    }, {} as Record<string, number>);

    // 找到最多重复的次数
    const maxCount = Math.max(...Object.values(symbolCounts));

    // 根据匹配情况返回奖励等级
    if (maxCount === 3) {
      // 三张相同时，奖励为 B × X × X × X
      const card = selectedCards[0]; // 三张相同，取第一张计算
      const rarityMultiplier = RARITY_MULTIPLIERS[card.rarity];
      return {
        ...REWARD_LEVELS[0],
        finalMultiplier: REWARD_LEVELS[0].multiplier * Math.pow(rarityMultiplier, 3)
      };
    } else if (maxCount === 2) {
      // 两张相同时，奖励为 B × X × X
      // 找出重复的卡片
      const [matchedSymbol] = Object.entries(symbolCounts).find(([, count]) => count === 2) || [];
      const matchedCard = selectedCards.find(card => card.symbol === matchedSymbol);
      if (matchedCard) {
        const rarityMultiplier = RARITY_MULTIPLIERS[matchedCard.rarity];
        return {
          ...REWARD_LEVELS[1],
          finalMultiplier: REWARD_LEVELS[1].multiplier * Math.pow(rarityMultiplier, 2)
        };
      }
    }
    
    // 三张都不同
    return {
      ...REWARD_LEVELS[2],
      finalMultiplier: 0
    };
  };

  // 处理卡片点击
  const handleCardClick = (index: number) => {
    if (!isPlaying || flipped[index] || flippedCount >= 3) return;

    const newFlipped = [...flipped];
    newFlipped[index] = true;
    setFlipped(newFlipped);
    setFlippedCount(prev => prev + 1);

    // 当翻开第三张卡片时，分析结果
    if (flippedCount === 2) {
      const rewardLevel = analyzeResult(cards);
      
      // 计算总价值（考虑每张卡片的稀有度价值和下注金额）
      const gameResult: GameResult = {
        cards: cards,
        rewardLevel,
        winAmount: betAmount * rewardLevel.finalMultiplier
      };

      // 延迟显示结果，给玩家时间看第三张卡
      setTimeout(() => {
        setResult(gameResult);
        setIsPlaying(false);
        setGameHistory(prev => [gameResult, ...prev]);
        onGameComplete?.(gameResult);
      }, 1000);
    }
  };

  // 渲染卡片（带翻转动画）
  const renderCard = (index: number) => {
    const isFlippedCard = flipped[index];
    const card = cards[index];

    return (
      <div className="w-32 h-44 md:w-40 md:h-56" key={`card-${index}`}>
        <div 
          className="card-container"
          onClick={() => handleCardClick(index)}
        >
          <div 
            className={`card ${isFlippedCard ? 'rotate-y-180' : ''}`}
          >
            {/* 卡片背面 */}
            <div 
              className="card-face bg-indigo-800 rounded-lg shadow-lg flex items-center justify-center cursor-pointer hover:bg-indigo-700 transition-colors"
            >
              <div className="absolute inset-2 border-2 border-dashed border-indigo-400 rounded-md"></div>
              <span className="text-4xl text-indigo-200">?</span>
            </div>

            {/* 卡片正面 - 只有在有卡片时才渲染 */}
            {card && (
              <div 
                className={`card-face card-front ${getCardBgColor(card.rarity)} rounded-lg shadow-lg overflow-hidden border-2`}
                style={{
                  borderColor: card.color
                }}
              >
                <div className="flex flex-col items-center justify-between h-full p-2">
                  <div className="text-xs font-bold text-white w-full text-center truncate">
                    {card.name}
                  </div>
                  
                  <div className="flex-grow flex items-center justify-center">
                    <img src={`/icons/${card.symbol}.svg`} alt={card.name} className="w-20 h-20 md:w-24 md:h-24" />
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
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-4">
      {/* 游戏控制区域 */}
      <div className="w-full flex flex-wrap justify-between items-center gap-4 mb-8">
        <GameRules />
        
        <div className="flex items-center gap-4">
          <button
            onClick={startNewGame}
            disabled={isPlaying}
            className={`px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-full shadow-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 ${isPlaying ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isPlaying ? '游戏进行中...' : '开始游戏'}
          </button>

          <button
            onClick={() => setShowHistory(true)}
            className="px-4 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors"
          >
            游戏记录
          </button>
        </div>
      </div>

      {/* 卡片区域 */}
      <div className="relative w-full bg-gray-800/50 rounded-xl p-8 mb-8">
        <div className="flex justify-center gap-6 my-8">
          {[0, 1, 2].map((index) => renderCard(index))}
        </div>

        {/* 游戏结果 */}
        {result && (
          <div className="mt-6 text-center p-4 bg-gray-900/50 rounded-lg">
            <h3 className="text-xl font-bold mb-2">{result.rewardLevel.level}</h3>
            <p className="text-gray-400">{result.rewardLevel.description}</p>
            <p className="text-lg font-bold text-indigo-400 mt-2">
              奖励倍数: x{result.rewardLevel.finalMultiplier.toFixed(3)}
            </p>
            <p className="text-2xl font-bold text-green-400 mt-2">
              获得奖励: {result.winAmount.toFixed(3)} SOL
            </p>
          </div>
        )}
      </div>

      {/* 游戏记录弹窗 */}
      <GameHistory
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        history={gameHistory}
      />
    </div>
  );
};

export default CardGame; 