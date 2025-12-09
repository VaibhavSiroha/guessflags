import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../../styles/theme';
import { shake } from '../../styles/animations';

interface AutocompleteProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: (value: string) => void;
    suggestions: string[];
    correctAnswer?: string;
    isShaking?: boolean;
    disabled?: boolean;
    placeholder?: string;
}

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const InputWrapper = styled(motion.div)`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1.25rem;
  font-size: 1.1rem;
  background: ${theme.colors.glass};
  backdrop-filter: blur(${theme.blur});
  border: 2px solid ${theme.colors.glassBorder};
  border-radius: ${theme.radius.md};
  color: ${theme.colors.text};
  transition: all ${theme.transitions.fast};

  &:focus {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.primaryGlow};
  }

  &::placeholder {
    color: ${theme.colors.textDim};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 0.875rem 1rem;
    font-size: 1rem;
  }
`;

const SuggestionsList = styled(motion.ul)`
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  right: 0;
  margin: 0;
  padding: 0.5rem 0;
  background: ${theme.colors.glass};
  backdrop-filter: blur(${theme.blur});
  border: 1px solid ${theme.colors.glassBorder};
  border-radius: ${theme.radius.md};
  box-shadow: ${theme.shadows.glass};
  list-style: none;
  z-index: 50;
  max-height: 200px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.glassBorder};
    border-radius: 3px;
  }
`;

const SuggestionItem = styled.li<{ $isSelected?: boolean }>`
  padding: 0.75rem 1.25rem;
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  background: ${props => props.$isSelected ? theme.colors.glassHover : 'transparent'};
  color: ${theme.colors.text};

  &:hover {
    background: ${theme.colors.glassHover};
  }
`;

const HighlightedText = styled.span`
  color: ${theme.colors.success};
  font-weight: 600;
`;

const Autocomplete: React.FC<AutocompleteProps> = ({
    value,
    onChange,
    onSubmit,
    suggestions,
    correctAnswer,
    isShaking,
    disabled,
    placeholder = 'Enter country name...',
}) => {
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setSelectedIndex(-1);
    }, [suggestions]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => Math.min(prev + 1, suggestions.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => Math.max(prev - 1, -1));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (selectedIndex >= 0 && suggestions[selectedIndex]) {
                onSubmit(suggestions[selectedIndex]);
            } else {
                onSubmit(value);
            }
            setShowSuggestions(false);
        } else if (e.key === 'Escape') {
            setShowSuggestions(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
        setShowSuggestions(true);
    };

    const handleSuggestionClick = (suggestion: string) => {
        onSubmit(suggestion);
        setShowSuggestions(false);
    };

    const renderHighlightedValue = () => {
        if (!correctAnswer || !value) return value;

        const lower = value.toLowerCase();
        const correctLower = correctAnswer.toLowerCase();

        return value.split('').map((char, i) => {
            const isCorrect = correctLower[i] && lower[i] === correctLower[i];
            return isCorrect ? (
                <HighlightedText key={i}>{char}</HighlightedText>
            ) : (
                <span key={i}>{char}</span>
            );
        });
    };

    return (
        <Container>
            <InputWrapper
                variants={shake}
                animate={isShaking ? 'shake' : undefined}
            >
                <Input
                    ref={inputRef}
                    type="text"
                    value={value}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    placeholder={placeholder}
                    disabled={disabled}
                    autoComplete="off"
                />
            </InputWrapper>

            <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                    <SuggestionsList
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        {suggestions.map((suggestion, index) => (
                            <SuggestionItem
                                key={suggestion}
                                $isSelected={index === selectedIndex}
                                onClick={() => handleSuggestionClick(suggestion)}
                            >
                                {suggestion}
                            </SuggestionItem>
                        ))}
                    </SuggestionsList>
                )}
            </AnimatePresence>
        </Container>
    );
};

export default Autocomplete;
