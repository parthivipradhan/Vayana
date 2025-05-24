"use client";
import React, { useState, useEffect } from 'react';
import Link from "next/link";

const customStyles = `
  @keyframes elegantHop {
    0% { transform: translateY(0px) scale(1) rotate(0deg); }
    25% { transform: translateY(-30px) scale(1.15) rotate(5deg); }
    50% { transform: translateY(-40px) scale(1.1) rotate(0deg); }
    75% { transform: translateY(-10px) scale(0.95) rotate(-2deg); }
    100% { transform: translateY(0px) scale(1) rotate(0deg); }
  }
  
  @keyframes fadeInLetter {
    0% { opacity: 0; transform: translateY(50px) scale(0.7) rotate(-15deg);}
    40% { opacity: 0.8; transform: translateY(-15px) scale(1.2) rotate(5deg);}
    80% { opacity: 1; transform: translateY(-5px) scale(1.05) rotate(-2deg);}
    100% { opacity: 1; transform: translateY(0px) scale(1) rotate(0deg);}
  }

  @keyframes fadeInUp {
    0% { opacity: 0; transform: translateY(30px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  @keyframes slideInLeft {
    0% { opacity: 0; transform: translateX(-50px); }
    100% { opacity: 1; transform: translateX(0); }
  }

  @keyframes slideInRight {
    0% { opacity: 0; transform: translateX(50px); }
    100% { opacity: 1; transform: translateX(0); }
  }

  @keyframes gentleFloat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-12px); }
  }

  @keyframes breathe {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.02); }
  }

  @keyframes sparkle {
    0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
    50% { opacity: 1; transform: scale(1) rotate(180deg); }
  }

  @keyframes letterGlow {
    0%, 100% { text-shadow: 0 0 5px rgba(34, 197, 94, 0.3); }
    50% { text-shadow: 0 0 20px rgba(34, 197, 94, 0.6), 0 0 30px rgba(34, 197, 94, 0.4); }
  }

  @keyframes backgroundPulse {
    0%, 100% { background: linear-gradient(135deg, rgba(34, 197, 94, 0.05), rgba(74, 222, 128, 0.05)); }
    50% { background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(74, 222, 128, 0.1)); }
  }

  @keyframes cardFloat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-5px); }
  }

  .letter-animate {
    display: inline-block;
    opacity: 0;
    animation: fadeInLetter 1s cubic-bezier(0.25,0.46,0.45,0.94) forwards;
  }
  
  .animate-blink-cursor {
    animation: blinkCursor 1s infinite;
  }
  @keyframes blinkCursor {
    0%, 50% { border-right-color: transparent; }
    51%, 100% { border-right-color: #4ade80; }
  }

  .animate-sparkle {
    animation: sparkle 3s ease-in-out infinite;
  }

  .animate-fade-in-up {
    animation: fadeInUp 0.8s ease-out forwards;
  }

  .animate-slide-in-left {
    animation: slideInLeft 0.8s ease-out forwards;
  }

  .animate-slide-in-right {
    animation: slideInRight 0.8s ease-out forwards;
  }

  .animate-gentle-float {
    animation: gentleFloat 4s ease-in-out infinite;
  }

  .animate-breathe {
    animation: breathe 3s ease-in-out infinite;
  }

  .floating-shapes {
    position: absolute;
    pointer-events: none;
    z-index: 0;
  }

  .shape {
    position: absolute;
    border-radius: 50%;
    background: linear-gradient(45deg, rgba(74, 222, 128, 0.1), rgba(34, 197, 94, 0.1));
    animation: gentleFloat 6s ease-in-out infinite;
  }

  .shape:nth-child(1) {
    width: 60px; height: 60px; top: 20%; left: 10%; animation-delay: 0s;
  }
  .shape:nth-child(2) {
    width: 40px; height: 40px; top: 60%; right: 15%; animation-delay: 2s;
  }
  .shape:nth-child(3) {
    width: 80px; height: 80px; bottom: 20%; left: 20%; animation-delay: 4s;
  }
  .shape:nth-child(4) {
    width: 30px; height: 30px; top: 40%; right: 30%; animation-delay: 1s;
  }

  .feature-card {
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.95);
    border: 1px solid rgba(229, 231, 235, 0.8);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    animation: cardFloat 6s ease-in-out infinite;
  }

  .feature-card:nth-child(odd) { animation-delay: 0s; }
  .feature-card:nth-child(even) { animation-delay: 3s; }

  .feature-card:hover {
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(34, 197, 94, 0.2);
    box-shadow: 0 20px 40px rgba(34, 197, 94, 0.08);
    transform: translateY(-8px) scale(1.02);
  }

  .gradient-text {
    background: linear-gradient(135deg, #059669, #34d399);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .glass-effect {
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.18);
  }

  .therapy-features-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.75rem;
    max-width: 1400px;
    margin: 0 auto;
  }
  
  @media (min-width: 640px) {
    .therapy-features-grid { grid-template-columns: repeat(2, 1fr); gap: 2rem; }
  }
  @media (min-width: 1024px) {
    .therapy-features-grid { grid-template-columns: repeat(3, 1fr); gap: 2.25rem; }
  }
  @media (min-width: 1280px) {
    .therapy-features-grid { grid-template-columns: repeat(4, 1fr); gap: 2rem; }
    .therapy-features-grid .feature-card:nth-child(5) { grid-column: 1 / 3; }
    .therapy-features-grid .feature-card:nth-child(6) { grid-column: 3 / 5; }
    .therapy-features-grid .feature-card:nth-child(7) { grid-column: 2 / 4; }
  }

  .hero-background {
    position: absolute;
    inset: 0;
    animation: backgroundPulse 8s ease-in-out infinite;
    border-radius: 2rem;
  }

  .vayana-glow {
    animation: letterGlow 4s ease-in-out infinite;
  }
`;

