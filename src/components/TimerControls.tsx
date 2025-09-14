import { useState } from 'react';
import { Play, Pause, Square, Clock, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useTimer } from '@/hooks/useTimer';

interface TimerControlsProps {
  onTimerComplete: () => void;
}

const PRESET_TIMES = [
  { label: '10 min', value: 10 },
  { label: '20 min', value: 20 },
  { label: '30 min', value: 30 },
  { label: '60 min', value: 60 },
];

export const TimerControls = ({ onTimerComplete }: TimerControlsProps) => {
  const [customTime, setCustomTime] = useState('');
  const { timeLeft, isActive, startTimer, stopTimer, pauseTimer, resumeTimer, formatTime, progress } = useTimer(onTimerComplete);

  const handlePresetTime = (minutes: number) => {
    startTimer(minutes);
  };

  const handleCustomTime = () => {
    const minutes = parseInt(customTime);
    if (minutes > 0) {
      startTimer(minutes);
      setCustomTime('');
    }
  };

  return (
    <div className="glass-strong rounded-2xl p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <Timer className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-semibold">Timer</h2>
      </div>

      {timeLeft > 0 && (
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-mono font-bold text-primary mb-2">
              {formatTime(timeLeft)}
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="flex justify-center space-x-3">
            {isActive ? (
              <Button onClick={pauseTimer} variant="outline" size="lg">
                <Pause className="w-5 h-5 mr-2" />
                Pause
              </Button>
            ) : (
              <Button onClick={resumeTimer} variant="default" size="lg">
                <Play className="w-5 h-5 mr-2" />
                Resume
              </Button>
            )}
            
            <Button onClick={stopTimer} variant="destructive" size="lg">
              <Square className="w-5 h-5 mr-2" />
              Stop
            </Button>
          </div>
        </div>
      )}

      {timeLeft === 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {PRESET_TIMES.map((preset) => (
              <Button
                key={preset.value}
                onClick={() => handlePresetTime(preset.value)}
                variant="outline"
                className="h-12 glass hover:glow-secondary"
              >
                <Clock className="w-4 h-4 mr-2" />
                {preset.label}
              </Button>
            ))}
          </div>

          <div className="flex space-x-2">
            <Input
              type="number"
              placeholder="Custom minutes"
              value={customTime}
              onChange={(e) => setCustomTime(e.target.value)}
              className="glass"
              min="1"
            />
            <Button 
              onClick={handleCustomTime} 
              disabled={!customTime || parseInt(customTime) <= 0}
              className="px-6"
            >
              Start
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};