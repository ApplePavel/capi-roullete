import React, { ReactNode } from 'react';
import Header from '../Header/Header';
import styles from '../../styles/Wrapper.module.css'

interface LayoutProps {
  children: ReactNode;
}

const Wrapper: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <Header />
      {children}
    </div>
  );
};

export default Wrapper;
