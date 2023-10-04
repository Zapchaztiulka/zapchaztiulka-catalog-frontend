import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Categories from "./Categories";

import ContactList from "./ContactList";
import SearchBar from "./SearchBar";
import Sidebar from "./SideBar";
import { CartIcon, CartIconSideBar, CatalogIcon, MenuOpenIcon, PhoneIcon, SearchIcon } from "@/public/icons";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  let ref = useRef();

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <Link
        href="/"
        className="justify-center lg:flex hidden items-center mr-[15px]"
      >
        <Image
          src="/logo-main.svg"
          alt="logo"
          priority={true}
          quality={80}
          width={248}
          height={60}
        />
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
          <Image
            src="/logo-white.svg"
            alt="logo"
            className="object-contain"
            width={44}
            height={44}
          />
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
        <button
          className="mr-[15px] hidden md:flex md:justify-between state-button lg:px-6 px-3 py-3 "
          onClick={toggle}
          aria-expanded={isOpen ? "true" : "false"}
          type="button"         
        >
          <div className="flex justify-center items-center  ">
            <CatalogIcon className="w-[24px] h-[24px] stroke-iconColors-contrast stroke-2 fill-none" />
            <span className="text-white font-medium text-base tracking-[-0.24px]">
              Каталог
            </span>
          </div>
        </button>

        {isOpen && <Categories />}

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
