import { Volume2, VolumeX, CloudRain, Bird, Waves, Zap, Flame, Music2, Circle, Heart, Wind, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Sound } from '@/hooks/useSoundscape';

interface SoundControlProps {
  sound: Sound;
  onToggle: () => void;
  onVolumeChange: (volume: number) => void;
}

const getSoundIcon = (soundName: string) => {
  const iconMap = {
    'Rain': CloudRain,
    'Birdsong': Bird,
    'Ocean': Waves,
    'Stream': Waves,
    'Bonfire': Flame,
    'Toads': Music2,
    'Bowl': Circle,
    'Healing': Heart,
    'White Noise': Zap,
    'Wind Blowing': Wind,
  };
  return iconMap[soundName as keyof typeof iconMap] || Music;
};

export const SoundControl = ({ sound, onToggle, onVolumeChange }: SoundControlProps) => {
  const SoundIcon = getSoundIcon(sound.name);
  
  return (
    <div 
      className="flex flex-col items-center p-4 rounded-lg w-20"
      style={{
        background: "linear-gradient(145deg, #2d3748, #1a202c)",
        boxShadow: "inset 0 2px 4px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2)"
      }}
    >
      {/* Volume Percentage */}
      <div className="text-xs text-slate-300 font-mono mb-2 min-h-[16px]">
        {sound.isPlaying ? `${Math.round(sound.volume * 100)}` : '0'}
      </div>
      
      {/* Vertical Slider */}
      <div className="h-40 flex items-center justify-center mb-4">
        <Slider
          value={[sound.volume]}
          onValueChange={([value]) => onVolumeChange(value)}
          max={1}
          step={0.01}
          disabled={!sound.isPlaying}
          orientation="vertical"
          className="h-36"
        />
      </div>
      
      {/* Mute/Unmute Button */}
      <Button
        onClick={onToggle}
        variant="ghost"
        size="sm"
        className={`
          w-8 h-8 rounded-sm mb-2 transition-all
          ${sound.isPlaying 
            ? 'bg-gradient-to-b from-green-400 to-green-600 text-white shadow-lg hover:from-green-300 hover:to-green-500' 
            : 'bg-gradient-to-b from-slate-600 to-slate-700 text-slate-400 hover:from-slate-500 hover:to-slate-600'
          }
        `}
        style={{
          boxShadow: sound.isPlaying 
            ? "0 2px 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)"
            : "inset 0 2px 4px rgba(0,0,0,0.3), 0 1px 2px rgba(255,255,255,0.1)"
        }}
      >
        {sound.isPlaying ? (
          <Volume2 className="w-3 h-3" />
        ) : (
          <VolumeX className="w-3 h-3" />
        )}
      </Button>
      
      {/* Sound Icon */}
      <SoundIcon className="w-4 h-4 text-slate-400 mb-1" />
      
      {/* Sound Name */}
      <div className="text-xs text-slate-300 text-center leading-tight font-medium">
        {sound.name.split(' ').map((word, i) => (
          <div key={i}>{word}</div>
        ))}
      </div>
    </div>
  );
};