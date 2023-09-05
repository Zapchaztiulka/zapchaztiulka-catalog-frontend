import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [product, setProduct] = useState('');
  console.log(product)

  return (
    <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4">
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
      <form className="flex items-center justify-start max-sm:flex-col w-full relative max-sm:gap-4 max-w-3xl gap-4">
        <div className="flex items-center">
          <input
            type="text"
            name="product"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            placeholder="Я шукаю.."
            className="w-full h-[48px] pl-12 p-4 bg-light-white rounded-r-full max-sm:rounded-full outline-none cursor-pointer text-sm"
          />
          <Image
            src="/search-icon.svg"
            alt="search-icon"
            className="object-contain"
            width={24}
            height={24}
          />
        </div>
      </form>
    </nav>
  );
}

export default Navbar
