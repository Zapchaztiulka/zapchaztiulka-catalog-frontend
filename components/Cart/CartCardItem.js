'use client';
import Counter from '../Buttons/Counter';
import {
  EmptyImageIcon,
  TrashIcon,
} from 'universal-components-frontend/src/components/icons';

const CartCardItem = ({
  id,
  photo,
  name,
  vendorCode,
  quantity,
  totalPrice,
}) => {
  return (
    <li
      key={id}
      className="border border-borderDefault rounded-lg hover:shadow-md"
    >
      <img src={photo[0]?.url} alt={photo[0]?.alt} />
      <h5>{name}</h5>
      <p>Артикул: {vendorCode}</p>
      <Counter id={id} counterValue={quantity} />
      <p>{totalPrice} ₴</p>
    </li>
  );
};

export default CartCardItem;
