import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);


  // Auto play quando o componente montar
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
      
      // Tentar reproduzir automaticamente
      const playAudio = async () => {
        try {
          await audio.play();
          setIsPlaying(true);
        } catch (error) {
          console.log('Autoplay foi bloqueado pelo browser:', error);
          // Autoplay foi bloqueado, usuário precisa interagir primeiro
        }
      };
      
      playAudio();
    }
  }, []);

  const togglePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Erro ao reproduzir:', error);
      }
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    
    const audio = audioRef.current;
    if (audio && !isMuted) {
      audio.volume = newVolume;
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          .music-slider::-webkit-slider-thumb {
            appearance: none;
            height: 12px;
            width: 12px;
            border-radius: 50%;
            background: #9333ea;
            cursor: pointer;
          }
          
          .music-slider::-moz-range-thumb {
            height: 12px;
            width: 12px;
            border-radius: 50%;
            background: #9333ea;
            cursor: pointer;
            border: none;
          }
        `
      }} />
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed bottom-6 right-6 bg-black/80 backdrop-blur-md border border-purple-600/30 rounded-lg p-4 z-50"
      >
        <audio
          ref={audioRef}
          loop
          preload="auto"
        >
          <source src="/music.mp3" type="audio/mpeg" />
          <source src="/music.ogg" type="audio/ogg" />
          Seu navegador não suporta o elemento de áudio.
        </audio>

        <div className="flex items-center gap-3">
          {/* Music Icon - menunjukkan musik sedang aktif */}
          {isPlaying && (
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-600/20">
              <Music className="w-4 h-4 text-purple-400 animate-pulse" />
            </div>
          )}

          {/* Play/Pause Button */}
          <button
            onClick={togglePlayPause}
            className="p-2 rounded-full bg-purple-600 hover:bg-purple-700 transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-white" />
            ) : (
              <Play className="w-4 h-4 text-white ml-0.5" />
            )}
          </button>

          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="p-1 rounded text-gray-300 hover:text-white transition-colors"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
            
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer music-slider"
            />
          </div>
        </div>
      </motion.div>
    </>
  );
}