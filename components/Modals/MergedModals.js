import { StatusContext } from '@/context/statusContext';
import React, { useContext } from 'react'
import { Notification } from 'universal-components-frontend/src/components/notifications';
import ModalOneClickOrder from './ModalOneClickOrder';
import ModalPreOrder from './ModalPreOrder';
import ModalAbsentOrder from './ModalAbsentOrder';
import ModalOrderSuccessful from './ModalOrderSuccessful';

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

  const handleSubmitOneClickOrder = async event => {
    event.preventDefault();
    const phone = event.target.elements.phone.value;
    const _id = product?._id;
    console.log('phone = ', phone);
    // postOrder(phone.replace(/[ ]/g, ''), _id);
    setShowModalOneClickOrder(false);
    setShowModalOrderSuccessful(!showModalOrderSuccessful);
  };

  const handleSubmitAbsentOrder = async event => {
    event.preventDefault();
    // mail: event.target.elements.mail.value;
    console.log('E-mail : ', event.target.elements.mail.value);
    setShowModalAbsentOrder(false);
    setShowModalOrderSuccessful(!showModalOrderSuccessful);
  };

    const handleSubmitPreOrder = async event => {
    event.preventDefault();
    const phone = event.target.elements.phone.value;
    console.log('phone = ', phone);
    console.log('preOrderId = ', preOrderId);
    // postOrder(phone.replace(/[ ]/g, ''), preOrderId);
    setShowModalPreOrder(false);
    setShowModalOrderSuccessful(!showModalOrderSuccessful);
  };

  //function who make format number phone with gaps(097 123 45 67)
  function formatPhoneNumber(input) {
    let cleaned = ('' + input).replace(/\D/g, '');
    let formattedNumber = '';
    for (let i = 0; i < cleaned.length; i++) {
      if (i === 3 || i === 6 || i === 8) {
        formattedNumber += ' ';
      }
      formattedNumber += cleaned[i];
    }
    return formattedNumber;
  }

  function displayError(message) {
    errorMessage.textContent = message;
  }

  //function who make change format number phone in input field
  const replacePhoneNumber = async () => {
    let errorMessage = document.getElementById('errorMessage');
    let phoneNumberInput = document.getElementById('phone');
    phoneNumberInput.addEventListener('input', function (event) {
      let inputPhoneNumber = event.target.value;
      phoneNumberInput.value = formatPhoneNumber(inputPhoneNumber);

      if (event.target.value[0] !== '0') {
        phoneNumberInput.value = inputPhoneNumber.slice(0, 1);
        displayError('Номер телефону має починатись з "0"');
      } else displayError('');
      if (inputPhoneNumber.length > 13) {
        let trimmedPhoneNumber = inputPhoneNumber.slice(0, 13);
        phoneNumberInput.value = trimmedPhoneNumber;
      }
    });
  };

  return (
    <>
      {/* Modal for One Click Order */}
      {showModalOneClickOrder && (
        <ModalOneClickOrder
          onClose={() => setShowModalOneClickOrder(false)}
          handleSubmitOneClickOrder={handleSubmitOneClickOrder}
          replacePhoneNumber={replacePhoneNumber}
        />
      )}
      {/* Modal for Pre Order */}
      {showModalPreOrder && (
        <ModalPreOrder
          onClose={() => setShowModalPreOrder(false)}
          replacePhoneNumber={replacePhoneNumber}
          handleSubmitPreOrder={handleSubmitPreOrder}
        />
      )}
      {/* Modal for Absent Order */}
      {showModalAbsentOrder && (
        <ModalAbsentOrder
          onClose={() => setShowModalAbsentOrder(false)}
          handleSubmitAbsentOrder={handleSubmitAbsentOrder}
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
        <Notification
          message="Товар додано до кошика"
          className="fixed z-20 bottom-6 left-1/2 transform -translate-x-1/2"
          size="small"
        />
      )}
    </>
  );
};

export default MergedModals
