import React, { useState, useEffect, CSSProperties } from "react";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/store";
import { decrementBalance } from "../../../store/balanceSlice";
import styles from "../../../styles/BetsHilo.module.css";

interface BetsProps {
  bet: number;
  setBet: (bet: number) => void;
  bets: { [key: string]: number };
  setBets: (bets: { [key: string]: number }) => void;
  isSpinning: boolean;
}

const Bets = ({ bet, setBet, bets, setBets, isSpinning }: BetsProps) => {
  const balance = useSelector((state: RootState) => state.balance.balance);
  const dispatch = useDispatch();
  const [roundComplete, setRoundComplete] = useState(false);
  const { user } = useUser(); 

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

  const renderButtonWithBets = (
    type: string,
    text: string,
    multiplier: string,
    buttonstyle: string
  ) => {
    const totalBet = calculateTotalBet(type);
    const buttonClass = `${styles.betButton} ${styles[buttonstyle]} ${
      bets[type] ? styles.selected : ""
    }`;
    return (
      <div className={styles.betContainer}>
        <button
          className={buttonClass}
          onClick={() => handleBet(type)}
          disabled={isSpinning || bet <= 0}
        >
          <div>
            <div>{text}</div>
            <div>{multiplier}</div> 
          </div>
          </button>
          
        <div className={styles.betSceleton}>
          <div className={styles.betInfo}>
            {totalBet > 0 && !roundComplete && (
              <>
                <Image src={user?.picture ?? '/defaultAvatar/defAv.jpg'} height={50} width={50} alt="'/defaultAvatar/defAv.jpg" />
                <div>{totalBet}</div>
              </>
            )}
          </div>
        </div>
        </div>
    );
  };

  useEffect(() => {
    if (isSpinning) {
      setRoundComplete(false);
    } else {
      setRoundComplete(true);
      setBets({});
    }
  }, [isSpinning, setBets]);

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
        <button
          onClick={() => setBet(bet + 1)}
          disabled={isSpinning}
          className={styles.betAdjustButton}
        >
          +1
        </button>
        <button
          onClick={() => setBet(bet + 5)}
          disabled={isSpinning}
          className={styles.betAdjustButton}
        >
          +5
        </button>
        <button
          onClick={() => setBet(Math.floor(bet / 2))}
          disabled={isSpinning}
          className={styles.betAdjustButton}
        >
          1/2
        </button>
        <button
          onClick={() => setBet(bet * 2)}
          disabled={isSpinning}
          className={styles.betAdjustButton}
        >
          x2
        </button>
        <button
          onClick={() => setBet(balance)}
          disabled={isSpinning}
          className={styles.betAdjustButton}
        >
          MAX
        </button>
        <button
          onClick={() => setBet(0)}
          disabled={isSpinning}
          className={styles.betAdjustButton}
        >
          CLEAR
        </button>
      </div>
      <div className={styles.buttonsContainer}>
        {renderButtonWithBets("red", "Желтое", "2.00x", "hilo_yellow")}
        {renderButtonWithBets("black", "Черное", "2.00x", "hilo_black")}
        {renderButtonWithBets("2_9", "2-9", "1.5x", "hilo_2_9")}
        {renderButtonWithBets("JQKA", "J, Q, K, A", "3.00x", "hilo_jqka")}
        {renderButtonWithBets("KA", "K, A", "6.00x", "hilo_ka")}
        {renderButtonWithBets("A", "A", "12.00x", "hilo_a")}
        {renderButtonWithBets("Joker", "Joker", "24.00x", "hilo_joker")}
      </div>
    </div>
  );
};

export default Bets;
