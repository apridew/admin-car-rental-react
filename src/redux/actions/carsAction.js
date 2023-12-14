import { TYPES } from "../type";
import * as reqApi from "../../helpers/apis";

export const getListCars = (name, category) => async (dispatch) => {
  try {
    const res = await reqApi.getCars(name, category);
    // console.log("API All Cars", res.data.cars);
    dispatch({
      type: TYPES.ALL_CARS,
      payload: {
        data: res.data.cars,
      },
    });
    dispatch({
      type: TYPES.IS_LOADING,
      payload: {
        loading: false,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
