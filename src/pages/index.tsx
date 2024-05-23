import Header from "../components/Header/Header";
import styles from '../styles/Home.module.css';
import Roulette from "../components/Roulette/Roulette";

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Roulette></Roulette>
    </div>
  );
};

export default Home;
