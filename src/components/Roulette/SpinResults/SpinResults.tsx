// SpinResults.tsx
import React from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import styles from '../../../styles/SpinResults.module.css';
import { determineWinningSegment } from '../random/determineWinningSegment';

const SpinResults: React.FC = () => {
  const { spins, count } = useSelector((state: RootState) => state.results);

  return (
    <div className={styles.container}>
      <h2>Spin Results</h2>
      <div className={styles.spins}>
        {spins.slice(-11).map((spin, index) => (
          <div key={index} className={`${styles.spin} ${styles[determineWinningSegment(spin)]}`}></div>
        ))}
      </div>
      <div className={styles.statistics}>
        Last 100: 
        <div className={styles.statItem}>
          <Image src="/icons/yellow.png" width={35} height={35} alt="Yellow"></Image>{count.yellow}
        </div>
        <div className={styles.statItem}>
        <Image src="/icons/black.png" width={35} height={35} alt="Black"></Image>{count.black}
        </div>
        <div className={styles.statItem}>
          <Image src="/icons/golden.png" width={35} height={35} alt="Golden"></Image>{count.golden}
        </div>
      </div>
    </div>
  );
};

export default SpinResults;
