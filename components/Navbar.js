import Image from "next/image";
import Link from "next/link";
import React from 'react'

import { useEffect, useState } from 'react';
import ContactList from "./ContactList";
import SearchBar from "./SearchBar";

const Navbar = () => {

  const [navbar, setNavbar] = useState(false);
    const [width, setWidth] = useState(0);

    const updateWidth = () => {
      const newWidth = window.innerWidth;
      setWidth(newWidth);
    };

    useEffect(() => {
      window.addEventListener("resize", updateWidth);
      updateWidth();
    }, []);


  return (
    <nav className="navbar">
      <Link href="/" className="justify-center lg:flex hidden items-center">
        <Image
          src="/logo-main.svg"
          alt="logo"
          className="object-contain"
          priority={true}
          quality={80}
          width={width < 1024 ? "150" : "210"}
          height={width < 1024 ? "45" : "56"}
        />
      </Link>
      <Link href="/" className="justify-center md:flex hidden lg:hidden items-center">
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

        {/* mobile menu */}
        <div className="md:hidden">
          <button
            className="flex item-center outline-none text-gray-700 rounded-md focus:border-gray-400"
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
      </div>

      <div className="flex">
        <Link href="/" className="justify-center flex md:hidden items-center">
          <Image
            src="/search-icon-menu.svg"
            alt="search"
            className="object-contain"
            width={44}
            height={44}
          />
        </Link>
        <Link href="/" className="justify-center flex md:hidden items-center">
          <Image
            src="/phone-icon-menu.svg"
            alt="phone"
            className="object-contain"
            width={44}
            height={44}
          />
        </Link>
        <Link href="/" className="justify-center flex md:hidden items-center">
          <Image
            src="/cart-icon-menu.svg"
            alt="cart"
            className="object-contain"
            width={44}
            height={44}
          />
        </Link>
      </div>

      <div className="md:flex hidden">
        <button className="rounded-lg mr-[15px] hidden md:block">
          <div className="flex justify-between items-center lg:px-6 px-3 py-3 bg-default-blue rounded-lg ">
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
      </div>

      <div className="md:flex hidden">
        <ContactList />
        <Link legacyBehavior href={{ pathname: "/cart" }}>
          <div className="coursor-pointer p-2 flex gap-2 text-base text-text-primary">
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
      </div>
    </nav>
  );
}

export default Navbar
