
import styles from '../../styles/Hilo.module.css';
import Hilo from "../../components/HiLo/Hilo";

export const runtime = 'edge';

const Wheel: React.FC = () => {
  return (
    <div>
      <Hilo></Hilo>
    </div>
  );
};

export default Wheel;
