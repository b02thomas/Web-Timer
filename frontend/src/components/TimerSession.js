import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Pause, Play, Square, Clock, Timer, Target } from 'lucide-react';

const TimerSession = ({
  timeLeft,
  nextIntervalTime,
  totalTime,
  intervalTime,
  progress,
  intervalProgress,
  currentInterval,
  totalIntervals,
  isRunning,
  isPaused,
  onPauseResume,
  onReset
}) => {
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeLeftColor = () => {
    if (nextIntervalTime <= 60) return 'text-red-500';
    if (nextIntervalTime <= 300) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <div className="space-y-6">
      {/* Main Timer Display */}
      <Card className="shadow-2xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-lg font-medium text-gray-600 dark:text-gray-400">
            Session läuft
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          {/* Main Time Display */}
          <div className="space-y-2">
            <div className="text-6xl md:text-8xl font-mono font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {formatTime(timeLeft)}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Verbleibende Zeit
            </p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <Progress 
              value={progress} 
              className="h-4 bg-gray-200 dark:bg-gray-700"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {Math.round(progress)}% abgeschlossen
            </p>
          </div>

          {/* Control Buttons */}
          <div className="flex justify-center space-x-4">
            <Button
              onClick={onPauseResume}
              size="lg"
              className="h-14 px-8 text-lg font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
            >
              {isPaused ? (
                <>
                  <Play className="w-6 h-6 mr-2" />
                  Fortsetzen
                </>
              ) : (
                <>
                  <Pause className="w-6 h-6 mr-2" />
                  Pausieren
                </>
              )}
            </Button>
            
            <Button
              onClick={onReset}
              size="lg"
              variant="outline"
              className="h-14 px-8 text-lg font-semibold hover:bg-red-50 hover:border-red-300 dark:hover:bg-red-900/20 transition-all duration-300"
            >
              <Square className="w-6 h-6 mr-2" />
              Stoppen
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Interval Information */}
      <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Next Interval */}
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-700 dark:text-gray-300">Nächste Pause</h3>
              <div className={`text-2xl font-mono font-bold ${getTimeLeftColor()}`}>
                {formatTime(nextIntervalTime)}
              </div>
              <div className="space-y-1">
                <Progress 
                  value={intervalProgress} 
                  className="h-2 bg-gray-200 dark:bg-gray-600"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {Math.round(intervalProgress)}% bis zur Pause
                </p>
              </div>
            </div>

            {/* Current Interval */}
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto">
                <Timer className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-700 dark:text-gray-300">Aktuelles Intervall</h3>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {currentInterval}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                von {totalIntervals}
              </p>
            </div>

            {/* Total Progress */}
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-700 dark:text-gray-300">Gesamtfortschritt</h3>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {Math.round(progress)}%
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {formatTime(totalTime - timeLeft)} / {formatTime(totalTime)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Messages */}
      {isPaused && (
        <Card className="shadow-lg border-0 bg-yellow-50 dark:bg-yellow-900/20 backdrop-blur-sm border-yellow-200 dark:border-yellow-800">
          <CardContent className="p-4 text-center">
            <p className="text-yellow-800 dark:text-yellow-200 font-medium">
              ⏸️ Timer ist pausiert - Klicken Sie auf "Fortsetzen" um weiterzumachen
            </p>
          </CardContent>
        </Card>
      )}

      {nextIntervalTime <= 60 && isRunning && (
        <Card className="shadow-lg border-0 bg-red-50 dark:bg-red-900/20 backdrop-blur-sm border-red-200 dark:border-red-800 animate-pulse">
          <CardContent className="p-4 text-center">
            <p className="text-red-800 dark:text-red-200 font-medium">
              🔔 Pause in weniger als einer Minute!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TimerSession;