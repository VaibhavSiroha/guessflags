import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';

interface BlurToggleProps {
    blurDisabled: boolean;
    onChange: (disabled: boolean) => void;
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
`;

const Label = styled.span`
  font-size: 0.75rem;
  color: ${theme.colors.textDim};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
`;

const ToggleTrack = styled(motion.button) <{ $active: boolean }>`
  position: relative;
  width: 48px;
  height: 26px;
  border-radius: 13px;
  border: none;
  cursor: pointer;
  padding: 2px;
  background: ${props => props.$active
        ? `linear-gradient(135deg, ${theme.colors.primary} 0%, #a855f7 100%)`
        : theme.colors.glass};
  border: 1px solid ${props => props.$active
        ? 'transparent'
        : theme.colors.glassBorder};
  transition: all ${theme.transitions.fast};

  &:hover {
    border-color: ${props => props.$active ? 'transparent' : theme.colors.primary};
  }
`;

const ToggleThumb = styled(motion.div)`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const BlurToggle: React.FC<BlurToggleProps> = ({ blurDisabled, onChange }) => {
    return (
        <Container>
            <Label>👁️ No Blur</Label>
            <ToggleTrack
                $active={blurDisabled}
                onClick={() => onChange(!blurDisabled)}
                whileTap={{ scale: 0.95 }}
            >
                <ToggleThumb
                    animate={{
                        x: blurDisabled ? 22 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
            </ToggleTrack>
        </Container>
    );
};

export default BlurToggle;
