import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';

interface HintPanelProps {
    continent?: string;
    firstLetter?: string;
    continentRevealed: boolean;
    firstLetterRevealed: boolean;
    blurLevel: number;
    onRevealContinent: () => void;
    onRevealFirstLetter: () => void;
    onDecreaseBlur: () => void;
    disabled?: boolean;
}

const PanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  background: ${theme.colors.glass};
  backdrop-filter: blur(${theme.blur});
  border: 1px solid ${theme.colors.glassBorder};
  border-radius: ${theme.radius.md};
`;

const PanelTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
`;

const HintButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const HintButton = styled(motion.button) <{ $used?: boolean }>`
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: ${theme.radius.sm};
  background: ${props => props.$used ? theme.colors.primary : 'transparent'};
  border: 1px solid ${props => props.$used ? theme.colors.primary : theme.colors.glassBorder};
  color: ${props => props.$used ? 'white' : theme.colors.textMuted};
  cursor: ${props => props.$used ? 'default' : 'pointer'};
  transition: all ${theme.transitions.fast};

  &:hover:not(:disabled) {
    background: ${props => props.$used ? theme.colors.primary : theme.colors.glassHover};
    border-color: ${props => props.$used ? theme.colors.primary : theme.colors.primary};
    color: white;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const RevealedHint = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: rgba(99, 102, 241, 0.1);
  border-radius: ${theme.radius.sm};
  font-size: 0.875rem;
`;

const HintLabel = styled.span`
  color: ${theme.colors.textMuted};
`;

const HintValue = styled.span`
  color: ${theme.colors.primary};
  font-weight: 600;
`;

const HintPanel: React.FC<HintPanelProps> = ({
    continent,
    firstLetter,
    continentRevealed,
    firstLetterRevealed,
    blurLevel,
    onRevealContinent,
    onRevealFirstLetter,
    onDecreaseBlur,
    disabled,
}) => {
    return (
        <PanelContainer>
            <PanelTitle>💡 Hints</PanelTitle>
            <HintButtons>
                <HintButton
                    onClick={onRevealContinent}
                    disabled={disabled || continentRevealed}
                    $used={continentRevealed}
                    whileHover={{ scale: continentRevealed ? 1 : 1.02 }}
                    whileTap={{ scale: continentRevealed ? 1 : 0.98 }}
                >
                    🌍 Continent
                </HintButton>
                <HintButton
                    onClick={onRevealFirstLetter}
                    disabled={disabled || firstLetterRevealed}
                    $used={firstLetterRevealed}
                    whileHover={{ scale: firstLetterRevealed ? 1 : 1.02 }}
                    whileTap={{ scale: firstLetterRevealed ? 1 : 0.98 }}
                >
                    🔤 First Letter
                </HintButton>
                <HintButton
                    onClick={onDecreaseBlur}
                    disabled={disabled || blurLevel <= 0}
                    whileHover={{ scale: blurLevel <= 0 ? 1 : 1.02 }}
                    whileTap={{ scale: blurLevel <= 0 ? 1 : 0.98 }}
                >
                    👁️ Clear Flag
                </HintButton>
            </HintButtons>

            {(continentRevealed || firstLetterRevealed) && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {continentRevealed && continent && (
                        <RevealedHint>
                            <HintLabel>Continent:</HintLabel>
                            <HintValue>{continent}</HintValue>
                        </RevealedHint>
                    )}
                    {firstLetterRevealed && firstLetter && (
                        <RevealedHint>
                            <HintLabel>Starts with:</HintLabel>
                            <HintValue>{firstLetter.toUpperCase()}</HintValue>
                        </RevealedHint>
                    )}
                </div>
            )}
        </PanelContainer>
    );
};

export default HintPanel;
