import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/store';
import { decrementBalance } from '../../../store/balanceSlice';
import styles from '../../../styles/Bets.module.css';

interface BetsProps {
  bet: number;
  setBet: (bet: number) => void;
  bets: { [key: string]: number };
  setBets: (bets: { [key: string]: number }) => void;
  isSpinning: boolean;
}

const Bets = ({ bet, setBet, bets, setBets, isSpinning }: BetsProps) => {
  const { user } = useUser();
  const balance = useSelector((state: RootState) => state.balance.balance);
  const dispatch = useDispatch();
  const [roundComplete, setRoundComplete] = useState(false);

  const handleBet = (betType: string) => {
    if (balance >= bet) {
      const newBets = { ...bets, [betType]: (bets[betType] || 0) + bet };
      setBets(newBets);
      dispatch(decrementBalance(bet));
      setRoundComplete(false);
    } else {
      setBet(balance);
    }
  };

  const calculateTotalBet = (type: string) => {
    return bets[type] || 0;
  };

  const renderButtonWithBets = (type: string, imageSrc: string, multiplier: string) => {
    const totalBet = calculateTotalBet(type);
    return (
      <button
        className={`${styles.betButton} ${bets[type] ? styles.selected : ''}`}
        onClick={() => handleBet(type)}
        disabled={isSpinning || bet <= 0}
      >
        <div className={styles.imageContainer}>
          <Image src={imageSrc} width={50} height={50} alt={type} />
          {totalBet > 0 && !roundComplete && (
            <div className={styles.betInfo}>
              <Image src={user?.picture ?? '/defaultAvatar/defAv.jpg'} height={25} width={25} alt="User Picture" />
              <span>{totalBet}</span>
            </div>
          )}
        </div>
        <span className={styles.winMultiplier}>PAYS {multiplier}</span>
      </button>
    );
  };

  useEffect(() => {
    if (isSpinning) {
      setRoundComplete(false);
    } else {
      setRoundComplete(true);
    }
  }, [isSpinning]);

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
        {renderButtonWithBets('black', '/icons/black.png', '2x')}
        {renderButtonWithBets('yellow', '/icons/yellow.png', '2x')}
        {renderButtonWithBets('golden', '/icons/golden.png', '14x')}
      </div>
    </div>
  );
};

export default Bets;
