import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import styles from '../../../styles/WheelHistory.module.css';
import { determineWinningSegment } from '../random/determineWinningSegment';

const WheelHistory: React.FC = () => {
  const { spins } = useSelector((state: RootState) => state.resultsWheel);

  return (
    <div className={styles.container}>
      <div className={styles.spins}>
        {spins.slice(-17).map((spin, index) => {
          const segment = determineWinningSegment(spin);
          const width = segment === 'x21' ? 100 :
                        segment === 'x11' ? 80 :
                        segment === 'x6' ? 65 :
                        segment === 'x4' ? 50 : 40;

          return (
            <div
              key={index}
              className={`${styles.spin} ${styles[segment]}`}
              style={{ width: `${width}px` }}
            >
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WheelHistory;
