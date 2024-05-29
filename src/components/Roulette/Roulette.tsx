// Roulette.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { decrementBalance, incrementBalance } from '../../store/balanceSlice';
import { addSpin } from '../../store/resultsRouletteSlice';
import { generateSpinPosition } from '../Roulette/random/generateposition';
import { determineWinningSegment } from '../Roulette/random/determineWinningSegment';
import styles from '../../styles/Roulette.module.css';

interface RouletteProps {
  bet: number;
  setBet: React.Dispatch<React.SetStateAction<number>>;
  bets: { [key: string]: number };
  setBets: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
  isSpinning: boolean;
  setIsSpinning: React.Dispatch<React.SetStateAction<boolean>>;
}

const spinDuration = 9000;

const Roulette: React.FC<RouletteProps> = ({ bet, setBet, bets, setBets, isSpinning, setIsSpinning }) => {
  const [spinPosition, setSpinPosition] = useState(6650);
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

            setBets({});
            setSpinPosition(6650);
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

  return (
    <div className={styles.container}>
      <div className={styles.roulette}>
        <div
          className={styles.wheel}
          style={{ backgroundPositionX: `${spinPosition}px` }}
        ></div>
      </div>
    </div>
  );
};

export default Roulette;
