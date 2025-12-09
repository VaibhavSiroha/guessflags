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
  padding: 0.5rem;
  background: ${theme.colors.glass};
  backdrop-filter: blur(${theme.blur});
  border: 1px solid ${theme.colors.glassBorder};
  border-radius: ${theme.radius.lg};
`;

const ModeButton = styled(motion.button) <{ $active: boolean }>`
  padding: 0.625rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  border-radius: ${theme.radius.md};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  background: ${props => props.$active ? theme.colors.primary : 'transparent'};
  color: ${props => props.$active ? 'white' : theme.colors.textMuted};

  &:hover {
    color: white;
    background: ${props => props.$active ? theme.colors.primary : theme.colors.glassHover};
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
