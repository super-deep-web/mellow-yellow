import React, { useState, useEffect } from 'react';
import { useSpring, animated, config } from 'react-spring';
import { Hand } from 'lucide-react';

// Hook personalizado para obtener el ancho de la ventana
const useWindowWidth = () => {
    const [windowWidth, setWindowWidth] = useState(
        typeof window !== 'undefined' ? window.innerWidth : 0
    );

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowWidth;
};

const Flower = ({ delay, x, y, height }) => {
    const [isGrowing, setIsGrowing] = useState(false);

    const { stemHeight, flowerScale, opacity } = useSpring({
        from: { stemHeight: 0, flowerScale: 0, opacity: 0 },
        to: async (next) => {
            await next({ stemHeight: height, opacity: 1 });
            await next({ flowerScale: 1 });
        },
        delay: delay,
        config: { tension: 120, friction: 14 },
        onStart: () => setIsGrowing(true),
        onRest: () => setIsGrowing(false),
    });

    return (
        <g>
            <animated.line
                x1={x}
                y1={y}
                x2={x}
                y2={stemHeight.to(h => y - h)}
                stroke="#006400"
                strokeWidth="4"
            />
            <animated.path
                d={`M${x},${stemHeight.to(h => y - h * 0.6)} 
           C${x - 20},${stemHeight.to(h => y - h * 0.55)} 
           ${x - 25},${stemHeight.to(h => y - h * 0.5)} 
           ${x - 5},${stemHeight.to(h => y - h * 0.45)}`}
                fill="#228B22"
                stroke="#228B22"
                strokeWidth="2"
                opacity={opacity}
            />
            <animated.g style={{ opacity, transform: flowerScale.to(s => `translate(${x}px, ${y - height}px) scale(${s})`) }}>
                {[...Array(5)].map((_, i) => (
                    <path
                        key={i}
                        d="M0,0 C10,-20 20,-20 30,0 C20,20 10,20 0,0"
                        fill="#FFD700"
                        stroke="#FFA500"
                        strokeWidth="1"
                        transform={`rotate(${i * 72})`}
                    />
                ))}
                <circle cx="0" cy="0" r="5" fill="#FFA500" />
            </animated.g>
        </g>
    );
};

const AnimatedHand = ({ svgWidth, svgHeight }) => {
    const { x, y, opacity } = useSpring({
        from: { x: svgWidth / 2, y: svgHeight / 2, opacity: 0 },
        to: async (next) => {
            await next({ opacity: 1 });
            await next({ x: svgWidth / 2 - 50, y: svgHeight / 2 - 50 });
            await next({ x: svgWidth / 2 + 50, y: svgHeight / 2 + 50 });
            await next({ opacity: 0 });
        },
        config: { tension: 120, friction: 14 },
        loop: true,
    });

    return (
        <animated.g style={{ opacity, transform: x.to(x => `translate(${x}px, ${y.get()}px)`) }}>
            <Hand size={48} color="#FFA500" />
        </animated.g>
    );
};

const AnimatedFlowers = ({ onNavigate }) => {
    const [isClient, setIsClient] = useState(false);
    const [restart, setRestart] = useState(false);
    const [flowers, setFlowers] = useState([]);
    const [showHand, setShowHand] = useState(true);
    const windowWidth = useWindowWidth();

    useEffect(() => {
        setIsClient(true);
        const timer = setTimeout(() => setShowHand(false), 5000); // Oculta la mano después de 5 segundos
        return () => clearTimeout(timer);
    }, []);

    const triggerRestart = () => {
        setRestart(prev => !prev);
        setFlowers([]);
        setShowHand(true);
        setTimeout(() => setShowHand(false), 5000);
    };

    const handleClick = (event) => {
        setShowHand(false);
        const svg = event.currentTarget;
        const rect = svg.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const height = Math.random() * 50 + 50; // Altura aleatoria entre 50 y 100 píxeles
        setFlowers(prevFlowers => [...prevFlowers, { x, y, height }]);
    };

    const svgWidth = Math.min(windowWidth * 0.9, 800);
    const svgHeight = 400;

    if (!isClient) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-yellow-100 flex flex-col items-center justify-center">
            <h1 className="text-3xl font-black text-center text-yellow-600 mb-2">El jardín de nuestro amor</h1>
            <p className='text-lg font-medium text-center text-yellow-950 mb-2'>Con infinidad de flores, como estas flores nuestro amor crece con cada gesto, cada sonrisa y cada instante juntos.</p>
            <svg
                width={svgWidth}
                height={svgHeight}
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className='bg-yellow-200 rounded-2xl border-2 border-yellow-500 cursor-pointer'
                onClick={handleClick}
            >
                {flowers.map((flower, index) => (
                    <Flower
                        key={`flower-${index}-${restart}`}
                        delay={0}
                        x={flower.x}
                        y={flower.y}
                        height={flower.height}
                    />
                ))}
                {showHand && <AnimatedHand svgWidth={svgWidth} svgHeight={svgHeight} />}
            </svg>

            <button
                onClick={triggerRestart}
                className="mt-4 px-4 py-2 bg-yellow-400 font-bold rounded-xl text-yellow-800 hover:bg-yellow-500 transition-colors duration-300"
            >
                Reiniciar
            </button>

            {/* <button
                onClick={onNavigate}
                className="mt-4 px-4 py-2 bg-pink-400 text-pink-800 rounded hover:bg-pink-500 transition-colors duration-300"
            >
                Ver regalo especial
            </button> */}
        </div>
    );
};

export default AnimatedFlowers;