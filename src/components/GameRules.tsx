'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Modal from './Modal';

const GameRules: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <button
        onClick={handleOpen}
        className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium rounded-full hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
      >
        Game Rules
      </button>

      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title="Game Rules Guide"
      >
        <div className="text-sm text-gray-300 space-y-6">
          <div>
            <h3 className="font-bold text-white mb-2">Game Rules</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Click &ldquo;Start Game&rdquo; button to begin a round</li>
              <li>Click cards to flip them, three cards per round</li>
              <li>Three matching cards = Base reward 1x</li>
              <li>Two matching cards = Base reward 0.5x</li>
              <li>Three different cards = No reward (0x)</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-2">Reward Combinations</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Crown combinations */}
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h4 className="text-orange-400 font-bold mb-2">Crown Combinations</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Image 
                        src="/icons/crown.svg" 
                        alt="Legendary Crown" 
                        width={32}
                        height={32}
                        className="w-8 h-8 bg-orange-400/20 rounded p-1" 
                      />
                      <span>×3</span>
                    </div>
                    <span className="text-orange-400">125x</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Image 
                        src="/icons/crown.svg" 
                        alt="Epic Crown" 
                        width={32}
                        height={32}
                        className="w-8 h-8 bg-purple-400/20 rounded p-1" 
                      />
                      <span>×3</span>
                    </div>
                    <span className="text-purple-400">27x</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Image 
                        src="/icons/crown.svg" 
                        alt="Rare Crown" 
                        width={32}
                        height={32}
                        className="w-8 h-8 bg-blue-400/20 rounded p-1" 
                      />
                      <span>×3</span>
                    </div>
                    <span className="text-blue-400">5.832x</span>
                  </div>
                </div>
              </div>

              {/* Diamond combinations */}
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h4 className="text-purple-400 font-bold mb-2">Diamond Combinations</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Image 
                        src="/icons/diamond.svg" 
                        alt="Epic Diamond" 
                        width={32}
                        height={32}
                        className="w-8 h-8 bg-purple-400/20 rounded p-1" 
                      />
                      <span>×3</span>
                    </div>
                    <span className="text-purple-400">27x</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Image 
                        src="/icons/diamond.svg" 
                        alt="Rare Diamond" 
                        width={32}
                        height={32}
                        className="w-8 h-8 bg-blue-400/20 rounded p-1" 
                      />
                      <span>×3</span>
                    </div>
                    <span className="text-blue-400">5.832x</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Image 
                        src="/icons/diamond.svg" 
                        alt="Uncommon Diamond" 
                        width={32}
                        height={32}
                        className="w-8 h-8 bg-green-400/20 rounded p-1" 
                      />
                      <span>×3</span>
                    </div>
                    <span className="text-green-400">1.728x</span>
                  </div>
                </div>
              </div>

              {/* Common card combinations */}
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h4 className="text-blue-400 font-bold mb-2">Common Card Combinations</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Image 
                        src="/icons/star.svg" 
                        alt="Rare Star" 
                        width={32}
                        height={32}
                        className="w-8 h-8 bg-blue-400/20 rounded p-1" 
                      />
                      <span>×3</span>
                    </div>
                    <span className="text-blue-400">5.832x</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Image 
                        src="/icons/star.svg" 
                        alt="Uncommon Star" 
                        width={32}
                        height={32}
                        className="w-8 h-8 bg-green-400/20 rounded p-1" 
                      />
                      <span>×3</span>
                    </div>
                    <span className="text-green-400">1.728x</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Image 
                        src="/icons/star.svg" 
                        alt="Common Star" 
                        width={32}
                        height={32}
                        className="w-8 h-8 bg-gray-400/20 rounded p-1" 
                      />
                      <span>×3</span>
                    </div>
                    <span className="text-gray-400">1x</span>
                  </div>
                </div>
              </div>

              {/* Pair matching explanation */}
              <div className="bg-gray-800/50 p-4 rounded-lg md:col-span-3">
                <h4 className="text-white font-bold mb-2">Pair Matching Rewards</h4>
                <p className="text-gray-400 mb-4">Reward for two matching cards: 0.5 × (Card Rarity)²</p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Legendary pair */}
                  <div className="bg-gray-900/50 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-orange-400">Legendary Pair</span>
                      <span className="text-orange-400 font-bold">12.5x</span>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-12 h-16 bg-orange-400/20 rounded-lg flex items-center justify-center">
                        <Image 
                          src="/icons/crown.svg" 
                          alt="Legendary Crown" 
                          width={32}
                          height={32}
                        />
                      </div>
                      <div className="w-12 h-16 bg-orange-400/20 rounded-lg flex items-center justify-center">
                        <Image 
                          src="/icons/crown.svg" 
                          alt="Legendary Crown" 
                          width={32}
                          height={32}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Epic pair */}
                  <div className="bg-gray-900/50 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-purple-400">Epic Pair</span>
                      <span className="text-purple-400 font-bold">4.5x</span>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-12 h-16 bg-purple-400/20 rounded-lg flex items-center justify-center">
                        <Image 
                          src="/icons/diamond.svg" 
                          alt="Epic Diamond" 
                          width={32}
                          height={32}
                        />
                      </div>
                      <div className="w-12 h-16 bg-purple-400/20 rounded-lg flex items-center justify-center">
                        <Image 
                          src="/icons/diamond.svg" 
                          alt="Epic Diamond" 
                          width={32}
                          height={32}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Rare pair */}
                  <div className="bg-gray-900/50 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-blue-400">Rare Pair</span>
                      <span className="text-blue-400 font-bold">1.62x</span>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-12 h-16 bg-blue-400/20 rounded-lg flex items-center justify-center">
                        <Image 
                          src="/icons/coin.svg" 
                          alt="Rare Coin" 
                          width={32}
                          height={32}
                        />
                      </div>
                      <div className="w-12 h-16 bg-blue-400/20 rounded-lg flex items-center justify-center">
                        <Image 
                          src="/icons/coin.svg" 
                          alt="Rare Coin" 
                          width={32}
                          height={32}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Uncommon pair */}
                  <div className="bg-gray-900/50 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-green-400">Uncommon Pair</span>
                      <span className="text-green-400 font-bold">0.72x</span>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-12 h-16 bg-green-400/20 rounded-lg flex items-center justify-center">
                        <Image 
                          src="/icons/heart.svg" 
                          alt="Uncommon Heart" 
                          width={32}
                          height={32}
                        />
                      </div>
                      <div className="w-12 h-16 bg-green-400/20 rounded-lg flex items-center justify-center">
                        <Image 
                          src="/icons/heart.svg" 
                          alt="Uncommon Heart" 
                          width={32}
                          height={32}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white mb-2">Card Rarities</h3>
            <ul className="list-disc list-inside space-y-1">
              <li><span className="text-orange-400">Legendary</span>: Crown exclusive rarity, single value 5x</li>
              <li><span className="text-purple-400">Epic</span>: Available for Crown, Diamond, Coin, Heart, single value 3x</li>
              <li><span className="text-blue-400">Rare</span>: Available for all cards, single value 1.8x</li>
              <li><span className="text-green-400">Uncommon</span>: Available for all except Crown, single value 1.2x</li>
              <li><span className="text-gray-400">Common</span>: Only for Clover, Star, Spade, single value 1x</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-2">Special Card Information</h3>
            <ul className="list-disc list-inside space-y-1">
              <li><span className="font-semibold">Crown</span>: Rare → Epic → Legendary</li>
              <li><span className="font-semibold">Diamond/Coin/Heart</span>: Uncommon → Rare → Epic</li>
              <li><span className="font-semibold">Clover/Star/Spade</span>: Common → Uncommon → Rare</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-2">Reward Calculation</h3>
            <ul className="list-disc list-inside space-y-1 text-xs text-gray-400">
              <li>Base Reward(B): Three matching=1x, Two matching=0.5x, Different=0x</li>
              <li>Rarity Reward(X): Legendary=5x, Epic=3x, Rare=1.8x, Uncommon=1.2x, Common=1x</li>
              <li>Two matching cards: Final Reward = B × X × X × Bet Amount</li>
              <li>Three matching cards: Final Reward = B × X × X × X × Bet Amount</li>
              <li>Reward Range: 0.5x ~ 125x bet amount</li>
            </ul>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default GameRules; 