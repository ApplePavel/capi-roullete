
import { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '../store/store';
import '../styles/globals.css';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  weight: ['400', '700'], 
  subsets: ['latin'], 
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className={montserrat.className}>
            <Component {...pageProps} />
          </div>
        </PersistGate>
      </Provider>
    </UserProvider>
  );
}

export default MyApp;
