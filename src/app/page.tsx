"use client";
import React, { useState, useEffect } from 'react';
import Link from "next/link";

// Add custom CSS for elegant animations
const customStyles = `
  @keyframes elegantHop {
    0% { transform: translateY(0px) scale(1) rotate(0deg); }
    25% { transform: translateY(-30px) scale(1.15) rotate(5deg); }
    50% { transform: translateY(-40px) scale(1.1) rotate(0deg); }
    75% { transform: translateY(-10px) scale(0.95) rotate(-2deg); }
    100% { transform: translateY(0px) scale(1) rotate(0deg); }
  }
  
  @keyframes hopAndSlideToPosition {
    0% { 
      transform: translateY(0px) translateX(0px) scale(1.2); 
      opacity: 1;
    }
    30% { 
      transform: translateY(-40px) translateX(0px) scale(1.3); 
      opacity: 1;
    }
    60% { 
      transform: translateY(-15px) translateX(-15px) scale(1.1); 
      opacity: 1;
    }
    100% { 
      transform: translateY(0px) translateX(-15px) scale(1); 
      opacity: 1;
    }
  }

  @keyframes fadeInLetter {
    0% { opacity: 0; transform: translateY(30px) scale(0.8) rotate(-10deg);}
    60% { opacity: 1; transform: translateY(-8px) scale(1.1) rotate(2deg);}
    100% { opacity: 1; transform: translateY(0px) scale(1) rotate(0deg);}
  }

  .letter-animate {
    display: inline-block;
    opacity: 0;
    animation: fadeInLetter 0.7s cubic-bezier(0.25,0.46,0.45,0.94) forwards;
  }
  
  .animate-blink-cursor {
    animation: blinkCursor 1s infinite;
  }
  @keyframes blinkCursor {
    0%, 50% { border-right-color: transparent; }
    51%, 100% { border-right-color: #4ade80; }
  }

  .animate-sparkle {
    animation: sparkle 2s ease-in-out infinite;
  }
  @keyframes sparkle {
    0%, 100% { opacity: 0; transform: scale(0); }
    50% { opacity: 1; transform: scale(1); }
  }
`;

