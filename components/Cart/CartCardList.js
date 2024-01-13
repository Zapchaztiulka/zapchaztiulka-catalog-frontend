'use client';
import CartCardItem from './CartCardItem';
import { useSelector } from 'react-redux';
import { selectCart } from '../../redux/cart/cartSelector';

const CartCardList = () => {
    const { data } = useSelector(selectCart);
    // const { photo, name, vendorCode, quantity, totalPrice } = data[0];

    return (<CartCardItem />)
    
}

export default CartCardList;
