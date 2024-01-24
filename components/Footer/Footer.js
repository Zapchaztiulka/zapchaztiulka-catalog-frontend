import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import {
  LogoIconWithText,
  LogoIcon,
} from 'universal-components-frontend/src/components/icons';
import { StatusContext } from '@/context/statusContext';
import ForCustomers from './ForCustomers';
import Contacts from './Contacts';
import Address from './Address';
import Catalog from './Catalog';

const Footer = ({ categories, patterns }) => {
  const router = useRouter();
  const current_year = new Date().getFullYear();
  const { resetLocalStorage, backToHomeUrl } = useContext(StatusContext);

  const handleToHome = () => {
    resetLocalStorage();
    backToHomeUrl();
  };

  const clickByCategory = category => {
    router.push({
      pathname: '/',
      query: { query: category.toLowerCase() },
    });
  };

  return (
    <footer className="container border-t border-borderDefault lg:pt-[42px] py-6 ">
      <div className="flex flex-col justify-between tablet768:gap-3 gap-8">
        <div className=" tablet600:inline-flex  hidden desktop1920:hidden items-center">
          <div onClick={handleToHome} className="cursor-pointer">
            <LogoIconWithText />
          </div>
        </div>

        <div
          onClick={handleToHome}
          className="flex cursor-pointer tablet600:hidden items-center"
        >
          <LogoIcon width="56" height="56" />
        </div>
        <div className="footer-lists">
          <div className="hidden desktop1920:inline-flex items-center w-[260px] relative">
            <div
              onClick={handleToHome}
              className="absolute -top-[9px] cursor-pointer"
            >
              <LogoIconWithText />
            </div>
          </div>         
          <Catalog clickByCategory={clickByCategory} categories={categories} />
          <ForCustomers />
          <Contacts patterns={patterns} />
          <Address patterns={patterns}/>
        </div>
        <div>
          {' '}
          <p className="text-sm text-textSecondary">
            <br />
            &copy;{current_year} Всі права захищені
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
