'use client';
import Link from 'next/link';
import {
  CatalogIcon,
  ChatIcon,
  TruckIcon,
  CompanyIcon,
  CartIconSideBar,
  CloseIcon,
} from '@/public/icons';
import { LogoIcon } from '../../Icons/Logo/LogoIcon';
import { useState } from 'react';
import SideBarCatalog from './SideBarCatalog';
import { BasketCountIcon } from 'universal-components-frontend/src/components/icons';
import { useSelector } from 'react-redux';
import { selectCart } from '../../../redux/cart/cartSelector';

const Sidebar = ({ isOpen, toggle, categories, openModalCart }) => {
  const { totalItems } = useSelector(selectCart);
  const [showCategory, setShowCategory] = useState(false);

  const togglShow = () => {
    setShowCategory(!showCategory);
  };

  const closeMenu = () => {
    toggle();
    setShowCategory(false);
  };

  const visibleStyle = {
    opacity: `${isOpen ? '1' : '0'}`,
    top: ` ${isOpen ? '0' : '-100%'}`,
    left: `${isOpen ? '0' : '0'}`,
  };

  return (
    <>
      <div
        className={`${
          showCategory
            ? 'hidden'
            : 'flex flex-col fixed tablet1024:hidden h-full overflow-hidden bg-bgWhite pt-m z-10 px-s rounded-minimal mobile320:min-w-[288px] mobile375:min-w-[347px] shadow-md shadow-gray-300'
        }`}
        style={visibleStyle}
      >
        <div className="flex justify-between items-center mb-6">
          <Link href="/" className="flex items-center" as={'image'}>
            <LogoIcon size="44" />
          </Link>
          <button className="absolute right-0 p-5" onClick={closeMenu}>
            {/* Close icon */}
            <CloseIcon className="stroke-iconPrimary" width="44" height="44" />
          </button>
        </div>

        <ul className="text-center leading-relaxed text-base text-textPrimary font-medium flex flex-col gap-s">
          <li>
            <button
              type="button"
              onClick={togglShow}
              className="flex items-center hover:text-textBrand sidebar-menu"
            >
              <CatalogIcon className="w-[44px] h-[44px] stroke-iconSecondary fill-none sidebar-icon" />
              <span>Каталог</span>
            </button>
          </li>
          <li>
            <button
              className="flex items-center hover:text-textBrand sidebar-menu"
              onClick={() => {
                openModalCart(true);
                document.body.classList.add('stop-scrolling');
              }}
            >
              {totalItems === 0 ? (
                <CartIconSideBar className="w-11 h-11 fill-iconSecondary sidebar-icon" />
              ) : (
                <div className="flex justify-center items-center w-11 h-11">
                  <BasketCountIcon count={totalItems} color="#888D92" />
                </div>
              )}
              <span>Кошик</span>
            </button>
          </li>
          <li>
            <Link
              href="/"
              onClick={toggle}
              className="flex items-center hover:text-textBrand sidebar-menu"
            >
              <ChatIcon className="w-[44px] h-[44px] fill-iconSecondary sidebar-icon" />
              <span>Онлайн допомога</span>
            </Link>
          </li>
          <li>
            <Link
              href="/"
              onClick={toggle}
              className="flex items-center hover:text-textBrand sidebar-menu"
            >
              <TruckIcon className="w-[44px] h-[44px] fill-iconSecondary sidebar-icon" />
              <span>Доставка</span>
            </Link>
          </li>
          <li>
            <Link
              href="/"
              onClick={toggle}
              className="flex items-center hover:text-textBrand sidebar-menu"
            >
              <CompanyIcon className="w-[44px] h-[44px] fill-iconSecondary sidebar-icon" />
              <span>Про нас</span>
            </Link>
          </li>
        </ul>
      </div>
      <SideBarCatalog
        showCategory={showCategory}
        togglShow={togglShow}
        isOpen={isOpen}
        closeMenu={closeMenu}
        categories={categories}
      />
    </>
  );
};

export default Sidebar;
