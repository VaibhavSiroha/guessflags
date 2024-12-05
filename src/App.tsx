import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { motion } from 'framer-motion';

interface CountryInfo {
  name: string;
  aliases: string[];
}

interface CountryData {
  [key: string]: CountryInfo;
}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: #1a1a1a;
    color: #ffffff;
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    box-sizing: border-box;
  }

  @media (max-width: 768px) {
    html {
      font-size: 14px;
    }
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #fff;
  margin: 0 0 2rem;
  text-align: center;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);

  @media (max-width: 768px) {
    font-size: 2rem;
    margin: 0 0 1.5rem;
  }
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: minmax(auto, 600px) minmax(300px, 500px);
  gap: 4rem;
  align-items: start;
  justify-content: space-between;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const QuizContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-right: 2rem;

  @media (max-width: 768px) {
    padding-right: 0;
    gap: 1rem;
  }
`;

const FlagContainer = styled(motion.div)`
  width: 100%;
  aspect-ratio: 3/2;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  background: #2a2a2a;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  @media (max-width: 768px) {
    padding: 0.5rem;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  }
`;

const Flag = styled.img`
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
`;

const InputContainer = styled.div`
  width: 100%;
  position: relative;
`;

const AnswerInput = styled.input`
  width: 100%;
  padding: 1rem 1.5rem;
  font-size: 1.1rem;
  border: 2px solid #333;
  border-radius: 8px;
  background: #2a2a2a;
  color: #fff;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: #4a9eff;
    box-shadow: 0 0 0 3px rgba(74, 158, 255, 0.2);
  }

  &::placeholder {
    color: #666;
  }

  @media (max-width: 768px) {
    padding: 0.875rem 1.25rem;
    font-size: 1rem;
  }
`;

const SuggestionsList = styled(motion.ul)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin: 0.5rem 0 0;
  padding: 0.5rem 0;
  background: #2a2a2a;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  list-style: none;
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #1a1a1a;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #444;
    border-radius: 4px;
  }

  @media (max-width: 768px) {
    max-height: 160px;
  }
`;

const SuggestionItem = styled.li<{ $isSelected?: boolean }>`
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.$isSelected ? '#444' : 'transparent'};

  &:hover {
    background: #333;
  }

  @media (max-width: 768px) {
    padding: 0.625rem 1.25rem;
  }
`;

const GameControls = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

const Button = styled(motion.button)`
  background: #4a9eff;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  flex: 1;

  &:hover {
    background: #3d8ae0;
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 0.875rem;
  }
`;

const RevealButton = styled(motion.button)`
  background: transparent;
  border: 2px solid #444;
  color: #888;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-weight: 500;
  flex: 1;

  &:hover {
    border-color: #666;
    color: #fff;
    background: rgba(255, 255, 255, 0.1);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 0.875rem;
  }
`;

