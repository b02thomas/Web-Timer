import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { useNotifications } from '../contexts/NotificationContext';

const SoundSettings = ({ isOpen, onClose }) => {
  const [volume, setVolume] = useState([70]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const { playSound } = useNotifications();

  const testIntervalSound = () => {
    playSound('interval');
  };

  const testCompleteSound = () => {
    playSound('complete');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-2">
            <Music className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-xl">Sound-Einstellungen</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Sound Enable/Disable */}
          <div className="flex items-center justify-between">
            <Label htmlFor="sound-enabled" className="flex items-center gap-2">
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              Töne aktivieren
            </Label>
            <Switch
              id="sound-enabled"
              checked={soundEnabled}
              onCheckedChange={setSoundEnabled}
            />
          </div>

          {/* Volume Control */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Lautstärke</Label>
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={100}
              min={0}
              step={10}
              className="w-full"
              disabled={!soundEnabled}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>0%</span>
              <span>{volume[0]}%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications-enabled" className="flex items-center gap-2">
              🔔 Desktop-Benachrichtigungen
            </Label>
            <Switch
              id="notifications-enabled"
              checked={notificationsEnabled}
              onCheckedChange={setNotificationsEnabled}
            />
          </div>

          {/* Test Sounds */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Töne testen:</Label>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={testIntervalSound}
                disabled={!soundEnabled}
                className="flex-1"
              >
                🔔 Intervall-Ton
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={testCompleteSound}
                disabled={!soundEnabled}
                className="flex-1"
              >
                🎉 Session-Ende
              </Button>
            </div>
          </div>

          {/* Close Button */}
          <Button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
          >
            Schließen
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SoundSettings;