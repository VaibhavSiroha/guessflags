import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../../styles/theme';
import { flagEnter } from '../../styles/animations';

interface FlagCardProps {
    countryCode: string;
    blurLevel?: number;
    isCorrect?: boolean;
    isWrong?: boolean;
}

const FlagWrapper = styled(motion.div) <{ $isCorrect?: boolean; $isWrong?: boolean }>`
  width: 100%;
  aspect-ratio: 3/2;
  border-radius: ${theme.radius.lg};
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: ${theme.colors.glass};
  backdrop-filter: blur(${theme.blur});
  border: 1px solid ${props =>
        props.$isCorrect ? theme.colors.success :
            props.$isWrong ? theme.colors.error :
                theme.colors.glassBorder};
  box-shadow: ${props =>
        props.$isCorrect ? theme.shadows.successGlow :
            props.$isWrong ? theme.shadows.errorGlow :
                theme.shadows.glass3d};
  transition: all ${theme.transitions.spring};
  transform-style: preserve-3d;
  perspective: 1000px;

  /* Glass reflection effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.08) 0%,
      rgba(255, 255, 255, 0.02) 50%,
      transparent 100%
    );
    border-radius: ${theme.radius.lg} ${theme.radius.lg} 0 0;
    pointer-events: none;
  }

  &:hover {
    box-shadow: ${theme.shadows.glassHover}, ${theme.shadows.glow};
    transform: translateY(-4px) perspective(1000px) rotateX(2deg);
    border-color: ${props =>
        props.$isCorrect ? theme.colors.success :
            props.$isWrong ? theme.colors.error :
                theme.colors.primary};
  }

  @media (max-width: 768px) {
    padding: 1rem;
    border-radius: ${theme.radius.md};
  }
`;

const Flag = styled.img<{ $blur: number }>`
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  filter: blur(${props => props.$blur}px);
  transition: filter ${theme.transitions.slow};
  user-select: none;
  -webkit-user-drag: none;
`;

const FlagCard: React.FC<FlagCardProps> = ({
    countryCode,
    blurLevel = 0,
    isCorrect,
    isWrong,
}) => {
    return (
        <AnimatePresence mode="wait">
            <FlagWrapper
                key={countryCode}
                variants={flagEnter}
                initial="initial"
                animate="animate"
                exit="exit"
                $isCorrect={isCorrect}
                $isWrong={isWrong}
            >
                <Flag
                    src={`/images/${countryCode}.png`}
                    alt="Flag"
                    $blur={blurLevel}
                    draggable={false}
                />
            </FlagWrapper>
        </AnimatePresence>
    );
};

export default FlagCard;
