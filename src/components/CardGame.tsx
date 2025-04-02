'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import GameHistory from './GameHistory';
import GameRules from './GameRules';

// Card type definition
interface Card {
  name: string;
  symbol: string;
  rarity: Rarity;
  value: number;
  color: string;
}

// Reward level definition
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

// Define rarity types
type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

// Define colors for each rarity
const RARITY_COLORS = {
  common: '#9e9e9e',     // Gray (Common)
  uncommon: '#4caf50',   // Green (Uncommon)
  rare: '#2196f3',       // Blue (Rare)
  epic: '#9c27b0',       // Purple (Epic)
  legendary: '#ff9800'   // Orange (Legendary)
};

// Define available rarities for each symbol
const SYMBOL_RARITIES: Record<string, Rarity[]> = {
  crown: ['rare', 'epic', 'legendary'],
  diamond: ['uncommon', 'rare', 'epic'],
  coin: ['uncommon', 'rare', 'epic'],
  heart: ['uncommon', 'rare', 'epic'],
  clover: ['common', 'uncommon', 'rare'],
  star: ['common', 'uncommon', 'rare'],
  spade: ['common', 'uncommon', 'rare']
};

// Define reward multipliers for each rarity
const RARITY_MULTIPLIERS: Record<Rarity, number> = {
  legendary: 5,    // Legendary
  epic: 3,         // Epic
  rare: 1.8,       // Rare
  uncommon: 1.2,   // Uncommon
  common: 1        // Common
};

// Define rarity names
const RARITY_NAMES: Record<Rarity, string> = {
  common: 'Common',
  uncommon: 'Uncommon',
  rare: 'Rare',
  epic: 'Epic',
  legendary: 'Legendary'
};

// Get card background color function
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

// Generate random rarity for a specified symbol
const getRandomRarity = (symbol: string): Rarity => {
  const availableRarities = SYMBOL_RARITIES[symbol];
  const randomIndex = Math.floor(Math.random() * availableRarities.length);
  return availableRarities[randomIndex];
};

// Generate random card
const generateRandomCard = (): Card => {
  const symbols = Object.keys(SYMBOL_RARITIES);
  const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
  const rarity = getRandomRarity(randomSymbol);
  
  return {
    symbol: randomSymbol,
    name: `${RARITY_NAMES[rarity]} ${randomSymbol}`,
    rarity: rarity,
    value: RARITY_MULTIPLIERS[rarity],
    color: RARITY_COLORS[rarity]
  };
};

// Reward levels
const REWARD_LEVELS = [
  { level: 'Triple Match', description: 'Three matching cards', multiplier: 1 },
  { level: 'Double Match', description: 'Two matching cards', multiplier: 0.5 },
  { level: 'No Match', description: 'All cards are different', multiplier: 0 },
];

