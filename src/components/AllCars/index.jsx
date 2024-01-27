import "./style.css";
import CardCar from "../CardCar";
import DeleteDialog from "../DeleteDialog";
import { useDispatch, useSelector } from "react-redux";
import * as formater from "../../helpers/formaters";
import * as reqApi from "../../helpers/apis";
import { getListCars } from "../../redux/actions/carsAction";
import { TYPES } from "../../redux/type";
import noImage from "../../assets/img/no-image.jpg";

const AllCars = () => {
  const { car_list, isDelete, idCar, isLoading } = useSelector(
    (state) => state.carsReducer
  );
  const dispatch = useDispatch();

  const handleDialogNo = () => {
    dispatch({
      type: TYPES.IS_DELETE,
      payload: {
        delete: false,
      },
    });
  };

  const handleDialogYes = async () => {
    formater.scrollTop();
    try {
      const res = await reqApi.deleteCar(idCar);
      dispatch(getListCars("", "", "", 9));
      console.log(res);
      dispatch({
        type: TYPES.SUCCESS_DELETE,
        payload: {
          deleteStatus: true,
        },
      });
      dispatch({
        type: TYPES.IS_DELETE,
        payload: {
          delete: false,
        },
      });
      setTimeout(() => {
        dispatch({
          type: TYPES.SUCCESS_DELETE,
          payload: {
            deleteStatus: false,
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
          {isLoading ? (
            <div className="wrapper-spinner">
              <div className="spinner-border tex" role="status">
                <span className="visually-hidden"></span>
              </div>
            </div>
          ) : (
            <h1>Mobil belum tersedia</h1>
          )}
        </div>
      ) : (
        car_list.map((item, id) => {
          const categoryText = formater.categoryTextFormater(item.category);

          return (
            <div key={id}>
              <CardCar
                id={item.id}
                img={!item.image ? noImage : item.image}
                price={formater.idrFormater(item.price)}
                name={item.name}
                capacity={categoryText}
                time={`Updated at ${formater.dateFormater(item.updatedAt)}`}
              />
            </div>
          );
        })
      )}
      {isDelete && (
        <>
          <div className="overlay-bg"></div>
          <div className="wrapper-dialog-box">
            <DeleteDialog
              handleClickYes={handleDialogYes}
              handleClickNo={handleDialogNo}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AllCars;
