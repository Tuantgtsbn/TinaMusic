import { formatTime } from "@utils/Time";
import React, { useState, useRef, useCallback, useMemo } from "react";

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
  const [isDragging, setIsDragging] = useState(false);
  const [dragTime, setDragTime] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);
  // Sử dụng dragTime khi đang drag, ngược lại dùng currentTime
  const displayTime = isDragging ? dragTime : currentTime;

  // Memoize percentage calculation để tránh re-render
  const progressPercentage = useMemo(() => {
    return duration > 0 ? Math.min((displayTime / duration) * 100, 100) : 0;
  }, [displayTime, duration]);

  // Tính toán thời gian từ vị trí mouse
  const calculateTimeFromPosition = useCallback(
    (clientX: number) => {
      if (!progressBarRef.current) return 0;

      const rect = progressBarRef.current.getBoundingClientRect();
      const offsetX = clientX - rect.left;
      const clampedOffsetX = Math.max(0, Math.min(offsetX, rect.width));
      const newTime = (clampedOffsetX / rect.width) * duration;

      return Math.max(0, Math.min(newTime, duration));
    },
    [duration],
  );

  // Xử lý khi bắt đầu drag
  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const newTime = calculateTimeFromPosition(e.clientX);
      setDragTime(newTime);
      setIsDragging(true);
    },
    [calculateTimeFromPosition],
  );

  // Xử lý khi đang drag
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      e.preventDefault();
      const newTime = calculateTimeFromPosition(e.clientX);
      setDragTime(newTime);
    },
    [isDragging, calculateTimeFromPosition],
  );

  // Xử lý khi kết thúc drag
  const handleMouseUp = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      e.preventDefault();
      const newTime = calculateTimeFromPosition(e.clientX);
      setIsDragging(false);
      onSeek(newTime);
    },
    [isDragging, calculateTimeFromPosition, onSeek],
  );

  // Xử lý click thường (không drag)
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      // Chỉ xử lý click nếu không phải là kết quả của drag
      if (isDragging) return;

      e.preventDefault();
      e.stopPropagation();

      const newTime = calculateTimeFromPosition(e.clientX);
      onSeek(newTime);
    },
    [isDragging, calculateTimeFromPosition, onSeek],
  );

  // Touch events
  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      e.preventDefault();
      const touch = e.touches[0];
      const newTime = calculateTimeFromPosition(touch.clientX);
      setDragTime(newTime);
      setIsDragging(true);
    },
    [calculateTimeFromPosition],
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const touch = e.touches[0];
      const newTime = calculateTimeFromPosition(touch.clientX);
      setDragTime(newTime);
    },
    [isDragging, calculateTimeFromPosition],
  );

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      e.preventDefault();

      const touch = e.changedTouches[0];
      const newTime = calculateTimeFromPosition(touch.clientX);
      setIsDragging(false);
      onSeek(newTime);
    },
    [isDragging, calculateTimeFromPosition, onSeek],
  );

  // Event listeners
  React.useLayoutEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove, {
        passive: false,
      });
      document.addEventListener("mouseup", handleMouseUp, { passive: false });
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleTouchEnd, { passive: false });

      document.body.style.userSelect = "none";
      document.body.style.cursor = "grabbing";

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
        document.body.style.userSelect = "";
        document.body.style.cursor = "";
      };
    }
  }, [
    isDragging,
    handleMouseMove,
    handleMouseUp,
    handleTouchMove,
    handleTouchEnd,
  ]);

  // Hover handlers
  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!isDragging) {
      setIsHovering(false);
    }
  }, [isDragging]);

  // Memoize thumb visibility để tránh nhấp nháy
  const showThumb = useMemo(() => {
    return isDragging || isHovering || progressPercentage > 0;
  }, [isDragging, isHovering, progressPercentage]);

  return (
    <div className="flex items-center space-x-2 text-xs">
      <span className="w-10 text-right">{formatTime(displayTime)}</span>
      <div
        ref={progressBarRef}
        className="flex-1 h-1 bg-gray-600 rounded-full cursor-pointer group"
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="h-1 bg-white rounded-full relative transition-colors duration-150 group-hover:bg-orange-500"
          style={{ width: `${progressPercentage}%` }}
        >
          <div
            className={`absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full transition-all duration-150 ${
              showThumb ? "opacity-100 scale-100" : "opacity-0 scale-75"
            } ${isDragging ? "scale-110" : ""}`}
          />
        </div>
      </div>
      <span className="w-10">{formatTime(duration)}</span>
    </div>
  );
}
