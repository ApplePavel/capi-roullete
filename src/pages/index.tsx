// Home.tsx
import React, { useState } from 'react';
import Roulette from '../components/Roulette/Roulette';
import Bets from '../components/Roulette/Bets/Bets';
import SpinResults from '../components/Roulette/SpinResults/SpinResults';
import Timer from '../components/Timer/Timer';
import styles from '../styles/Roulette.module.css';

const TimerInSec = 7;

export const runtime = 'edge';

const Home: React.FC = () => {
  const [bet, setBet] = useState(0);
  const [bets, setBets] = useState<{ [key: string]: number }>({});
  const [isSpinning, setIsSpinning] = useState(false);

  return (
    <div className={styles.container}>
        <Timer duration={TimerInSec} isSpinning={isSpinning} setIsSpinning={setIsSpinning} /> 
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
  );
};

export default Home;