const Website = () => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [logoHopped, setLogoHopped] = useState(false);
  const [showFullName, setShowFullName] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [lettersVisible, setLettersVisible] = useState([false, false, false, false, false]);

  useEffect(() => {
    // Sequence of animations with better timing
    const hopTimer = setTimeout(() => {
      setLogoHopped(true);
    }, 1200);

    // Typewriter effect for "ayana" with animated letters
    const fullText = "ayana";
    let letterTimers: NodeJS.Timeout[] = [];
    const nameTimer = setTimeout(() => {
      setShowFullName(true);
      for (let i = 0; i < fullText.length; i++) {
        letterTimers[i] = setTimeout(() => {
          setLettersVisible(prev => {
            const updated = [...prev];
            updated[i] = true;
            return updated;
          });
          setDisplayedText(fullText.slice(0, i + 1));
        }, i * 250);
      }
    }, 2500);

    const sparkleTimer = setTimeout(() => {
      setShowSparkles(true);
    }, 2800);

    const completeTimer = setTimeout(() => {
      setAnimationComplete(true);
      setShowSparkles(false); // Stop sparkles after animation completes
      // Remove cursor after typing completes
      setTimeout(() => {
        const textElement = document.querySelector('.animate-blink-cursor');
        if (textElement) {
          (textElement as HTMLElement).style.borderRight = 'none';
        }
      }, 2000);
    }, 5500);

    return () => {
      clearTimeout(hopTimer);
      clearTimeout(nameTimer);
      clearTimeout(sparkleTimer);
      clearTimeout(completeTimer);
      letterTimers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      <div className="min-h-screen bg-green-600" style={{ backgroundColor: '#fafafa' }}>
      {/* Header */}
      <header className="flex justify-between items-center p-6">
        {/* Logo Section - Top Left */}
        <div className="flex items-center">
          {/* Vayana Logo - Using image.png without circle */}
          <div className="relative">
            <div className="flex flex-col items-center">
              {/* Static Logo without background */}
              <div className="relative w-20 h-20 flex items-center justify-center mb-0">
                {/* Logo Image */}
                <img 
                  src="/Untitled design (1).png" 
                  alt="Vayana Logo" 
                  className="w-20 h-20 object-contain"
                />
              </div>
              
              {/* VAYANA text */}
              <div className="text-gray-500 text-xs font-light tracking-widest" style={{ letterSpacing: '0.3em' }}>
                V A Y A N A
              </div>
              <div className="w-16 h-px bg-gray-400 mt-2"></div>
            </div>
          </div>
        </div>

        {/* Sign In / Sign Up Buttons - Top Right */}
        <div className="flex space-x-4">
          <Link href="/components/login"><button className="cursor-pointer px-6 py-2 text-green-600 border-2 border-green-500 rounded-lg hover:bg-green-50 transition-colors duration-200 font-medium">
            Sign In
          </button></Link>
           <Link href="/components/signUp"><button className="cursor-pointer px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 font-medium shadow-md">
            Sign Up
          </button></Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container mx-auto px-6">
        {/* Centered Brand Name that appears after animation */}
        <div className="flex justify-center items-center min-h-96">
          <div className={`text-center transition-all duration-2000 ease-in ${
            animationComplete ? 'opacity-100 transform translate-y-0 scale-100' : 'opacity-100 transform translate-y-0 scale-100'
          }`}>
            {/* Vayana with Logo - Elegant animation sequence */}
            <div className="flex items-center justify-center mb-6 relative">
              {/* Container for the complete word */}
              <div className="flex items-baseline relative" style={{ 
                lineHeight: '1',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}>
                {/* Only the animated text */}
                <div className={`flex items-baseline transition-all duration-300 ${
                  logoHopped ? 'opacity-100' : 'opacity-0'
                }`}>
                  {/* ayana text with animated letters */}
                  <div className={`text-5xl md:text-7xl font-light text-gray-800 ${
                    showFullName ? 'animate-blink-cursor' : 'opacity-0'
                  }`} style={{
                    fontFamily: '"Playfair Display", "Georgia", "Times New Roman", serif',
                    fontWeight: '300',
                    letterSpacing: '0.02em',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    borderRight: displayedText.length < 5 ? '3px solid #4ade80' : 'none',
                    paddingRight: '2px'
                  }}>
                    {"Vayana".split("").map((char, idx) => (
                      <span
                        key={idx}
                        className="letter-animate"
                        style={{
                          animationDelay: `${idx * 0.25 + 2.5}s`,
                          opacity: lettersVisible[idx] ? 1 : 0,
                        }}
                      >
                        {char}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Sparkle effects */}
                {showSparkles && (
                  <>
                    <div className="absolute -top-4 -left-2 w-3 h-3 bg-green-400 rounded-full animate-sparkle" style={{ animationDelay: '0s' }}></div>
                    <div className="absolute -top-2 right-10 w-2 h-2 bg-green-300 rounded-full animate-sparkle" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute -bottom-2 left-20 w-2 h-2 bg-green-500 rounded-full animate-sparkle" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-1 right-2 w-1 h-1 bg-green-600 rounded-full animate-sparkle" style={{ animationDelay: '1.5s' }}></div>
                  </>
                )}
              </div>
            </div>
            
            <p className={`text-xl md:text-2xl text-gray-600 font-light transition-all duration-1000 delay-1000 ${
              showFullName ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
            }`}>
              Your Yapping Companion
            </p>
          </div>
        </div>

        {/* Additional Content Section */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-1500 ${
          showFullName ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
        }`}>
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Welcome to Vayana
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Experience therapy like never before with Vayana - your personal wellness companion that brings professional mental health support directly to you.
          </p>
        </div>

        {/* Features Section with Glowing Hover Effects */}
        <div className={`grid md:grid-cols-2 gap-8 mt-16 mb-16 transition-all duration-1000 delay-2000 ${
          showFullName ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-12'
        }`}>
          <div className="bg-white rounded-xl shadow-md p-8 text-center transition-all duration-300 hover:shadow-2xl hover:shadow-green-200 hover:scale-105 hover:bg-gradient-to-br hover:from-white hover:to-green-50 group cursor-pointer relative">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:bg-green-200 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-green-300">
              <svg className="w-8 h-8 text-green-600 transition-all duration-300 group-hover:text-green-700 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 transition-colors duration-300 group-hover:text-green-700">Therapy in Your Comfort</h3>
            <p className="text-gray-600 text-lg transition-colors duration-300 group-hover:text-gray-700">Take therapy anywhere anytime in your own time schedule</p>
            
            {/* Glowing border effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-400 to-green-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-8 text-center transition-all duration-300 hover:shadow-2xl hover:shadow-green-200 hover:scale-105 hover:bg-gradient-to-br hover:from-white hover:to-green-50 group cursor-pointer relative">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:bg-green-200 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-green-300">
              <svg className="w-8 h-8 text-green-600 transition-all duration-300 group-hover:text-green-700 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 transition-colors duration-300 group-hover:text-green-700">Safe</h3>
            <p className="text-gray-600 text-lg transition-colors duration-300 group-hover:text-gray-700">Share your data without worry, your data is secure</p>
            
            {/* Glowing border effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-400 to-green-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`bg-white border-t border-gray-200 py-8 mt-16 transition-all duration-1000 delay-2500 ${
        showFullName ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-600">&copy; 2025 Vayana. All rights reserved.</p>
        </div>
      </footer>
    </div>
    </>
  );
};

export default Website;
