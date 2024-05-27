import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { decrementBalance, incrementBalance } from '../../store/balanceSlice';
import { addSpin } from '../../store/resultsSlice';
import Bets from './Bets/Bets';
import Timer from '../Timer/Timer';
import { generateSpinPosition } from '../Roulette/random/generateposition';
import { determineWinningSegment } from '../Roulette/random/determineWinningSegment';
import SpinResults from './SpinResults/SpinResults';
import styles from '../../styles/Roulette.module.css';

const TimerInSec = 7;
const spinDuration = 9000;

const Roulette: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinPosition, setSpinPosition] = useState(6400);
  const [bet, setBet] = useState(0);
  const [bets, setBets] = useState<{ [key: string]: number }>({});
  const [betType, setBetType] = useState<string | null>(null);

  const balance = useSelector((state: RootState) => state.balance.balance);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSpinning) {
      generateSpinPosition()
        .then(([randomNumber, spinPosition]) => {
          const timer = setTimeout(() => {
            dispatch(addSpin(randomNumber));

            const winningSegment = determineWinningSegment(randomNumber);

            Object.keys(bets).forEach(betType => {
              const betAmount = bets[betType];
              const won = betType === winningSegment;
              const winMultiplier = winningSegment === 'golden' ? 14 : 2;

              if (won) {
                dispatch(incrementBalance(betAmount * winMultiplier));
              } else {
                dispatch(decrementBalance(betAmount));
              }
            });

            setBets({}); // Сброс ставок после завершения раунда
            setSpinPosition(6400);
            setIsSpinning(false);
          }, spinDuration);

          setSpinPosition(spinPosition);
          return () => clearTimeout(timer);
        })
        .catch(error => {
          console.error('Error generating spin position:', error);
        });
    }
  }, [isSpinning, bets, dispatch]);

  const handleTimerComplete = () => {
    setIsSpinning(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.roulette}>
        <div
          className={styles.wheel}
          style={{ backgroundPositionX: `${spinPosition}px` }}
        ></div>
      </div>
      <Bets bet={bet} setBet={setBet} bets={bets} setBets={setBets} isSpinning={isSpinning} />
      {!isSpinning && <Timer duration={TimerInSec} onComplete={handleTimerComplete} />}
      <SpinResults />
    </div>
  );
};

export default Roulette;
