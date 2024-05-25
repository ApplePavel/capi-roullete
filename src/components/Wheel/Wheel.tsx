// components/Wheel/Wheel.tsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { decrementBalance, incrementBalance } from '../../store/balanceSlice';
import { addSpin } from '../../store/resultsSlice';
import Bets from '../Roulette/Bets/Bets';
import Timer from '../Roulette/Timer/Timer';
import { generateSpinPosition } from './random/generateposition';
import { determineWinningSegment } from './random/determineWinningSegment';
import SpinResults from '../Roulette/SpinResults/SpinResults';
import styles from '../../styles/Wheel.module.css';

const TimerInSec = 25;
const spinDuration = 9000;

const WheelF: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinPosition, setSpinPosition] = useState(1440);
  const [bet, setBet] = useState(0);
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

            if (betType) {
              const won = betType === winningSegment;
              let winMultiplier = 1;

              switch (winningSegment) {
                case 'x20':
                  winMultiplier = 20;
                  break;
                case 'x5':
                  winMultiplier = 5;
                  break;
                case 'x10':
                  winMultiplier = 10;
                  break;
                case 'x3':
                  winMultiplier = 3;
                  break;
                default:
                  winMultiplier = 1;
                  break;
              }

              if (won) {
                dispatch(incrementBalance(bet * winMultiplier));
              } else {
                dispatch(decrementBalance(bet));
              }
            }

            setSpinPosition(1440);
            setIsSpinning(false);
          }, spinDuration);

          setSpinPosition(spinPosition);
          return () => clearTimeout(timer);
        })
        .catch(error => {
          console.error('Error generating spin position:', error);
        });
    }
  }, [isSpinning, bet, betType, dispatch]);

  const handleTimerComplete = () => {
    setIsSpinning(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.roulette}>
        <div
          className={`${styles.wheel} ${isSpinning ? styles.spinning : ''}`}
          style={{ transform: `rotate(${spinPosition}deg)` }}
        ></div>
      </div>
      <Bets bet={bet} setBet={setBet} betType={betType} handleBetTypeChange={setBetType} isSpinning={isSpinning} balance={balance} />
      {!isSpinning && <Timer duration={TimerInSec} onComplete={handleTimerComplete} />}
      <SpinResults />
    </div>
  );
};

export default WheelF;
