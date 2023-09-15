import Link from "next/link";
import Image from "next/image";
import { CartIcon, CatalogIcon, ChatIcon, TruckIcon, CompanyIcon } from "@/public/icons";

const Sidebar = ({
  isOpen,
   toggle }) => {
   

  return (
    <>
      <div
        className="flex flex-col fixed md:hidden w-full h-full overflow-hidden bg-white pt-[24px] z-10 pr-[16px] pl-[53px]"
        style={{
          opacity: `${isOpen ? "1" : "0"}`,
          top: ` ${isOpen ? "0" : "-100%"}`,
          left: `${isOpen ? "-7%" : "0"}`,
        }}
      >
        <div className="flex justify-between items-center mb-6">
          <Link href="/" className="flex items-center" as={'image'}>
            <Image
              src="/logo-blue.svg"
              alt="logo"
              className="object-contain"
              width={50}
              height={48}
            />
          </Link>
          <button className="absolute right-0 p-5" onClick={toggle}>
            {/* Close icon */}
            <Image
              src="/icons/close-icon.svg"
              alt="close"
              className="object-contain"
              width={44}
              height={44}
            />
          </button>
        </div>

        <ul className="sidebar-nav text-center leading-relaxed text-base text-text-primary font-medium flex flex-col gap-4">
          <li>
            <Link
              href="/"
              onClick={toggle}
              className="flex items-center hover:text-hover-blue sidebar-menu"
            >
              <CatalogIcon className="w-[44px] h-[44px] fill-secondary sidebar-icon" />
              <p>Каталог</p>
            </Link>
          </li>
          <li>
            <Link
              href="/"
              onClick={toggle}
              className="flex items-center hover:text-hover-blue sidebar-menu"
            >
              <CartIcon className="w-[44px] h-[44px] fill-secondary sidebar-icon" />
              <p>Кошик</p>
            </Link>
          </li>
          <li>
            <Link
              href="/"
              onClick={toggle}
              className="flex items-center hover:text-hover-blue sidebar-menu"
            >
              <ChatIcon className="w-[44px] h-[44px] fill-secondary sidebar-icon"
              />
              <p>Онлайн допомога</p>
            </Link>
          </li>
          <li>
            <Link
              href="/"
              onClick={toggle}
              className="flex items-center hover:text-hover-blue sidebar-menu"
            >
              <TruckIcon className="w-[44px] h-[44px] fill-secondary sidebar-icon"
              />
              <p>Доставка</p>
            </Link>
          </li>
          <li>
            <Link
              href="/"
              onClick={toggle}
              className="flex items-center hover:text-hover-blue sidebar-menu"
            >
              <CompanyIcon className="w-[44px] h-[44px] fill-secondary sidebar-icon"
              />
              <p>Про нас</p>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
