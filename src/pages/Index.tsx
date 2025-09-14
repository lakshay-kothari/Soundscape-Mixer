import { Waves, Sparkles } from 'lucide-react';
import { SoundControl } from '@/components/SoundControl';
import { TimerControls } from '@/components/TimerControls';
import { MixManager } from '@/components/MixManager';
import { useSoundscape } from '@/hooks/useSoundscape';

const Index = () => {
  const { 
    sounds, 
    savedMixes, 
    toggleSound, 
    setVolume, 
    fadeOutAll, 
    stopAll, 
    saveMix, 
    loadMix, 
    deleteMix 
  } = useSoundscape();

  const handleTimerComplete = () => {
    fadeOutAll(3000); // 3 second fade out
  };

  const activeSounds = sounds.filter(sound => sound.isPlaying).length;

  return (
    <div 
      className="min-h-screen p-4 md:p-8"
      style={{
        background: "radial-gradient(ellipse at center, #374151 0%, #1f2937 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3 animate-pulse-soft">
            <Waves className="w-8 h-8 text-amber-400" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 bg-clip-text text-transparent">
              Sound Equalizer
            </h1>
            <Sparkles className="w-8 h-8 text-amber-400" />
          </div>
          
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Mix your perfect relaxation environment. Adjust each sound like a professional equalizer.
          </p>
          
          {activeSounds > 0 && (
            <div 
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full"
              style={{
                background: "linear-gradient(145deg, #374151, #1f2937)",
                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2)"
              }}
            >
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-slate-300">
                {activeSounds} sound{activeSounds !== 1 ? 's' : ''} playing
              </span>
            </div>
          )}
        </div>

        {/* Equalizer Panel */}
        <div className="flex justify-center">
          <div 
            className="p-8 rounded-2xl"
            style={{
              background: "linear-gradient(145deg, #374151, #1f2937)",
              boxShadow: "inset 0 4px 8px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.2)"
            }}
          >
            <h2 className="text-2xl font-semibold mb-6 text-center text-slate-200 flex items-center justify-center space-x-3">
              <Waves className="w-6 h-6 text-amber-400" />
              <span>Sound Equalizer</span>
            </h2>
            
            <div className="flex items-center justify-center space-x-4 overflow-x-auto pb-4">
              {sounds.map((sound) => (
                <SoundControl
                  key={sound.id}
                  sound={sound}
                  onToggle={() => toggleSound(sound.id)}
                  onVolumeChange={(volume) => setVolume(sound.id, volume)}
                />
              ))}
            </div>

            {activeSounds > 0 && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={stopAll}
                  className="px-6 py-3 text-sm font-medium rounded-lg transition-all text-slate-300 hover:text-white"
                  style={{
                    background: "linear-gradient(145deg, #dc2626, #b91c1c)",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)"
                  }}
                >
                  Stop All Sounds
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Side Panel */}
        <div className="grid lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Timer Controls */}
          <div 
            className="p-6 rounded-xl"
            style={{
              background: "linear-gradient(145deg, #374151, #1f2937)",
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2)"
            }}
          >
            <TimerControls onTimerComplete={handleTimerComplete} />
          </div>
          
          {/* Mix Manager */}
          <div 
            className="p-6 rounded-xl"
            style={{
              background: "linear-gradient(145deg, #374151, #1f2937)",
              boxShadow: "inset 0 2px 4px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2)"
            }}
          >
            <MixManager
              savedMixes={savedMixes}
              onSaveMix={saveMix}
              onLoadMix={loadMix}
              onDeleteMix={deleteMix}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
