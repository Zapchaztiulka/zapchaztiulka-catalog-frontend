import axios from 'axios';

const apiUrl= process.env.NEXT_PUBLIC_NOVAPOSHTA_URL;
const apiKey = process.env.NEXT_PUBLIC_NOVAPOSHTA_API_KEY;

export const fetchDataNovaPoshta = async () => {
  const dataBody = {
    apiKey: apiKey,
    modelName: 'Address',
    calledMethod: 'getSettlements',
    methodProperties: {
      AreaRef: 'dcaad5a7-4b33-11e4-ab6d-005056801329',
      RegionRef: 'e4af9625-4b33-11e4-ab6d-005056801329',
      Page: '1',
      Warehouse: '1',
      FindByString: '',
      Limit: '150',
    },
  };

  const { data } = await axios.post(apiUrl, dataBody);
  return data;
};

export const novaPoshtaApi = axios.create({
  baseURL: 'apiUrl',
});

export const getData = async body => {
  try {
    const { data, status } = await novaPoshtaApi.post(``, body);
    if (status !== 200) {
      throw new Error(`Failed to fetch data: ${status}`);
    }
    return data;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};

// export const fetchWarehousesNovaPoshta = async () => {
//   const dataBody = {
//     apiKey: apiKey,
//     modelName: 'Address',
//     calledMethod: 'getWarehouses',
//     methodProperties: {
//       SettlementRef: 'e7140a59-4b33-11e4-ab6d-005056801329',
//       Page: '1',
//       Limit: '500',
//       Language: 'UA',
//       TypeOfWarehouseRef: ''
//     }
//   };

//   const { data } = await axios.post(apiUrl, dataBody);
//   return data;
// };

