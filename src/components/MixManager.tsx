import { useState } from 'react';
import { Save, Play, Pause, Trash2, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SoundMix } from '@/hooks/useSoundscape';
import { useToast } from '@/hooks/use-toast';

interface MixManagerProps {
  savedMixes: SoundMix[];
  onSaveMix: (name: string) => SoundMix;
  onLoadMix: (mixId: string) => void;
  onDeleteMix: (mixId: string) => void;
}

export const MixManager = ({ savedMixes, onSaveMix, onLoadMix, onDeleteMix }: MixManagerProps) => {
  const [mixName, setMixName] = useState('');
  const [currentMixId, setCurrentMixId] = useState<string | null>(null); // Track the currently playing mix
  const { toast } = useToast();

  const handleSaveMix = () => {
    if (mixName.trim()) {
      const mix = onSaveMix(mixName.trim());
      setMixName('');
      toast({
        title: "Mix Saved",
        description: `"${mix.name}" has been saved successfully.`,
      });
    }
  };

  const handleLoadMix = (mix: SoundMix) => {
    if (currentMixId === mix.id) {
      // If the mix is already playing, stop it
      setCurrentMixId(null);
      toast({
        title: "Mix Paused",
        description: `"${mix.name}" has been paused.`,
      });
    } else {
      // Play the selected mix
      setCurrentMixId(mix.id);
      onLoadMix(mix.id);
      toast({
        title: "Mix Loaded",
        description: `"${mix.name}" is now playing.`,
      });
    }
  };

  const handleDeleteMix = (mix: SoundMix) => {
    onDeleteMix(mix.id);
    if (currentMixId === mix.id) {
      setCurrentMixId(null); // Clear current mix if it was deleted
    }
    toast({
      title: "Mix Deleted",
      description: `"${mix.name}" has been removed.`,
      variant: "destructive",
    });
  };

  return (
    <div
      className="relative rounded-2xl p-6 overflow-hidden"
      style={{
        background: "rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
        height: '300px',
      }}
    >
      {/* Ambient glow overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-52 h-52 bg-pink-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/2 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <div className="flex items-center space-x-3 relative z-10 mb-6">
        <Music className="w-6 h-6 text-white opacity" />
        <h2 className="text-xl font-semibold text-slate-100">Sound Mixes</h2>
      </div>

      {/* Save new mix */}
      <div className="flex space-x-2 relative z-10 pb-4">
        <Input
          placeholder="Name your mix..."
          value={mixName}
          onChange={(e) => setMixName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSaveMix()}
          className="glass"
        />
        <Button 
          onClick={handleSaveMix} 
          disabled={!mixName.trim()}
          className="px-6 bg-white/10 border border-white/20 hover:bg-white/20 text-slate-100"
        >
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
      </div>

      {/* Saved mixes */}
      <div className="space-y-3 max-h-60 overflow-y-auto relative z-10 custom-scrollbar">
        {savedMixes.length === 0 ? (
          <div className="text-center py-2 text-slate-400">
            <Music className="w-12 h-12 mx-auto mb-2 opacity-40" />
            <p>No saved mixes yet.</p>
            <p className="text-sm opacity-75">Create your first soundscape and save it!</p>
          </div>
        ) : (
          savedMixes.map((mix) => (
            <div
              key={mix.id}
              className="rounded-xl p-4 flex items-center justify-between transition-colors duration-200 hover:border-purple-400/40"
              style={{
                background: "rgba(24, 24, 36, 0.6)", // darker, more solid
                backdropFilter: "blur(6px)",          // lighter blur
                WebkitBackdropFilter: "blur(6px)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <div>
                <h4 className="font-medium text-slate-100">{mix.name}</h4>
                <p className="text-sm text-slate-400">
                  {Object.values(mix.sounds).filter((s) => s.isPlaying).length} sounds
                </p>
              </div>

              <div className="flex space-x-2">
                <Button
                  onClick={() => handleLoadMix(mix)}
                  size="sm"
                  className="bg-blue-500/20 border border-blue-400/30 hover:bg-blue-500/30 text-blue-300"
                >
                  {currentMixId === mix.id ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  onClick={() => handleDeleteMix(mix)}
                  size="sm"
                  className="bg-red-500/20 border border-red-400/30 hover:bg-red-500/30 text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
