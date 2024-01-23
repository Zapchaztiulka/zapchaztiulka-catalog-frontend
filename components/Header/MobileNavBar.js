'use client';
import React, { useContext, useState } from 'react';
import Sidebar from './SideBar/SideBar';
import { LogoIcon } from 'universal-components-frontend/src/components/icons';
import Link from 'next/link';
import {
  CartIconSideBar,
  MenuOpenIcon,
  PhoneIcon,
  SearchIcon,
} from '@/public/icons';
import SearchBarMobile from './Search/SearchBarMobile';
import { StatusContext } from '@/context/statusContext';
import { BasketCountIcon } from 'universal-components-frontend/src/components/icons';
import { useSelector } from 'react-redux';
import { selectCart } from '../../redux/cart/cartSelector';

const MobileNavBar = ({
  toggleSearchBar,
  showSearchBar,
  categories,
  openModalCart,
}) => {
  const { totalItems } = useSelector(selectCart);
  const [isOpen, setIsOpen] = useState(false);
  const { resetLocalStorage, backToHomeUrl } = useContext(StatusContext);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const handleToHome = () => {
    resetLocalStorage();
    backToHomeUrl();
  };

  return (
    <>
      <div
        className={`${
          showSearchBar ? 'hidden' : 'tablet1024:hidden flex justify-between'
        }`}
      >
        <div className="flex gap-xs2">
          <div
            onClick={handleToHome}
            className="justify-center cursor-pointer flex items-center"
          >
            <LogoIcon color1="#fff" color2="#fff" width="44" height="44" />
          </div>
          <Sidebar
            isOpen={isOpen}
            toggle={toggle}
            categories={categories}
            openModalCart={openModalCart}
          />
          <div>
            <button
              className="flex item-center outline-none text-gray-700 rounded-md focus:border-gray-400"
              onClick={toggle}
            >
              <MenuOpenIcon className="w-[44px] h-[44px] stroke-iconWhite stroke-2" />
            </button>
          </div>
        </div>
        <div className="flex gap-xs2">
          <button
            className="justify-center flex items-center"
            onClick={toggleSearchBar}
          >
            <SearchIcon className="w-[44px] h-[44px] stroke-iconWhite stroke-2" />
          </button>

          <Link href="/" className="justify-center flex items-center">
            <PhoneIcon className="w-[44px] h-[44px] stroke-iconWhite stroke-2" />
          </Link>
          <button
            className="justify-center flex items-center"
            onClick={() => {
              openModalCart(true);
              document.body.classList.add('stop-scrolling');
            }}
          >
            {totalItems === 0 ? (
              <CartIconSideBar className="w-11 h-11 fill-iconWhite" />
            ) : (
              <div className="flex justify-center items-center w-11 h-11">
                <BasketCountIcon count={totalItems} color="#ffffff" />
              </div>
            )}
          </button>
        </div>
      </div>
      <SearchBarMobile
        showSearchBar={showSearchBar}
        toggleSearchBar={toggleSearchBar}
      />
    </>
  );
};

export default MobileNavBar;
