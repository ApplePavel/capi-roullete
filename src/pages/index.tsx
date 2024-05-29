// Home.tsx
import React, { useState } from 'react';
import Header from '../components/Header/Header';
import Roulette from '../components/Roulette/Roulette';
import Bets from '../components/Roulette/Bets/Bets';
import SpinResults from '../components/Roulette/SpinResults/SpinResults';
import Timer from '../components/Timer/Timer';
import styles from '../styles/Roulette.module.css'

const TimerInSec = 7;

const Home: React.FC = () => {
  const [bet, setBet] = useState(0);
  const [bets, setBets] = useState<{ [key: string]: number }>({});
  const [isSpinning, setIsSpinning] = useState(false);

  const handleTimerComplete = () => {
    setIsSpinning(true);
  };

  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        {!isSpinning && <Timer duration={TimerInSec} onComplete={handleTimerComplete} />}
        <Roulette
          bet={bet}
          setBet={setBet}
          bets={bets}
          setBets={setBets}
          isSpinning={isSpinning}
          setIsSpinning={setIsSpinning}
        />
        <Bets
          bet={bet}
          setBet={setBet}
          bets={bets}
          setBets={setBets}
          isSpinning={isSpinning}
        />
        
        <SpinResults />
      </div>
    </div>
  );
};

export default Home;
