import {
  MinusIcon,
  PlusIcon,
} from 'universal-components-frontend/src/components/icons';
import { useDispatch } from 'react-redux';
import { changeQuantity, getCartTotal } from '../../redux/cart/cartSlice';

const Counter = ({ id, counterValue }) => {
  const dispatch = useDispatch();
  const valueDecrement = () => {
    dispatch(changeQuantity({ id, type: 'DEC' }));
    dispatch(getCartTotal());
  };

  const valueIncrement = () => {
    dispatch(changeQuantity({ id, type: 'INC' }));
    dispatch(getCartTotal());
  };

  return (
    <div className="flex justify-center w-full items-center gap-[10px]   bg-bgWhite">
      <button
        onClick={valueDecrement}
        type="button"
        className=" flex justify-center items-center"
      >
        <MinusIcon />
      </button>
      <span
        id={id.slice(18)}
        className="font-medium text-[16px] leading-[22.4px] text-textPrimary"
      >
        {counterValue}
      </span>
      <button
        onClick={valueIncrement}
        type="button"
        className=" flex justify-center items-center"
      >
        <PlusIcon />
      </button>
    </div>
  );
};

export default Counter;
