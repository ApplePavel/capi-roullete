
import styles from '../../styles/Header.module.css';
import WheelF from "../../components/Wheel/Wheel";
import Header from '../../components/Header/Header';

const Wheel: React.FC = () => {
  return (
    <div className={styles.container}>
      <Header></Header>
      <WheelF></WheelF>
    </div>
  );
};

export default Wheel;
