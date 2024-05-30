
import { AppProps } from 'next/app';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '../store/store';
import '../styles/globals.css';
import { Montserrat } from 'next/font/google';
import Wrapper from '../components/Wrapper/wrapper'

const montserrat = Montserrat({
  weight: ['400', '700'], 
  subsets: ['latin'], 
});

function MyApp({ Component, pageProps }: AppProps) {
  
  return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className={montserrat.className}>
            <Wrapper>
            <Component {...pageProps} />
            </Wrapper>
          </div>
        </PersistGate>
      </Provider>

  );
}

export default MyApp;
