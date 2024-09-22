import React from 'react';
import { Music, Flower, Gift, Sun } from 'lucide-react';

const NavButton = ({ view, currentView, icon: Icon, label, onNavigate }) => (
    <button
        onClick={() => onNavigate(view)}
        className={`flex flex-col items-center align-middle justify-center px-4 py-2 rounded-full transition-all duration-300 ${currentView === view
            ? 'bg-yellow-400 text-yellow-900'
            : 'bg-yellow-200 text-yellow-700 hover:bg-yellow-300'
            }`}
    >
        <Icon size={24} />
        <span className="mt-0 text-xs font-medium">{label}</span>
    </button>
);

const Navbar = ({ currentView, onNavigate }) => {
    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-yellow-900 p-4 shadow-md">
            <div className="max-w-4xl mx-auto flex justify-between items-center">
                <div className="flex space-x-4 mx-auto justify-between">
                    <NavButton
                        view="flowers"
                        currentView={currentView}
                        icon={Flower}
                        onNavigate={onNavigate}
                    />
                    <NavButton
                        view="gift"
                        currentView={currentView}
                        icon={Gift}
                        onNavigate={onNavigate}
                    />
                    <NavButton
                        view="music"
                        currentView={currentView}
                        icon={Music}
                        onNavigate={onNavigate}
                    />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;