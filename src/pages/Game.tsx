import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../styles/theme';
import { bounce } from '../styles/animations';
import { getAllCountries } from '../data/countries';
import { useFlags, useHints, useLocalProgress } from '../hooks';
import {
  FlagCard,
  Lives,
  HintPanel,
  InfoCard,
  Autocomplete,
  GameModeToggle,
  BlurToggle,
} from '../components';

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
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  text-shadow: 0 0 40px ${theme.colors.primaryGlow};

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;



const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const GameSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ControlsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const Button = styled(motion.button) <{ $variant?: 'primary' | 'secondary' | 'danger' }>`
  padding: 0.875rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: ${theme.radius.md};
  cursor: pointer;
  transition: all ${theme.transitions.spring};
  flex: 1;
  min-width: 120px;
  position: relative;
  
  ${props => {
    switch (props.$variant) {
      case 'danger':
        return `
          background: ${theme.colors.glass};
          backdrop-filter: blur(${theme.blur});
          border: 1px solid ${theme.colors.error};
          color: ${theme.colors.error};
          box-shadow: ${theme.shadows.glass}, 0 0 20px ${theme.colors.errorGlow};
          &:hover { 
            background: ${theme.colors.error}; 
            color: white;
            transform: translateY(-2px);
            box-shadow: ${theme.shadows.glassHover}, ${theme.shadows.errorGlow};
          }
          &:active { transform: translateY(1px); }
        `;
      case 'secondary':
        return `
          background: ${theme.colors.glass};
          backdrop-filter: blur(${theme.blur});
          border: 1px solid ${theme.colors.glassBorder};
          color: ${theme.colors.textMuted};
          box-shadow: ${theme.shadows.glass};
          &:hover { 
            border-color: ${theme.colors.primary}; 
            color: ${theme.colors.primary};
            background: ${theme.colors.glassHover};
            transform: translateY(-2px);
            box-shadow: ${theme.shadows.glassHover}, ${theme.shadows.glow};
          }
          &:active { transform: translateY(1px); }
        `;
      default:
        return `
          background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryDark} 100%);
          border: none;
          color: #0a0f16;
          font-weight: 700;
          box-shadow: ${theme.shadows.button3d}, ${theme.shadows.glow};
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
    }
  }}
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const StatCard = styled(motion.div) <{ $type?: 'success' | 'error' | 'default' }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  background: ${theme.colors.glass};
  backdrop-filter: blur(${theme.blur});
  border: 1px solid ${props =>
    props.$type === 'success' ? theme.colors.success :
      props.$type === 'error' ? theme.colors.error :
        theme.colors.glassBorder};
  border-radius: ${theme.radius.md};
`;

const StatLabel = styled.span`
  font-size: 0.875rem;
  color: ${theme.colors.textMuted};
`;

const StatValue = styled(motion.span)`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${theme.colors.text};
`;

const Message = styled(motion.div) <{ $type: 'success' | 'error' | 'info' }>`
  padding: 1rem;
  border-radius: ${theme.radius.md};
  text-align: center;
  font-weight: 500;
  background: ${props =>
    props.$type === 'success' ? 'rgba(16, 185, 129, 0.15)' :
      props.$type === 'error' ? 'rgba(239, 68, 68, 0.15)' :
        'rgba(99, 102, 241, 0.15)'};
  border: 1px solid ${props =>
    props.$type === 'success' ? theme.colors.success :
      props.$type === 'error' ? theme.colors.error :
        theme.colors.primary};
  color: ${props =>
    props.$type === 'success' ? theme.colors.success :
      props.$type === 'error' ? theme.colors.error :
        theme.colors.primary};
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  flex-wrap: wrap;
`;

const HeaderLink = styled(motion.a)`
  padding: 0.625rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  background: ${theme.colors.glass};
  backdrop-filter: blur(${theme.blur});
  border: 1px solid ${theme.colors.glassBorder};
  border-radius: ${theme.radius.md};
  color: ${theme.colors.textMuted};
  text-decoration: none;
  cursor: pointer;
  transition: all ${theme.transitions.spring};
  box-shadow: ${theme.shadows.glass};

  &:hover {
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
    transform: translateY(-1px);
    box-shadow: ${theme.shadows.glassHover}, ${theme.shadows.glow};
  }

  &:active {
    transform: translateY(1px);
  }
