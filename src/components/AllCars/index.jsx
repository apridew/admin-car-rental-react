import "./style.css";
import CardCar from "../CardCar";
import DeleteDialog from "../DeleteDialog";
import { useDispatch, useSelector } from "react-redux";
import * as formater from "../../helpers/formaters";
import { getListCars } from "../../redux/actions/carsAction";
import { TYPES } from "../../redux/type";

const AllCars = () => {
  const { car_list, isDelete } = useSelector((state) => state.carsReducer);
  const dispatch = useDispatch();
  const handleDialogNo = () => {
    dispatch({
      type: TYPES.IS_DELETE,
      payload: {
        delete: false,
      },
    });
  };

  const handleDialogYes = async (id) => {
    try {
      const res = await reqApi.deleteCar(id);
      dispatch(getListCars("", ""));
      console.log(res);
      dispatch({
        type: TYPES.SUCCESS_DELETE,
        payload: {
          deleteStatus: true,
        },
      });
      setTimeout(() => {
        dispatch({
          type: TYPES.IS_DELETE,
          payload: {
            delete: false,
          },
        });
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="list-all-card">
      {!car_list.length ? (
        <div className="notif-no-data d-flex justify-content-center align-items-center">
          <h1>Mobil yang dicari belum terdaftar</h1>
        </div>
      ) : (
        car_list.map((item, id) => {
          let categoryText = "";
          if (item.category === "small") {
            categoryText = "2 - 4 people";
          } else if (item.category === "people") {
            categoryText = "4 - 6 people";
          } else {
            categoryText = "6 - 8 people";
          }
          return (
            <div key={id}>
              <CardCar
                id={item.id}
                img={item.image}
                price={formater.idrFormater(item.price)}
                name={item.name}
                capacity={categoryText}
                time={`Updated at ${formater.dateFormater(item.updatedAt)}`}
              />
              {isDelete && (
                <>
                  <div className="overlay-bg"></div>
                  <div className="wrapper-dialog-box">
                    <DeleteDialog
                      handleClickNo={handleDialogNo}
                      handleClickYes={() => handleDialogYes(item.id)}
                    />
                  </div>
                </>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default AllCars;
