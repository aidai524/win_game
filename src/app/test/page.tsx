'use client';

import React from 'react';
import Image from 'next/image';

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Test Page</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Card Preview</h2>
            <div className="aspect-[3/4] bg-indigo-900 rounded-lg flex items-center justify-center relative overflow-hidden">
              <Image 
                src="/icons/crown.svg" 
                alt="Test Card" 
                width={128}
                height={128}
                className="w-24 h-24"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 