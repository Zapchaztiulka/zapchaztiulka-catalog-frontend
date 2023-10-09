import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import ContactList from "./ContactList";
import SearchBar from "./SearchBar";
import {CartIcon} from "@/public/icons";
import Catalog from "../Category/Catalog";
import { fetchProducts } from "@/redux/products/productsOperations";
import { LogoIconWithText } from "../Icons/Logo/LogoIconWithText";
import MobileNavBar from "./MobileNavBar";

const Navbar = () => {
  const dispatch = useDispatch();

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
        <LogoIconWithText />
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
      <MobileNavBar />
      <div className="md:flex hidden">
        <Catalog />
        <SearchBar />
      </div>

      <div className="md:flex hidden">
        <ContactList />
        <Link legacyBehavior href={{ pathname: "/cart" }}>
          <div className="cursor-pointer p-2 flex gap-2 text-base text-textPrimary">
            <p>Кошик</p>
            <CartIcon className="w-6 h-6 fill-iconSecondary" />
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
