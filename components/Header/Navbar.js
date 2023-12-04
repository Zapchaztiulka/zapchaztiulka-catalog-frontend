'use client';

import Link from 'next/link';
import ContactList from './ContactList';
import SearchBar from './Search/SearchBar';
import { CartIcon } from '@/public/icons';
import Catalog from '../Category/Catalog';
import { LogoIconWithText } from '../Icons/Logo/LogoIconWithText';
import MobileNavBar from './MobileNavBar';
import { LogoIcon } from '../Icons/Logo/LogoIcon';
import { useContext, useState } from 'react';
import { StatusContext } from '@/context/statusContext';

const Navbar = ({ categories }) => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const { resetLocalStorage, backToHomeUrl } = useContext(StatusContext);

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  const handleToHome = () => {
    resetLocalStorage();
    backToHomeUrl();
  };

  return (
    <header className="header z-50">
      <nav className="navbar container">
        <MobileNavBar
          showSearchBar={showSearchBar}
          toggleSearchBar={toggleSearchBar}
          categories={categories}
        />
        <div className="tablet1024:flex tablet1024:items-center tablet1024:justify-between hidden">
          <div className="flex items-center">
            <div
              onClick={handleToHome}
              className="justify-center cursor-pointer desktop1200:flex hidden items-center desktop1200:mr-[30px] desktop1440:mr-[55px]"
            >
              <LogoIconWithText />
            </div>
            <div
              onClick={handleToHome}
              className="justify-center cursor-pointer tablet1024:flex hidden desktop1200:hidden items-center tablet1024:mr-[30px]"
            >
              <LogoIcon width="67" height="60" />
            </div>
            <Catalog categories={categories} />
            <SearchBar
              showSearchBar={showSearchBar}
              toggleSearchBar={toggleSearchBar}
              setShowSearchBar={setShowSearchBar}
            />
          </div>
          <div className="flex tablet1024:gap-[44px] desktop1200:gap-6">
            <ContactList />
            <Link legacyBehavior href={{ pathname: '/cart' }}>
              <div className="cursor-pointer p-2 flex gap-2 text-base text-textPrimary">
                <p>Кошик</p>
                <CartIcon className="w-6 h-6 fill-iconSecondary" />
              </div>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
