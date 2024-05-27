import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import {incrementBalance } from '../../store/balanceSlice';
import { addSpin } from '../../store/resultsSlice';
import Bets from '../Wheel/Bets/Bets';
import Timer from '../Timer/Timer';
import { generateSpinPosition } from './random/generateposition';
import { determineWinningSegment } from './random/determineWinningSegment';
import styles from '../../styles/Wheel.module.css';

const TimerInSec = 7;
const spinDuration = 9000;

const WheelF: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinPosition, setSpinPosition] = useState(1440);
  const [bet, setBet] = useState(0);
  const [bets, setBets] = useState<{ [key: string]: number }>({});

  const balance = useSelector((state: RootState) => state.balance.balance);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSpinning) {
      generateSpinPosition()
        .then(([randomNumber, spinPosition]) => {
          const timer = setTimeout(() => {
            dispatch(addSpin(randomNumber));

            const winningSegment = determineWinningSegment(randomNumber);
            let winMultiplier = 1;

            switch (winningSegment) {
              case 'x21':
                winMultiplier = 21;
                break;
              case 'x6':
                winMultiplier = 6;
                break;
              case 'x11':
                winMultiplier = 11;
                break;
              case 'x4':
                winMultiplier = 4;
                break;
              default:
                winMultiplier = 2;
                break;
            }

            Object.keys(bets).forEach(betType => {
              const betAmount = bets[betType];
              if (betType === winningSegment) {
                dispatch(incrementBalance(betAmount * winMultiplier));
              }
            });

            setSpinPosition(1440);
            setIsSpinning(false);
            setBets({});
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
          className={`${styles.wheel} ${isSpinning ? styles.spinning : ''}`}
          style={{ transform: `rotate(${spinPosition}deg)` }}
        ></div>
      </div>
      <Bets bet={bet} setBet={setBet} bets={bets} setBets={setBets} isSpinning={isSpinning} />
      {!isSpinning && <Timer duration={TimerInSec} onComplete={handleTimerComplete} />}
    </div>
  );
};

export default WheelF;
