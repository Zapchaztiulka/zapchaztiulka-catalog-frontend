import React from 'react';
import CardItem from './CardItem';
import { getNumberOfSpecialCard } from '@/helpers/getLimitByScreenWidth';
import { useContext } from 'react';
import { StatusContext } from '@/context/statusContext';
import ModalPreOrder from '@/components/Modals/ModalPreOrder';
import ModalOrderSuccessful from '@/components/Modals/ModalOrderSuccessful';
import { Notification } from 'universal-components-frontend/src/components/notifications';
import NotFoundProduct from './NotFoundProduct';

const CardsList = ({
  products,
  size,
  limit,
}) => {
  const indexOfSpecialCards = getNumberOfSpecialCard(size);
  const {
    showModalPreOrder,
    setShowModalPreOrder,
    showModalOrderSuccessful,
    setShowModalOrderSuccessful,
    showCartNotification,
  } = useContext(StatusContext);

  return (
    <>
      <div className="z-10">
        <ul className="flex flex-wrap gap-[7px] tablet600:gap-xs tablet1024:gap-s desktop1200:gap-sPlus mb-5">
          {products &&
            products?.map(
              (
                { name, _id, photo, price, vendorCode, availability },
                index
              ) => {
                return (
                  <React.Fragment key={_id}>
                    {index === indexOfSpecialCards && (
                      <div
                        key="additional"
                        className="product-card-special relative hover:shadow-lg cursor-pointer rounded-lg"
                      >
                        <>
                          <NotFoundProduct
                            containerStyles="containerStylesForProducts"
                            waveImageStyles="waveImageStylesForProducts"
                            textStylesForNotFoundProduct=" mt-[100px] mobile375:mt-[126px] tablet600:mt-[169px] tablet1024:mt-[178px] desktop1200:mt-[211px] gap-3 tablet600:gap-[10px] p-2 desktop1200:p-4"
                            headStyles="text-16/[22.4px] tablet600:text-20/[25px] mb-1 tablet600:mb-2 tablet600:w-[225px] tablet768:w-[169px] desktop1200:w-[199px] desktop1200:text-[24px]/[28.8px]"
                            textStyles="w-[118px] mobile375:w-[146px] tablet600:w-[180px] desktop1200:w-[205px] text-[10px]/[14px] tablet600:text-[14px]/[19.6px]  desktop1200:text-base/[24px]"
                          />
                        </>
                      </div>
                    )}
                    <CardItem
                      name={name}
                      id={_id}
                      photo={photo}
                      price={price}
                      vendorCode={vendorCode}
                      index={index}
                      limit={limit}
                      availability={availability}
                    />
                  </React.Fragment>
                );
              }
            )}
        </ul>
      </div>
      {/* Modal for Pre Order */}
      {showModalPreOrder && (
        <ModalPreOrder onClose={() => setShowModalPreOrder(false)} />
      )}
      {/* Modal for Successful Order*/}
      {showModalOrderSuccessful && (
        <ModalOrderSuccessful
          onClose={() => setShowModalOrderSuccessful(false)}
          hideCloseBtn
          availability={products?.availability}
        />
      )}
      {showCartNotification && (
        <Notification
          message="Товар додано до кошика"
          className="fixed z-20 bottom-6 left-1/2 transform -translate-x-1/2 rounded-lg border-borderSuccess"
        />
      )}
    </>
  );
};

export default CardsList;
