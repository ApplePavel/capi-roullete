import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { incrementBalance } from '../../store/balanceSlice';
import { addWheelSpin } from '../../store/resultWheelSlice';
import { generateSpinPosition } from './random/generateposition';
import { determineWinningSegment } from './random/determineWinningSegment';
import styles from '../../styles/Wheel.module.css';

const spinDuration = 9000;

interface WheelFProps {
  isSpinning: boolean;
  setIsSpinning: (isSpinning: boolean) => void;
  bets: { [key: string]: number };
  setBets: (bets: { [key: string]: number }) => void;
}

const WheelF: React.FC<WheelFProps> = ({ isSpinning, setIsSpinning, bets, setBets }) => {
  const [spinPosition, setSpinPosition] = useState(1440);

  const balance = useSelector((state: RootState) => state.balance.balance);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSpinning) {
      generateSpinPosition()
        .then(([randomNumber, spinPosition]) => {
          const timer = setTimeout(() => {
            dispatch(addWheelSpin(randomNumber));

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

  return (
    <div className={styles.container}>
        <div className={styles.wheelcontainer}>
        <div
          className={`${styles.wheel} ${isSpinning ? styles.spinning : ''}`}
          style={{ transform: `rotate(${spinPosition}deg)` }}
        ></div>
      </div>
    </div>
  );
};

export default WheelF;
