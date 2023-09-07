
import { Layout } from '@/components';
import '../styles/globals.css';
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ['400', '700'],
  style: ['normal'], });


function MyApp({ Component, pageProps }) {
  return (
    <Layout className={inter.className}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp