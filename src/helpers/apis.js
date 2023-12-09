import axios from 'axios';

export const getCars = async (name, category, isRented, minPrice, maxPrice) => {
  const token = localStorage.getItem('accesToken');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `https://api-car-rental.binaracademy.org/admin/v2/car?name=${name}&category=${category}&isRented=${isRented}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=1&pageSize=10`,
    config
  );

  return response;
};
