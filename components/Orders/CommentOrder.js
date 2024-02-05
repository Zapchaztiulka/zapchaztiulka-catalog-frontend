import { selectCheckout } from '@/redux/checkout/checkoutSelector';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CommentOrder = () => {
  const dispatch = useDispatch();
  const checkoutData = useSelector(selectCheckout);

  const handleInputChange = (field, value) => {
    dispatch(addToCheckout({ field, value }));
  };
  return (
    <div className="flex flex-col gap-[16px]">
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
        value={checkoutData.userComment}
        onChange={e => handleInputChange('userComment', e.target.value)}
        className="resize-none w-full h-[140px] border border-borderDefault rounded-minimal px-[12px] py-[16px]"
      />
    </div>
  );
};

export default CommentOrder;
