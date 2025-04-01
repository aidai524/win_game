'use client';

import React from 'react';

export default function TestPage() {
  const icons = [
    { name: '钻石', symbol: 'diamond' },
    { name: '金币', symbol: 'coin' },
    { name: '星星', symbol: 'star' },
    { name: '皇冠', symbol: 'crown' },
    { name: '红心', symbol: 'heart' },
    { name: '黑桃', symbol: 'spade' },
    { name: '梅花', symbol: 'clover' },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">图标测试页面</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {icons.map((icon) => (
          <div 
            key={icon.symbol}
            className="bg-gray-800 rounded-lg p-4 flex flex-col items-center"
          >
            <p className="text-sm mb-2">{icon.name}</p>
            <div className="w-16 h-16 bg-gray-700 flex items-center justify-center rounded">
              <img 
                src={`/icons/${icon.symbol}.svg`} 
                alt={icon.name} 
                className="w-12 h-12"
              />
            </div>
            <p className="text-xs mt-2 text-gray-400">Path: /icons/{icon.symbol}.svg</p>
          </div>
        ))}
      </div>
    </div>
  );
} 