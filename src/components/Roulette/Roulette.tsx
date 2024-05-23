import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { decrementBalance, incrementBalance } from '../../store/balanceSlice';
import Bets from '../Bets/Bets';
import Timer from '../Timer/Timer';
import styles from '../../styles/Roulette.module.css';

const wheelWidth = 1500; // Общая ширина колеса
const TimerSec = 500;
const getSegmentColor = (position: number): string => {
  const segmentWidth = 100; // Ширина одного сегмента
  const segmentIndex = Math.floor(position / segmentWidth);

  if (segmentIndex === 4) {
    return 'golden';
  } else if (segmentIndex % 2 === 1) {
    return 'black';
  } else {
    return 'yellow';
  }
};

const generateNewPosition = (): number => {
  let position;
  do {
    position = Math.floor(Math.random() * wheelWidth);
  } while (position % 100 === 0);
  return position + 100;
};

const Roulette: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);
  const [bet, setBet] = useState<number>(0);
  const [betType, setBetType] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [spinPosition, setSpinPosition] = useState<number>(6400);

  const balance = useSelector((state: RootState) => state.balance.balance);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSpinning) {
      const spinDuration = 9000; // Длительность вращения в миллисекундах
      const randomPosition = generateNewPosition();
      const newPosition = randomPosition; // Обеспечиваем вращение колеса

      const timer = setTimeout(() => {
        const finalPosition = (newPosition % wheelWidth); // Вычисляем конечную позицию
        const winningSegment = getSegmentColor(finalPosition); // Определяем выигрышный сегмент

        setSelectedSegment(winningSegment);

        if (betType) {
          let won = false;
          if (betType === winningSegment) {
            won = true;
          }

          if (won) {
            const winMultiplier = winningSegment === 'golden' ? 14 : 2;
            dispatch(incrementBalance(bet * winMultiplier));
          } else {
            dispatch(decrementBalance(bet));
          }
        }

        setSpinPosition(6400);
        setIsSpinning(false);
      }, spinDuration);

      setSpinPosition(newPosition);
      return () => clearTimeout(timer);
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
      </div>
      <Bets bet={bet} setBet={setBet} betType={betType} handleBetTypeChange={setBetType} isSpinning={isSpinning} balance={balance} />
      {!isSpinning && <Timer duration={TimerSec} onComplete={handleTimerComplete} />}
    </div>
  );
};

export default Roulette;
