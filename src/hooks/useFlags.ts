import { useState, useCallback, useMemo, useRef } from 'react';
import { countries, getAllCountryCodes } from '../data/countries';

interface UseFlagsOptions {
    smartShuffle?: boolean;
}

export const useFlags = (options: UseFlagsOptions = {}) => {
    const { smartShuffle = true } = options;
    const [usedFlags, setUsedFlags] = useState<Set<string>>(new Set());
    const [difficultFlags, setDifficultFlags] = useState<Set<string>>(new Set());
    const [currentFlag, setCurrentFlag] = useState<string>('');
    const allCodes = useMemo(() => getAllCountryCodes(), []);
    const isInitialized = useRef(false);

    const getAvailableFlags = useCallback(() => {
        return allCodes.filter(code => !usedFlags.has(code));
    }, [allCodes, usedFlags]);

    const getNextFlag = useCallback((): string => {
        let available = getAvailableFlags();

        if (available.length === 0) {
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

        setUsedFlags(prev => new Set([...Array.from(prev), selectedFlag]));
        setCurrentFlag(selectedFlag);
        return selectedFlag;
    }, [allCodes, getAvailableFlags, smartShuffle, difficultFlags]);

    const initializeGame = useCallback(() => {
        if (!isInitialized.current) {
            isInitialized.current = true;
            return getNextFlag();
        }
        return currentFlag;
    }, [getNextFlag, currentFlag]);

    const markDifficult = useCallback((code: string) => {
        setDifficultFlags(prev => new Set([...Array.from(prev), code]));
    }, []);

    const markEasy = useCallback((code: string) => {
        setDifficultFlags(prev => {
            const newSet = new Set(prev);
            newSet.delete(code);
            return newSet;
        });
    }, []);

    const resetFlags = useCallback(() => {
        setUsedFlags(new Set());
        setDifficultFlags(new Set());
        isInitialized.current = false;
        setCurrentFlag('');
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
