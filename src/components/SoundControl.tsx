import { 
  Volume2, 
  VolumeX, 
  CloudRain, 
  Bird, 
  Waves, 
  Droplets, 
  Zap, 
  Flame, 
  Music,
  Plane,
  Orbit,
  LibraryBig
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Sound } from '@/hooks/useSoundscape';

interface SoundControlProps {
  sound: Sound;
  onToggle: (soundId: string) => void;
  onVolumeChange: (soundId: string, volume: number) => void;
}

const getSoundIcon = (soundName: string) => {
  const iconMap = {
    Rain: CloudRain,
    Birds: Bird,
    Ocean: Waves,
    Stream: Droplets,
    Bonfire: Flame,
    Plane: Plane,
    Noise: Zap,
    Library: LibraryBig,
    Chimes: Music,
    Space: Orbit,
  };
  return iconMap[soundName as keyof typeof iconMap] || Music;
};

export const SoundControl = ({ sound, onToggle, onVolumeChange }: SoundControlProps) => {
  const SoundIcon = getSoundIcon(sound.name);

  return (
    <div
      className="rounded-2xl p-4 w-full max-w-[140px] relative overflow-hidden transition-transform duration-300 hover:scale-105"
      style={{
        background: "rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(16px) saturate(180%)",
        WebkitBackdropFilter: "blur(16px) saturate(180%)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.25)"
      }}
    >
      {/* Ambient Glow Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-gradient-to-tr from-purple-500/40 to-pink-500/40 rounded-full blur-3xl opacity-40" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-gradient-to-bl from-blue-500/40 to-purple-500/40 rounded-full blur-3xl opacity-40" />
      </div>

      {/* Volume Percentage */}
      <div className="text-xs text-slate-100 font-mono mb-2 min-h-[16px] relative z-10 flex items-center justify-center">
        {sound.isPlaying ? `${Math.round(sound.volume * 100)}` : '0'}
      </div>

      {/* Vertical Slider */}
      <div className="h-40 flex items-center justify-center mb-4 relative z-10">
        <Slider
          value={[sound.isPlaying ? sound.volume : 0]}
          onValueChange={([value]) => {
            console.log('Slider value:', value); // Debugging log
            if (!sound.isPlaying) {
              onToggle(sound.id);
            }
            onVolumeChange(sound.id, value);
          }}
          max={1}
          step={0.01}
          disabled={!sound.isPlaying && sound.volume === 0}
          orientation="vertical"
          className="h-36"
        />
      </div>

      {/* Mute/Unmute Button */}
      <Button
        onClick={() => onToggle(sound.id)}
        variant="glass"
        size="sm"
        className={`
          w-8 h-8 rounded-md mb-4 transition-all items-center justify-center flex mx-auto
          ${sound.isPlaying 
            ? 'text-pink-300 hover:text-pink-200' 
            : 'text-slate-300 hover:text-slate-200'
          }
        `}
      >
        {sound.isPlaying ? (
          <Volume2 className="w-3 h-3" />
        ) : (
          <VolumeX className="w-3 h-3" />
        )}
      </Button>

      {/* Sound Icon */}
      <div className="flex items-center justify-center mb-1 relative z-10 mx-auto">
        <SoundIcon className="w-4 h-4 text-slate-100" />
      </div>

      {/* Sound Name */}
      <div className="text-xs text-slate-100 text-center leading-tight font-medium relative z-10" style={{ minHeight: "20px" }}>
        {sound.name.split(' ').map((word, i) => (
          <div key={i}>{word}</div>
        ))}
      </div>
    </div>
  );
};
