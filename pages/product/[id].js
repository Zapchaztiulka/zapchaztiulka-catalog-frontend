import Head from 'next/head';
import { useRouter } from 'next/router';
import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsLoading,
  selectProduct,
  selectProducts,
} from '@/redux/products/productsSelectors';
import {
  fetchProductByID,
  fetchProducts,
} from '@/redux/products/productsOperations';
import ReactContentLoader from '@/components/Skeleton/ReactContentLoader.js';

const ProductDetail = lazy(() =>
  import('../../components/Products/ProductDetail.js')
);
const PopularProducts = lazy(() => import('../../components/Products/PopularProducts.js'));
const RecentlyViewProducts = lazy(() => import('../../components/Products/RecentlyViewProducts.js'));

const ProductID = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const data = useSelector(selectProducts);
  const productId = product?._id;
  const [indexThumb, setIndexThumb] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isLoading = useSelector(selectIsLoading);
  let arrViewProduct = JSON.parse(
    localStorage.getItem('ProductViewed') || '[]'
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchProductByID(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchProducts({ page: 1, limit: 10 }));
  }, [dispatch]);

  useEffect(() => {
    if (productId === id && productId !== null) {
      if (product !== null) {
        arrViewProduct.unshift(product);
      }
      localStorage.setItem(
        'ProductViewed',
        JSON.stringify(arrViewProduct.slice(0, 5))
      );
    }
    return;
  }, [product]);

  const getUniqueViewedProducts = () => {
    if (typeof arrViewProduct != 'undefined' && arrViewProduct != null) {
      const newMap = new Map();
      arrViewProduct?.forEach(item => newMap.set(item?._id, item));
      return [...newMap.values()];
    }
  };
  const productFromLocalStorage = getUniqueViewedProducts();

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const mainRef = useRef(null);

  const handleThumbs = id => {
    if (mainRef.current) {
      mainRef.current.go(id);
    }
    setIndexThumb(id);
  };

  return (
    <>
      <Head>
        <title>{product?.name}</title>
        <meta property="og:description" content={product?.description} />
        <meta name="keywords" content={product?.vendorCode} />
        <meta name="keywords" content={product?.name} />
        <meta property="og:title" content={product?.name} />
        <meta name="description" content={product?.description} />
        <meta name="keywords" content={product?.keywords} />
      </Head>
      <Suspense fallback={<ReactContentLoader />}>
        <ProductDetail
          setShowModal={setShowModal}
          showModal={showModal}
          product={product}
          isOpen={isOpen}
          toggle={toggle}
          mainRef={mainRef}
          handleThumbs={handleThumbs}
          indexThumb={indexThumb}
        />
      </Suspense>
      <h2 className="mb-s text-textPrimary text-lg/[25.2px] tablet600:text-2xl/[28.8px] desktop1200:text-2xl/[36.4px] -tracking-[0.36px] desktop1200:-tracking-[0.42px] container">
        Найбільш популярні
      </h2>
      {data && (
        <div className="pl-s mobile480:pl-m tablet1024:px-m desktop1440:px-[120px] desktop1920:px-[207.5px] tablet1024:container tablet1024:flex tablet1024:flex-col tablet1024:products-start mx-auto">
          <Suspense fallback={<p>Loading...</p>}><PopularProducts products={data.products} isLoading={isLoading} /></Suspense>
        </div>
      )}
      {productFromLocalStorage.length > 0 && (
        <>
          <h2 className="mb-s mt-6 tablet600:mt-0 text-textPrimary text-lg/[25.2px] tablet600:text-2xl/[28.8px] desktop1200:text-2xl/[36.4px] -tracking-[0.36px] desktop1200:-tracking-[0.42px] container">
            Переглянуті товари
          </h2>
          <div className="pl-xs mt-6 tablet600:mt-0 mobile480:pl-m tablet1024:px-m desktop1440:px-[120px] desktop1920:px-[207.5px] tablet1024:container tablet1024:flex tablet1024:flex-col tablet1024:products-start mx-auto">
             <Suspense fallback={<p>Loading...</p>}><RecentlyViewProducts
              productFromLocalStorage={productFromLocalStorage}
            /></Suspense>
          </div>
        </>
      )}
    </>
  );
};

export default ProductID;
