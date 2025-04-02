'use client';

import React from 'react';
import Image from 'next/image';
import Modal from './Modal';
import { GameResult } from './CardGame';

interface GameHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  history: GameResult[];
}

// Get card background color based on rarity
const getCardBgColor = (rarity: string) => {
  switch (rarity) {
    case 'legendary':
      return 'bg-gradient-to-br from-orange-400/20 to-orange-600/20';
    case 'epic':
      return 'bg-gradient-to-br from-purple-400/20 to-purple-600/20';
    case 'rare':
      return 'bg-gradient-to-br from-blue-400/20 to-blue-600/20';
    case 'uncommon':
      return 'bg-gradient-to-br from-green-400/20 to-green-600/20';
    default:
      return 'bg-gradient-to-br from-gray-400/20 to-gray-600/20';
  }
};

const GameHistory: React.FC<GameHistoryProps> = ({ isOpen, onClose, history }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Game History"
    >
      <div className="space-y-4">
        {history.length === 0 ? (
          <p className="text-gray-400 text-center">No game history yet</p>
        ) : (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            {history.map((result, index) => (
              <div key={index} className="bg-gray-800/50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">Game #{history.length - index}</span>
                  <span className={`text-sm font-bold ${result.winAmount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {result.winAmount > 0 ? '+' : ''}{result.winAmount}
                  </span>
                </div>
                <div className="flex gap-2">
                  {result.cards.map((card, cardIndex) => (
                    <div 
                      key={cardIndex}
                      className={`w-12 h-16 rounded-lg flex items-center justify-center ${getCardBgColor(card.rarity)}`}
                    >
                      <Image 
                        src={`/icons/${card.symbol}.svg`} 
                        alt={card.name} 
                        width={32}
                        height={32}
                        className="w-8 h-8" 
                      />
                    </div>
                  ))}
                </div>
                <div className="text-xs text-gray-400">
                  {result.rewardLevel.description} ({result.rewardLevel.multiplier}x)
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default GameHistory; 