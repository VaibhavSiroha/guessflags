// TypeScript interfaces for the Guess Flags app

export interface Country {
  code: string;
  name: string;
  aliases: string[];
  continent: string;
  capital: string;
  population: string;
  funFact: string;
  difficulty: number;
}

export interface CountryData {
  [code: string]: Country;
}

export interface GameState {
  currentFlag: string;
  score: number;
  wrongAttempts: number;
  lives: number;
  isGameOver: boolean;
  showInfo: boolean;
  gameMode: 'normal' | 'learn';
}

export interface HintState {
  continentRevealed: boolean;
  firstLetterRevealed: boolean;
  blurLevel: number;
}

export interface LocalProgress {
  score: number;
  highScore: number;
  wrongFlags: string[];
  learnedFlags: string[];
  totalAttempts: number;
  correctGuesses: number;
}

export interface FlagCardProps {
  countryCode: string;
  blurLevel?: number;
  isCorrect?: boolean;
  isWrong?: boolean;
}

export interface AutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  suggestions: string[];
  correctAnswer?: string;
  isShaking?: boolean;
  disabled?: boolean;
}

export interface LivesProps {
  lives: number;
  maxLives: number;
}

export interface HintPanelProps {
  hints: HintState;
  onRevealContinent: () => void;
  onRevealFirstLetter: () => void;
  onIncreaseBlur: () => void;
  continent?: string;
  firstLetter?: string;
  disabled?: boolean;
}

export interface InfoCardProps {
  country: Country;
  isVisible: boolean;
  onClose: () => void;
}

export interface GameModeToggleProps {
  mode: 'normal' | 'learn';
  onChange: (mode: 'normal' | 'learn') => void;
}
