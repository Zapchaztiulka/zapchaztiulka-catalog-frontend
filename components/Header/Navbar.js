import { BasketCountIcon } from 'universal-components-frontend/src/components/icons';
import ContactList from './ContactList';
import SearchBar from './Search/SearchBar';
import { CartIcon } from '@/public/icons';
import Catalog from '../Category/Catalog';
import MobileNavBar from './MobileNavBar';
import { LogoIconWithText, LogoIcon } from 'universal-components-frontend/src/components/icons';
import { useContext, useState } from 'react';
import { StatusContext } from '@/context/statusContext';
import ModalCart from '@/components/Modals/ModalCart';
import { useSelector } from 'react-redux';
import { selectCart } from '../../redux/cart/cartSelector';

const Navbar = ({ categories }) => {
  const { totalItems } = useSelector(selectCart);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const { resetLocalStorage, backToHomeUrl } = useContext(StatusContext);
  const { isModalOpen, showModalCart, setShowModalCart } =
    useContext(StatusContext);

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  const handleToHome = () => {
    resetLocalStorage();
    backToHomeUrl();
  };

  const openModalCart = openModal => {
    setShowModalCart(openModal);
  };

  return (
    <header className={`${isModalOpen ? 'relative' : 'fixed'} header  z-50`}>
      <nav className="navbar container">
        <MobileNavBar
          showSearchBar={showSearchBar}
          toggleSearchBar={toggleSearchBar}
          categories={categories}
          openModalCart={openModalCart}
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
            <button
              className="cursor-pointer p-2 flex gap-2 text-base text-textPrimary"
              onClick={() => {
                openModalCart(true);
                document.body.classList.add('stop-scrolling');
              }}
            >
              <p>Кошик</p>
              {totalItems === 0 ? (
                <CartIcon className="w-6 h-6 fill-iconSecondary" />
              ) : (
                <BasketCountIcon count={totalItems} color="#888D92" />
              )}
            </button>
          </div>
        </div>
      </nav>
      {/* Modal for click add to cart */}
      {showModalCart && <ModalCart onClose={() => setShowModalCart(false)} />}
    </header>
  );
};

export default Navbar;
