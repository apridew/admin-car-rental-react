import axios from "axios";

// API Get Cars
export const getCars = async (name, category, page, totalPage) => {
  try {
    const token = localStorage.getItem("accesToken");
    const config = {
      headers: {
        access_token: token,
      },
    };
    const response = await axios.get(
      `https://api-car-rental.binaracademy.org/admin/v2/car?name=${name}&minPrice=1&maxPrice=999999999&category=${category}&page=${page}&pageSize=${totalPage}`,
      config
    );
    console.log(response.data);

    return response;
  } catch (error) {
    // console.log(error.response.data.message);
    return error.response.data.message;
  }
};

// API Detail Car
export const detailCar = async (id) => {
  try {
    const token = localStorage.getItem("accesToken");
    const config = {
      headers: {
        access_token: token,
      },
    };
    const response = await axios.get(
      `https://api-car-rental.binaracademy.org/admin/car/${id}`,
      config
    );

    console.log(response.data);

    return response;
  } catch (error) {
    return error.response.data.message;
  }
};

// API Add Car
export const addCar = async (formData) => {
  try {
    const token = localStorage.getItem("accesToken");
    const config = {
      headers: {
        access_token: token,
      },
    };
    const response = await axios.post(
      "https://api-car-rental.binaracademy.org/admin/car",
      formData,
      config
    );

    return response;
  } catch (error) {
    return error.response.data.message;
  }
};

// API Delete Car
export const deleteCar = async (id) => {
  try {
    const token = localStorage.getItem("accesToken");
    const config = {
      headers: {
        access_token: token,
      },
    };
    const response = await axios.delete(
      `https://api-car-rental.binaracademy.org/admin/car/${id}`,
      config
    );

    return response;
  } catch (error) {
    return error.response.data.message;
  }
};

// API Edit Car
export const editCar = async (formData, id) => {
  try {
    const token = localStorage.getItem("accesToken");
    const config = {
      headers: {
        access_token: token,
      },
    };
    const response = await axios.put(
      `https://api-car-rental.binaracademy.org/admin/car/${id}`,
      formData,
      config
    );

    return response;
  } catch (error) {
    return error.response.data.message;
  }
};

// API Get All Order
export const getAllOrder = async ({ selected, limit }) => {
  const sortParam = " created_at:desc";
  const token = localStorage.getItem("accesToken");
  const config = {
    headers: {
      access_token: token,
    },
  };
  const ress = await axios.get(
    `https://api-car-rental.binaracademy.org/admin/v2/order?sort=${sortParam}&page=${
      selected + 1
    }&pageSize=${limit}`,
    config
  );

  return ress;
};
