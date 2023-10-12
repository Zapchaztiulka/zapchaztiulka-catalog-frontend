import Link from "next/link";
import Image from "next/image";
import {
  CatalogIcon,
  ChatIcon,
  TruckIcon,
  CompanyIcon,
  CartIconSideBar,
  CloseIcon,
} from "@/public/icons";
import { LogoIcon } from "../Icons/Logo/LogoIcon";
import { useContext, useState } from "react";
import SideBarCatalog from "./SideBarCatalog";
import { ModalContext } from "@/context/context";

const Sidebar = ({ isOpen, toggle }) => {

  const [showCategory, setShowCategory] = useState(false);

  const togglShow = () => {
    setShowCategory(!showCategory);
  };
  
  const closeMenu = () => {
    toggle();
    setShowCategory(false)
  }

  return (
    <>
      <div
        className={`${
          showCategory
            ? "hidden"
            : "flex flex-col fixed tablet1024:hidden h-full overflow-hidden bg-bgWhite pt-m z-10 px-s rounded-minimal mobile320:min-w-[288px] mobile375:min-w-[347px] shadow-md shadow-gray-300"
        }`}
        style={{
          opacity: `${isOpen ? "1" : "0"}`,
          top: ` ${isOpen ? "0" : "-100%"}`,
          left: `${isOpen ? "0" : "0"}`,
        }}
      >
        <div className="flex justify-between items-center mb-6">
          <Link href="/" className="flex items-center" as={"image"}>
            <LogoIcon size="44" />
          </Link>
          <button className="absolute right-0 p-5" onClick={closeMenu}>
            {/* Close icon */}
            <CloseIcon width="44" height="44" />
          </button>
        </div>

        <ul className="text-center leading-relaxed text-base text-textPrimary font-medium flex flex-col gap-s">
          <li>
            <Link
              href="/"
              onClick={togglShow}
              className="flex items-center hover:text-textBrand sidebar-menu"
            >
              <CatalogIcon className="w-[44px] h-[44px] stroke-iconSecondary fill-none sidebar-icon" />
              <p>Каталог</p>
            </Link>
          </li>
          <li>
            <Link
              href="/"
              onClick={toggle}
              className="flex items-center hover:text-textBrand sidebar-menu"
            >
              <CartIconSideBar className="w-11 h-11 fill-iconSecondary sidebar-icon" />
              <p>Кошик</p>
            </Link>
          </li>
          <li>
            <Link
              href="/"
              onClick={toggle}
              className="flex items-center hover:text-textBrand sidebar-menu"
            >
              <ChatIcon className="w-[44px] h-[44px] fill-iconSecondary sidebar-icon" />
              <p>Онлайн допомога</p>
            </Link>
          </li>
          <li>
            <Link
              href="/"
              onClick={toggle}
              className="flex items-center hover:text-textBrand sidebar-menu"
            >
              <TruckIcon className="w-[44px] h-[44px] fill-iconSecondary sidebar-icon" />
              <p>Доставка</p>
            </Link>
          </li>
          <li>
            <Link
              href="/"
              onClick={toggle}
              className="flex items-center hover:text-textBrand sidebar-menu"
            >
              <CompanyIcon className="w-[44px] h-[44px] fill-iconSecondary sidebar-icon" />
              <p>Про нас</p>
            </Link>
          </li>
        </ul>
      </div>
      <SideBarCatalog
        showCategory={showCategory}
        togglShow={togglShow}
        isOpen={isOpen}
        closeMenu={closeMenu}
      />
    </>
  );
};

export default Sidebar;
