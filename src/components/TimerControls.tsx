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
    <div
      className="rounded-2xl p-6 relative overflow-hidden"
      style={{
        background: "rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(16px) saturate(180%)",
        WebkitBackdropFilter: "blur(16px) saturate(180%)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.25)"
      }}
    >
      {/* Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-1 -left-12 w-40 h-40 bg-gradient-to-tr from-purple-500/40 to-pink-500/40 rounded-full blur-3xl opacity-40" />
        <div className="absolute -bottom-16 -right-16 w-44 h-44 bg-gradient-to-bl from-blue-500/40 to-purple-500/40 rounded-full blur-3xl opacity-40" />
      </div>

      <div className="flex items-center space-x-3 relative z-10 mb-6">
        <Timer className="w-6 h-6 text-white opacity-60" />
        <h2 className="text-xl font-semibold text-slate-100">Timer</h2>
      </div>

      {timeLeft > 0 && (
        <div className="space-y-4 relative z-10">
          <div className="text-center">
            <div className="text-3xl font-mono font-bold text-slate-100 mb-2">
              {formatTime(timeLeft)}
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="flex justify-center space-x-3">
            {isActive ? (
              <Button onClick={pauseTimer} variant="glass" size="lg">
                <Pause className="w-5 h-5 mr-2" />
                Pause
              </Button>
            ) : (
              <Button onClick={resumeTimer} variant="glass" size="lg">
                <Play className="w-5 h-5 mr-2" />
                Resume
              </Button>
            )}
            
            <Button onClick={stopTimer} variant="glass" size="lg" className="text-pink-400 hover:text-pink-300">
              <Square className="w-5 h-5 mr-2" />
              Stop
            </Button>
          </div>
        </div>
      )}

      {timeLeft === 0 && (
        <div className="space-y-4 relative z-10">
          <div className="grid grid-cols-2 gap-3">
            {PRESET_TIMES.map((preset) => (
              <Button
                key={preset.value}
                onClick={() => handlePresetTime(preset.value)}
                variant="glass"
                className="h-12"
              >
                <Clock className="w-4 h-4 mr-2" />
                {preset.label}
              </Button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <Input
              type="number"
              placeholder="Custom minutes"
              value={customTime}
              onChange={(e) => setCustomTime(e.target.value)}
              className="glass h-11"
              min="1"
            />
            <div className="flex flex-col space-y-1">
              <Button 
                size="sm" 
                variant="glass" 
                onClick={() => setCustomTime(String((parseInt(customTime) || 0) + 1))}
                className="h-5" 
              >
                +
              </Button>
              <Button 
                size="sm" 
                variant="glass" 
                onClick={() => setCustomTime(String(Math.max((parseInt(customTime) || 0) - 1, 0)))}
                className="h-5"            
              >
                −
              </Button>
            </div>  
            <Button 
              onClick={handleCustomTime} 
              disabled={!customTime || parseInt(customTime) <= 0}
              variant="glass"
              className="px-6 h-11 flex items-center"
            >
              Start
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
