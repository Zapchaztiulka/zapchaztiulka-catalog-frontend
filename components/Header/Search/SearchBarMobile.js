import { CloseIcon } from "@/public/icons";
import SearchBar from "./SearchBar";


const SearchBarMobile = ({ showSearchBar, toggleSearchBar }) => {
  const visibleStyle = {
    opacity: `${showSearchBar ? "1" : "0"}`,
    top: ` ${showSearchBar ? "0" : "-100%"}`,
    left: `${showSearchBar ? "0" : "0"}`,
  };

  return (
    <section
      className={`${
        showSearchBar
          ? "tablet1024:hidden flex flex-col fixed w-full min-h-screen bg-bgWhite px-s py-m"
          : "hidden"
      }   `}
      style={visibleStyle}
    >
      <div className="flex justify-between items-center mb-6">
        <p className="font-medium text-textPrimary text-lg">Пошук</p>
        <button onClick={toggleSearchBar}>
          <CloseIcon
            className="stroke-iconPrimary"
            width="34"
            height="34"
          />
        </button>
      </div>
      <SearchBar toggleSearchBar={toggleSearchBar} />
    </section>
  );
};

export default SearchBarMobile;
