'use client';

import React from 'react';
import Modal from './Modal';
import { GameResult } from './CardGame';

interface GameHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  history: GameResult[];
}

const GameHistory: React.FC<GameHistoryProps> = ({ isOpen, onClose, history }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="游戏记录"
    >
      <div className="space-y-4">
        {history.length === 0 ? (
          <p className="text-gray-400 text-center">暂无游戏记录</p>
        ) : (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            {history.map((result, index) => (
              <div key={index} className="bg-gray-800/50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">第 {history.length - index} 局</span>
                  <span className={`text-sm font-bold ${result.winAmount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {result.winAmount > 0 ? '+' : ''}{result.winAmount}
                  </span>
                </div>
                <div className="flex gap-2 mb-2">
                  {result.cards.map((card, cardIndex) => (
                    <div 
                      key={cardIndex}
                      className={`w-12 h-16 rounded-md flex items-center justify-center p-1`}
                      style={{
                        backgroundColor: card.color + '33' // 添加透明度
                      }}
                    >
                      <img 
                        src={`/icons/${card.symbol}.svg`}
                        alt={card.name}
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