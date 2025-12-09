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
  padding: 1.25rem;
  background: ${theme.colors.glass};
  backdrop-filter: blur(${theme.blur});
  border: 1px solid ${theme.colors.glassBorder};
  border-radius: ${theme.radius.lg};
  box-shadow: ${theme.shadows.glass3d};
  position: relative;

  /* Glass reflection */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 40%;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.05) 0%,
      transparent 100%
    );
    border-radius: ${theme.radius.lg} ${theme.radius.lg} 0 0;
    pointer-events: none;
  }
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
  padding: 0.5rem 0.875rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: ${theme.radius.sm};
  background: ${props => props.$used
    ? `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryDark} 100%)`
    : theme.colors.glass};
  border: 1px solid ${props => props.$used ? theme.colors.primary : theme.colors.glassBorder};
  color: ${props => props.$used ? '#0a0f16' : theme.colors.textMuted};
  cursor: ${props => props.$used ? 'default' : 'pointer'};
  transition: all ${theme.transitions.spring};
  box-shadow: ${props => props.$used
    ? `${theme.shadows.button3d}, ${theme.shadows.glow}`
    : theme.shadows.glass};
  position: relative;
  z-index: 1;

  &:hover:not(:disabled) {
    background: ${props => props.$used
    ? `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryDark} 100%)`
    : theme.colors.glassHover};
    border-color: ${theme.colors.primary};
    color: ${props => props.$used ? '#0a0f16' : theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.glassHover}, ${theme.shadows.glow};
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
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
  padding: 0.625rem 0.875rem;
  background: ${theme.colors.primaryGlow};
  border: 1px solid ${theme.colors.glassBorder};
  border-radius: ${theme.radius.sm};
  font-size: 0.875rem;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
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
