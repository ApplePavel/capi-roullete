import React from 'react';
import Image from 'next/image';
import styles from '../../styles/Bets.module.css';

interface BetsProps {
  bet: number;
  setBet: (bet: number) => void;
  betType: string | null;
  handleBetTypeChange: (betType: string) => void;
  isSpinning: boolean;
  balance: number;
}

const Bets: React.FC<BetsProps> = ({ bet, setBet, betType, handleBetTypeChange, isSpinning, balance }) => {
  return (
    <div className={styles.betsContainer}>
      <div className={styles.balanceContainer}>
        <span>Balance: {balance}</span>
        <input 
          type="number" 
          value={bet} 
          onChange={(e) => setBet(Math.max(Number(e.target.value), 0))} 
          disabled={isSpinning}
          className={styles.betInput}
        />
        <button onClick={() => setBet(bet + 1)} disabled={isSpinning} className={styles.betAdjustButton}>+1</button>
        <button onClick={() => setBet(bet + 5)} disabled={isSpinning} className={styles.betAdjustButton}>+5</button>
        <button onClick={() => setBet(Math.floor(bet / 2))} disabled={isSpinning} className={styles.betAdjustButton}>1/2</button>
        <button onClick={() => setBet(bet * 2)} disabled={isSpinning} className={styles.betAdjustButton}>x2</button>
        <button onClick={() => setBet(balance)} disabled={isSpinning} className={styles.betAdjustButton}>MAX</button>
        <button onClick={() => setBet(0)} disabled={isSpinning} className={styles.betAdjustButton}>CLEAR</button>
        
      </div>
      <div className={styles.buttonsContainer}>
        <button
          className={`${styles.betButton} ${betType === 'black' ? styles.selected : ''}`}
          onClick={() => handleBetTypeChange('black')}
          disabled={isSpinning}
        >
          <div className={styles.imageContainer}>
            <Image src="/icons/black.png" width={50} height={50} alt="Black Bet" />
          </div>
          <span className={styles.winMultiplier}>WIN 2x</span>
        </button>
        <button
          className={`${styles.betButton} ${betType === 'yellow' ? styles.selected : ''}`}
          onClick={() => handleBetTypeChange('yellow')}
          disabled={isSpinning}
        >
          <div className={styles.imageContainer}>
            <Image src="/icons/yellow.png" width={50} height={50} alt="Yellow Bet" />
          </div>
          <span className={styles.winMultiplier}>WIN 2x</span>
        </button>
        <button
          className={`${styles.betButton} ${betType === 'golden' ? styles.selected : ''}`}
          onClick={() => handleBetTypeChange('golden')}
          disabled={isSpinning}
        >
          <div className={styles.imageContainer}>
            <Image src="/icons/golden.png" width={50} height={50} alt="Golden Bet" />
          </div>
          <span className={styles.winMultiplier}>WIN 14x</span>
        </button>
      </div>
    </div>
  );
};

export default Bets;
