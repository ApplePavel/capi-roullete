import Link from "next/link";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";
import styles from '../../styles/Header.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const Header: React.FC = () => {
  const { user } = useUser();
  const defaultPicture = "/img/defaultAvatar/defAv.jpg";
  const balance = useSelector((state: RootState) => state.balance.balance); // получаем баланс из состояния

  return (
    <header className={styles.header}>
      <a href="/" className={styles.logo}></a>
      <div>
        <Link href="/wheel">Home</Link>
      </div>
      <div className={styles.userInfo}>
        {!!user ? (
          <>
            <div className={styles.userProfile}>
              <Image src={user.picture ?? defaultPicture} height={50} width={50} alt="User Picture" />
              <span className={styles.userName}>{user.name}</span>
            </div>
            <div className={styles.balance}>Balance: ${balance}</div>
            <Link href="/api/auth/logout" className={styles.link}>
              <button className={styles.logout}></button>
            </Link>
          </>
        ) : (
          <Link href="/api/auth/login" className={styles.link}>
            <button className={styles.login}>Login</button>
          </Link>
        )}
      </div>
    
    </header>
  );
};

export default Header;
