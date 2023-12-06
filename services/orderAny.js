import axios from 'axios';

export const postOrder = async (phone, _id) => {
  const postData = {
    phone: phone,
    products: [
      {
        productId: _id,
        quantity: 1,
      },
    ],
    adminTag: 'ok',
  };
  const { data } = await axios.post(
    `https://spares-backend-i2mq.onrender.com/api/orders/any`,
    postData
  );
  return data;
};
