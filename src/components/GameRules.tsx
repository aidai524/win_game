'use client';

import React, { useState } from 'react';
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
        游戏规则
      </button>

      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title="游戏规则说明"
      >
        <div className="text-sm text-gray-300 space-y-6">
          <div>
            <h3 className="font-bold text-white mb-2">游戏规则</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>点击&quot;开始游戏&quot;按钮开始一轮游戏</li>
              <li>点击卡片翻开，每局可翻开三张</li>
              <li>三张相同卡片 = 基础奖励1倍</li>
              <li>两张相同卡片 = 基础奖励0.5倍</li>
              <li>三张不同卡片 = 未中奖 (0倍)</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-2">奖励组合表</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* 皇冠组合 */}
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h4 className="text-orange-400 font-bold mb-2">皇冠组合</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <img src="/icons/crown.svg" alt="传说皇冠" className="w-8 h-8 bg-orange-400/20 rounded p-1" />
                      <span>×3</span>
                    </div>
                    <span className="text-orange-400">125倍</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <img src="/icons/crown.svg" alt="史诗皇冠" className="w-8 h-8 bg-purple-400/20 rounded p-1" />
                      <span>×3</span>
                    </div>
                    <span className="text-purple-400">27倍</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <img src="/icons/crown.svg" alt="精良皇冠" className="w-8 h-8 bg-blue-400/20 rounded p-1" />
                      <span>×3</span>
                    </div>
                    <span className="text-blue-400">5.832倍</span>
                  </div>
                </div>
              </div>

              {/* 钻石组合 */}
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h4 className="text-purple-400 font-bold mb-2">钻石组合</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <img src="/icons/diamond.svg" alt="史诗钻石" className="w-8 h-8 bg-purple-400/20 rounded p-1" />
                      <span>×3</span>
                    </div>
                    <span className="text-purple-400">27倍</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <img src="/icons/diamond.svg" alt="精良钻石" className="w-8 h-8 bg-blue-400/20 rounded p-1" />
                      <span>×3</span>
                    </div>
                    <span className="text-blue-400">5.832倍</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <img src="/icons/diamond.svg" alt="优秀钻石" className="w-8 h-8 bg-green-400/20 rounded p-1" />
                      <span>×3</span>
                    </div>
                    <span className="text-green-400">1.728倍</span>
                  </div>
                </div>
              </div>

              {/* 普通卡牌组合 */}
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h4 className="text-blue-400 font-bold mb-2">普通卡牌组合</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <img src="/icons/star.svg" alt="精良星星" className="w-8 h-8 bg-blue-400/20 rounded p-1" />
                      <span>×3</span>
                    </div>
                    <span className="text-blue-400">5.832倍</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <img src="/icons/star.svg" alt="优秀星星" className="w-8 h-8 bg-green-400/20 rounded p-1" />
                      <span>×3</span>
                    </div>
                    <span className="text-green-400">1.728倍</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <img src="/icons/star.svg" alt="普通星星" className="w-8 h-8 bg-gray-400/20 rounded p-1" />
                      <span>×3</span>
                    </div>
                    <span className="text-gray-400">1倍</span>
                  </div>
                </div>
              </div>

              {/* 两张配对说明 */}
              <div className="bg-gray-800/50 p-4 rounded-lg md:col-span-3">
                <h4 className="text-white font-bold mb-2">两张配对奖励</h4>
                <p className="text-gray-400 mb-4">两张相同卡片的奖励为：0.5 × (卡片稀有度)²</p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* 传说配对 */}
                  <div className="bg-gray-900/50 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-orange-400">传说配对</span>
                      <span className="text-orange-400 font-bold">12.5倍</span>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-12 h-16 bg-orange-400/20 rounded-lg flex items-center justify-center">
                        <img src="/icons/crown.svg" alt="传说皇冠" className="w-8 h-8" />
                      </div>
                      <div className="w-12 h-16 bg-orange-400/20 rounded-lg flex items-center justify-center">
                        <img src="/icons/crown.svg" alt="传说皇冠" className="w-8 h-8" />
                      </div>
                    </div>
                  </div>

                  {/* 史诗配对 */}
                  <div className="bg-gray-900/50 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-purple-400">史诗配对</span>
                      <span className="text-purple-400 font-bold">4.5倍</span>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-12 h-16 bg-purple-400/20 rounded-lg flex items-center justify-center">
                        <img src="/icons/diamond.svg" alt="史诗钻石" className="w-8 h-8" />
                      </div>
                      <div className="w-12 h-16 bg-purple-400/20 rounded-lg flex items-center justify-center">
                        <img src="/icons/diamond.svg" alt="史诗钻石" className="w-8 h-8" />
                      </div>
                    </div>
                  </div>

                  {/* 精良配对 */}
                  <div className="bg-gray-900/50 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-blue-400">精良配对</span>
                      <span className="text-blue-400 font-bold">1.62倍</span>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-12 h-16 bg-blue-400/20 rounded-lg flex items-center justify-center">
                        <img src="/icons/coin.svg" alt="精良金币" className="w-8 h-8" />
                      </div>
                      <div className="w-12 h-16 bg-blue-400/20 rounded-lg flex items-center justify-center">
                        <img src="/icons/coin.svg" alt="精良金币" className="w-8 h-8" />
                      </div>
                    </div>
                  </div>

                  {/* 优秀配对 */}
                  <div className="bg-gray-900/50 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-green-400">优秀配对</span>
                      <span className="text-green-400 font-bold">0.72倍</span>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-12 h-16 bg-green-400/20 rounded-lg flex items-center justify-center">
                        <img src="/icons/heart.svg" alt="优秀红心" className="w-8 h-8" />
                      </div>
                      <div className="w-12 h-16 bg-green-400/20 rounded-lg flex items-center justify-center">
                        <img src="/icons/heart.svg" alt="优秀红心" className="w-8 h-8" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white mb-2">卡片稀有度</h3>
            <ul className="list-disc list-inside space-y-1">
              <li><span className="text-orange-400">传说 (Legendary)</span>: 皇冠专属稀有度，单个价值5倍</li>
              <li><span className="text-purple-400">史诗 (Epic)</span>: 皇冠、钻石、金币、红心可获得，单个价值3倍</li>
              <li><span className="text-blue-400">精良 (Rare)</span>: 所有卡牌都可能获得，单个价值1.8倍</li>
              <li><span className="text-green-400">优秀 (Uncommon)</span>: 除皇冠外都可获得，单个价值1.2倍</li>
              <li><span className="text-gray-400">普通 (Common)</span>: 仅梅花、星星、黑桃可获得，单个价值1倍</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-2">特殊卡牌说明</h3>
            <ul className="list-disc list-inside space-y-1">
              <li><span className="font-semibold">皇冠</span>: 精良 → 史诗 → 传说</li>
              <li><span className="font-semibold">钻石/金币/红心</span>: 优秀 → 精良 → 史诗</li>
              <li><span className="font-semibold">梅花/星星/黑桃</span>: 普通 → 优秀 → 精良</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-2">奖励计算说明</h3>
            <ul className="list-disc list-inside space-y-1 text-xs text-gray-400">
              <li>基础奖励(B): 三张相同=1倍，两张相同=0.5倍，不同=0倍</li>
              <li>稀有度奖励(X): 传说=5倍，史诗=3倍，精良=1.8倍，优秀=1.2倍，普通=1倍</li>
              <li>两张相同时: 最终奖励 = B × X × X × 下注金额</li>
              <li>三张相同时: 最终奖励 = B × X × X × X × 下注金额</li>
              <li>奖励区间: 0.5 ~ 125倍下注金额</li>
            </ul>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default GameRules; 