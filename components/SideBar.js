import Link from "next/link";
import Image from "next/image";

const Sidebar = ({
  isOpen,
   toggle }) => {
   

  return (
    <>
      <div
        className="sidebar-container fixed md:hidden w-full h-full overflow-hidden bg-white grid pt-[24px] z-10 pr-[16px] pl-[53px]"
        style={{
          opacity: `${isOpen ? "1" : "0"}`,
          top: ` ${isOpen ? "0" : "-100%"}`,
          left: `${isOpen ? "-7%" : "0"}`,
        }}
      >

        <div className="flex justify-between items-center mb-6">
                   <Link href="/" className="flex items-center">
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
            <Link href="/" onClick={toggle} className="flex items-center">
              <Image
                src="/icons/catalog-icon-sidebar.svg"
                alt="catalog-icon"
                className="object-contain"
                width={44}
                height={44}
              />
              <p>Каталог</p>
            </Link>
          </li>
          <li>
            <Link href="/" onClick={toggle} className="flex items-center">
              <Image
                src="/icons/cart-icon-sidebar.svg"
                alt="cart-icon"
                className="object-contain"
                width={44}
                height={44}
              />
              <p>Кошик</p>
            </Link>
          </li>
          <li>
            <Link href="/" onClick={toggle} className="flex items-center">
              <Image
                src="/icons/chat-icon-sidebar.svg"
                alt="chat-icon"
                className="object-contain"
                width={44}
                height={44}
              />
              <p>Онлайн допомога</p>
            </Link>
          </li>
          <li>
            <Link href="/" onClick={toggle} className="flex items-center">
              <Image
                src="/icons/truck-icon.svg"
                alt="delivery-icon"
                className="object-contain"
                width={44}
                height={44}
              />
              <p>Доставка</p>
            </Link>
          </li>
          <li>
            <Link href="/" onClick={toggle} className="flex items-center">
              <Image
                src="/icons/company-icon.svg"
                alt="company-icon"
                className="object-contain"
                width={44}
                height={44}
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
