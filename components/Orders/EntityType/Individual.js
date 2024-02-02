import { formatPhoneNumber, replacePhoneNumber } from '@/helpers/formatPhoneNumber';
import { selectCheckout } from '@/redux/checkout/checkoutSelector';
import { addToCheckout } from '@/redux/checkout/checkoutSlice';
import { useDispatch, useSelector } from 'react-redux';

const Individual = () => {
  const dispatch = useDispatch();
  const checkoutData = useSelector(selectCheckout);

  const handleInputChange = (field, value) => {
    dispatch(addToCheckout({ field, value }));
  };

    const handlePhoneInputChange = (event) => {
    const inputPhoneNumber = event.target.value;
    const formattedPhoneNumber = formatPhoneNumber(inputPhoneNumber);
    dispatch(addToCheckout({ field: 'phone', value: formattedPhoneNumber }));
  };


  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col tablet768:flex-row gap-3">
        <div className="checkout-contacts-input">
          <label>
            Ім'я <span className="text-textError">*</span>
            <input
              name="username"
              type="text"
              required
              value={checkoutData.username}
              onChange={e => handleInputChange('username', e.target.value)}
              className="w-full h-[48px] border border-borderDefault rounded-minimal p-[12px]"
            />
          </label>
        </div>
        <div className="checkout-contacts-input">
          <label>
            Прізвище <span className="text-textError">*</span>
            <input
              name="userSurname"
              type="text"
              value={checkoutData.userSurname}
              required
              onChange={e => handleInputChange('userSurname', e.target.value)}
              className="w-full h-[48px] border border-borderDefault rounded-minimal p-[12px]"
            />
          </label>
        </div>
      </div>

      <div className="flex flex-col tablet768:flex-row gap-3">
        <div className="checkout-contacts-input">
          <label>
            По батькові <span className="text-textError">*</span>
            <input
              name="userMiddleName"
              type="text"
              value={checkoutData.userMiddleName}
              required
              onChange={e =>
                handleInputChange('userMiddleName', e.target.value)
              }
              className="w-full h-[48px] border border-borderDefault rounded-minimal p-[12px]"
            />
          </label>
        </div>

        <div className="checkout-contacts-input">
          <label>
            E-mail <span className="text-textError">*</span>
            <input
              name="mail"
              type="email"
              title="example@mail.com"
              value={checkoutData.email}
              required
              onChange={e => handleInputChange('email', e.target.value)}
              className="w-full h-[48px] border border-borderDefault rounded-minimal p-[12px]"
            />
          </label>
        </div>
      </div>

      <div className="checkout-contacts-input">
        <label className="relative">
          Номер телефону <span className="text-textError">*</span>
          <span className="absolute grid items-center z-10 top-[29px] left-[12px] w-[32px] h-[28px] border-r-[1px] border-textInputDefault text-[14px] leading-[19.6px] decoration-textTertiary">
            +38
          </span>
          <input
            className="pl-[53px] w-full h-[48px] border border-borderDefault rounded-minimal"
            name="phone"
            type="tel"
            id="phone"
            maxLength="13"
            pattern="0[0-9]{2} [0-9]{3} [0-9]{2} [0-9]{2}"
            title="096 123 45 67"
            autoComplete="off"
            required
                        onChange={handlePhoneInputChange}
            value={formatPhoneNumber(checkoutData.phone)}
          />
          <span id="errorMessage" className="text-textWarning"></span>
        </label>
      </div> 
    </div>
  );
};

export default Individual;
