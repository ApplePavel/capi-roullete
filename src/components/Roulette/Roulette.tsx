// Roulette.tsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { decrementBalance, incrementBalance } from '../../store/balanceSlice';
import { addBet } from '../../store/betsSlice';
import Bets from '../Bets/Bets';
import Timer from '../Timer/Timer';
import { generateSpinPosition } from '../Roulette/random/generateposition';
import { determineWinningSegment } from '../Roulette/random/determineWinningSegment';
import BetsHistory from '../BetsHistory/BetsHistory';
import styles from '../../styles/Roulette.module.css';

const TimerInSec = 7;
const spinDuration = 9000;

const Roulette: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinPosition, setSpinPosition] = useState(6400);
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);
  const [bet, setBet] = useState(0);
  const [betType, setBetType] = useState<string | null>(null);

  const balance = useSelector((state: RootState) => state.balance.balance);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSpinning) {
      generateSpinPosition()
        .then(([randomNumber, spinPosition]) => {
          const timer = setTimeout(() => {
            const winningSegment = determineWinningSegment(randomNumber);
            setSelectedSegment(winningSegment);

            if (betType) {
              const won = betType === winningSegment;
              const winMultiplier = winningSegment === 'golden' ? 14 : 2;

              if (won) {
                dispatch(incrementBalance(bet * winMultiplier));
                dispatch(addBet({ amount: bet, type: betType, result: 'win' }));
              } else {
                dispatch(decrementBalance(bet));
                dispatch(addBet({ amount: bet, type: betType, result: 'loss' }));
              }
            }

            setSpinPosition(6400);
            setIsSpinning(false);
          }, spinDuration);

          setSpinPosition(spinPosition);
          return () => clearTimeout(timer);
        })
        .catch(error => {
          console.error('Error generating spin position:', error);
          // Optional: Handle the error case here if needed
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
          className={styles.wheel}
          style={{ backgroundPositionX: `${spinPosition}px` }}
        ></div>
      </div>
      <div className={styles.controls}>
        <div>Balance: {balance}</div>
        {selectedSegment && <div>Winning Segment: {selectedSegment}</div>}
      </div>
      <Bets bet={bet} setBet={setBet} betType={betType} handleBetTypeChange={setBetType} isSpinning={isSpinning} balance={balance} />
      {!isSpinning && <Timer duration={TimerInSec} onComplete={handleTimerComplete} />}
      <BetsHistory />
    </div>
  );
};

export default Roulette;
