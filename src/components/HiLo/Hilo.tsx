import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { incrementBalance } from '../../store/balanceSlice';
import Bets from '../Wheel/Bets/Bets';
import Timer from '../Timer/Timer';
import { generateNumber } from './random/generateNumber';
import { determineWinningSegment } from './random/determineWinningSegment';
import styles from '../../styles/Hilo.module.css';

const TimerInSec = 7;

const Hilo: React.FC = () => {
  const [bet, setBet] = useState(0);
  const [bets, setBets] = useState<{ [key: string]: number }>({});
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState<{ winningSegment: string; RedOrBlack: string | null } | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSpinning) {
      generateNumber()
        .then(([randomNumber, RedOrBlack]) => {
          const winningSegment = determineWinningSegment(randomNumber);
          const timer = setTimeout(() => {
            let winMultiplier = 1;

            switch (winningSegment) {
              case 'joker':
                winMultiplier = 24;
                break;
              case 'A':
                winMultiplier = 12;
                break;
              case 'K':
              case 'A':
                winMultiplier = 6;
                break;
              case 'J':
              case 'Q':
                winMultiplier = 3;
                break;
              case '2':
              case '3':
              case '4':
              case '5':
              case '6':
              case '7':
              case '8':
              case '9':
                winMultiplier = 1.5;
                break;
              case 'Black':
              case 'Red':
                winMultiplier = 2;
                break;
            }

            Object.keys(bets).forEach(betType => {
              const betAmount = bets[betType];
              if (betType === winningSegment) {
                dispatch(incrementBalance(betAmount * winMultiplier));
              }
            });

            setBets({});
            setIsSpinning(false);
          }, TimerInSec * 1000);

          setSpinResult({ winningSegment, RedOrBlack });
          return () => clearTimeout(timer);
        })
        .catch(error => {
          console.error('Error generating spin position:', error);
          setIsSpinning(false);
        });
    }
  }, [isSpinning, bets, dispatch]);

  const handleTimerComplete = () => {
    setIsSpinning(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.HiLo}>
        <div className={`${styles.HiLo}`}>
          {spinResult && (
            <div>
              <p>Number: {spinResult.winningSegment}</p>
              {spinResult.RedOrBlack && <p>Color: {spinResult.RedOrBlack}</p>}
            </div>
          )}
        </div>
      </div>
      <Bets bet={bet} setBet={setBet} bets={bets} setBets={setBets} isSpinning={isSpinning} />
      {!isSpinning && <Timer duration={TimerInSec} onComplete={handleTimerComplete} />}
    </div>
  );
};

export default Hilo;
