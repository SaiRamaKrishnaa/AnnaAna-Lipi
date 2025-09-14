
import React from 'react';
import type { Mode } from '../types';

interface ModeToggleProps {
    mode: Mode;
    setMode: (mode: Mode) => void;
}

export const ModeToggle: React.FC<ModeToggleProps> = ({ mode, setMode }) => {
    return (
        <div>
            <label className="block text-sm font-bold text-stone-600 mb-2">Mode</label>
            <div className="relative flex w-full p-1 bg-orange-200/80 rounded-full">
                <span
                    className="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out"
                    style={{ transform: mode === 'encode' ? 'translateX(0%)' : 'translateX(100%)' }}
                ></span>
                <button
                    onClick={() => setMode('encode')}
                    className={`relative z-10 w-1/2 py-2 text-center rounded-full font-semibold transition-colors duration-300 ${mode === 'encode' ? 'text-orange-600' : 'text-stone-600'}`}
                >
                    Encode
                </button>
                <button
                    onClick={() => setMode('decode')}
                    className={`relative z-10 w-1/2 py-2 text-center rounded-full font-semibold transition-colors duration-300 ${mode === 'decode' ? 'text-orange-600' : 'text-stone-600'}`}
                >
                    Decode
                </button>
            </div>
        </div>
    );
};
