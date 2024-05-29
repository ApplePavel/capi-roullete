// Timer.tsx
import React, { useEffect, useState } from 'react';
import styles from '../../styles/Timer.module.css';

interface TimerProps {
  duration: number;
  isSpinning: boolean;
  setIsSpinning: React.Dispatch<React.SetStateAction<boolean>>;
}

const Timer: React.FC<TimerProps> = ({ duration, isSpinning, setIsSpinning }) => {
  const [timeLeft, setTimeLeft] = useState(duration );
  const time = timeLeft * 1000;

  useEffect(() => {
    if (time <= 0) {
      setIsSpinning(true);
      return; 
    }

    const interval = setInterval(() => {
      setTimeLeft(prev => Math.max(prev - 10, 0));
    }, 10);

    return () => clearInterval(interval);
  }, [time, setIsSpinning]);

  useEffect(() => {
    if (!isSpinning) {
      setTimeLeft(duration * 1000);
    }
  }, [isSpinning, duration]);

  const seconds = Math.floor(timeLeft / 1000);
  const milliseconds = Math.floor((timeLeft % 1000) / 10);
  const widthPercentage = 17 * seconds;

  return (
    <div className={styles.timerContainer}>
      <div className={styles.timerBar} style={{ width: `${widthPercentage}%` }}></div>
      <span className={styles.timerText}>{seconds},{milliseconds < 10 ? `0${milliseconds}` : milliseconds} seconds</span>
    </div>
  );
};

export default Timer;
