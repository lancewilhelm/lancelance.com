import React, { useState, useRef, useEffect } from 'react';
import { PropsWithChildren } from 'react';
import { robotoMono } from '@/utils/fonts';

interface TootipProps extends PropsWithChildren {
  tooltipText: string;
  delay?: number;
  position?: 'top' | 'bottom' | 'left' | 'right';
  disableOnMobile?: boolean;
}

export function Tooltip({
  children,
  tooltipText,
  delay = 700,
  position = 'top',
  disableOnMobile = true
}: TootipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isTouchDevice = useRef(false);

  const handleMouseEnter = () => {
    // Don't show tooltip on touch devices
    if (isTouchDevice.current && disableOnMobile) return;

    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const handleTouchStart = () => {
    isTouchDevice.current = true;
    // Immediately hide any tooltip and prevent it from showing
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
    >
      {isVisible && (
        <div className={`absolute ${positionClasses[position]} z-50 overflow-hidden rounded-md bg-[--main-color] px-3 py-1.5 text-sm text-[--bg-color] text-center ${robotoMono.className} tooltip`}>
          {tooltipText}
        </div>
      )}
      {children}
    </div>
  );
}

export default Tooltip;