const Message = styled(motion.div)<{ $isCorrect?: boolean }>`
  font-size: 1.2rem;
  color: ${props => props.$isCorrect ? '#4ade80' : '#ff4a4a'};
  text-align: center;
  font-weight: 500;
  padding: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ScoreContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const ScoreLabel = styled.span`
  font-size: 1.2rem;
  color: #888;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ScoreValue = styled(motion.span)`
  font-size: 1.5rem;
  font-weight: 600;
  color: #4ade80;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const countryData: CountryData = {
  'ad': { name: 'Andorra', aliases: ['principality of andorra'] },
  'ae': { name: 'United Arab Emirates', aliases: ['uae', 'emirates'] },
  'af': { name: 'Afghanistan', aliases: [] },
  'ag': { name: 'Antigua and Barbuda', aliases: ['antigua'] },
  'ai': { name: 'Anguilla', aliases: [] },
  'al': { name: 'Albania', aliases: ['republic of albania'] },
  'am': { name: 'Armenia', aliases: [] },
  'ao': { name: 'Angola', aliases: [] },
  'aq': { name: 'Antarctica', aliases: [] },
  'ar': { name: 'Argentina', aliases: [] },
  'as': { name: 'American Samoa', aliases: [] },
  'at': { name: 'Austria', aliases: [] },
  'au': { name: 'Australia', aliases: ['commonwealth of australia'] },
  'aw': { name: 'Aruba', aliases: [] },
  'ax': { name: 'Åland Islands', aliases: ['aland islands'] },
  'az': { name: 'Azerbaijan', aliases: [] },
  'ba': { name: 'Bosnia and Herzegovina', aliases: ['bosnia'] },
  'bb': { name: 'Barbados', aliases: [] },
  'bd': { name: 'Bangladesh', aliases: [] },
  'be': { name: 'Belgium', aliases: [] },
  'bf': { name: 'Burkina Faso', aliases: [] },
  'bg': { name: 'Bulgaria', aliases: [] },
  'bh': { name: 'Bahrain', aliases: [] },
  'bi': { name: 'Burundi', aliases: [] },
  'bj': { name: 'Benin', aliases: [] },
  'bl': { name: 'Saint Barthélemy', aliases: ['saint barthelemy'] },
  'bm': { name: 'Bermuda', aliases: [] },
  'bn': { name: 'Brunei', aliases: ['brunei darussalam'] },
  'bo': { name: 'Bolivia', aliases: [] },
  'bq': { name: 'Caribbean Netherlands', aliases: ['bonaire'] },
  'br': { name: 'Brazil', aliases: [] },
  'bs': { name: 'Bahamas', aliases: [] },
  'bt': { name: 'Bhutan', aliases: [] },
  'bv': { name: 'Bouvet Island', aliases: [] },
  'bw': { name: 'Botswana', aliases: [] },
  'by': { name: 'Belarus', aliases: [] },
  'bz': { name: 'Belize', aliases: [] },
  'ca': { name: 'Canada', aliases: [] },
  'cc': { name: 'Cocos Islands', aliases: ['keeling islands'] },
  'cd': { name: 'Democratic Republic of the Congo', aliases: ['congo'] },
  'cf': { name: 'Central African Republic', aliases: ['car'] },
  'cg': { name: 'Republic of the Congo', aliases: ['congo'] },
  'ch': { name: 'Switzerland', aliases: ['swiss confederation'] },
  'ci': { name: 'Ivory Coast', aliases: ['cote d\'ivoire'] },
  'ck': { name: 'Cook Islands', aliases: [] },
  'cl': { name: 'Chile', aliases: [] },
  'cm': { name: 'Cameroon', aliases: [] },
  'cn': { name: 'China', aliases: ['peoples republic of china'] },
  'co': { name: 'Colombia', aliases: [] },
  'cr': { name: 'Costa Rica', aliases: [] },
  'cu': { name: 'Cuba', aliases: [] },
  'cv': { name: 'Cape Verde', aliases: ['cabo verde'] },
  'cw': { name: 'Curaçao', aliases: ['curacao'] },
  'cx': { name: 'Christmas Island', aliases: [] },
  'cy': { name: 'Cyprus', aliases: [] },
  'cz': { name: 'Czech Republic', aliases: ['czechia'] },
  'de': { name: 'Germany', aliases: ['deutschland'] },
  'dj': { name: 'Djibouti', aliases: [] },
  'dk': { name: 'Denmark', aliases: [] },
  'dm': { name: 'Dominica', aliases: [] },
  'do': { name: 'Dominican Republic', aliases: [] },
  'dz': { name: 'Algeria', aliases: [] },
  'ec': { name: 'Ecuador', aliases: [] },
  'ee': { name: 'Estonia', aliases: [] },
  'eg': { name: 'Egypt', aliases: [] },
  'eh': { name: 'Western Sahara', aliases: [] },
  'er': { name: 'Eritrea', aliases: [] },
  'es': { name: 'Spain', aliases: ['españa', 'espana'] },
  'et': { name: 'Ethiopia', aliases: [] },
  'fi': { name: 'Finland', aliases: [] },
  'fj': { name: 'Fiji', aliases: [] },
  'fk': { name: 'Falkland Islands', aliases: ['malvinas'] },
  'fm': { name: 'Micronesia', aliases: [] },
  'fo': { name: 'Faroe Islands', aliases: [] },
  'fr': { name: 'France', aliases: ['french republic'] },
  'ga': { name: 'Gabon', aliases: [] },
  'gb': { name: 'United Kingdom', aliases: ['uk', 'great britain'] },
  'gd': { name: 'Grenada', aliases: [] },
  'ge': { name: 'Georgia', aliases: [] },
  'gf': { name: 'French Guiana', aliases: [] },
  'gg': { name: 'Guernsey', aliases: [] },
  'gh': { name: 'Ghana', aliases: [] },
  'gi': { name: 'Gibraltar', aliases: [] },
  'gl': { name: 'Greenland', aliases: [] },
  'gm': { name: 'Gambia', aliases: [] },
  'gn': { name: 'Guinea', aliases: [] },
  'gp': { name: 'Guadeloupe', aliases: [] },
  'gq': { name: 'Equatorial Guinea', aliases: [] },
  'gr': { name: 'Greece', aliases: ['hellas'] },
  'gs': { name: 'South Georgia', aliases: ['south sandwich islands'] },
  'gt': { name: 'Guatemala', aliases: [] },
  'gu': { name: 'Guam', aliases: [] },
  'gw': { name: 'Guinea-Bissau', aliases: [] },
  'gy': { name: 'Guyana', aliases: [] },
  'hk': { name: 'Hong Kong', aliases: [] },
  'hm': { name: 'Heard Island', aliases: ['mcdonald islands'] },
  'hn': { name: 'Honduras', aliases: [] },
  'hr': { name: 'Croatia', aliases: [] },
  'ht': { name: 'Haiti', aliases: [] },
  'hu': { name: 'Hungary', aliases: [] },
  'id': { name: 'Indonesia', aliases: [] },
  'ie': { name: 'Ireland', aliases: [] },
  'il': { name: 'Israel', aliases: [] },
  'im': { name: 'Isle of Man', aliases: [] },
  'in': { name: 'India', aliases: [] },
  'io': { name: 'British Indian Ocean Territory', aliases: ['biot'] },
  'iq': { name: 'Iraq', aliases: [] },
  'ir': { name: 'Iran', aliases: [] },
  'is': { name: 'Iceland', aliases: [] },
  'it': { name: 'Italy', aliases: ['italia'] },
  'je': { name: 'Jersey', aliases: [] },
  'jm': { name: 'Jamaica', aliases: [] },
  'jo': { name: 'Jordan', aliases: [] },
  'jp': { name: 'Japan', aliases: ['nippon'] },
  'ke': { name: 'Kenya', aliases: [] },
  'kg': { name: 'Kyrgyzstan', aliases: [] },
  'kh': { name: 'Cambodia', aliases: [] },
  'ki': { name: 'Kiribati', aliases: [] },
  'km': { name: 'Comoros', aliases: [] },
  'kn': { name: 'Saint Kitts and Nevis', aliases: ['saint kitts'] },
  'kp': { name: 'North Korea', aliases: ['dprk'] },
  'kr': { name: 'South Korea', aliases: ['korea'] },
  'kw': { name: 'Kuwait', aliases: [] },
  'ky': { name: 'Cayman Islands', aliases: [] },
  'kz': { name: 'Kazakhstan', aliases: [] },
  'la': { name: 'Laos', aliases: [] },
  'lb': { name: 'Lebanon', aliases: [] },
  'lc': { name: 'Saint Lucia', aliases: [] },
  'li': { name: 'Liechtenstein', aliases: [] },
  'lk': { name: 'Sri Lanka', aliases: [] },
  'lr': { name: 'Liberia', aliases: [] },
  'ls': { name: 'Lesotho', aliases: [] },
  'lt': { name: 'Lithuania', aliases: [] },
  'lu': { name: 'Luxembourg', aliases: [] },
  'lv': { name: 'Latvia', aliases: [] },
  'ly': { name: 'Libya', aliases: [] },
  'ma': { name: 'Morocco', aliases: [] },
  'mc': { name: 'Monaco', aliases: [] },
  'md': { name: 'Moldova', aliases: [] },
  'me': { name: 'Montenegro', aliases: [] },
  'mf': { name: 'Saint Martin', aliases: [] },
  'mg': { name: 'Madagascar', aliases: [] },
  'mh': { name: 'Marshall Islands', aliases: [] },
  'mk': { name: 'North Macedonia', aliases: ['macedonia'] },
  'ml': { name: 'Mali', aliases: [] },
  'mm': { name: 'Myanmar', aliases: ['burma'] },
  'mn': { name: 'Mongolia', aliases: [] },
  'mo': { name: 'Macau', aliases: ['macao'] },
  'mp': { name: 'Northern Mariana Islands', aliases: [] },
  'mq': { name: 'Martinique', aliases: [] },
  'mr': { name: 'Mauritania', aliases: [] },
  'ms': { name: 'Montserrat', aliases: [] },
  'mt': { name: 'Malta', aliases: [] },
  'mu': { name: 'Mauritius', aliases: [] },
  'mv': { name: 'Maldives', aliases: [] },
  'mw': { name: 'Malawi', aliases: [] },
  'mx': { name: 'Mexico', aliases: [] },
  'my': { name: 'Malaysia', aliases: [] },
  'mz': { name: 'Mozambique', aliases: [] },
  'na': { name: 'Namibia', aliases: [] },
  'nc': { name: 'New Caledonia', aliases: [] },
  'ne': { name: 'Niger', aliases: [] },
  'nf': { name: 'Norfolk Island', aliases: [] },
  'ng': { name: 'Nigeria', aliases: [] },
  'ni': { name: 'Nicaragua', aliases: [] },
  'nl': { name: 'Netherlands', aliases: ['holland'] },
  'no': { name: 'Norway', aliases: [] },
  'np': { name: 'Nepal', aliases: [] },
  'nr': { name: 'Nauru', aliases: [] },
  'nu': { name: 'Niue', aliases: [] },
  'nz': { name: 'New Zealand', aliases: [] },
  'om': { name: 'Oman', aliases: [] },
  'pa': { name: 'Panama', aliases: [] },
  'pe': { name: 'Peru', aliases: [] },
  'pf': { name: 'French Polynesia', aliases: [] },
  'pg': { name: 'Papua New Guinea', aliases: ['png'] },
  'ph': { name: 'Philippines', aliases: [] },
  'pk': { name: 'Pakistan', aliases: [] },
  'pl': { name: 'Poland', aliases: [] },
  'pm': { name: 'Saint Pierre and Miquelon', aliases: [] },
  'pn': { name: 'Pitcairn Islands', aliases: [] },
  'pr': { name: 'Puerto Rico', aliases: [] },
  'ps': { name: 'Palestine', aliases: [] },
  'pt': { name: 'Portugal', aliases: [] },
  'pw': { name: 'Palau', aliases: [] },
  'py': { name: 'Paraguay', aliases: [] },
  'qa': { name: 'Qatar', aliases: [] },
  're': { name: 'Réunion', aliases: ['reunion'] },
  'ro': { name: 'Romania', aliases: [] },
  'rs': { name: 'Serbia', aliases: [] },
  'ru': { name: 'Russia', aliases: ['russian federation'] },
  'rw': { name: 'Rwanda', aliases: [] },
  'sa': { name: 'Saudi Arabia', aliases: [] },
  'sb': { name: 'Solomon Islands', aliases: [] },
  'sc': { name: 'Seychelles', aliases: [] },
  'sd': { name: 'Sudan', aliases: [] },
  'se': { name: 'Sweden', aliases: [] },
  'sg': { name: 'Singapore', aliases: [] },
  'sh': { name: 'Saint Helena', aliases: [] },
  'si': { name: 'Slovenia', aliases: [] },
  'sj': { name: 'Svalbard and Jan Mayen', aliases: [] },
  'sk': { name: 'Slovakia', aliases: [] },
  'sl': { name: 'Sierra Leone', aliases: [] },
  'sm': { name: 'San Marino', aliases: [] },
  'sn': { name: 'Senegal', aliases: [] },
  'so': { name: 'Somalia', aliases: [] },
  'sr': { name: 'Suriname', aliases: [] },
  'ss': { name: 'South Sudan', aliases: [] },
  'st': { name: 'São Tomé and Príncipe', aliases: ['sao tome'] },
  'sv': { name: 'El Salvador', aliases: [] },
  'sx': { name: 'Sint Maarten', aliases: [] },
  'sy': { name: 'Syria', aliases: [] },
  'sz': { name: 'Eswatini', aliases: ['swaziland'] },
  'tc': { name: 'Turks and Caicos Islands', aliases: [] },
  'td': { name: 'Chad', aliases: [] },
  'tf': { name: 'French Southern Territories', aliases: [] },
  'tg': { name: 'Togo', aliases: [] },
  'th': { name: 'Thailand', aliases: [] },
  'tj': { name: 'Tajikistan', aliases: [] },
  'tk': { name: 'Tokelau', aliases: [] },
  'tl': { name: 'Timor-Leste', aliases: ['east timor'] },
  'tm': { name: 'Turkmenistan', aliases: [] },
  'tn': { name: 'Tunisia', aliases: [] },
  'to': { name: 'Tonga', aliases: [] },
  'tr': { name: 'Turkey', aliases: ['türkiye', 'turkiye'] },
  'tt': { name: 'Trinidad and Tobago', aliases: ['trinidad'] },
  'tv': { name: 'Tuvalu', aliases: [] },
  'tw': { name: 'Taiwan', aliases: [] },
  'tz': { name: 'Tanzania', aliases: [] },
  'ua': { name: 'Ukraine', aliases: [] },
  'ug': { name: 'Uganda', aliases: [] },
  'um': { name: 'U.S. Minor Outlying Islands', aliases: [] },
  'us': { name: 'United States', aliases: ['usa', 'united states of america'] },
  'uy': { name: 'Uruguay', aliases: [] },
  'uz': { name: 'Uzbekistan', aliases: [] },
  'va': { name: 'Vatican City', aliases: ['holy see'] },
  'vc': { name: 'Saint Vincent and the Grenadines', aliases: ['saint vincent'] },
  've': { name: 'Venezuela', aliases: [] },
  'vg': { name: 'British Virgin Islands', aliases: [] },
  'vi': { name: 'U.S. Virgin Islands', aliases: [] },
  'vn': { name: 'Vietnam', aliases: [] },
  'vu': { name: 'Vanuatu', aliases: [] },
  'wf': { name: 'Wallis and Futuna', aliases: [] },
  'ws': { name: 'Samoa', aliases: [] },
  'ye': { name: 'Yemen', aliases: [] },
  'yt': { name: 'Mayotte', aliases: [] },
  'za': { name: 'South Africa', aliases: [] },
  'zm': { name: 'Zambia', aliases: [] },
  'zw': { name: 'Zimbabwe', aliases: [] }
};

