import { useState, useCallback, useMemo, useRef } from 'react';
import { countries, getAllCountryCodes } from '../data/countries';

interface UseFlagsOptions {
    smartShuffle?: boolean;
}

const SESSION_KEY = 'guessflags_session';

interface GameSession {
    usedFlags: string[];
    difficultFlags: string[];
    currentFlag: string;
}

export const useFlags = (options: UseFlagsOptions = {}) => {
    const { smartShuffle = true } = options;

    // Initialize state from sessionStorage
    const [usedFlags, setUsedFlags] = useState<Set<string>>(() => {
        try {
            const saved = sessionStorage.getItem(SESSION_KEY);
            if (saved) {
                const session: GameSession = JSON.parse(saved);
                return new Set(session.usedFlags);
            }
        } catch (e) { console.error('Failed to load session', e); }
        return new Set();
    });

    const [difficultFlags, setDifficultFlags] = useState<Set<string>>(() => {
        try {
            const saved = sessionStorage.getItem(SESSION_KEY);
            if (saved) {
                const session: GameSession = JSON.parse(saved);
                return new Set(session.difficultFlags);
            }
        } catch (e) { console.error('Failed to load session', e); }
        return new Set();
    });

    const [currentFlag, setCurrentFlag] = useState<string>(() => {
        try {
            const saved = sessionStorage.getItem(SESSION_KEY);
            if (saved) {
                const session: GameSession = JSON.parse(saved);
                return session.currentFlag || '';
            }
        } catch (e) { console.error('Failed to load session', e); }
        return '';
    });

    const allCodes = useMemo(() => getAllCountryCodes(), []);
    const isInitialized = useRef(!!currentFlag);

    // Save state to sessionStorage whenever it changes
    const saveSession = useCallback((used: Set<string>, difficult: Set<string>, current: string) => {
        try {
            const session: GameSession = {
                usedFlags: Array.from(used),
                difficultFlags: Array.from(difficult),
                currentFlag: current,
            };
            sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
        } catch (e) {
            console.warn('Failed to save session to sessionStorage');
        }
    }, []);

    const getAvailableFlags = useCallback(() => {
        return allCodes.filter(code => !usedFlags.has(code));
    }, [allCodes, usedFlags]);

    const getNextFlag = useCallback((): string => {
        let available = getAvailableFlags();

        // If all flags used, reset used flags but keep difficult ones
        if (available.length === 0) {
            // Check if we really mistakenly used separate state update here before
            // We want to clear used flags, but ensure we don't immediately pick a just-shown one if possible?
            // For now, standard reset logic:
            setUsedFlags(new Set());
            available = [...allCodes];
        }

        let selectedFlag: string;

        if (smartShuffle && difficultFlags.size > 0 && Math.random() < 0.3) {
            const difficultAvailable = available.filter(code => difficultFlags.has(code));
            if (difficultAvailable.length > 0) {
                selectedFlag = difficultAvailable[Math.floor(Math.random() * difficultAvailable.length)];
            } else {
                selectedFlag = available[Math.floor(Math.random() * available.length)];
            }
        } else {
            selectedFlag = available[Math.floor(Math.random() * available.length)];
        }

        const newUsedFlags = new Set(usedFlags);
        newUsedFlags.add(selectedFlag);

        setUsedFlags(newUsedFlags);
        setCurrentFlag(selectedFlag);
        saveSession(newUsedFlags, difficultFlags, selectedFlag);

        return selectedFlag;
    }, [allCodes, getAvailableFlags, smartShuffle, difficultFlags, usedFlags, saveSession]);

    const initializeGame = useCallback(() => {
        if (!currentFlag && !isInitialized.current) {
            isInitialized.current = true;
            return getNextFlag();
        }
        return currentFlag;
    }, [getNextFlag, currentFlag]);

    const markDifficult = useCallback((code: string) => {
        setDifficultFlags(prev => {
            const newSet = new Set(prev);
            newSet.add(code);
            saveSession(usedFlags, newSet, currentFlag);
            return newSet;
        });
    }, [usedFlags, currentFlag, saveSession]);

    const markEasy = useCallback((code: string) => {
        setDifficultFlags(prev => {
            const newSet = new Set(prev);
            newSet.delete(code);
            saveSession(usedFlags, newSet, currentFlag);
            return newSet;
        });
    }, [usedFlags, currentFlag, saveSession]);

    const resetFlags = useCallback(() => {
        const emptySet = new Set<string>();
        setUsedFlags(emptySet);
        setDifficultFlags(emptySet);
        setCurrentFlag('');
        isInitialized.current = false;
        sessionStorage.removeItem(SESSION_KEY);
    }, []);

    const getCountry = useCallback((code: string) => countries[code], []);

    const progress = useMemo(() => ({
        used: usedFlags.size,
        total: allCodes.length,
        remaining: allCodes.length - usedFlags.size,
        percentage: Math.round((usedFlags.size / allCodes.length) * 100),
    }), [usedFlags.size, allCodes.length]);

    return {
        currentFlag,
        getNextFlag,
        initializeGame,
        markDifficult,
        markEasy,
        resetFlags,
        getCountry,
        progress,
        difficultFlags: Array.from(difficultFlags),
    };
};
