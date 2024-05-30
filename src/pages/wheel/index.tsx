import styles from '../../styles/Wheel.module.css';
import WheelF from "../../components/Wheel/Wheel";
import WheelHistory from '../../components/Wheel/WhellHistory/WheelHistory';
import { useState } from 'react';
import Timer from '@/components/Timer/Timer';
import Bets from '@/components/Wheel/Bets/Bets';

const TimerInSec = 7;

const Wheel: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [bet, setBet] = useState(0);
  const [bets, setBets] = useState<{ [key: string]: number }>({});

  return (
    <div className={styles.container1}>
      <div className={styles.wheelwithHistory}>
        <WheelF isSpinning={isSpinning} setIsSpinning={setIsSpinning} bets={bets} setBets={setBets} />
        <WheelHistory />
      </div>
      <Timer duration={TimerInSec} isSpinning={isSpinning} setIsSpinning={setIsSpinning} />
      <Bets bet={bet} setBet={setBet} bets={bets} setBets={setBets} isSpinning={isSpinning} />
    </div>
  );
};

export default Wheel;
