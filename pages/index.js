'use client';
import React, { useEffect, useState } from 'react';
import { customAlphabet } from 'nanoid';
import CardsList from '@/components/Products/CardsList';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsLoading,
  selectError,
  selectCountryPriceTrademark,
  selectProducts,
} from '@/redux/products/productsSelectors';
import Loader from '@/components/Loader';
import Filter from '@/components/Filter/Filter';
import BtnPrimary from '@/components/Buttons/BtnPrimary';
import { FilterIcon } from '@/public/icons';
import FilterMobile from '@/components/Filter/FilterMobile';
import { fetchCountryPriceTrademark } from '@/redux/products/productsOperations';

const StartPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  // const data = useSelector(selectAllProducts);
    const data = useSelector(selectProducts);
  const error = useSelector(selectError);
  const [isOpen, setIsOpen] = useState(false);
  const productInfo = useSelector(selectCountryPriceTrademark);

  const toggle = () => {
      setIsOpen(!isOpen);
    };

  const storedUserId = localStorage.getItem('userId');
  if (!storedUserId) {
    localStorage.setItem('userId', customAlphabet('0123456789', 24)());
  }

  // get trademarks and countries for filter
    useEffect(() => {
      dispatch(fetchCountryPriceTrademark());
    }, [dispatch]);

  return (
    <>
      <div className="container mt-[130px] flex flex-col tablet1024:flex tablet1024:flex-row gap-s desktop1920:gap-sPlus">
        <div className="hidden tablet1024:block tablet1024:w-[265px] desktop1200:w-[285px] border border-borderDefault rounded-lg shrink-0 p-xs">
          <Filter productInfo={productInfo} />
        </div>
        <div className="tablet1024:hidden">
          <BtnPrimary width={'w-full'} onClick={toggle}>
            <FilterIcon className="w-[24px] h-[24px]" />
            <span>Фільтр</span>
          </BtnPrimary>
          <FilterMobile showFilter={isOpen} toggle={toggle} />
        </div>
        {isLoading && data?.length === 0 && <Loader />}
        {error && <p>Тут буде повідомлення про помилку</p>}
        <CardsList
          isLoading={isLoading}
          products={data.products}
          totalCount={data?.totalCount}
        />
      </div>
    </>
  );
};

export default StartPage;
