import { StatusContext } from '@/context/statusContext';
import React, { useContext } from 'react'
import ModalOneClickOrder from './ModalOneClickOrder';
import ModalPreOrder from './ModalPreOrder';
import ModalAbsentOrder from './ModalAbsentOrder';
import ModalOrderSuccessful from './ModalOrderSuccessful';
import Notifications from '../Notifications';

const MergedModals = ({ product }) => {
    const {
    showModalPreOrder,
    setShowModalPreOrder,
    preOrderId,
    showModalOrderSuccessful,
    setShowModalOrderSuccessful,
    showCartNotification,
    showModalOneClickOrder,
    setShowModalOneClickOrder,
    showModalAbsentOrder,
    setShowModalAbsentOrder,
    } = useContext(StatusContext);

  return (
    <>
      {/* Modal for One Click Order */}
      {showModalOneClickOrder && (
        <ModalOneClickOrder
          product={product}
          preOrderId={preOrderId}
          onClose={() => setShowModalOneClickOrder(false)}
          setShowModalOneClickOrder={setShowModalOneClickOrder}
          setShowModalOrderSuccessful={setShowModalOrderSuccessful}
          showModalOrderSuccessful={showModalOrderSuccessful}
        />
      )}
      {/* Modal for Pre Order */}
      {showModalPreOrder && (
        <ModalPreOrder
          onClose={() => setShowModalPreOrder(false)}
          preOrderId={preOrderId}
          setShowModalPreOrder={setShowModalPreOrder}
          setShowModalOrderSuccessful={setShowModalOrderSuccessful}
          showModalOrderSuccessful={showModalOrderSuccessful}
        />
      )}
      {/* Modal for Absent Order */}
      {showModalAbsentOrder && (
        <ModalAbsentOrder
          onClose={() => setShowModalAbsentOrder(false)}
          preOrderId={preOrderId}
          setShowModalAbsentOrder={setShowModalAbsentOrder}
          setShowModalOrderSuccessful={setShowModalOrderSuccessful}
          showModalOrderSuccessful={showModalOrderSuccessful}
        />
      )}
      {/* Modal for Successful Order*/}
      {showModalOrderSuccessful && (
        <ModalOrderSuccessful
          onClose={() => setShowModalOrderSuccessful(false)}
          hideCloseBtn
          availability={product?.availability}
        />
      )}
      {showCartNotification && (
        <div className="fixed z-20 bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
          <Notifications message={'Товар додано до кошика'} />
        </div>
      )}
    </>
  );
};

export default MergedModals
