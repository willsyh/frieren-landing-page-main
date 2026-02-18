import React, { useState, useEffect } from 'react';
import './LoadingScreen.css';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Reset states on mount to ensure animation plays
    setIsExiting(false);
    setIsComplete(false);

    // Mulai animasi keluar setelah 3 detik (lebih lama)
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 3000);

    // Selesaikan loading setelah animasi keluar  
    const completeTimer = setTimeout(() => {
      setIsComplete(true);
      onComplete();
    }, 3800); // Total 3.8 detik

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, []);

  const handleSkip = () => {
    if (!isComplete) {
      setIsExiting(true);
      setTimeout(() => {
        setIsComplete(true);
        onComplete();
      }, 800);
    }
  };

  if (isComplete) return null;

  return (
    <div 
      className={`loading-screen ${isComplete ? 'hide' : ''}`}
      onClick={handleSkip}
    >
      <div className={`logo-container ${isExiting ? 'exit' : ''}`}>
        <img 
          src="/logo.webp" 
          alt="Frieren Logo"
        />
      </div>
    </div>
  );
};

export default LoadingScreen;