export const CardGame: React.FC<CardGameProps> = ({ onGameComplete, onGameStart }) => {
  const [flipped, setFlipped] = useState<boolean[]>([false, false, false]);
  const [cards, setCards] = useState<Card[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [result, setResult] = useState<GameResult | null>(null);
  const [flippedCount, setFlippedCount] = useState(0);
  const [gameHistory, setGameHistory] = useState<GameResult[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // Start new game
  const startNewGame = () => {
    if (!onGameStart?.()) {
      return;
    }
    
    const newCards = Array(3).fill(null).map(() => generateRandomCard());
    setCards(newCards);
    setFlipped([false, false, false]);
    setResult(null);
    setFlippedCount(0);
    setIsPlaying(true);
  };

  // Analyze game result
  const analyzeResult = (selectedCards: Card[]) => {
    // Count occurrences of each symbol
    const symbolCounts = selectedCards.reduce((counts, card) => {
      counts[card.symbol] = (counts[card.symbol] || 0) + 1;
      return counts;
    }, {} as Record<string, number>);

    // Find the maximum count
    const maxCount = Math.max(...Object.values(symbolCounts));

    // Return reward level based on match situation
    if (maxCount === 3) {
      // Three matching cards, reward is B × X × X × X
      const card = selectedCards[0]; // Take the first card for calculation since all three are the same
      const rarityMultiplier = RARITY_MULTIPLIERS[card.rarity];
      return {
        ...REWARD_LEVELS[0],
        finalMultiplier: REWARD_LEVELS[0].multiplier * Math.pow(rarityMultiplier, 3)
      };
    } else if (maxCount === 2) {
      // Two matching cards, reward is B × X × X
      // Find the repeated card
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
    
    // All three cards are different
    return {
      ...REWARD_LEVELS[2],
      finalMultiplier: 0
    };
  };

  // Handle card click
  const handleCardClick = (index: number) => {
    if (!isPlaying || flipped[index] || flippedCount >= 3) return;

    const newFlipped = [...flipped];
    newFlipped[index] = true;
    setFlipped(newFlipped);
    setFlippedCount(prev => prev + 1);

    // When the third card is flipped, analyze the result
    if (flippedCount === 2) {
      const rewardLevel = analyzeResult(cards);
      
      // Calculate total value (considering each card's rarity value and bet amount)
      const gameResult: GameResult = {
        cards: cards,
        rewardLevel,
        winAmount: rewardLevel.finalMultiplier
      };

      // Delay showing result, give player time to see the third card
      setTimeout(() => {
        setResult(gameResult);
        setIsPlaying(false);
        setGameHistory(prev => [gameResult, ...prev]);
        onGameComplete?.(gameResult);
      }, 1000);
    }
  };

  // Render card (with flip animation)
  const renderCard = (index: number) => {
    const isFlippedCard = flipped[index];
    const card = cards[index];

    return (
      <div className="w-40 h-56 md:w-48 md:h-64" key={`card-${index}`}>
        <div 
          className="card-container"
          onClick={() => handleCardClick(index)}
        >
          <div 
            className={`card ${isFlippedCard ? 'rotate-y-180' : ''}`}
          >
            {/* Card back */}
            <div 
              className="card-face bg-indigo-800 rounded-lg shadow-lg flex items-center justify-center cursor-pointer hover:bg-indigo-700 transition-colors"
            >
              <div className="absolute inset-2 border-2 border-dashed border-indigo-400 rounded-md"></div>
              <span className="text-4xl text-indigo-200">?</span>
            </div>

            {/* Card front - Only render if there's a card */}
            {card && (
              <div 
                className={`card-face card-front ${getCardBgColor(card.rarity)} rounded-lg shadow-lg overflow-hidden border-2`}
                style={{
                  borderColor: card.color
                }}
              >
                <div className="flex flex-col items-center justify-between h-full p-3">
                  <div className="text-sm font-bold text-white w-full text-center truncate">
                    {card.name}
                  </div>
                  
                  <div className="flex-grow flex items-center justify-center">
                    <Image 
                      src={`/icons/${card.symbol}.svg`} 
                      alt={card.name} 
                      width={128}
                      height={128}
                      className="w-24 h-24 md:w-32 md:h-32"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between w-full">
                    <span className="text-sm bg-black/30 px-2 py-0.5 rounded text-white">{card.rarity}</span>
                    <span className="text-sm bg-yellow-500 text-black px-2 py-0.5 rounded">x{card.value}</span>
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
      {/* Game control area */}
      <div className="w-full flex flex-wrap justify-between items-center gap-4">
        <GameRules />
        
        <button
          onClick={() => setShowHistory(true)}
          className="px-4 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors"
        >
          Game History
        </button>
      </div>

      {/* Card area */}
      <div className="relative w-full bg-gray-800/50 rounded-xl px-8">
        <div className="flex justify-center gap-8 my-8">
          {[0, 1, 2].map((index) => renderCard(index))}
        </div>

        {/* Game result */}
        {result && (
          <div className="mt-6 text-center p-4 bg-gray-900/50 rounded-lg">
            <h3 className="text-xl font-bold mb-2">{result.rewardLevel.level}</h3>
            <p className="text-gray-400">{result.rewardLevel.description}</p>
            <p className="text-lg font-bold text-indigo-400 mt-2">
              Reward Multiplier: x{result.rewardLevel.finalMultiplier.toFixed(3)}
            </p>
            <p className="text-2xl font-bold text-green-400 mt-2">
              Reward Amount: {result.winAmount.toFixed(3)} SOL
            </p>
          </div>
        )}
        {/* Bet amount input */}
        <div className="flex flex-col items-center gap-4 mt-8">
          <button
            onClick={startNewGame}
            disabled={isPlaying}
            className={`px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-full shadow-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 ${isPlaying ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isPlaying ? 'Game in progress...' : 'Start Game'}
          </button>
        </div>

      </div>

      {/* Game record popup */}
      <GameHistory
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        history={gameHistory}
      />
    </div>
  );
};

export default CardGame; 