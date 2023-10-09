import React, { useState } from "react";
import Sidebar from "./SideBar";
import { LogoIcon } from "../Icons/Logo/LogoIcon";
import Link from "next/link";
import {
  CartIconSideBar,
  MenuOpenIcon,
  PhoneIcon,
  SearchIcon,
} from "@/public/icons";

const MobileNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="flex">
        <Link href="/" className="justify-center flex md:hidden items-center">
          <LogoIcon color1="#fff" color2="#fff" size="44" />
        </Link>
        <Sidebar isOpen={isOpen} toggle={toggle} />
        <div className="md:hidden">
          <button
            className="flex item-center outline-none text-gray-700 rounded-md focus:border-gray-400"
            onClick={toggle}
          >
            <MenuOpenIcon className="w-[44px] h-[44px] stroke-iconWhite stroke-2" />
          </button>
        </div>
      </div>

      <div className="flex">
        <Link href="/" className="justify-center flex md:hidden items-center">
          <SearchIcon className="w-[44px] h-[44px] stroke-iconWhite stroke-2" />
        </Link>
        <Link href="/" className="justify-center flex md:hidden items-center">
          <PhoneIcon className="w-[44px] h-[44px] stroke-iconWhite stroke-2" />
        </Link>
        <Link href="/" className="justify-center flex md:hidden items-center">
          <CartIconSideBar className="w-11 h-11 fill-iconWhite" />
        </Link>
      </div>
    </>
  );
};

export default MobileNavBar;
