import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { CheckCircle, RotateCcw, Trophy, Clock, Target } from 'lucide-react';

const TimerComplete = ({ totalTime, intervalTime, totalIntervals, onReset }) => {
  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${mins}min`;
    }
    return `${mins}min`;
  };

  const achievements = [
    { icon: '🎯', text: `${totalIntervals} Intervalle absolviert` },
    { icon: '⏱️', text: `${formatTime(totalTime)} fokussiert gearbeitet` },
    { icon: '🔔', text: `Alle ${intervalTime} Minuten eine Pause gemacht` },
    { icon: '✅', text: 'Session erfolgreich abgeschlossen' }
  ];

  return (
    <div className="space-y-6">
      {/* Success Message */}
      <Card className="shadow-2xl border-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Session beendet!
          </CardTitle>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
            Herzlichen Glückwunsch! Sie haben Ihre Timer-Session erfolgreich abgeschlossen.
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Achievement List */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-center mb-4 text-gray-700 dark:text-gray-300">
              Ihre Erfolge:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-4 bg-white/60 dark:bg-gray-800/60 rounded-lg border border-green-200 dark:border-green-800 backdrop-blur-sm"
                >
                  <span className="text-2xl">{achievement.icon}</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {achievement.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Statistics */}
          <div className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-6 border border-green-200 dark:border-green-800 backdrop-blur-sm">
            <h3 className="text-lg font-semibold mb-4 text-center text-gray-700 dark:text-gray-300">
              Session-Statistiken
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Gesamtzeit</p>
                <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  {formatTime(totalTime)}
                </p>
              </div>
              
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Intervalle</p>
                <p className="text-xl font-bold text-green-600 dark:text-green-400">
                  {totalIntervals}
                </p>
              </div>
              
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Abschlussrate</p>
                <p className="text-xl font-bold text-purple-600 dark:text-purple-400">
                  100%
                </p>
              </div>
            </div>
          </div>

          {/* Reset Button */}
          <div className="pt-4">
            <Button
              onClick={onReset}
              size="lg"
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
            >
              <RotateCcw className="w-6 h-6 mr-2" />
              Neue Session starten
            </Button>
          </div>

          {/* Motivational Message */}
          <div className="text-center space-y-2">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              "Erfolg ist die Summe kleiner Anstrengungen, die Tag für Tag wiederholt werden."
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              - Robert Collier
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimerComplete;