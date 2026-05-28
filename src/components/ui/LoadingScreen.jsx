import React from 'react';
import './LoadingScreen.css';

export default function LoadingScreen() {
  return (
    <div className="loading-screen" role="status" aria-label="Loading">
      <div className="loading-screen__inner">
        <div className="loading-logo">
          <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="loading-logo__svg">
            <path d="M30 4L54 17.5V42.5L30 56L6 42.5V17.5L30 4Z" fill="#F47920"/>
            <path d="M30 12L46 21.5V38.5L30 48L14 38.5V21.5L30 12Z" fill="white"/>
            <circle cx="30" cy="28" r="4" fill="#F47920" className="loading-logo__dot"/>
            <path d="M22 28C22 23.5817 25.5817 20 30 20C34.4183 20 38 23.5817 38 28" stroke="#F47920" strokeWidth="3" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="loading-screen__brand">
          <span className="loading-screen__name">SEDECIA</span>
        </div>
        <div className="loading-screen__bar">
          <div className="loading-screen__progress" />
        </div>
      </div>
    </div>
  );
}
