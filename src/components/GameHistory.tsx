'use client';

import React, { FC } from 'react';

type HistoryItem = {
  id: string;
  playerAddress: string;
  result: string;
  winAmount: number;
  timestamp: Date;
};

interface GameHistoryProps {
  history: HistoryItem[];
}

const GameHistory: FC<GameHistoryProps> = ({ history }) => {
  if (!history.length) {
    return (
      <div className="w-full p-4 rounded-lg bg-gray-800 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4">最近游戏</h2>
        <p className="text-gray-400 text-center py-4">暂无游戏记录</p>
      </div>
    );
  }

  return (
    <div className="w-full p-4 rounded-lg bg-gray-800 shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4">最近游戏</h2>
      <div className="overflow-auto max-h-80">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs uppercase bg-gray-700">
            <tr>
              <th className="py-3 px-4">玩家</th>
              <th className="py-3 px-4">结果</th>
              <th className="py-3 px-4">赢取金额</th>
              <th className="py-3 px-4">时间</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item.id} className="border-b border-gray-700 hover:bg-gray-600">
                <td className="py-3 px-4">
                  {item.playerAddress.slice(0, 4)}...{item.playerAddress.slice(-4)}
                </td>
                <td className="py-3 px-4">{item.result}</td>
                <td className="py-3 px-4 text-yellow-400">{item.winAmount.toFixed(2)} SOL</td>
                <td className="py-3 px-4">{item.timestamp.toLocaleTimeString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GameHistory; 