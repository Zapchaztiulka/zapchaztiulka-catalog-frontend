"use client";
import React, { useState } from "react";
import Sidebar from "./SideBar/SideBar";
import { LogoIcon } from "../Icons/Logo/LogoIcon";
import Link from "next/link";
import {
  CartIconSideBar,
  MenuOpenIcon,
  PhoneIcon,
  SearchIcon,
} from "@/public/icons";
import SearchBarMobile from "./Search/SearchBarMobile";

const MobileNavBar = ({ toggleSearchBar, showSearchBar }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className={`${
          showSearchBar ? "hidden" : "tablet1024:hidden flex justify-between"
        }`}
      >
        <div className="flex gap-xs2">
          <Link href="/" className="justify-center flex items-center">
            <LogoIcon color1="#fff" color2="#fff" width="44" height="44" />
          </Link>
          <Sidebar isOpen={isOpen} toggle={toggle} />
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
          <Link href="/" className="justify-center flex items-center">
            <CartIconSideBar className="w-11 h-11 fill-iconWhite" />
          </Link>
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