const Website = () => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [logoHopped, setLogoHopped] = useState(false);
  const [showFullName, setShowFullName] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [lettersVisible, setLettersVisible] = useState([false, false, false, false, false, false]);
  const [showFeatures, setShowFeatures] = useState(false);

  useEffect(() => {
    const hopTimer = setTimeout(() => setLogoHopped(true), 1200);
    
    const fullText = "Vayana";
    let letterTimers = [];
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
        }, i * 300);
      }
    }, 2500);

    const sparkleTimer = setTimeout(() => setShowSparkles(true), 3200);
    const completeTimer = setTimeout(() => {
      setAnimationComplete(true);
      setShowSparkles(false);
      setShowFeatures(true);
      setTimeout(() => {
        const textElement = document.querySelector('.animate-blink-cursor');
        if (textElement) textElement.style.borderRight = 'none';
      }, 2000);
    }, 6000);

    return () => {
      clearTimeout(hopTimer);
      clearTimeout(nameTimer);
      clearTimeout(sparkleTimer);
      clearTimeout(completeTimer);
      letterTimers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  const features = [
    {
      title: "Therapy in Your Comfort",
      description: "No need to step out of your comfort zone physically, only mentally. Talk from wherever you feel safe and comfortable.",
      icon: <svg className="w-8 h-8 text-green-600 transition-all duration-300 group-hover:text-green-700 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
    },
    {
      title: "Talk Anytime",
      description: "No need to worry about bothering a friend. Vayana is always here when you need someone to listen.",
      icon: <svg className="w-8 h-8 text-green-600 transition-all duration-300 group-hover:text-green-700 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    },
    {
      title: "Safe & Secure",
      description: "Your information is completely secure and private. Share your thoughts without any worries.",
      icon: <svg className="w-8 h-8 text-green-600 transition-all duration-300 group-hover:text-green-700 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
    },
    {
      title: "Remembers Talks",
      description: "Like a true friend who listens and remembers your conversations, building understanding over time.",
      icon: <svg className="w-8 h-8 text-green-600 transition-all duration-300 group-hover:text-green-700 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
    },
    {
      title: "Gen Z Mode",
      description: "A friend who understands and matches your vibe. Speaks your language and gets your references.",
      icon: <svg className="w-8 h-8 text-green-600 transition-all duration-300 group-hover:text-green-700 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    },
    {
      title: "Your Profile",
      description: "Maintains your journey with all setbacks and improvements, tracking your growth over time.",
      icon: <svg className="w-8 h-8 text-green-600 transition-all duration-300 group-hover:text-green-700 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
    },
    {
      title: "Session Breakdown",
      description: "Keeps a detailed history of your conversations, helping you reflect on your thoughts and progress.",
      icon: <svg className="w-8 h-8 text-green-600 transition-all duration-300 group-hover:text-green-700 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
    }
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#fafafa' }}>
        
        <div className="floating-shapes">
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
        </div>

        <header className="flex justify-between items-center p-6 glass-effect relative z-10">
          <div className="flex items-center animate-slide-in-left">
            <div className="relative">
              <div className="flex flex-col items-center animate-breathe">
                <div className="relative w-20 h-20 flex items-center justify-center mb-0">
                  <img src="/Untitled design (1).png" alt="Vayana Logo" className="w-20 h-20 object-contain" />
                </div>
                <div className="text-gray-500 text-xs font-light tracking-widest" style={{ letterSpacing: '0.3em' }}>V A Y A N A</div>
                <div className="w-16 h-px bg-gray-400 mt-2"></div>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 animate-slide-in-right">
            <Link href="/login">
              <button className="cursor-pointer px-6 py-2 text-green-600 border-2 border-green-500 rounded-lg hover:bg-green-50 transition-all duration-300 font-medium transform hover:scale-105 hover:shadow-lg relative overflow-hidden group">
                <span className="relative z-10">Sign In</span>
                <div className="absolute inset-0 bg-green-50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
            </Link>
            <Link href="/signup">
              <button className="cursor-pointer px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300 font-medium shadow-md transform hover:scale-105 hover:shadow-xl relative overflow-hidden group">
                <span className="relative z-10">Sign Up</span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
            </Link>
          </div>
        </header>

        <main className="container mx-auto px-6 relative z-10">
          <div className="flex justify-center items-center min-h-[60vh] py-16">
            <div className="text-center relative">
              <div className="hero-background"></div>
              <div className="relative z-10 p-16">
                <div className="flex items-center justify-center mb-8 relative">
                  <div className="flex items-baseline relative" style={{ lineHeight: '1.2', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                    <div className={`flex items-baseline transition-all duration-300 ${logoHopped ? 'opacity-100' : 'opacity-0'}`}>
                      <div className={`text-8xl md:text-9xl font-light text-gray-800 vayana-glow ${showFullName ? 'animate-blink-cursor' : 'opacity-0'}`} style={{
                        fontFamily: '"Playfair Display", "Georgia", "Times New Roman", serif',
                        fontWeight: '300',
                        letterSpacing: '0.02em',
                        overflow: 'visible',
                        whiteSpace: 'nowrap',
                        borderRight: displayedText.length < 6 ? '4px solid #4ade80' : 'none',
                        paddingRight: '4px',
                        paddingBottom: '10px',
                        lineHeight: '1.1'
                      }}>
                        {"Vayana".split("").map((char, idx) => (
                          <span key={idx} className="letter-animate" style={{
                            animationDelay: `${idx * 0.3 + 2.5}s`,
                            opacity: lettersVisible[idx] ? 1 : 0,
                          }}>
                            {char}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {showSparkles && (
                      <>
                        <div className="absolute -top-8 -left-4 w-4 h-4 bg-green-400 rounded-full animate-sparkle" style={{ animationDelay: '0s' }}></div>
                        <div className="absolute -top-6 right-16 w-3 h-3 bg-green-300 rounded-full animate-sparkle" style={{ animationDelay: '0.7s' }}></div>
                        <div className="absolute -bottom-4 left-32 w-3 h-3 bg-green-500 rounded-full animate-sparkle" style={{ animationDelay: '1.4s' }}></div>
                        <div className="absolute top-4 right-4 w-2 h-2 bg-green-600 rounded-full animate-sparkle" style={{ animationDelay: '2.1s' }}></div>
                        <div className="absolute -top-12 left-1/2 w-3 h-3 bg-green-200 rounded-full animate-sparkle" style={{ animationDelay: '0.5s' }}></div>
                        <div className="absolute -bottom-8 right-24 w-2 h-2 bg-green-400 rounded-full animate-sparkle" style={{ animationDelay: '1.8s' }}></div>
                      </>
                    )}
                  </div>
                </div>
                
                <p className={`text-2xl md:text-3xl text-gray-600 font-light transition-all duration-1000 delay-1000 ${showFullName ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
                  <span className="gradient-text font-medium">Your AI Companion for Emotional Support</span>
                </p>
              </div>
            </div>
          </div>

          <div className={`text-center mt-8 transition-all duration-1000 delay-1500 ${showFullName ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
            <h2 className="text-4xl font-bold text-gray-800 mb-6 animate-gentle-float">
              Welcome to <span className="gradient-text">Vayana</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              Your personal AI companion that's always here to listen, understand, and support you through life's ups and downs. Talk whenever you need someone who truly gets you.
            </p>
          </div>
        </main>

        {showFeatures && (
          <section className="therapy-section">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h3 className="text-4xl font-bold text-gray-800 mb-6 animate-fade-in-up">
                  Therapeutic Support, <span className="gradient-text">Reimagined</span>
                </h3>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Experience a new approach to mental wellness with features designed specifically for your emotional well-being and therapeutic journey.
                </p>
              </div>
              
              <div className="therapy-features-grid">
                {features.map((feature, index) => (
                  <div key={index} className={`feature-card rounded-2xl p-8 text-left relative overflow-hidden animate-fade-in-up`} style={{ animationDelay: `${index * 0.15}s` }}>
                    <div className="relative z-10">
                      <div className="flex items-start space-x-4 mb-6">
                        <div className="feature-icon-wrapper w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0">
                          {feature.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold text-gray-800 mb-3 transition-colors duration-300">{feature.title}</h4>
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed text-base">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <main className="container mx-auto px-6 relative z-10">
          <div className={`text-center mt-24 mb-16 transition-all duration-1000 delay-2000 ${showFullName ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-12 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h3>
                <p className="text-xl mb-8 opacity-90">Take the first step towards better mental wellness today</p>
                <Link href="/signup">
                  <button className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                    Begin Your Session
                  </button>
                </Link>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-green-600/20 animate-pulse"></div>
            </div>
          </div>
        </main>

        <footer className={`glass-effect border-t border-gray-200 py-12 mt-16 transition-all duration-1000 delay-2500 ${showFullName ? 'opacity-100' : 'opacity-0'}`}>
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Vayana</h4>
                <p className="text-gray-600">Your trusted AI companion for emotional support and mental wellness conversations.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Features</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>24/7 AI Support</li>
                  <li>Private Conversations</li>
                  <li>Emotion Recognition</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Resources</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>Mental Health Tips</li>
                  <li>Self-Care Guide</li>
                  <li>Community Support</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibent text-gray-800 mb-4">Contact</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>Always Available</li>
                  <li>hello@vayana.ai</li>
                  <li>Instant Response</li>
                </ul>
              </div>
            </div>
            <div className="text-center pt-8 border-t border-gray-200">
              <p className="text-gray-600">&copy; 2025 Vayana. All rights reserved. | Privacy Policy | Terms of Service</p>
              <p className="text-sm text-gray-500 mt-2">Not a substitute for professional mental health treatment</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Website;