function App() {
  const [currentFlag, setCurrentFlag] = useState<string>('us');
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const getAllCountryCodes = (): string[] => Object.keys(countryData);

  const getRandomFlag = (): string => {
    const flags = getAllCountryCodes();
    const newFlag = flags[Math.floor(Math.random() * flags.length)];
    return newFlag;
  };

  const checkAnswer = () => {
    const input = userAnswer.toLowerCase().trim();
    const currentCountry = countryData[currentFlag];
    
    if (!currentCountry) {
      console.error('Country data not found for:', currentFlag);
      return;
    }

    const isCorrect = 
      input === currentFlag.toLowerCase() || 
      input === currentCountry.name.toLowerCase() ||
      currentCountry.aliases.some(alias => alias === input);

    setMessage(isCorrect ? ' Correct!' : ' Try again!');
    if (isCorrect) {
      setScore(score + 1);
      const newFlag = getRandomFlag();
      setCurrentFlag(newFlag);
      setUserAnswer('');
      setSuggestions([]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
        handleSuggestionClick(suggestions[selectedIndex]);
      } else {
        checkAnswer();
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
      }
    }
  };

  const updateSuggestions = (input: string) => {
    if (!input) {
      setSuggestions([]);
      setSelectedIndex(-1);
      return;
    }

    const inputLower = input.toLowerCase();
    const matchingCountries = getAllCountryCodes()
      .filter(code => {
        const country = countryData[code];
        return (
          code.toLowerCase().startsWith(inputLower) ||
          country.name.toLowerCase().startsWith(inputLower) ||
          country.aliases.some(alias => alias.toLowerCase().startsWith(inputLower))
        );
      })
      .map(code => `${code.toUpperCase()} - ${countryData[code].name}`);

    setSuggestions(matchingCountries);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserAnswer(value);
    setSelectedIndex(-1);
    updateSuggestions(value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    const code = suggestion.split(' - ')[0].toLowerCase();
    setUserAnswer(code);
    setSuggestions([]);
    checkAnswer();
  };

  const handleReveal = () => {
    const currentCountry = countryData[currentFlag];
    setMessage(`This is ${currentCountry.name} (${currentFlag.toUpperCase()})`);
    setScore(Math.max(0, score - 1)); // Deduct 1 point for revealing
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Title>World Flag Quiz</Title>
        
        <MainContent>
          <FlagContainer
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Flag 
              src={`/images/${currentFlag}.png`} 
              alt="Flag" 
              draggable="false"
            />
          </FlagContainer>

          <QuizContent>
            <InputContainer>
              <AnswerInput
                type="text"
                placeholder="Enter country name or code..."
                value={userAnswer}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
              />
              
              {suggestions.length > 0 && (
                <SuggestionsList
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {suggestions.map((suggestion, index) => (
                    <SuggestionItem
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      $isSelected={index === selectedIndex}
                    >
                      {suggestion}
                    </SuggestionItem>
                  ))}
                </SuggestionsList>
              )}
            </InputContainer>

            <GameControls>
              <Button
                onClick={checkAnswer}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Submit Answer
              </Button>
              
              <RevealButton
                onClick={handleReveal}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Reveal Answer (-1 point)
              </RevealButton>
            </GameControls>

            {message && (
              <Message
                $isCorrect={message.includes("Correct")}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                {message}
              </Message>
            )}

            <ScoreContainer>
              <ScoreLabel>Score:</ScoreLabel>
              <ScoreValue
                key={score}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {score}
              </ScoreValue>
            </ScoreContainer>
          </QuizContent>
        </MainContent>
      </Container>
    </>
  );
}

export default App;
