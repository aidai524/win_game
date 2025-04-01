'use client';

import React, { useState } from 'react';

const GameRules: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-sm font-medium text-indigo-300 hover:text-indigo-200 flex items-center"
      >
        {isOpen ? '隐藏规则' : '查看规则'} 
        <svg
          className={`ml-1 w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="mt-2 p-4 bg-gray-800/60 rounded-lg text-sm text-gray-300">
          <h3 className="font-bold text-white mb-2">游戏规则</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>点击&quot;开始游戏&quot;按钮开始一轮游戏</li>
            <li>系统会随机翻开三张卡片</li>
            <li>三张相同卡片 = 大奖 (5倍奖励)</li>
            <li>两张相同卡片 = 二等奖 (2倍奖励)</li>
            <li>三张不同卡片 = 未中奖 (0倍奖励)</li>
          </ul>

          <h3 className="font-bold text-white mt-4 mb-2">卡片稀有度</h3>
          <ul className="list-disc list-inside space-y-1">
            <li><span className="text-purple-400">传奇</span>: 钻石 (价值5)</li>
            <li><span className="text-blue-400">稀有</span>: 金币, 地球 (价值3)</li>
            <li><span className="text-green-400">uncommon</span>: 星星, 太阳 (价值2)</li>
            <li><span className="text-gray-400">普通</span>: 月亮 (价值1)</li>
          </ul>

          <p className="mt-4 text-xs text-gray-400">
            奖励计算方式: (三张卡片价值总和) × (奖励等级倍数) × (下注金额)
          </p>
        </div>
      )}
    </div>
  );
};

export default GameRules; 