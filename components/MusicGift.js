import React from 'react';
import { Youtube } from 'lucide-react';

const MusicGift = () => {
    const openYouTubeLink = () => {
        // Reemplaza 'VIDEO_ID' con el ID real del video de YouTube
        window.open('https://www.youtube.com/watch?v=Iq-YwZI6Mb4', '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="h-screen bg-yellow-100 flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-center text-yellow-600 mb-4">Algo más para ti</h1>

            <div className="bg-white opacity-75 p-6 rounded-lg shadow-md max-w-md text-center mb-8">
                <p className="text-lg text-yellow-800 mb-4">
                    Para expresarte siempre todos mis sentimientos, sabes muy bien que tengo una canción preparada para tí, para que puedas saber siempre que te estoy amando, para que sepas que mi amor es infinito. Te amo muchísimo mi dulce amorchito.
                </p>
                <p className="text-md text-yellow-700">
                    Haz clic en el botón de abajo para escucharla.
                </p>
            </div>

            <button
                onClick={openYouTubeLink}
                className="bg-yellow-800 hover:bg-yellow-500 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out flex items-center"
            >
                <Youtube className="mr-2" size={24} />
                Ver Video
            </button>
        </div>
    );
};

export default MusicGift;
