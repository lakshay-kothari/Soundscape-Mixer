import { useState } from 'react';
import { Save, Play, Trash2, Music } from 'lucide-react';
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
    onLoadMix(mix.id);
    toast({
      title: "Mix Loaded",
      description: `"${mix.name}" is now playing.`,
    });
  };

  const handleDeleteMix = (mix: SoundMix) => {
    onDeleteMix(mix.id);
    toast({
      title: "Mix Deleted",
      description: `"${mix.name}" has been removed.`,
      variant: "destructive",
    });
  };

  return (
    <div className="glass-strong rounded-2xl p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <Music className="w-6 h-6 text-accent" />
        <h2 className="text-xl font-semibold">Sound Mixes</h2>
      </div>

      {/* Save new mix */}
      <div className="flex space-x-2">
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
          className="px-6"
        >
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
      </div>

      {/* Saved mixes */}
      <div className="space-y-3 max-h-60 overflow-y-auto">
        {savedMixes.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Music className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No saved mixes yet.</p>
            <p className="text-sm">Create your first soundscape and save it!</p>
          </div>
        ) : (
          savedMixes.map((mix) => (
            <div
              key={mix.id}
              className="glass rounded-xl p-4 flex items-center justify-between transition-smooth hover:glow-accent"
            >
              <div>
                <h4 className="font-medium">{mix.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {Object.values(mix.sounds).filter(s => s.isPlaying).length} sounds
                </p>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  onClick={() => handleLoadMix(mix)}
                  size="sm"
                  variant="outline"
                >
                  <Play className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => handleDeleteMix(mix)}
                  size="sm"
                  variant="destructive"
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