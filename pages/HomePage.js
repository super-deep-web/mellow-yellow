import React, { useState } from 'react';
import AnimatedFlowers from '../components/AnimatedFlowers';
import YellowFlowerGift from '../components/YellowFlowersGift';

const HomePage = () => {
    const [showGift, setShowGift] = useState(false);

    const toggleView = () => {
        setShowGift(!showGift);
    };

    return (
        <>
            {showGift ? (
                <YellowFlowerGift onNavigate={toggleView} />
            ) : (
                <AnimatedFlowers onNavigate={toggleView} />
            )}
        </>
    );
};

export default HomePage;