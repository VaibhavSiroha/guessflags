import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';

interface GameModeToggleProps {
  mode: 'normal' | 'learn';
  onChange: (mode: 'normal' | 'learn') => void;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  background: ${theme.colors.glass};
  backdrop-filter: blur(${theme.blur});
  border: 1px solid ${theme.colors.glassBorder};
  border-radius: ${theme.radius.lg};
  box-shadow: ${theme.shadows.glass};
`;

const ModeButton = styled(motion.button) <{ $active: boolean }>`
  padding: 0.625rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  border: none;
  border-radius: ${theme.radius.md};
  cursor: pointer;
  transition: all ${theme.transitions.spring};
  background: ${props => props.$active
    ? `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryDark} 100%)`
    : 'transparent'};
  color: ${props => props.$active ? '#0a0f16' : theme.colors.textMuted};
  box-shadow: ${props => props.$active ? theme.shadows.button3d : 'none'};

  &:hover {
    color: ${props => props.$active ? '#0a0f16' : theme.colors.primary};
    background: ${props => props.$active
    ? `linear-gradient(135deg, ${theme.colors.primaryHover} 0%, ${theme.colors.primary} 100%)`
    : theme.colors.glassHover};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const ModeLabel = styled.span`
  font-size: 0.75rem;
  color: ${theme.colors.textDim};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const GameModeToggle: React.FC<GameModeToggleProps> = ({ mode, onChange }) => {
  return (
    <Container>
      <ModeLabel>Mode:</ModeLabel>
      <ModeButton
        $active={mode === 'normal'}
        onClick={() => onChange('normal')}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        ❤️ Normal
      </ModeButton>
      <ModeButton
        $active={mode === 'learn'}
        onClick={() => onChange('learn')}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        📚 Learn
      </ModeButton>
    </Container>
  );
};

export default GameModeToggle;
