
import React from 'react';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { CopyIcon } from './icons/CopyIcon';
import { DownloadIcon } from './icons/DownloadIcon';
import { SpeakerIcon } from './icons/SpeakerIcon';
import { StopIcon } from './icons/StopIcon';

interface ResultAreaProps {
    outputText: string;
    isSpeaking: boolean;
    handleSpeak: () => void;
}

export const ResultArea: React.FC<ResultAreaProps> = ({ outputText, isSpeaking, handleSpeak }) => {
    const [isCopied, copy] = useCopyToClipboard();

    const handleDownload = () => {
        const blob = new Blob([outputText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'converted-text.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const hasOutput = outputText.length > 0;

    return (
        <div className="mt-8">
            <label className="block text-sm font-bold text-stone-600 mb-2">Result</label>
            <div className="relative p-4 min-h-[140px] bg-white/70 rounded-lg border-2 border-orange-200 shadow-inner">
                <div className="absolute top-2 right-2 flex space-x-1">
                    <button
                        onClick={handleSpeak}
                        disabled={!hasOutput}
                        className="p-2 rounded-full text-stone-500 hover:bg-orange-200/80 hover:text-orange-600 disabled:opacity-50 disabled:hover:bg-transparent disabled:text-stone-400 transition-colors"
                        aria-label={isSpeaking ? "Stop speaking" : "Speak result"}
                    >
                        {isSpeaking ? <StopIcon /> : <SpeakerIcon />}
                    </button>
                    <button
                        onClick={() => copy(outputText)}
                        disabled={!hasOutput}
                        className="p-2 rounded-full text-stone-500 hover:bg-orange-200/80 hover:text-orange-600 disabled:opacity-50 disabled:hover:bg-transparent disabled:text-stone-400 transition-colors"
                        aria-label="Copy to clipboard"
                    >
                        <CopyIcon />
                    </button>
                    <button
                        onClick={handleDownload}
                        disabled={!hasOutput}
                        className="p-2 rounded-full text-stone-500 hover:bg-orange-200/80 hover:text-orange-600 disabled:opacity-50 disabled:hover:bg-transparent disabled:text-stone-400 transition-colors"
                        aria-label="Download as text file"
                    >
                        <DownloadIcon />
                    </button>
                </div>
                {isCopied && <div className="absolute bottom-2 right-2 text-xs bg-orange-600 text-white px-2 py-1 rounded-full">Copied!</div>}
                
                {hasOutput ? (
                     <p className="text-stone-800 break-words pr-28">{outputText}</p>
                ) : (
                    <p className="text-stone-400">Your result will appear here...</p>
                )}
            </div>
        </div>
    );
};
