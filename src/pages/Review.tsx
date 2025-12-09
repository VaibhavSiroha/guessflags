import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../styles/theme';
import { countries } from '../data/countries';
import { useLocalProgress } from '../hooks';
import { InfoCard } from '../components';
import { Country } from '../data/types';

const Container = styled.div`
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
    gap: 1.5rem;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${theme.colors.text};
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const BackButton = styled(motion.a)`
  padding: 0.75rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  background: ${theme.colors.glass};
  backdrop-filter: blur(${theme.blur});
  border: 1px solid ${theme.colors.glassBorder};
  border-radius: ${theme.radius.md};
  color: ${theme.colors.text};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  text-decoration: none;

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }
`;

const FlagGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 0.75rem;
  }
`;

const FlagItem = styled(motion.div)`
  aspect-ratio: 3/2;
  border-radius: ${theme.radius.md};
  overflow: hidden;
  cursor: pointer;
  background: ${theme.colors.glass};
  backdrop-filter: blur(${theme.blur});
  border: 1px solid ${theme.colors.glassBorder};
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all ${theme.transitions.fast};

  &:hover {
    border-color: ${theme.colors.primary};
    box-shadow: ${theme.shadows.glow};
    transform: translateY(-2px);
  }
`;

const FlagImage = styled.img`
  width: 100%;
  max-height: 60%;
  object-fit: contain;
`;

const FlagName = styled.span`
  font-size: 0.75rem;
  color: ${theme.colors.textMuted};
  text-align: center;
  line-height: 1.2;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  gap: 1rem;
`;

const EmptyIcon = styled.span`
  font-size: 4rem;
`;

const EmptyText = styled.p`
  font-size: 1.125rem;
  color: ${theme.colors.textMuted};
  margin: 0;
`;

const ClearButton = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  background: transparent;
  border: 2px solid ${theme.colors.error};
  border-radius: ${theme.radius.md};
  color: ${theme.colors.error};
  cursor: pointer;
  transition: all ${theme.transitions.fast};

  &:hover {
    background: ${theme.colors.error};
    color: white;
  }
`;

const Stats = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const StatBadge = styled.div`
  padding: 0.5rem 1rem;
  background: ${theme.colors.glass};
  backdrop-filter: blur(${theme.blur});
  border: 1px solid ${theme.colors.glassBorder};
  border-radius: ${theme.radius.md};
  font-size: 0.875rem;
  color: ${theme.colors.textMuted};

  span {
    color: ${theme.colors.text};
    font-weight: 600;
  }
`;

const Review: React.FC = () => {
    const { wrongFlags, clearWrongFlags } = useLocalProgress();
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

    const wrongCountries = wrongFlags
        .map(code => countries[code])
        .filter(Boolean);

    const handleClear = () => {
        if (window.confirm('Clear all wrong flags? This cannot be undone.')) {
            clearWrongFlags();
        }
    };

    return (
        <Container>
            <Header>
                <Title>📝 Review Wrong Flags</Title>
                <BackButton href="#" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    ← Back to Game
                </BackButton>
            </Header>

            <Stats>
                <StatBadge>
                    Flags to review: <span>{wrongCountries.length}</span>
                </StatBadge>
                {wrongCountries.length > 0 && (
                    <ClearButton onClick={handleClear} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        Clear All
                    </ClearButton>
                )}
            </Stats>

            {wrongCountries.length === 0 ? (
                <EmptyState>
                    <EmptyIcon>🎉</EmptyIcon>
                    <EmptyText>No wrong flags to review!</EmptyText>
                    <EmptyText style={{ fontSize: '0.875rem' }}>
                        Play the game and flags you get wrong will appear here for review.
                    </EmptyText>
                </EmptyState>
            ) : (
                <FlagGrid>
                    <AnimatePresence>
                        {wrongCountries.map((country) => (
                            <FlagItem
                                key={country.code}
                                onClick={() => setSelectedCountry(country)}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <FlagImage src={`/images/${country.code}.png`} alt={country.name} />
                                <FlagName>{country.name}</FlagName>
                            </FlagItem>
                        ))}
                    </AnimatePresence>
                </FlagGrid>
            )}

            {selectedCountry && (
                <InfoCard
                    country={selectedCountry}
                    isVisible={true}
                    onClose={() => setSelectedCountry(null)}
                />
            )}
        </Container>
    );
};

export default Review;
