
import styles from '../../styles/Hilo.module.css';
import Hilo from "../../components/HiLo/Hilo";
import Header from '../../components/Header/Header';

const Wheel: React.FC = () => {
  return (
    <div className={styles.container}>
      <Header></Header>
      <Hilo></Hilo>
    </div>
  );
};

export default Wheel;
