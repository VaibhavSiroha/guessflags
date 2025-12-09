import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../../styles/theme';
import { heartBeat } from '../../styles/animations';

interface LivesProps {
    lives: number;
    maxLives: number;
}

const LivesContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
`;

const HeartWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Heart = styled.svg<{ $active: boolean }>`
  width: 1.75rem;
  height: 1.75rem;
  color: ${props => props.$active ? theme.colors.error : theme.colors.textDim};
  filter: ${props => props.$active ? `drop-shadow(0 0 8px ${theme.colors.errorGlow})` : 'none'};
  transition: all ${theme.transitions.spring};
`;

const Lives: React.FC<LivesProps> = ({ lives, maxLives }) => {
    return (
        <LivesContainer>
            <AnimatePresence>
                {Array.from({ length: maxLives }, (_, i) => (
                    <HeartWrapper
                        key={i}
                        variants={heartBeat}
                        initial="initial"
                        animate={i >= lives ? "lost" : "initial"}
                    >
                        <Heart
                            $active={i < lives}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                        </Heart>
                    </HeartWrapper>
                ))}
            </AnimatePresence>
        </LivesContainer>
    );
};

export default Lives;
