import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { incrementBalance } from '../../store/balanceSlice';
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

            // Determine the win multiplier based on the winning segment
            let winMultiplier = 1;
            if (winningSegment === 'golden') {
              winMultiplier = 14;
            } else {
              winMultiplier = 2;
            }

            const totalBet = Object.values(bets).reduce((sum, betAmount) => sum + betAmount, 0);

            if (Object.keys(bets).includes(winningSegment)) {
              dispatch(incrementBalance(totalBet * winMultiplier));
            }

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
