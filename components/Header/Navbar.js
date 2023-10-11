import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import ContactList from "./ContactList";
import SearchBar from "./SearchBar";
import { CartIcon } from "@/public/icons";
import Catalog from "../Category/Catalog";
import { fetchProducts } from "@/redux/products/productsOperations";
import { LogoIconWithText } from "../Icons/Logo/LogoIconWithText";
import MobileNavBar from "./MobileNavBar";
import { useContext } from "react";
import { StartPage } from "@/context/context";
import { LogoIcon } from "../Icons/Logo/LogoIcon";

const Navbar = () => {
  const dispatch = useDispatch();
  const { startPage, setStartPage } = useContext(StartPage);

  const handleToHome = () => {
    dispatch(fetchProducts());
    setStartPage(1);
  };

  return (
    <header className="header z-50">
      <nav className="navbar container">
        <MobileNavBar />
        <div className="tablet1024:flex tablet1024:items-center tablet1024:justify-between hidden">
          <div className="flex items-center">
            <Link
              href={`/?page=1`}
              onClick={handleToHome}
              className="justify-center desktop1200:flex hidden items-center desktop1200:mr-[30px] desktop1440:mr-[55px]"
            >
              <LogoIconWithText />
            </Link>
            <Link
              href="/"
              className="justify-center tablet1024:flex hidden desktop1200:hidden items-center tablet1024:mr-[30px]"
            >
              <LogoIcon width="67" height="56" />
            </Link>
            <Catalog />
            <SearchBar />
          </div>
          <div className="flex justify-between">
            <ContactList />
            <Link legacyBehavior href={{ pathname: "/cart" }}>
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
