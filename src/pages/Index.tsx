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
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Gradient Mesh Background */}
      <div className="fixed inset-0 -z-10= overflow-hidden">
        {/* Blob 1 – centered */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    w-[600px] h-[600px] rounded-full mix-blend-screen filter blur-3xl opacity-40
                    bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 animate-move1"
        />

        {/* Blob 2 – top right */}
        <div
          className="absolute top-[-20%] right-[-10%]
                    w-[500px] h-[500px] rounded-full mix-blend-screen filter blur-3xl opacity-30
                    bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-move2"
        />

        {/* Blob 3 – bottom left */}
        <div
          className="absolute bottom-[-20%] left-[-10%]
                    w-[700px] h-[700px] rounded-full mix-blend-screen filter blur-3xl opacity-20
                    bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-move3"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto p-4 md:p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3 animate-pulse-soft">
            <h1 className="text-4xl md:text-5xl font-bold bg-white bg-clip-text text-transparent">
              SOUNDSCAPES
            </h1>
          </div>
          
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Mix your perfect relaxation environment. Adjust each sound like a professional equalizer.
          </p>
        
        </div>

        {/* Equalizer Panel */}
        <div className="flex justify-center">
          <div 
            className="p-8 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg"
          >
            {/*
            <h2 className="text-2xl font-semibold mb-6 text-center text-slate-200 flex items-center justify-center space-x-3">
               <Waves className="w-6 h-6 text-purple-400" /> 
              <span>Sound Equalizer</span>
            </h2>
            */}
            
            <div className="flex items-center justify-center space-x-4 ">
              {sounds.map((sound) => (
                <SoundControl
                  key={sound.id}
                  sound={sound}
                  onToggle={() => toggleSound(sound.id)}
                  onVolumeChange={(soundId, volume) => {
                    console.log('Volume:', volume);
                    const validVolume = Array.isArray(volume) ? volume[0] : volume; // Handle slider's array value
                    if (typeof validVolume === 'number' && validVolume >= 0 && validVolume <= 1) {
                      setVolume(soundId, validVolume);
                    }
                  }}
                  />
              ))}
            </div>
            
            {activeSounds > 0 && (
              <div className="mt-8 flex items-center justify-center space-x-4">
                {/* n sounds playing pill */}
                <div className="inline-flex items-center space-x-2 px-5 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                  <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-slate-200">
                    {activeSounds} sound{activeSounds !== 1 ? 's' : ''} playing
                  </span>
                </div>

                {/* Stop All Sounds button */}
                <button
                  onClick={stopAll}
                  className="px-6 py-3 text-sm font-medium rounded-full bg-red-600/80 hover:bg-red-500/90 text-white transition-colors shadow-md"
                >
                  Stop All Sounds
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Side Panel */}
        <div className="grid lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          
          {/* Mix Manager */}
          <div className="p-6 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-md">
            <MixManager
              savedMixes={savedMixes}
              onSaveMix={saveMix}
              onLoadMix={loadMix}
              onDeleteMix={deleteMix}
            />
          </div>

          {/* Timer Controls */}
          <div className="p-6 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-md">
            <TimerControls onTimerComplete={handleTimerComplete} />
          </div>

        </div>

        <div className="text-center text-sm text-slate-400 italic mt-4 lg:mt-0">
          Made by <a href="https://www.linkedin.com/in/lakshay-kothari/" className="underline hover:text-white">Lakshay Kothari</a>  <span>🔥</span>
        </div>

      </div>
    </div>
  );
};

export default Index;
