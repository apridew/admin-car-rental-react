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
