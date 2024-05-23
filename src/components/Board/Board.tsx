import React from 'react';
import styles from '../../styles/Board.module.css';

interface BoardProps {
  numbers: number[];
  selectedNumber: number | null;
}

const Board: React.FC<BoardProps> = ({ numbers, selectedNumber }) => {
  const redNumbers = [1, 3, 5, 7, 9, 11, 13];
  const blackNumbers = [2, 4, 6, 8, 10, 12, 14];
  const greenNumber = 0;

  return (
    <div className={styles.board}>
      {numbers.map((number) => (
        <div
          key={number}
          className={`${styles.number} ${selectedNumber === number ? styles.selected : ''} 
            ${redNumbers.includes(number) ? styles.red : blackNumbers.includes(number) ? styles.black : styles.green}`}
        >
          {number}
        </div>
      ))}
    </div>
  );
};

export default Board;
