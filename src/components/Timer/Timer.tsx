import React, { useEffect, useState } from 'react';
import styles from '../../styles/Timer.module.css';

interface TimerProps {
  duration: number;
  onComplete: () => void;
}

const Timer: React.FC<TimerProps> = ({ duration, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft === 0) {
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, onComplete]);

  return (
    <div className={styles.timerContainer}>
      <div className={styles.timerBar} style={{ width: `${(timeLeft / duration) * 100}%` }}></div>
      <span className={styles.timerText}>{timeLeft} seconds</span>
    </div>
  );
};

export default Timer;
