import { addToCheckout } from '@/redux/checkout/checkoutSlice';
import React from 'react';
import { useDispatch } from 'react-redux';

const CommentOrder = ({ checkoutData, isEmptyData }) => {
  const dispatch = useDispatch();

  const handleInputChange = (field, value) => {
    dispatch(addToCheckout({ field, value }));
  };
  return (
    <div className="flex flex-col gap-[16px] mb-6">
      <label
        htmlFor="comment"
        className="font-medium text-[18px] leading-[25.2px]"
      >
        Коментар до замовлення
      </label>
      <textarea
        id="comment"
        name="comment"
        rows="5"
        cols="33"
        minLength="10"
        value={checkoutData.userComment}
        onChange={e => handleInputChange('userComment', e.target.value)}
        className="resize-none w-full h-[140px] border border-borderDefault rounded-minimal px-[12px] py-[16px] focus:outline-none focus:border-borderDefaultBlue placeholder:text-textInputActive"
      />
      {isEmptyData &&
        checkoutData.userComment !== '' &&
        checkoutData.userComment.length<10 && (
          <p className="text-textError text-[12px]">Коментар має містити не менше 10 символів</p>
        )}
    </div>
  );
};

export default CommentOrder;
