import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import ContactList from "./ContactList";
import SearchBar from "./SearchBar";
import Sidebar from "./SideBar";
import {
  CartIcon,
  CartIconSideBar,
  CatalogIcon,
  MenuOpenIcon,
  PhoneIcon,
  SearchIcon,
} from "@/public/icons";
import Catalog from "./Catalog";
import { fetchProducts } from "@/redux/products/productsOperations";
import { LogoIconWithText } from "./Icons/Logo/LogoIconWithText";
import { LogoIcon } from "./Icons/Logo/LogoIcon";

const Navbar = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const handleToHome = () => {
    dispatch(fetchProducts());
  };

  return (
    <nav className="navbar">
      <Link
        href="/"
        onClick={handleToHome}
        className="justify-center lg:flex hidden items-center mr-[15px]"
      >
        <LogoIconWithText/>
      </Link>
      <Link
        href="/"
        className="justify-center md:flex hidden lg:hidden items-center"
      >
        <Image
          src="/logo-blue.svg"
          alt="logo"
          className="object-contain"
          width={64}
          height={64}
        />
      </Link>
      <div className="flex">
        <Link href="/" className="justify-center flex md:hidden items-center">
                    <LogoIcon color1="#fff" color2="#fff" size="44" />
        </Link>
        <Sidebar isOpen={isOpen} toggle={toggle} />

        {/* mobile menu */}
        <div className="md:hidden">
          <button
            className="flex item-center outline-none text-gray-700 rounded-md focus:border-gray-400"
            onClick={toggle}
          >
            <MenuOpenIcon className="w-[44px] h-[44px] stroke-iconColors-contrast stroke-2" />
          </button>
        </div>
      </div>

      <div className="flex">
        <Link href="/" className="justify-center flex md:hidden items-center">
          <SearchIcon className="w-[44px] h-[44px] stroke-iconColors-contrast stroke-2" />
        </Link>
        <Link href="/" className="justify-center flex md:hidden items-center">
          <PhoneIcon className="w-[44px] h-[44px] stroke-iconColors-contrast stroke-2" />
        </Link>
        <Link href="/" className="justify-center flex md:hidden items-center">
          <CartIconSideBar className="w-11 h-11 fill-iconColors-contrast" />
        </Link>
      </div>

      <div className="md:flex hidden">
        <Catalog />
        <SearchBar />
      </div>

      <div className="md:flex hidden">
        <ContactList />
        <Link legacyBehavior href={{ pathname: "/cart" }}>
          <div className="cursor-pointer p-2 flex gap-2 text-base text-text-primary">
            <p>Кошик</p>
            <CartIcon className="w-6 h-6 fill-iconColors-secondary" />
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
