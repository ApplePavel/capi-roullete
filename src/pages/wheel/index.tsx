
import styles from '../../styles/Roulette.module.css';
import WheelF from "../../components/Wheel/Wheel";

const Wheel: React.FC = () => {
  return (
    <div className={styles.container}>
      <WheelF></WheelF>
    </div>
  );
};

export default Wheel;
