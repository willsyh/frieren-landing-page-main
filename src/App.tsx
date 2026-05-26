import React, { useState, useEffect, useRef } from 'react';
import LoadingScreen from "./components/loadingScreen";
import NavBar from "./components/ui/NavBar";
import Banner from "./components/ui/Banner";
import SecaoGallery from "./components/ui/SecaoGallery";
import SecaoCharacters from "./components/ui/SecaoCharacters";
import AMVSection from "./components/ui/AMVSection";
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [musicStarted, setMusicStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [showStartButton, setShowStartButton] = useState(false);

  const [showControls, setShowControls] = useState(false); // false = collapsed (only icon)
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Disable scrolling during loading
    document.body.style.overflow = 'hidden';
    const audio = audioRef.current;
    if (!audio) return;

    const isFirefox = navigator.userAgent.toLowerCase().includes('firefox');

    if (isFirefox) {
      // Firefox strategy: try play with 0 volume and fade in
      audio.volume = 0;
      audio.muted = false;
      const tryAutoplay = async () => {
        try {
          await audio.play();
          let currentVolume = 0;
          const fadeIn = setInterval(() => {
            currentVolume += 0.05;
            if (currentVolume >= volume) {
              currentVolume = volume;
              clearInterval(fadeIn);
            }
            audio.volume = currentVolume;
          }, 50);
          setMusicStarted(true);
          setIsPlaying(true);
        } catch {
          setupUserInteractionListeners();
        }
      };
      tryAutoplay();
    } else {
      // Other browsers: muted autoplay trick
      audio.volume = volume;
      audio.muted = true;
      audio.play()
        .then(() => {
          setMusicStarted(true);
          setIsPlaying(true);
          setTimeout(() => {
            // unmute after short delay
            if (audio) {
              audio.muted = false;
              audio.volume = volume;
            }
          }, 100);
        })
        .catch(() => {
          setupUserInteractionListeners();
        });
    }

    function setupUserInteractionListeners() {
      const handleUserInteraction = () => {
        const a = audioRef.current;
        if (a) {
          a.muted = false;
          a.volume = volume;
          a.play()
            .then(() => {
              setMusicStarted(true);
              setIsPlaying(true);
              setShowStartButton(false);
              removeListeners();
            })
            .catch(() => {
              setShowStartButton(true);
            });
        }
      };

      const removeListeners = () => {
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('keydown', handleUserInteraction);
        document.removeEventListener('touchstart', handleUserInteraction);
        document.removeEventListener('mousemove', handleUserInteraction);
        document.removeEventListener('scroll', handleUserInteraction);
      };

      document.addEventListener('click', handleUserInteraction, { once: true });
      document.addEventListener('keydown', handleUserInteraction, { once: true });
      document.addEventListener('touchstart', handleUserInteraction, { once: true });
      document.addEventListener('mousemove', handleUserInteraction, { once: true });
      document.addEventListener('scroll', handleUserInteraction, { once: true });

      setShowStartButton(true);
    }

    // cleanup not strictly necessary for once: true, but safe
    return () => {
      document.body.style.overflow = 'auto';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    document.body.style.overflow = 'auto';
  };

  const handleStartMusic = () => {
    const audio = audioRef.current;
    if (audio && !musicStarted) {
      audio.play()
        .then(() => {
          setMusicStarted(true);
          setIsPlaying(true);
          setShowStartButton(false);
        })
        .catch((err) => {
          console.log('Error starting music:', err);
        });
    }
  };

  const togglePlayPause = async (e?: React.MouseEvent) => {
    // prevent this click from propagating to the icon toggle
    e?.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        console.error('Error playing audio:', err);
      }
    }
  };

  const toggleMute = (e?: React.MouseEvent) => {
    e?.stopPropagation();
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
    if (audio && !isMuted) audio.volume = newVolume;
  };

  // Animation variants for slide-from-right (panel)
  const panelVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 40 }
  };

  return (
    <>
      {/* audio element */}
      <audio ref={audioRef} loop preload="auto" playsInline crossOrigin="anonymous">
        <source src="/music.mp3" type="audio/mpeg" />
        <source src="/music.ogg" type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>

      {/* Loading */}
      {isLoading && (
        <LoadingScreen onComplete={handleLoadingComplete} onUserInteraction={handleStartMusic} />
      )}

      {/* Start button if interaction required */}
      {!isLoading && showStartButton && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <motion.button
            onClick={handleStartMusic}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-bold text-lg flex items-center gap-3"
          >
            <Play className="w-6 h-6" />
            Start Music
          </motion.button>
        </motion.div>
      )}

      {/* Music control area - fixed bottom-right */}
      {!isLoading && musicStarted && (
        <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40">
          {/* Icon button (always visible). Clicking toggles panel. */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowControls((s) => !s);
            }}
            aria-label={showControls ? 'Hide music controls' : 'Show music controls'}
            title={showControls ? 'Hide music controls' : 'Show music controls'}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-transparent focus:outline-none"
          >
            {/* the ungu pulse icon preserved */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-600/20">
              <Music className="w-5 h-5 text-purple-400 animate-pulse" />
            </div>
          </button>

          {/* Panel: slide in/out from right. Use AnimatePresence + motion.div */}
          <AnimatePresence>
            {showControls && (
              <motion.div
                key="music-panel"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={panelVariants}
                transition={{ duration: 0.22 }}
                onClick={(e) => e.stopPropagation()} // prevent panel clicks from bubbling
                className="mt-2 bg-black/80 backdrop-blur-md border border-purple-600/30 rounded-lg p-2 md:p-3 shadow-lg flex items-center gap-2 md:gap-3 min-w-[150px] md:min-w-[180px]"
              >
                {/* Play/Pause */}
                <button
                  onClick={togglePlayPause}
                  className="p-2 rounded-full bg-purple-600 hover:bg-purple-700 transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white" />}
                </button>

                {/* Mute */}
                <button
                  onClick={toggleMute}
                  className="p-2 rounded-full text-gray-300 hover:text-white transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                {/* Volume slider */}
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-36 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                  aria-label="Volume"
                />

                {/* inline slider styles (keep your purple thumb) */}
                <style dangerouslySetInnerHTML={{
                  __html: `
                    .slider::-webkit-slider-thumb {
                      -webkit-appearance: none;
                      appearance: none;
                      height: 12px;
                      width: 12px;
                      border-radius: 50%;
                      background: #9333ea;
                      cursor: pointer;
                      border: none;
                    }
                    .slider::-moz-range-thumb {
                      height: 12px;
                      width: 12px;
                      border-radius: 50%;
                      background: #9333ea;
                      cursor: pointer;
                      border: none;
                    }
                  `
                }} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* MAIN WEBSITE */}
      <main className={`w-full m-0 p-0 transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <div className="flex flex-col pt-20 h-screen w-full bg-[url('/background.jpeg')] bg-cover bg-center relative">
          <div className="absolute inset-0 bg-black/20 z-0" />
          <NavBar />
          <Banner />
        </div>

        <SecaoGallery />
        <SecaoCharacters />
        <AMVSection />
      </main>
    </>
  );
}

export default App;
