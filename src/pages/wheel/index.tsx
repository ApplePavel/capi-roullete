import styles from '../../styles/Header.module.css';
import WheelF from "../../components/Wheel/Wheel";
import WheelHistory from '../../components/Wheel/WhellHistory/WheelHistory'


const Wheel: React.FC = () => {
  return (
    <div className={styles.container}>
      <WheelF></WheelF>
      <WheelHistory></WheelHistory>
    </div>
  );
};

export default Wheel;
