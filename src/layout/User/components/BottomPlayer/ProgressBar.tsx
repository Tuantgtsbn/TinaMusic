import { formatTime } from "@utils/Time";
import React from "react";

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

export default function ProgressBar({
  currentTime,
  duration,
  onSeek,
}: ProgressBarProps) {
  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const newTime = (offsetX / rect.width) * duration;
    onSeek(newTime);
  };
  return (
    <div className="flex items-center space-x-2 text-xs text-gray-400">
      <span>{formatTime(currentTime)}</span>
      <div
        className="flex-1 h-1 bg-gray-600 rounded-full cursor-pointer group"
        onClick={handleClick}
      >
        <div
          className="h-1 bg-green-500 rounded-full relative group-hover:bg-green-400 transition-colors"
          style={{ width: `${progressPercentage}%` }}
        >
          <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
      <span>{formatTime(duration)}</span>
    </div>
  );
}
