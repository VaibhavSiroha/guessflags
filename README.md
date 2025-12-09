# 🌍 Guess Flags - Complete Frontend Upgrade

A fun and interactive flag guessing game built with **React** and **TypeScript**. Test your knowledge of world flags with this beautifully designed quiz application featuring smooth animations, hint systems, and offline persistence!

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-3178C6?style=flat-square&logo=typescript)
![Styled Components](https://img.shields.io/badge/Styled_Components-6.1.13-DB7093?style=flat-square&logo=styled-components)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.13-0055FF?style=flat-square)

## ✨ Features

### 🎮 Gameplay
- **207+ World Flags** – Comprehensive collection including countries, territories, and regions
- **No Repeat System** – Flags won't repeat until all have been shown
- **Smart Shuffle** – Difficult flags reappear more frequently for better learning
- **Two Game Modes**:
  - **Normal Mode** – 3 lives per flag, standard scoring
  - **Learn Mode** – Unlimited attempts, flag changes only on correct guess

### 💡 Hint System
- **🌍 Continent Hint** – Reveals the continent of the country
- **🔤 First Letter** – Shows the first letter of the country name
- **👁️ Clear Flag** – Progressively removes blur from the flag image

### 📱 UI/UX
- **Neo-Glassmorphic Design** – Modern, sleek dark theme with glass effects
- **Smooth Animations** – Framer Motion powered transitions and effects
- **Shake Animation** – Visual feedback on wrong answers
- **Score Bounce** – Celebratory animation when score increases
- **Responsive Design** – Works on desktop, tablet, and mobile

### 📝 Learning Features
- **Quick Info Popup** – After each correct guess, see:
  - Capital city
  - Continent
  - Population
  - Fun fact about the country
- **Review Wrong Flags** – Dedicated page to review flags you got wrong
- **High Score Tracking** – Persistent leaderboard

### 💾 Offline & Storage
- **localStorage Persistence** – All progress saved locally:
  - Current score and high score
  - Wrong flags for review
  - Learned flags
- **Works Offline** – No backend required, fully static

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI Framework with hooks |
| **TypeScript** | Type-safe development |
| **Styled Components** | CSS-in-JS styling |
| **Framer Motion** | Smooth animations |

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── FlagCard/         # Flag display with blur effect
│   ├── Autocomplete/     # Input with suggestions
│   ├── Lives/            # Heart-based lives display
│   ├── HintPanel/        # Hint buttons and reveals
│   ├── InfoCard/         # Country info modal
│   └── GameModeToggle/   # Normal/Learn mode switch
├── hooks/                # Custom React hooks
│   ├── useFlags.ts       # Flag shuffling & no-repeat logic
│   ├── useHints.ts       # Hint state management
│   └── useLocalProgress.ts # localStorage persistence
├── data/
│   ├── countries.ts      # All 207 countries with metadata
│   └── types.ts          # TypeScript interfaces
├── styles/
│   ├── theme.ts          # Design tokens
│   ├── animations.ts     # Framer Motion variants
│   └── GlobalStyles.ts   # Global CSS reset
├── pages/
│   ├── Game.tsx          # Main game page
│   └── Review.tsx        # Wrong flags review
├── App.tsx               # Hash-based routing
└── index.tsx             # Entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js v16 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/guessflags.git
cd guessflags

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Run development server |
| `npm run build` | Build for production |
| `npm test` | Run tests |

## 🎯 How to Play

1. 👀 **Look** at the flag displayed on screen
2. ⌨️ **Type** your guess or use autocomplete suggestions
3. 💡 **Use hints** if you're stuck (costs nothing in Learn Mode)
4. ✅ **Submit** and see the country info popup
5. 📝 **Review** wrong flags at any time via the Review link
6. 🏆 **Beat** your high score!

### Game Modes

| Mode | Lives | Flag Changes | Best For |
|------|-------|--------------|----------|
| **Normal** | 3 ❤️ | After wrong/correct | Challenge |
| **Learn** | ∞ | Only on correct | Learning |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open a Pull Request

## 📄 License

MIT License – feel free to use this project for learning and fun!

---

Made with ❤️ and React | [Play Now](http://localhost:3000)
