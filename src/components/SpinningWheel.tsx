'use client';

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';

type Segment = {
  id: number;
  text: string;
  value: number;
  color: string;
};

interface SpinningWheelProps {
  segments: Segment[];
  onSpinComplete: (segment: Segment) => void;
  onSpinStart?: () => boolean;
}

const SpinningWheel: React.FC<SpinningWheelProps> = ({ segments, onSpinComplete, onSpinStart }) => {
  const wheelRef = useRef<HTMLDivElement>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState<Segment | null>(null);
  
  // Calculate the angle for each wheel segment
  const segmentAngle = 360 / segments.length;

  useEffect(() => {
    const wheel = wheelRef.current;
    if (!wheel) return;

    const handleScroll = () => {
      const rotation = window.scrollY / 2;
      wheel.style.transform = `rotate(${rotation}deg)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const getRotationDegrees = () => {
    try {
      // Randomly select a winning segment
      const selectedIndex = Math.floor(Math.random() * segments.length);
      const segment = segments[selectedIndex];
      
      // Calculate rotation degrees (5 turns + random angle)
      // Subtract half segment angle to center it
      const degrees = 1800 + (selectedIndex * segmentAngle) + (segmentAngle / 2);
      
      return { degrees, segment };
    } catch (error) {
      console.error('Error getting rotation degrees:', error);
      // Return default values
      return { 
        degrees: 1800, 
        segment: segments[0] 
      };
    }
  };
  
  const spinWheel = () => {
    try {
      if (isSpinning || !wheelRef.current) return;
      
      // If onSpinStart callback exists and returns false, don't spin
      if (onSpinStart && !onSpinStart()) {
        return;
      }
      
      setIsSpinning(true);
      const { degrees, segment } = getRotationDegrees();
      
      gsap.to(wheelRef.current, {
        rotation: `+=${degrees}`,
        duration: 5, 
        ease: 'power2.out',
        onComplete: () => {
          setIsSpinning(false);
          setSelectedSegment(segment);
          onSpinComplete(segment);
        }
      });
    } catch (error) {
      console.error('Error spinning wheel:', error);
      setIsSpinning(false);
    }
  };
  
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div 
        className="w-72 h-72 md:w-96 md:h-96 rounded-full border-8 border-yellow-500 overflow-hidden relative mx-auto"
        style={{ transformOrigin: 'center center' }}
      >
        {/* Wheel */}
        <div 
          ref={wheelRef} 
          className="w-full h-full absolute"
          style={{ transformOrigin: 'center center' }}
        >
          {segments.map((segment, index) => {
            const rotation = index * segmentAngle;
            
            return (
              <div 
                key={segment.id}
                className="absolute w-full h-full"
                style={{ 
                  clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos((segmentAngle * Math.PI) / 180)}% ${50 - 50 * Math.sin((segmentAngle * Math.PI) / 180)}%, 50% 50%)`,
                  backgroundColor: segment.color,
                  transform: `rotate(${rotation}deg)`,
                }}
              >
                <div 
                  className="absolute w-full text-center top-8 left-0 right-0 text-white font-bold transform -rotate-90"
                  style={{ transform: `rotate(${segmentAngle / 2}deg) translateY(-5rem)` }}
                >
                  {segment.text}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Pointer */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-12 z-10">
        <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-t-[30px] border-l-transparent border-r-transparent border-t-red-600"></div>
      </div>
      
      {/* Spin button */}
      <button
        onClick={spinWheel}
        disabled={isSpinning}
        className={`mt-8 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-bold rounded-full shadow-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 ${isSpinning ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isSpinning ? 'Spinning...' : 'Start Spin'}
      </button>
      
      {/* Result display */}
      {selectedSegment && !isSpinning && (
        <div className="mt-4 text-center">
          <p className="text-xl font-bold">
            Congratulations! You won <span className="text-yellow-500">{selectedSegment.text}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default SpinningWheel; 