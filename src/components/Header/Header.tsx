import Link from "next/link";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";
import styles from "../../styles/Header.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Header: React.FC = () => {
  const defaultPicture = "/img/defaultAvatar/defAv.jpg";
  const balance = useSelector((state: RootState) => state.balance.balance);

  return (
    <header className={styles.header}>
      <div className={styles.head}>
        <div className={styles.left_header}>
          <Link href="/">
            <div className={styles.logo}></div>
          </Link>
          <Link href="/wheel" className={styles.game}>
            <Image src="/wheel/wheel.png" width={55} height={55} alt="Wheel" />
          </Link>
          <Link href="/" className={styles.game}>
            <Image
              src="/icons/golden.png"
              width={55}
              height={55}
              alt="Roulette"
            />
          </Link>
          <Link href="/hilo" className={styles.game}>
            <Image src="/hilo/hilo.png" width={45} height={55} alt="Roulette" />
          </Link>
        </div>

        <div className={styles.right_header}>
        <div className={styles.balance}>
            <div className={styles.balance}>${balance}</div>
          </div>
        <div className={styles.userProfile}>
              <Image
                src={"/defaultAvatar/defAv.jpg"}
                height={50}
                width={50}
                alt="User Picture"
              />
              <span className={styles.userName}></span>
            </div>
          

          <button className={styles.logout}>
            <Image
              src={"/icons/logout.svg"}
              width={17}
              height={17}
              alt="Logout"
              className={styles.sign}
            ></Image>
            <div className={styles.text}>Logout</div>
          </button>

          {/* <Link href="/api/auth/login" className={styles.link}>
                <button className={styles.login}>
                    <Image src={'/icons/login.svg'} width={17} height={17} alt="Logout" className={styles.sign}></Image>
                    <div className={styles.text}>Login</div>
                  </button>
              </Link> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
