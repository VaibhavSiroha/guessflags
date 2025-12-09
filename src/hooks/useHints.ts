import { useState, useCallback } from 'react';
import { HintState } from '../data/types';

const BLUR_DISABLED_KEY = 'guessFlags_blurDisabled';

const getInitialHintState = (blurDisabled: boolean): HintState => ({
    continentRevealed: false,
    firstLetterRevealed: false,
    blurLevel: blurDisabled ? 0 : 20,
});

const getStoredBlurDisabled = (): boolean => {
    try {
        const stored = localStorage.getItem(BLUR_DISABLED_KEY);
        return stored === 'true';
    } catch {
        return false;
    }
};

export const useHints = () => {
    const [blurDisabled, setBlurDisabledState] = useState<boolean>(getStoredBlurDisabled);
    const [hints, setHints] = useState<HintState>(() => getInitialHintState(getStoredBlurDisabled()));
    const [hintsUsed, setHintsUsed] = useState(0);

    const setBlurDisabled = useCallback((disabled: boolean) => {
        setBlurDisabledState(disabled);
        try {
            localStorage.setItem(BLUR_DISABLED_KEY, String(disabled));
        } catch {
            // Ignore storage errors
        }
        // Update current blur level immediately based on toggle state
        setHints(prev => ({ ...prev, blurLevel: disabled ? 0 : 20 }));
    }, []);

    const revealContinent = useCallback(() => {
        setHints(prev => ({ ...prev, continentRevealed: true }));
        setHintsUsed(prev => prev + 1);
    }, []);

    const revealFirstLetter = useCallback(() => {
        setHints(prev => ({ ...prev, firstLetterRevealed: true }));
        setHintsUsed(prev => prev + 1);
    }, []);

    const decreaseBlur = useCallback(() => {
        setHints(prev => ({
            ...prev,
            blurLevel: Math.max(0, prev.blurLevel - 5),
        }));
        setHintsUsed(prev => prev + 1);
    }, []);

    const resetHints = useCallback(() => {
        setHints(getInitialHintState(blurDisabled));
        setHintsUsed(0);
    }, [blurDisabled]);

    const getHintPenalty = useCallback(() => {
        return hintsUsed * 0.25;
    }, [hintsUsed]);

    return {
        hints,
        hintsUsed,
        blurDisabled,
        setBlurDisabled,
        revealContinent,
        revealFirstLetter,
        decreaseBlur,
        resetHints,
        getHintPenalty,
        canRevealContinent: !hints.continentRevealed,
        canRevealFirstLetter: !hints.firstLetterRevealed,
        canDecreaseBlur: hints.blurLevel > 0,
    };
};
