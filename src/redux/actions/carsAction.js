import { TYPES } from "../type";
import * as reqApi from "../../helpers/apis";

export const getListCars =
  (name, category, page, totalPage) => async (dispatch) => {
    try {
      const res = await reqApi.getCars(name, category, page, totalPage);
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
      dispatch({
        type: TYPES.PAGINATION,
        payload: {
          currentPage: res.data.page,
          totalPage: res.data.pageCount,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
