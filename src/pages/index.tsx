import Header from "../components/Header/Header";
import styles from '../styles/Home.module.css';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <Header />
    </div>
  );
};

export default Home;
