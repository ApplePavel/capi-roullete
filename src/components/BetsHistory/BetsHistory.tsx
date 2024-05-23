import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import styles from '../../styles/BetsHistory.module.css';

const BetsHistory: React.FC = () => {
  const bets = useSelector((state: RootState) => state.bets.bets);

  return (
    <div className={styles.container}>
      <h2>Betting History</h2>
      <ul className={styles.betsList}>
        {bets.map((bet, index) => (
          <li key={index} className={`${styles.betItem} ${bet.result === 'win' ? styles.win : styles.loss}`}>
            Bet: {bet.amount} on {bet.type} - Result: {bet.result}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BetsHistory;
