import axios from 'axios';

export const getCars = async (name, category) => {
  const token = localStorage.getItem('accesToken');

  const config = {
    headers: {
      access_token: token,
    },
  };

  const response = await axios.get(
    `https://api-car-rental.binaracademy.org/admin/v2/car?name=${name}&category=${category}&page=1&pageSize=10`,
    config
  );

  return response;
};

// const baseURL = 'https://api-car-rental.binaracademy.org/admin/v2';

export const getAllOrder = async ({ selected, limit }) => {
  const token = localStorage.getItem('accesToken');

  const config = {
    headers: {
      access_token: token,
    }
  }

  const ress = await axios.get(
    `https://api-car-rental.binaracademy.org/admin/v2/order?page=${selected + 1}&pageSize=${limit}`, config
  )

  return ress
}