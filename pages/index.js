import React, { useState } from 'react';
import AnimatedFlowers from '../components/AnimatedFlowers';
import YellowFlowerGift from '../components/YellowFlowersGift';
import MusicGift from '../components/MusicGift';
import Navbar from '../components/NavBar';

const MainApp = () => {
  const [currentView, setCurrentView] = useState('flowers');

  const renderView = () => {
    switch (currentView) {
      case 'flowers':
        return <AnimatedFlowers />;
      case 'gift':
        return <YellowFlowerGift />;
      case 'music':
        return <MusicGift />;
      default:
        return <AnimatedFlowers />;
    }
  };

  return (
    <div className="min-h-screen bg-yellow-100">
      <Navbar
        currentView={currentView}
        onNavigate={setCurrentView}
      />
      <main className="mb-14 p-4">
        {renderView()}
      </main>
    </div>
  );
};

export default MainApp;