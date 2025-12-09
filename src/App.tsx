import React, { useState } from 'react';
import { GlobalStyles } from './styles/GlobalStyles';
import { Game, Review } from './pages';

type Page = 'game' | 'review';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('game');

  // Simple client-side routing based on hash
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash === 'review') {
        setCurrentPage('review');
      } else {
        setCurrentPage('game');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <>
      <GlobalStyles />
      {currentPage === 'game' ? <Game /> : <Review />}
    </>
  );
};

export default App;
