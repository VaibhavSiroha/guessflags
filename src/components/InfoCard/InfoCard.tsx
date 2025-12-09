import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../../styles/theme';
import { glassFade } from '../../styles/animations';
import { Country } from '../../data/types';

interface InfoCardProps {
  country: Country;
  isVisible: boolean;
  onClose: () => void;
}

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 1rem;
`;

const Card = styled(motion.div)`
  background: ${theme.colors.glass};
  backdrop-filter: blur(${theme.blur});
  border: 1px solid ${theme.colors.glassBorder};
  border-radius: ${theme.radius.xl};
  padding: 2rem;
  max-width: 400px;
  width: 100%;
  box-shadow: ${theme.shadows.glass3d}, ${theme.shadows.glow};
  position: relative;
  overflow: hidden;

  /* Glass reflection */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 35%;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.08) 0%,
      rgba(255, 255, 255, 0.02) 50%,
      transparent 100%
    );
    pointer-events: none;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const FlagThumb = styled.img`
  width: 64px;
  height: 42px;
  object-fit: cover;
  border-radius: ${theme.radius.sm};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

const CountryName = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: ${theme.colors.text};
`;

const InfoGrid = styled.div`
  display: grid;
  gap: 1rem;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const InfoLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${theme.colors.textMuted};
`;

const InfoValue = styled.span`
  font-size: 1rem;
  color: ${theme.colors.text};
`;

const FunFact = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: ${theme.colors.primaryGlow};
  border-radius: ${theme.radius.md};
  border-left: 3px solid ${theme.colors.primary};
  position: relative;
  z-index: 1;
`;

const FunFactLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${theme.colors.primary};
`;

const FunFactText = styled.p`
  margin: 0.5rem 0 0;
  font-size: 0.9rem;
  color: ${theme.colors.text};
  line-height: 1.5;
`;

const CloseButton = styled(motion.button)`
  width: 100%;
  margin-top: 1.5rem;
  padding: 0.875rem;
  font-size: 1rem;
  font-weight: 700;
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryDark} 100%);
  color: #0a0f16;
  border: none;
  border-radius: ${theme.radius.md};
  cursor: pointer;
  transition: all ${theme.transitions.spring};
  box-shadow: ${theme.shadows.button3d}, ${theme.shadows.glow};
  position: relative;
  z-index: 1;

  &:hover {
    background: linear-gradient(135deg, ${theme.colors.primaryHover} 0%, ${theme.colors.primary} 100%);
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.glassHover}, ${theme.shadows.glowStrong};
  }

  &:active {
    transform: translateY(2px);
    box-shadow: ${theme.shadows.button3dPressed};
  }
`;

const InfoCard: React.FC<InfoCardProps> = ({ country, isVisible, onClose }) => {
  // Handle keyboard events to close the card
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isVisible) {
      // Add a small delay before listening for keyboard events
      // This prevents the Enter key that opened the card from also closing it
      const timer = setTimeout(() => {
        window.addEventListener('keydown', handleKeyDown);
      }, 200);

      return () => {
        clearTimeout(timer);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isVisible, handleKeyDown]);

  return (
    <AnimatePresence>
      {isVisible && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <Card
            variants={glassFade}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <Header>
              <FlagThumb src={`/images/${country.code}.png`} alt={country.name} />
              <CountryName>{country.name}</CountryName>
            </Header>

            <InfoGrid>
              <InfoItem>
                <InfoLabel>🏛️ Capital</InfoLabel>
                <InfoValue>{country.capital}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>🌍 Continent</InfoLabel>
                <InfoValue>{country.continent}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>👥 Population</InfoLabel>
                <InfoValue>{country.population}</InfoValue>
              </InfoItem>
            </InfoGrid>

            <FunFact>
              <FunFactLabel>✨ Fun Fact</FunFactLabel>
              <FunFactText>{country.funFact}</FunFactText>
            </FunFact>

            <CloseButton
              onClick={onClose}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Continue Playing (Press Enter)
            </CloseButton>
          </Card>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default InfoCard;
