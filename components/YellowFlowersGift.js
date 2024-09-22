import React, { useState, useEffect } from 'react';
import { Heart, Infinity, Volume2, VolumeX, Flower } from 'lucide-react';

const YellowFlowersGift = () => {
    const [showMessage, setShowMessage] = useState(false);
    const [activeMessage, setActiveMessage] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeFlowers, setActiveFlowers] = useState(Array(9).fill(false));

    useEffect(() => {
        const timer = setTimeout(() => setShowMessage(true), 3000);
        return () => clearTimeout(timer);
    }, []);

    const toggleAudio = () => {
        const audio = document.getElementById('backgroundAudio');
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const flowerMessages = [
        "Tu sonrisa es tan hermosa, tan brillante y tan maravillosa como estas flores amarillas.",
        "Cada día contigo es un nuevo comienzo, una página más que poder escribir contigo en nuestra historia de amor.",
        "Nuestro amor crece fuerte y hermoso, como estas flores que lo hacen siempre hasta tocar el cielo.",
        "Eres quien hace que mi mundo tenga color, un color tan brillante y radiante como el sol.",
        "Como estas flores, nuestro amor florece, en todas y cada una de las estaciones del año, en cada momento.",
        "Eres esencial para hacer creacer este amor cada día más y te aseguro que yo lo estaré haciendo por siempre y cada día.",
        "Eres la razón por la que mi corazón puede latir cada día y brillar con tanta intensidad como para que te enamores de mi cada vez.",
        "Nuestro amor es esencial, tan perfecto, es solo nuestro y quiero que siempre siga creciendo más y más.",
        "Contigo, cada momento es tan precioso, tan valioso, especial, en serio que cada momento único y estoy seguro de vivir contigo cada uno."
    ];

    const handleFlowerClick = (index) => {
        setActiveMessage(flowerMessages[index]);
        setActiveFlowers(prev => {
            const newActive = [...prev];
            newActive[index] = !newActive[index];
            return newActive;
        });
    };

    const getFlowerIcon = (isActive) => {
        return isActive ?
            <Heart size={48} className="text-yellow-600" /> :
            <Flower size={48} className="text-yellow-500" />;
    };

    return (
        <div className="min-h-screen bg-yellow-100 flex flex-col items-center justify-center">
            {/* <audio id="backgroundAudio" loop>
                <source src="/api/placeholder/audio" type="audio/mpeg" />
            </audio>
            <button
                onClick={toggleAudio}
                className="absolute top-4 right-4 p-2 text-yellow-950 bg-yellow-300 rounded-full"
            >
                {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
            </button> */}

            <div className="text-4xl mb-0 animate-bounce">🌻</div>
            <h1 className="text-3xl font-bold text-yellow-600 mb-4">Para ti, amor de mi vida</h1>

            <div className="flex space-x-4 mb-8">
                <Infinity className="text-yellow-500" size={48} />
                <Heart className="text-yellow-500" size={48} />
                <Infinity className="text-yellow-500" size={48} />
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
                {flowerMessages.map((_, i) => (
                    <button
                        key={i}
                        className={`w-24 h-24 ${activeFlowers[i] ? 'bg-yellow-400' : 'bg-yellow-300'} rounded-full flex items-center justify-center text-4xl hover:bg-yellow-400 transition-colors duration-300`}
                        onClick={() => handleFlowerClick(i)}
                    >
                        {getFlowerIcon(activeFlowers[i])}
                    </button>
                ))}
            </div>

            <div className="text-xl text-yellow-700 text-center max-w-md min-h-[100px]">
                {activeMessage}
            </div>
        </div>
    );
};

export default YellowFlowersGift;