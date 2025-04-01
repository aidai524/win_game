'use client';

import React, { FC, useState } from 'react';

interface BetAmountProps {
  onBetChange: (amount: number) => void;
  disabled?: boolean;
}

const BetAmount: FC<BetAmountProps> = ({ onBetChange, disabled = false }) => {
  const [amount, setAmount] = useState<number>(0.1);
  const betOptions = [0.05, 0.1, 0.5, 1, 2, 5];

  const handleAmountChange = (newAmount: number) => {
    setAmount(newAmount);
    onBetChange(newAmount);
  };

  return (
    <div className="w-full p-4 rounded-lg bg-gray-800 shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4">选择下注金额</h2>
      
      <div className="grid grid-cols-3 gap-2">
        {betOptions.map((option) => (
          <button
            key={option}
            onClick={() => handleAmountChange(option)}
            disabled={disabled}
            className={`py-2 px-4 rounded-lg font-bold transition-all duration-200 ${
              amount === option
                ? 'bg-yellow-500 text-gray-900'
                : 'bg-gray-700 text-white hover:bg-gray-600'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {option} SOL
          </button>
        ))}
      </div>
      
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-300 mb-1">自定义金额</label>
        <div className="flex items-center">
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(e) => handleAmountChange(parseFloat(e.target.value))}
            disabled={disabled}
            className="w-full bg-gray-700 text-white border border-gray-600 rounded-l-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <span className="bg-gray-600 text-white py-2 px-3 rounded-r-lg">SOL</span>
        </div>
      </div>
    </div>
  );
};

export default BetAmount; 