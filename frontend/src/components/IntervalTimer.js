import React, { useState, useEffect } from 'react';
import TimerSetup from './TimerSetup';
import TimerSession from './TimerSession';
import TimerComplete from './TimerComplete';
import ThemeToggle from './ThemeToggle';
import SoundSettings from './SoundSettings';
import { useTimer } from '../hooks/useTimer';
import { useNotifications } from '../contexts/NotificationContext';
import { Button } from './ui/button';
import { Settings } from 'lucide-react';

const IntervalTimer = () => {
  const [currentView, setCurrentView] = useState('setup'); // 'setup', 'session', 'complete'
  const [timerConfig, setTimerConfig] = useState(null);
  const { notifyWithSound, requestPermission } = useNotifications();
  
  const {
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
  } = useTimer(timerConfig);

  // Handle timer completion
  useEffect(() => {
    if (timeLeft === 0 && timerConfig && currentView === 'session') {
      setCurrentView('complete');
      notifyWithSound('Session beendet!', {
        body: 'Ihre Intervall-Timer Session ist abgeschlossen.',
        tag: 'session-complete'
      }, 'complete');
    }
  }, [timeLeft, timerConfig, currentView, notifyWithSound]);

  // Handle interval notifications
  useEffect(() => {
    if (nextIntervalTime === 0 && isRunning && currentInterval > 0) {
      notifyWithSound(`Intervall ${currentInterval}!`, {
        body: 'Zeit für eine Pause - Intervall erreicht!',
        tag: 'interval-notification'
      }, 'interval');
    }
  }, [nextIntervalTime, isRunning, currentInterval, notifyWithSound]);

  const handleStartTimer = async (config) => {
    // Request notification permission
    await requestPermission();
    
    setTimerConfig(config);
    setCurrentView('session');
    startTimer(config);
  };

  const handleResetTimer = () => {
    resetTimer();
    setCurrentView('setup');
    setTimerConfig(null);
  };

  const handlePauseResume = () => {
    if (isPaused) {
      resumeTimer();
    } else {
      pauseTimer();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-500">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">⏱️</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Intervall-Timer
            </h1>
          </div>
          <ThemeToggle />
        </div>

        <div className="max-w-2xl mx-auto">
          {currentView === 'setup' && (
            <TimerSetup onStart={handleStartTimer} />
          )}
          
          {currentView === 'session' && (
            <TimerSession
              timeLeft={timeLeft}
              nextIntervalTime={nextIntervalTime}
              totalTime={timerConfig?.totalMinutes * 60}
              intervalTime={timerConfig?.intervalMinutes * 60}
              progress={progress}
              intervalProgress={intervalProgress}
              currentInterval={currentInterval}
              totalIntervals={totalIntervals}
              isRunning={isRunning}
              isPaused={isPaused}
              onPauseResume={handlePauseResume}
              onReset={handleResetTimer}
            />
          )}
          
          {currentView === 'complete' && (
            <TimerComplete
              totalTime={timerConfig?.totalMinutes}
              intervalTime={timerConfig?.intervalMinutes}
              totalIntervals={totalIntervals}
              onReset={handleResetTimer}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default IntervalTimer;