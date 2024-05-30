import Link from "next/link";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";
import styles from "../../styles/Header.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Header: React.FC = () => {
  const { user } = useUser();
  const defaultPicture = "/img/defaultAvatar/defAv.jpg";
  const balance = useSelector((state: RootState) => state.balance.balance);

  return (
    <header className={styles.header}>
      <div >
        <Link href="/"><div className={styles.logo}></div></Link>
      </div>

      <div className={styles.head}>

        <div className={styles.top_header}>
          
          <ul className={styles.section__list}>
            <li>Алгоритм честной игры</li>
            <li>ЧАВО</li>
            <li>Условия конфиденциальности</li>
            <li>Terms of Service</li>
            <li>Support</li>
            <li>Блог</li>
            <li>Бонус</li>
          </ul>
        </div>
        <div className={styles.bot_header}>
          
            <Link href="/wheel">
              <Image
                src="/wheel/wheel.png"
                width={55}
                height={55}
                alt="Wheel"
              />
            </Link>
            <Link href="/">
              <Image
                src="/icons/golden.png"
                width={55}
                height={55}
                alt="Roulette"
              />
            </Link>
            <Link href="/hilo">
              <Image
                src="/hilo/hilo.png"
                width={35}
                height={45}
                alt="Roulette"
              />
            </Link>
            {!!user ? (
              <>
                <div className={styles.userProfile}>
                  <Image
                    src={user.picture ?? "/defaultPicture.jpg"}
                    height={50}
                    width={50}
                    alt="User Picture"
                  />
                  <span className={styles.userName}>{user.name}</span>
                </div>
                <div className={styles.balance}>Balance: ${balance}</div>
                <Link href="/api/auth/logout" className={styles.link}>
                  <button className={styles.logout}>
                    <Image src={'/icons/logout.svg'} width={17} height={17} alt="Logout" className={styles.sign}></Image>
                    <div className={styles.text}>Logout</div>
                  </button>
                </Link>
              </>
            ) : (
              <Link href="/api/auth/login" className={styles.link}>
                <button className={styles.login}>
                    <Image src={'/icons/login.svg'} width={17} height={17} alt="Logout" className={styles.sign}></Image>
                    <div className={styles.text}>Login</div>
                  </button>
              </Link>
            )}

       
        </div>
      </div>
    </header>
  );
};

export default Header;
