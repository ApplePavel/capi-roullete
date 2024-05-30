
import styles from '../../styles/Hilo.module.css';
import Hilo from "../../components/HiLo/Hilo";
import Timer from '@/components/Timer/Timer';
import Bets from '@/components/HiLo/Bets/Bets';
import { useState } from 'react';

const TimerInSec = 7;

const Wheel: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [bet, setBet] = useState(0);
  const [bets, setBets] = useState<{ [key: string]: number }>({});
  return (
    <div className={styles.container}>
       <Hilo isSpinning={isSpinning} setIsSpinning={setIsSpinning} bets={bets} setBets={setBets} />
      <Timer duration={TimerInSec} isSpinning={isSpinning} setIsSpinning={setIsSpinning} />
      <Bets bet={bet} setBet={setBet} bets={bets} setBets={setBets} isSpinning={isSpinning} />
    </div>
  );
};

export default Wheel;
