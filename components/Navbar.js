import Image from "next/image";
import Link from "next/link";
import { useState } from 'react';
import ContactList from "./ContactList";
import SearchBar from "./SearchBar";

const Navbar = () => {

  const [navbar, setNavbar] = useState(false);

  return (
    <nav className="navbar">
      <Link href="/" className="justify-center md:flex hidden items-center mr-[93px]">
        <Image
          src="/logo-main.svg"
          alt="logo"
          className="object-contain"
          width={210}
          height={56}
        />
      </Link>

      {/* mobile menu */}
      <div className="md:hidden">
        <button
          className="outline-none p-2 text-gray-700 rounded-md focus:border-gray-400"
          onClick={() => setNavbar(!navbar)}
        >
          {navbar ? (
            <Image
              src="/close-icon.svg"
              alt="close"
              className="object-contain"
              width={44}
              height={44}
            />
          ) : (
            <Image
              src="/menu-icon.svg"
              alt="close"
              className="object-contain"
              width={44}
              height={44}
            />
          )}
        </button>
      </div>

      <button className="rounded-lg mr-[15px] hidden md:block">
        <div className="flex gap-2 items-center px-7 py-3 bg-default-blue rounded-lg ">
          <Image
            src="/catalog-icon.svg"
            alt="catalog-icon"
            className="object-contain"
            width={24}
            height={24}
          />
          <span className="text-white font-medium text-base tracking-[-0.24px]">
            Каталог
          </span>
        </div>
      </button>
      <SearchBar />
      <ContactList />
      <Link legacyBehavior href={{ pathname: "/cart" }}>
        <div className="coursor-pointer p-2 md:flex hidden gap-2 text-base text-text-primary">
          <p>Кошик</p>
          <Image
            src="/cart-icon.svg"
            alt="cart-icon"
            className="object-contain"
            width={24}
            height={24}
          />
        </div>
      </Link>
    </nav>
  );
}

export default Navbar
