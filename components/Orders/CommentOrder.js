import { addToCheckoutLegal } from '@/redux/checkout/LegalPerson/legalSlice';
import { selectCheckout, selectCheckoutLegal } from '@/redux/checkout/checkoutSelector';
import { addToCheckout } from '@/redux/checkout/checkoutSlice';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';

const CommentOrder = ({
  isClientStatus,
  isEmptyDataIndividual,
  isEmptyDataLegal,
}) => {
  const dispatch = useDispatch();
  const checkoutData = useSelector(selectCheckout);
  const userLegalData = useSelector(selectCheckoutLegal);
  const comment = isClientStatus
    ? checkoutData.userComment
    : userLegalData.userCommentLegal;

  const handleInputChange = value => {
    if (!isClientStatus) {
      dispatch(addToCheckoutLegal({ field: 'userCommentLegal', value }));
    } else {
      dispatch(addToCheckout({ field: 'userComment', value }));
    }
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
        value={comment}
        onChange={e => handleInputChange(e.target.value)}
        className="resize-none w-full h-[140px] border border-borderDefault rounded-minimal px-[12px] py-[16px] focus:outline-none focus:border-borderDefaultBlue placeholder:text-textInputActive"
      />
      {isEmptyDataIndividual && comment !== '' && comment.length < 10 && (
        <p className="text-textError text-[12px]">
          Коментар має містити не менше 10 символів
        </p>
      )}
      {isEmptyDataLegal && comment !== '' && comment.length < 10 && (
        <p className="text-textError text-[12px]">
          Коментар має містити не менше 10 символів
        </p>
      )}
    </div>
  );
};

export default CommentOrder;