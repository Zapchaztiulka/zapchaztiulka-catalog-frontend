import Head from 'next/head';

import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>Zapchaztiulki</title>
      </Head>
      <header className="border-b border-border-default">
        <Navbar />
      </header>
      <main className="main-container">
        {children}
      </main>
      <footer className="border-е border-border-default">
        <Footer />
      </footer>
    </div>
  )
}

export default Layout