import Image from "next/image";
import Link from "next/link";
import ContactList from "./ContactList";
import SearchBar from "./SearchBar";

const Navbar = () => {

  return (
    <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4 ">
      <Link href="/" className="justify-center flex items-center">
        <Image
          src="/logo-main.svg"
          alt="logo"
          className="object-contain"
          width={210}
          height={56}
        />
      </Link>
      <button className="rounded-lg">
        <div className="flex gap-2 items-center px-7 py-3.5 bg-default-blue rounded-lg">
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
      <ContactList/>
    </nav>
  );
}

export default Navbar
