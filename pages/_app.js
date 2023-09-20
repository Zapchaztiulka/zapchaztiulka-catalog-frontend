import React from 'react'
import { Layout } from '@/components';
import '../styles/globals.css';
import { Inter } from "next/font/google";
import store from '../redux/store'
import { Provider } from 'react-redux';

const inter = Inter({ subsets: ["latin"], weight: ['400', '700'],
  style: ['normal'], });


function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
                <Layout className={inter.className}>
      <Component {...pageProps} />
    </Layout>
</Provider>



  );
}

export default MyApp;