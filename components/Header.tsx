
import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="text-center">
            <h1 className="font-brand text-5xl md:text-6xl text-orange-600">Anna-Ana Binary</h1>
            <p className="mt-2 text-lg text-stone-600 max-w-2xl mx-auto">
                A modern linguistic tool inspired by South Indian warmth. Convert text to a binary of words and back again.
            </p>
        </header>
    );
};
