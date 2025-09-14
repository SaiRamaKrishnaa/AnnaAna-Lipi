
import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { ModeToggle } from './components/ModeToggle';
import { WordPairInput } from './components/WordPairInput';
import { ResultArea } from './components/ResultArea';
import { encode, decode } from './services/conversionService';
import type { Mode } from './types';

const KolamPattern = () => (
    <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-48 0c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm76 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-48 0c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-48-50c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7z' id='a' fill='%23999999'/%3E%3Cuse xlink:href='%23a' x='-50' y='-25'/%3E%3Cuse xlink:href='%23a' x='50' y='-25'/%3E%3Cuse xlink:href='%23a' x='-50' y='25'/%3E%3Cuse xlink:href='%23a' x='50' y='25'/%3E%3C/svg%3E")`
    }}></div>
);

const App: React.FC = () => {
    const [mode, setMode] = useState<Mode>('encode');
    const [inputText, setInputText] = useState<string>('');
    const [outputText, setOutputText] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [wordZero, setWordZero] = useState<string>('Anna');
    const [wordOne, setWordOne] = useState<string>('Aaana');
    const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

    useEffect(() => {
        try {
            setError('');
            if (inputText.trim() === '') {
                setOutputText('');
                return;
            }
            if (mode === 'encode') {
                const result = encode(inputText, wordZero, wordOne);
                setOutputText(result);
            } else {
                const result = decode(inputText, wordZero, wordOne);
                setOutputText(result);
            }
        } catch (e: unknown) {
            if (e instanceof Error) {
                setError(e.message);
            } else {
                setError('An unknown error occurred.');
            }
            setOutputText('');
        }
    }, [inputText, mode, wordZero, wordOne]);

    const handleSpeak = useCallback(() => {
        if (!outputText || typeof window.speechSynthesis === 'undefined') {
            return;
        }

        if (speechSynthesis.speaking) {
            speechSynthesis.cancel();
            setIsSpeaking(false);
            return;
        }

        const utterance = new SpeechSynthesisUtterance(outputText);
        utterance.lang = 'en-IN';
        utterance.rate = 0.9;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        
        speechSynthesis.speak(utterance);
    }, [outputText]);

    const handleClear = () => {
        setInputText('');
        setOutputText('');
        setError('');
        if (speechSynthesis.speaking) {
            speechSynthesis.cancel();
            setIsSpeaking(false);
        }
    }

    return (
        <div className="min-h-screen bg-orange-50/50 text-stone-800 flex items-center justify-center p-4">
            <main className="relative w-full max-w-4xl bg-orange-100/70 shadow-2xl shadow-orange-900/10 rounded-2xl overflow-hidden border-2 border-orange-200">
                <KolamPattern />
                <div className="relative z-10 p-6 sm:p-10">
                    <Header />

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        <ModeToggle mode={mode} setMode={setMode} />
                        <WordPairInput
                            wordZero={wordZero}
                            setWordZero={setWordZero}
                            wordOne={wordOne}
                            setWordOne={setWordOne}
                        />
                    </div>

                    <div className="mt-8">
                        <label htmlFor="input-text" className="block text-sm font-bold text-stone-600 mb-2">
                           {mode === 'encode' ? 'Enter Text to Encode' : 'Enter Words to Decode'}
                        </label>
                        <div className="relative">
                           <textarea
                                id="input-text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                rows={5}
                                placeholder={mode === 'encode' ? 'Hello World...' : 'Aaana Anna Aaana...'}
                                className="w-full p-4 bg-white/70 rounded-lg border-2 border-orange-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 resize-none shadow-inner"
                           />
                            {inputText && (
                                <button
                                    onClick={handleClear}
                                    className="absolute top-3 right-3 text-stone-400 hover:text-orange-600 transition-colors"
                                    aria-label="Clear input"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>

                    {error && (
                        <div className="mt-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-r-lg">
                            <p className="font-semibold">Error:</p>
                            <p>{error}</p>
                        </div>
                    )}

                    <ResultArea
                        outputText={outputText}
                        isSpeaking={isSpeaking}
                        handleSpeak={handleSpeak}
                    />

                    <footer className="text-center text-sm text-stone-500 mt-10">
                        <p>Crafted with a touch of tradition.</p>
                    </footer>
                </div>
            </main>
        </div>
    );
};

export default App;