`;

const ResetButton = styled(motion.button)`
  padding: 0.625rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  background: ${theme.colors.glass};
  backdrop-filter: blur(${theme.blur});
  border: 1px solid ${theme.colors.warning};
  border-radius: ${theme.radius.md};
  color: ${theme.colors.warning};
  cursor: pointer;
  transition: all ${theme.transitions.spring};
  box-shadow: ${theme.shadows.glass};

  &:hover {
    background: ${theme.colors.warning};
    color: #0a0f16;
    transform: translateY(-1px);
    box-shadow: ${theme.shadows.glassHover}, 0 0 20px ${theme.colors.warningGlow};
  }

  &:active {
    transform: translateY(1px);
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: ${theme.colors.glass};
  border-radius: 3px;
  overflow: hidden;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary});
  border-radius: 3px;
  box-shadow: 0 0 10px ${theme.colors.primaryGlow}, 0 0 20px ${theme.colors.primaryGlow};
`;

const Game: React.FC = () => {
  const [gameMode, setGameMode] = useState<'normal' | 'learn'>('normal');
  const [userAnswer, setUserAnswer] = useState('');
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [lives, setLives] = useState(3);
  const [isShaking, setIsShaking] = useState(false);
  const [showInfoCard, setShowInfoCard] = useState(false);

  const { currentFlag, getNextFlag, initializeGame, markDifficult, progress, getCountry } = useFlags();
  const { hints, revealContinent, revealFirstLetter, decreaseBlur, resetHints, blurDisabled, setBlurDisabled } = useHints();
  const { score, highScore, wrongFlags, updateScore, addWrongFlag, addLearnedFlag, resetProgress } = useLocalProgress();

  const currentCountry = useMemo(() =>
    currentFlag ? getCountry(currentFlag) : null,
    [currentFlag, getCountry]);

  const allCountries = useMemo(() => getAllCountries(), []);

  const getSuggestions = useCallback((input: string): string[] => {
    if (!input || input.length < 1) return [];
    const lower = input.toLowerCase();
    return allCountries
      .map(c => c.name)
      .filter(name => name.toLowerCase().includes(lower))
      .slice(0, 6);
  }, [allCountries]);

  const suggestions = useMemo(() => getSuggestions(userAnswer), [userAnswer, getSuggestions]);

  useEffect(() => {
    initializeGame();
  }, []);

  const handleNextFlag = useCallback(() => {
    getNextFlag();
    setUserAnswer('');
    setMessage(null);
    resetHints();
    if (gameMode === 'normal') {
      setLives(3);
    }
  }, [getNextFlag, resetHints, gameMode]);

  const handleSubmit = useCallback((answer: string) => {
    if (!currentCountry || !answer.trim()) return;

    const normalizedAnswer = answer.toLowerCase().trim();
    const correctName = currentCountry.name.toLowerCase();
    const isCorrect = normalizedAnswer === correctName ||
      currentCountry.aliases.some(alias => alias.toLowerCase() === normalizedAnswer);

    if (isCorrect) {
      updateScore(1);
      addLearnedFlag(currentFlag);
      setMessage({ text: '🎉 Correct!', type: 'success' });
      setShowInfoCard(true);
    } else {
      if (gameMode === 'normal') {
        const newLives = lives - 1;
        setLives(newLives);
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);

        if (newLives <= 0) {
          markDifficult(currentFlag);
          addWrongFlag(currentFlag);
          setMessage({ text: `❌ The answer was ${currentCountry.name}`, type: 'error' });
          setTimeout(handleNextFlag, 2000);
        } else {
          setMessage({ text: `Wrong! ${newLives} ${newLives === 1 ? 'try' : 'tries'} left`, type: 'error' });
        }
      } else {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
        setMessage({ text: 'Try again!', type: 'info' });
      }
      setUserAnswer('');
    }
  }, [currentCountry, currentFlag, lives, gameMode, updateScore, addLearnedFlag, markDifficult, addWrongFlag, handleNextFlag]);

  const handleReveal = useCallback(() => {
    if (!currentCountry) return;
    markDifficult(currentFlag);
    addWrongFlag(currentFlag);
    updateScore(-1);
    setMessage({ text: `This is ${currentCountry.name}`, type: 'info' });
    setTimeout(handleNextFlag, 2000);
  }, [currentCountry, currentFlag, markDifficult, addWrongFlag, updateScore, handleNextFlag]);

  const handleInfoCardClose = useCallback(() => {
    setShowInfoCard(false);
    handleNextFlag();
  }, [handleNextFlag]);

  if (!currentCountry) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <Header>
        <Title>🌍 Guess Flags</Title>
        <HeaderActions>
          <ResetButton
            onClick={resetProgress}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            🔄 Reset
          </ResetButton>
          <HeaderLink href="#review" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            📝 Review ({wrongFlags.length})
          </HeaderLink>
          <BlurToggle blurDisabled={blurDisabled} onChange={setBlurDisabled} />
          <GameModeToggle mode={gameMode} onChange={setGameMode} />
        </HeaderActions>
      </Header>

      <ProgressBar>
        <ProgressFill
          initial={{ width: 0 }}
          animate={{ width: `${progress.percentage}%` }}
          transition={{ duration: 0.5 }}
        />
      </ProgressBar>

      <MainContent>
        <GameSection>
          <FlagCard
            countryCode={currentFlag}
            blurLevel={hints.blurLevel}
            isCorrect={message?.type === 'success'}
            isWrong={message?.type === 'error'}
          />

          {gameMode === 'normal' && <Lives lives={lives} maxLives={3} />}

          <Autocomplete
            value={userAnswer}
            onChange={setUserAnswer}
            onSubmit={handleSubmit}
            suggestions={suggestions}
            correctAnswer={currentCountry.name}
            isShaking={isShaking}
            disabled={showInfoCard}
            flagKey={currentFlag}
          />

          <ButtonGroup>
            <Button
              onClick={() => handleSubmit(userAnswer)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={showInfoCard}
            >
              Submit
            </Button>
            <Button
              $variant="secondary"
              onClick={handleReveal}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={showInfoCard}
            >
              Reveal Answer
            </Button>
          </ButtonGroup>

          <AnimatePresence mode="wait">
            {message && (
              <Message
                key={message.text}
                $type={message.type}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                {message.text}
              </Message>
            )}
          </AnimatePresence>
        </GameSection>

        <ControlsSection>
          <HintPanel
            continent={currentCountry.continent}
            firstLetter={currentCountry.name[0]}
            continentRevealed={hints.continentRevealed}
            firstLetterRevealed={hints.firstLetterRevealed}
            blurLevel={hints.blurLevel}
            onRevealContinent={revealContinent}
            onRevealFirstLetter={revealFirstLetter}
            onDecreaseBlur={decreaseBlur}
            disabled={showInfoCard}
          />

          <StatsContainer>
            <StatCard
              variants={bounce}
              animate={score > 0 ? 'bounce' : 'initial'}
              key={score}
            >
              <StatLabel>Score</StatLabel>
              <StatValue>{score}</StatValue>
            </StatCard>
            <StatCard>
              <StatLabel>High Score</StatLabel>
              <StatValue>{highScore}</StatValue>
            </StatCard>
            <StatCard $type="success">
              <StatLabel>Progress</StatLabel>
              <StatValue>{progress.used}/{progress.total}</StatValue>
            </StatCard>
            <StatCard $type="error">
              <StatLabel>Wrong</StatLabel>
              <StatValue>{wrongFlags.length}</StatValue>
            </StatCard>
          </StatsContainer>
        </ControlsSection>
      </MainContent>

      <InfoCard
        country={currentCountry}
        isVisible={showInfoCard}
        onClose={handleInfoCardClose}
      />
    </Container>
  );
};

export default Game;
