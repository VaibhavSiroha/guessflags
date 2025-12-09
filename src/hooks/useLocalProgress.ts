import { useState, useCallback, useEffect } from 'react';
import { LocalProgress } from '../data/types';

const STORAGE_KEY = 'guessflags_progress';

const defaultProgress: LocalProgress = {
    score: 0,
    highScore: 0,
    wrongFlags: [],
    learnedFlags: [],
    totalAttempts: 0,
    correctGuesses: 0,
};

export const useLocalProgress = () => {
    const [progress, setProgress] = useState<LocalProgress>(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? { ...defaultProgress, ...JSON.parse(saved) } : defaultProgress;
        } catch {
            return defaultProgress;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
        } catch (e) {
            console.warn('Failed to save progress to localStorage');
        }
    }, [progress]);

    const updateScore = useCallback((delta: number) => {
        setProgress(prev => {
            const newScore = Math.max(0, prev.score + delta);
            return {
                ...prev,
                score: newScore,
                highScore: Math.max(prev.highScore, newScore),
            };
        });
    }, []);

    const addWrongFlag = useCallback((code: string) => {
        setProgress(prev => ({
            ...prev,
            wrongFlags: prev.wrongFlags.includes(code)
                ? prev.wrongFlags
                : [...prev.wrongFlags, code],
            totalAttempts: prev.totalAttempts + 1,
        }));
    }, []);

    const addLearnedFlag = useCallback((code: string) => {
        setProgress(prev => ({
            ...prev,
            learnedFlags: prev.learnedFlags.includes(code)
                ? prev.learnedFlags
                : [...prev.learnedFlags, code],
            wrongFlags: prev.wrongFlags.filter(f => f !== code),
            correctGuesses: prev.correctGuesses + 1,
            totalAttempts: prev.totalAttempts + 1,
        }));
    }, []);

    const removeWrongFlag = useCallback((code: string) => {
        setProgress(prev => ({
            ...prev,
            wrongFlags: prev.wrongFlags.filter(f => f !== code),
        }));
    }, []);

    const clearWrongFlags = useCallback(() => {
        setProgress(prev => ({ ...prev, wrongFlags: [] }));
    }, []);

    const resetProgress = useCallback(() => {
        setProgress({ ...defaultProgress, highScore: progress.highScore });
    }, [progress.highScore]);

    const clearAllData = useCallback(() => {
        setProgress(defaultProgress);
        localStorage.removeItem(STORAGE_KEY);
    }, []);

    return {
        ...progress,
        updateScore,
        addWrongFlag,
        addLearnedFlag,
        removeWrongFlag,
        clearWrongFlags,
        resetProgress,
        clearAllData,
    };
};
