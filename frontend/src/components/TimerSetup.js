import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Play, Clock, Timer } from 'lucide-react';

const TimerSetup = ({ onStart }) => {
  const [totalMinutes, setTotalMinutes] = useState(90);
  const [intervalMinutes, setIntervalMinutes] = useState(15);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!totalMinutes || totalMinutes <= 0) {
      newErrors.totalMinutes = 'Gesamtdauer muss größer als 0 sein';
    }
    
    if (!intervalMinutes || intervalMinutes <= 0) {
      newErrors.intervalMinutes = 'Intervall muss größer als 0 sein';
    }
    
    if (totalMinutes && intervalMinutes && intervalMinutes >= totalMinutes) {
      newErrors.intervalMinutes = 'Intervall muss kleiner als die Gesamtdauer sein';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onStart({
        totalMinutes: parseInt(totalMinutes),
        intervalMinutes: parseInt(intervalMinutes)
      });
    }
  };

  const presetConfigs = [
    { name: 'Pomodoro', total: 25, interval: 25 },
    { name: 'Lange Session', total: 90, interval: 15 },
    { name: 'Kurze Session', total: 30, interval: 10 },
    { name: 'Meditation', total: 60, interval: 20 }
  ];

  return (
    <Card className="shadow-2xl border-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
      <CardHeader className="text-center space-y-2">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Clock className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold">Timer konfigurieren</CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          Stellen Sie Ihre gewünschte Gesamtdauer und Intervall-Abstände ein
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="totalMinutes" className="text-sm font-medium flex items-center gap-2">
                <Timer className="w-4 h-4" />
                Gesamtdauer (Minuten)
              </Label>
              <Input
                id="totalMinutes"
                type="number"
                value={totalMinutes}
                onChange={(e) => setTotalMinutes(e.target.value)}
                min="1"
                max="999"
                className={`h-12 text-lg ${errors.totalMinutes ? 'border-red-500' : ''}`}
                placeholder="90"
              />
              {errors.totalMinutes && (
                <p className="text-red-500 text-sm">{errors.totalMinutes}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="intervalMinutes" className="text-sm font-medium flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Intervall (Minuten)
              </Label>
              <Input
                id="intervalMinutes"
                type="number"
                value={intervalMinutes}
                onChange={(e) => setIntervalMinutes(e.target.value)}
                min="1"
                max="999"
                className={`h-12 text-lg ${errors.intervalMinutes ? 'border-red-500' : ''}`}
                placeholder="15"
              />
              {errors.intervalMinutes && (
                <p className="text-red-500 text-sm">{errors.intervalMinutes}</p>
              )}
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Vorschau:</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {totalMinutes && intervalMinutes && totalMinutes > intervalMinutes ? (
                <>
                  🎯 <strong>{Math.floor(totalMinutes / intervalMinutes)}</strong> Intervalle à <strong>{intervalMinutes}</strong> Minuten
                  <br />
                  ⏱️ Gesamtdauer: <strong>{totalMinutes}</strong> Minuten
                </>
              ) : (
                'Bitte geben Sie gültige Werte ein'
              )}
            </p>
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
          >
            <Play className="w-5 h-5 mr-2" />
            Timer starten
          </Button>
        </form>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold mb-3 text-center">Schnellauswahl:</h3>
          <div className="grid grid-cols-2 gap-3">
            {presetConfigs.map((preset) => (
              <Button
                key={preset.name}
                variant="outline"
                size="sm"
                onClick={() => {
                  setTotalMinutes(preset.total);
                  setIntervalMinutes(preset.interval);
                }}
                className="h-auto py-3 flex flex-col items-center hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              >
                <span className="font-medium">{preset.name}</span>
                <span className="text-xs text-gray-500">{preset.total}min / {preset.interval}min</span>
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimerSetup;