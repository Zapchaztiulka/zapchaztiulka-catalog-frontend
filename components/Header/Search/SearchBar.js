'use client';
import { useContext, useDeferredValue, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { CloseIcon, SearchIconNavbar } from '@/public/icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllProducts } from '@/redux/products/productsSelectors';
import { fetchAllProducts } from '@/redux/products/productsOperations';
import { useOutsideClick } from '@/hooks/useOnClickOutside';
import { Button } from 'universal-components-frontend/src/components/buttons';
import { StatusContext } from '@/context/statusContext';

const SearchBar = ({ showSearchBar, toggleSearchBar }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const deferredQuery = useDeferredValue(searchTerm);

  const refForm = useRef();
  const refList = useRef();
  const refMessage = useRef(); 

  const dispatch = useDispatch();
  const data = useSelector(selectAllProducts);
  const products = data?.products;

  const {setCountry, setTrademarks} = useContext(StatusContext);

  useEffect(() => {
    if (deferredQuery) {
      dispatch(fetchAllProducts());
    }
  }, [dispatch, deferredQuery]);

  const getFilteredProducts = event => {
    const searchWord = event.target.value;
    setSearchTerm(searchWord);
    if (products) {
      const newFilter = products?.filter(value => {
        return value.name.toLowerCase().includes(searchWord.toLowerCase());
      });

      if (searchWord === '') {
        setFilteredData([]);
      } else {
        setFilteredData(newFilter);
        setLoading(true);
      }
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchTerm !== '') {
      router.push({
        pathname: '/',
        query: { query: searchTerm.toLowerCase(), page: 1, sortType: router.query.sortType ? router.query.sortType : [] },
      });

      clearSearchTerm();
      setCountry([])
      setTrademarks([])
    }
    setIsFormSubmitted(true);

  };

  const clearSearchTerm = () => {
    setFilteredData([]);
    setLoading(false);
    toggleSearchBar();
  };

  const removeSearchTerm = () => {
    setSearchTerm('');
  };

  useOutsideClick(refList, refForm, () => {
    closeByClickOutside(refList);
  });


  useOutsideClick(refMessage, refForm, () => {
  closeByClickOutside(refMessage);
});

  const closeByClickOutside = (ref) => {
  if (window.innerWidth >= 1024) {    
    removeSearchTerm();
    if (ref === refMessage) {
      setIsFormSubmitted(false);
    }
  }
};

  const backToHomeUrl = () => {
    router.push({
      pathname: '/',
      query: {
        page: 1,
      },
    });
    clearSearchTerm();
  };

  return (
    <form
      onSubmit={handleSubmit}
      ref={refForm}
      className={`${
        showSearchBar
          ? 'hidden tablet768:flex items-center  relative max-sm:gap-4 max-w-3xl gap-4 '
          : 'flex items-center relative flex-col'
      }`}
    >
      <div className="search w-full">
        <input
          onChange={getFilteredProducts}
          placeholder="Я шукаю.."
          className="search-input w-full"
          value={searchTerm}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        />
        {searchTerm !== '' && (
          <button
            className="close-btn"
            type="button"
            onClick={removeSearchTerm}
          >
            <CloseIcon
              className="close-icon stroke-iconPrimary"
              width="34"
              height="34"
            />
          </button>
        )}
        <button className="search-icon" type="submit">
          <SearchIconNavbar className="icon w-[24px] h-[24px] stroke-iconWhite stroke-2" />
        </button>
      </div>
      {filteredData?.length !== 0 && searchTerm.length !== 0 && products && (
        <ul
          ref={refList}
          className="absolute top-[80px] w-full tablet1024:top-[54px] tablet1024:max-h-60 tablet1024:border tablet1024:border-borderDefault overflow-auto text-base text-textInputDefault tablet1024:rounded-lg bg-bgWhite focus:outline-none p-xs z-10"
        >
          {filteredData.slice(0, 15).map(item => (
            <li
              key={item._id}
              onClick={clearSearchTerm}
              className="relative cursor-pointer select-none "
            >
              <Link
                className="w-full pb-m block"
                href={{ pathname: `/product/${item._id}` }}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
      {filteredData?.length === 0 && searchTerm.length !== 0 && loading && (
        <div className=" mt-8 tablet600:mt-[280px] tablet768:mt-[331px] tablet768:w-[441px] tablet1024:w-full tablet1024:absolute w-full tablet1024:text-start tablet1024:top-[54px] tablet1024:mt-1 tablet1024:max-h-60 tablet1024:border tablet1024:border-borderDefault overflow-auto text-base text-textInputDefault tablet1024:rounded-lg bg-bgWhite focus:outline-none tablet1024:p-xs z-10">
          <p className="text-textPrimary text-lg font-medium mb-2 pl-[3px] tablet1024:pl-0">
            За вашим запитом нічого не знайдено
          </p>
          <p className="text-textSecondary text-[15px] tablet600:text-base/[24px] tablet1024:text-[15px] mb-4 -tracking-[0.225px] leading-5 pl-[3px] pr-[8px] tablet1024:pl-0 tablet1024:pr-0 tablet768:w-[332px] tablet1024:w-full">
            Перевірте та змініть запит або пошукайте товар в каталозі.
          </p>
          <Button
            buttonType="primary"
            type="button"
            text="Перейти до каталогу"
            className="bg-bgBrandDark py-2 px-m w-full tablet600:w-auto"
            size="small"
            onClick={() => backToHomeUrl()}
          />
        </div>
      )}

      <div
        ref={refMessage}
        className={`${
          isFormSubmitted && searchTerm === ''
            ? ' mt-2 tablet768:w-[441px] tablet1024:w-full tablet1024:absolute w-full tablet1024:text-start tablet1024:top-[54px] tablet1024:border tablet1024:border-borderDefault overflow-auto text-textInputDefault tablet1024:rounded-lg bg-bgWhite focus:outline-none tablet1024:p-xs z-10'
            : 'hidden'
        }`}
      >
        <p className="text-textSecondary text-[15px] tablet600:text-base/[24px] tablet1024:text-[15px] -tracking-[0.225px] leading-5 pl-[3px] pr-[8px] tablet1024:pl-0 tablet1024:pr-0 tablet768:w-[332px] tablet1024:w-full">
          Введіть пошукове слово
        </p>
      </div>
    </form>
  );
};

export default SearchBar;
