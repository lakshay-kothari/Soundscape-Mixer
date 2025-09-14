import { useState, useRef, useCallback } from 'react';

export interface Sound {
  id: string;
  name: string;
  isPlaying: boolean;
  volume: number;
  audio?: HTMLAudioElement;
}

export interface SoundMix {
  id: string;
  name: string;
  sounds: Record<string, { isPlaying: boolean; volume: number }>;
}

const SOUNDS_DATA: Omit<Sound, 'isPlaying' | 'volume' | 'audio'>[] = [
  { id: 'rain', name: 'Rain' },
  { id: 'birdsong', name: 'Birdsong' },
  { id: 'ocean', name: 'Ocean' },
  { id: 'stream', name: 'Stream' },
  { id: 'bonfire', name: 'Bonfire' },
  { id: 'toads', name: 'Toads' },
  { id: 'bowl', name: 'Bowl' },
  { id: 'healing', name: 'Healing' },
  { id: 'whitenoise', name: 'Noise' },
];

export const useSoundscape = () => {
  const [sounds, setSounds] = useState<Sound[]>(() =>
    SOUNDS_DATA.map(sound => ({
      ...sound,
      isPlaying: false,
      volume: 0.5,
    }))
  );

  const [savedMixes, setSavedMixes] = useState<SoundMix[]>(() => {
    const saved = localStorage.getItem('soundscape-mixes');
    return saved ? JSON.parse(saved) : [];
  });

  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});
  const fadeTimeouts = useRef<Record<string, NodeJS.Timeout>>({});

  // Initialize audio elements (placeholder - would use real audio files)
  const initializeAudio = useCallback((soundId: string) => {
    if (!audioRefs.current[soundId]) {
      // In a real app, you would load actual audio files here
      // For now, we'll create silent audio elements as placeholders
      const audio = new Audio();
      audio.loop = true;
      audio.volume = 0;
      audioRefs.current[soundId] = audio;
    }
  }, []);

  const toggleSound = useCallback((soundId: string) => {
    setSounds(prev => prev.map(sound => {
      if (sound.id === soundId) {
        const newPlaying = !sound.isPlaying;
        initializeAudio(soundId);
        
        if (newPlaying) {
          const audio = audioRefs.current[soundId];
          audio.volume = sound.volume;
          audio.play().catch(console.error);
        } else {
          audioRefs.current[soundId]?.pause();
        }
        
        return { ...sound, isPlaying: newPlaying };
      }
      return sound;
    }));
  }, [initializeAudio]);

  const setVolume = useCallback((soundId: string, volume: number) => {
    setSounds(prev => prev.map(sound => {
      if (sound.id === soundId) {
        const audio = audioRefs.current[soundId];
        if (audio) {
          audio.volume = volume;
        }
        return { ...sound, volume };
      }
      return sound;
    }));
  }, []);

  const fadeOutAll = useCallback((duration: number = 3000) => {
    sounds.forEach(sound => {
      if (sound.isPlaying) {
        const audio = audioRefs.current[sound.id];
        if (audio) {
          const startVolume = audio.volume;
          const fadeStep = startVolume / (duration / 100);
          
          const fadeInterval = setInterval(() => {
            if (audio.volume > fadeStep) {
              audio.volume = Math.max(0, audio.volume - fadeStep);
            } else {
              audio.volume = 0;
              audio.pause();
              clearInterval(fadeInterval);
            }
          }, 100);
          
          fadeTimeouts.current[sound.id] = fadeInterval;
        }
      }
    });

    setSounds(prev => prev.map(sound => ({ ...sound, isPlaying: false })));
  }, [sounds]);

  const stopAll = useCallback(() => {
    Object.values(fadeTimeouts.current).forEach(timeout => clearTimeout(timeout));
    Object.values(audioRefs.current).forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
    setSounds(prev => prev.map(sound => ({ ...sound, isPlaying: false })));
  }, []);

  const saveMix = useCallback((name: string) => {
    const mix: SoundMix = {
      id: Date.now().toString(),
      name,
      sounds: sounds.reduce((acc, sound) => {
        acc[sound.id] = {
          isPlaying: sound.isPlaying,
          volume: sound.volume,
        };
        return acc;
      }, {} as Record<string, { isPlaying: boolean; volume: number }>),
    };

    const newMixes = [...savedMixes, mix];
    setSavedMixes(newMixes);
    localStorage.setItem('soundscape-mixes', JSON.stringify(newMixes));
    return mix;
  }, [sounds, savedMixes]);

  const loadMix = useCallback((mixId: string) => {
    const mix = savedMixes.find(m => m.id === mixId);
    if (mix) {
      // First stop all current sounds
      stopAll();
      
      // Then apply the mix
      setTimeout(() => {
        setSounds(prev => prev.map(sound => {
          const mixSound = mix.sounds[sound.id];
          if (mixSound) {
            const audio = audioRefs.current[sound.id];
            if (audio) {
              audio.volume = mixSound.volume;
              if (mixSound.isPlaying) {
                initializeAudio(sound.id);
                audio.play().catch(console.error);
              }
            }
            return {
              ...sound,
              isPlaying: mixSound.isPlaying,
              volume: mixSound.volume,
            };
          }
          return sound;
        }));
      }, 100);
    }
  }, [savedMixes, stopAll, initializeAudio]);

  const deleteMix = useCallback((mixId: string) => {
    const newMixes = savedMixes.filter(mix => mix.id !== mixId);
    setSavedMixes(newMixes);
    localStorage.setItem('soundscape-mixes', JSON.stringify(newMixes));
  }, [savedMixes]);

  return {
    sounds,
    savedMixes,
    toggleSound,
    setVolume,
    fadeOutAll,
    stopAll,
    saveMix,
    loadMix,
    deleteMix,
  };
};