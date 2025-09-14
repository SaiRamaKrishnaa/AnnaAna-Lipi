
import React from 'react';

interface WordPairInputProps {
    wordZero: string;
    setWordZero: (word: string) => void;
    wordOne: string;
    setWordOne: (word: string) => void;
}

export const WordPairInput: React.FC<WordPairInputProps> = ({ wordZero, setWordZero, wordOne, setWordOne }) => {
    return (
        <div>
            <label className="block text-sm font-bold text-stone-600 mb-2">Custom Words</label>
            <div className="flex items-center space-x-2">
                <div className="relative w-1/2">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 font-bold">0 →</span>
                    <input
                        type="text"
                        value={wordZero}
                        onChange={(e) => setWordZero(e.target.value)}
                        className="w-full pl-10 pr-3 py-2.5 bg-white/70 rounded-full border-2 border-orange-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 shadow-inner"
                    />
                </div>
                <div className="relative w-1/2">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 font-bold">1 →</span>
                    <input
                        type="text"
                        value={wordOne}
                        onChange={(e) => setWordOne(e.target.value)}
                        className="w-full pl-10 pr-3 py-2.5 bg-white/70 rounded-full border-2 border-orange-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 shadow-inner"
                    />
                </div>
            </div>
        </div>
    );
};
