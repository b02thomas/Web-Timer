import { useState, useEffect, useRef, useCallback } from 'react';

export const useTimer = (config) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [totalTime, setTotalTime] = useState(0);
  const [intervalTime, setIntervalTime] = useState(0);
  const [currentInterval, setCurrentInterval] = useState(0);
  const [totalIntervals, setTotalIntervals] = useState(0);
  
  const intervalRef = useRef(null);
  const pausedTimeRef = useRef(0);
  const lastUpdateRef = useRef(null);

  // Calculate derived values
  const progress = totalTime > 0 ? ((totalTime - timeLeft) / totalTime) * 100 : 0;
  
  // Calculate next interval time
  const nextIntervalTime = intervalTime > 0 ? 
    (intervalTime - ((totalTime - timeLeft) % intervalTime)) % intervalTime : 0;
  
  // Calculate interval progress
  const intervalProgress = intervalTime > 0 ? 
    (((totalTime - timeLeft) % intervalTime) / intervalTime) * 100 : 0;

  // Start timer
  const startTimer = useCallback((timerConfig) => {
    if (!timerConfig) return;
    
    const totalSeconds = timerConfig.totalMinutes * 60;
    const intervalSeconds = timerConfig.intervalMinutes * 60;
    
    setTotalTime(totalSeconds);
    setIntervalTime(intervalSeconds);
    setTimeLeft(totalSeconds);
    setTotalIntervals(Math.ceil(timerConfig.totalMinutes / timerConfig.intervalMinutes));
    setCurrentInterval(0);
    setIsRunning(true);
    setIsPaused(false);
    setStartTime(Date.now());
    pausedTimeRef.current = 0;
    lastUpdateRef.current = Date.now();
  }, []);

  // Pause timer
  const pauseTimer = useCallback(() => {
    if (isRunning && !isPaused) {
      setIsPaused(true);
      setIsRunning(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, [isRunning, isPaused]);

  // Resume timer
  const resumeTimer = useCallback(() => {
    if (isPaused) {
      setIsPaused(false);
      setIsRunning(true);
      pausedTimeRef.current += Date.now() - lastUpdateRef.current;
      lastUpdateRef.current = Date.now();
    }
  }, [isPaused]);

  // Reset timer
  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(0);
    setTotalTime(0);
    setIntervalTime(0);
    setCurrentInterval(0);
    setTotalIntervals(0);
    setStartTime(null);
    pausedTimeRef.current = 0;
    lastUpdateRef.current = null;
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  // Timer effect
  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        const now = Date.now();
        const elapsed = Math.floor((now - startTime - pausedTimeRef.current) / 1000);
        const remaining = Math.max(0, totalTime - elapsed);
        
        setTimeLeft(remaining);
        
        // Update current interval
        if (intervalTime > 0) {
          const newInterval = Math.floor((totalTime - remaining) / intervalTime) + 1;
          setCurrentInterval(Math.min(newInterval, totalIntervals));
        }
        
        // Stop timer when time is up
        if (remaining <= 0) {
          setIsRunning(false);
          setIsPaused(false);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
        }
        
        lastUpdateRef.current = now;
      }, 1000);
      
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [isRunning, isPaused, startTime, totalTime, intervalTime, totalIntervals]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    timeLeft,
    nextIntervalTime,
    isRunning,
    isPaused,
    progress,
    intervalProgress,
    currentInterval,
    totalIntervals,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer
  };
};