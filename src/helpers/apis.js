import axios from "axios";

// const token = localStorage.getItem("accesToken");
export const getCars = async (name, category, page, totalPage) => {
  const token = localStorage.getItem("accesToken");

  try {
    const config = {
      headers: {
        access_token: token,
      },
    };

    const response = await axios.get(
      `https://api-car-rental.binaracademy.org/admin/v2/car?name=${name}&category=${category}&page=${page}&pageSize=${totalPage}`,
      config
    );
    console.log(response.data);

    return response;
  } catch (error) {
    // console.log(error.response.data.message);
    return error.response.data.message;
  }
};

export const deleteCar = async (id) => {
  const token = localStorage.getItem("accesToken");

  try {
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
    //
    return error.response.data.message;
  }
};
export const updateCar = async (id) => {
  const token = localStorage.getItem("accesToken");

  try {
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
    //
    return error.response.data.message;
  }
};
