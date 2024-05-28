import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { incrementBalance } from "../../store/balanceSlice";
import Bets from "./Bets/Bets";
import Timer from "../Timer/Timer";
import { generateNumber } from "./random/generateNumber";
import { determineWinningSegment } from "./random/determineWinningSegment";
import styles from "../../styles/Hilo.module.css";
import Image from "next/image";

const TimerInSec = 7;

const Hilo: React.FC = () => {
  const [bet, setBet] = useState(0);
  const [bets, setBets] = useState<{ [key: string]: number }>({});
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState<{
    winningSegment: string;
    YellowOrBlack: string | null;
  } | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!spinResult) {
      generateNumber()
        .then(([randomNumber, YellowOrBlack]) => {
          const winningSegment = determineWinningSegment(randomNumber);
          setSpinResult({ winningSegment, YellowOrBlack });
        })
        .catch((error) => {
          console.error("Error generating initial spin position:", error);
          setSpinResult({ winningSegment: 'Joker', YellowOrBlack: null });
        });
    }
  }, [spinResult]);

  useEffect(() => {
    if (isSpinning) {
      generateNumber()
        .then(([randomNumber, YellowOrBlack]) => {
          const winningSegment = determineWinningSegment(randomNumber);
          const timer = setTimeout(() => {
            let totalWin = 0;

            if (winningSegment === "joker") {
              totalWin += (bets["joker"] || 0) * 24;
            } else {
              if (winningSegment === "A") {
                totalWin += (bets["A"] || 0) * 12;
                totalWin += (bets["KA"] || 0) * 6;
                totalWin += (bets["JQKA"] || 0) * 3;
              } else if (winningSegment === "K") {
                totalWin += (bets["KA"] || 0) * 6;
                totalWin += (bets["JQKA"] || 0) * 3;
              } else if (["J", "Q"].includes(winningSegment)) {
                totalWin += (bets["JQKA"] || 0) * 3;
              } else if (
                ["2", "3", "4", "5", "6", "7", "8", "9"].includes(
                  winningSegment
                )
              ) {
                totalWin += (bets["2_9"] || 0) * 1.5;
              }

              if (YellowOrBlack) {
                totalWin += (bets[YellowOrBlack.toLowerCase()] || 0) * 2;
              }
            }

            dispatch(incrementBalance(totalWin));

            setBets({});
            setIsSpinning(false);
          }, TimerInSec * 1000);

          setSpinResult({ winningSegment, YellowOrBlack });
          return () => clearTimeout(timer);
        })
        .catch((error) => {
          console.error("Error generating spin position:", error);
          setIsSpinning(false);
        });
    }
  }, [isSpinning, bets, dispatch]);

  const handleTimerComplete = () => {
    setIsSpinning(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.HiLo}>
        {spinResult && (
          <div
            className={
              spinResult.YellowOrBlack === "YELLOW" || spinResult.winningSegment === "Joker"
                ? styles.yellowText
                : styles.blackText
            }
          >
            <span className={styles.NumTop}>{spinResult.winningSegment}</span>
            {spinResult.winningSegment === "Joker" ? (
              <Image
                src="/icons/golden.png"
                width={100}
                height={100}
                alt="Golden"
              />
            ) : spinResult.YellowOrBlack === "YELLOW" ? (
              <Image
                src="/icons/yellow.png"
                width={100}
                height={100}
                alt="Yellow"
              />
            ) : (
              <Image
                src="/icons/black.png"
                width={100}
                height={100}
                alt="Black"
              />
            )}

            <span className={styles.NumBot}>{spinResult.winningSegment}</span>
          </div>
        )}
      </div>
      <Bets
        bet={bet}
        setBet={setBet}
        bets={bets}
        setBets={setBets}
        isSpinning={isSpinning}
      />
      {!isSpinning && (
        <Timer duration={TimerInSec} onComplete={handleTimerComplete} />
      )}
    </div>
  );
};

export default Hilo;
