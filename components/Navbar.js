import Image from "next/image";
import Link from "next/link";
import ContactList from "./ContactList";
import SearchBar from "./SearchBar";

const Navbar = () => {

  return (
    <nav className="flex items-center py-4 pr-[120px] pl-[120px] md:flex-row">
      <Link href="/" className="justify-center flex items-center mr-[93px]">
        <Image
          src="/logo-main.svg"
          alt="logo"
          className="object-contain"
          width={210}
          height={56}
        />
      </Link>
      <button className="rounded-lg mr-[15px]">
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
    </nav>
  );
}

export default Navbar
