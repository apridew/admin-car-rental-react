import "./style.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TYPES } from "../../redux/type";
import { getListCars } from "../../redux/actions/carsAction";
import { Breadcrumb } from "react-bootstrap";
import Navbar from "../../components/Navbar";
import ButtonSearch from "../../components/ButtonSearch";
import AllCars from "../../components/AllCars";
import PaginationCars from "../../components/Pagination";

const CarsPage = () => {
  const {
    isLoading,
    isSubmit,
    name_car,
    currentPage,
    isSearch,
    car_list,
    successDelete,
  } = useSelector((state) => state.carsReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [allClicked, setAllClicked] = useState(true);
  const [smallClicked, setSmallClicked] = useState(false);
  const [mediumClicked, setMediumClicked] = useState(false);
  const [largeClicked, setLargeClicked] = useState(false);

  useEffect(() => {
    dispatch(getListCars("", "", currentPage, 9));
    dispatch({
      type: TYPES.CHOOSE_SIDEBAR,
      payload: {
        sidebar: false,
      },
    });
  }, [currentPage]);

  const submitSearch = () => {
    dispatch(getListCars(name_car, "", 1, ""));
    dispatch({
      type: TYPES.IS_SEARCH,
      payload: {
        search: true,
      },
    });
  };

  const resetSearch = () => {
    dispatch({
      type: TYPES.IS_SEARCH,
      payload: {
        search: false,
      },
    });
    dispatch({
      type: TYPES.NAME_CAR,
      payload: {
        name_car: "",
      },
    });
    dispatch(getListCars("", "", "", 9));

    setAllClicked(true);
    setSmallClicked(false);
    setMediumClicked(false);
    setLargeClicked(false);
  };

  const chooseCategory = (
    selected,
    small = false,
    medium = false,
    large = false
  ) => {
    dispatch(getListCars(name_car, selected, 1, small ? "" : 9));
    dispatch({
      type: TYPES.IS_SEARCH,
      payload: {
        search: true,
      },
    });
    setAllClicked(!small && !medium && !large);
    setSmallClicked(small);
    setMediumClicked(medium);
    setLargeClicked(large);
  };

  return (
    <>
      <Navbar
        resetSearch={resetSearch}
        submitSearch={submitSearch}
        main={
          isLoading ? (
            <div className="wrapper-spinner">
              <div className="spinner-border tex" role="status">
                <span className="visually-hidden"></span>
              </div>
            </div>
          ) : (
            <div id="cars-page">
              {successDelete && (
                <div className="wrapper-notif">
                  <div className="notification-delete">
                    <p className="m-0">Data Berhasil Dihapus</p>
                  </div>
                </div>
              )}
              {isSubmit && (
                <div className="wrapper-notif">
                  <div className="notification">
                    <p className="m-0">Data Berhasil Disimpan</p>
                  </div>
                </div>
              )}
              <Breadcrumb>
                <Breadcrumb.Item href="/">Cars</Breadcrumb.Item>
                <Breadcrumb.Item active>List Car</Breadcrumb.Item>
              </Breadcrumb>
              <div className="cars-row-2 d-flex justify-content-between align-items-center mb-3">
                <p>List Car</p>
                <button onClick={() => navigate("/add-car")}>
                  <i className="bi bi-plus"></i> Add New Car
                </button>
              </div>

              <div className="button-search mb-4">
                <ButtonSearch
                  name={""}
                  handleClick={() => chooseCategory("", false, false, false)}
                  text={"All"}
                  style={allClicked ? "clicked" : ""}
                />
                <ButtonSearch
                  name={"small"}
                  handleClick={() => chooseCategory("small", true)}
                  text={"2 - 4 people"}
                  style={smallClicked ? "clicked" : ""}
                />
                <ButtonSearch
                  name={"medium"}
                  handleClick={() => chooseCategory("medium", false, true)}
                  text={"4 - 6 people"}
                  style={mediumClicked ? "clicked" : ""}
                />
                <ButtonSearch
                  name={"large"}
                  handleClick={() =>
                    chooseCategory("large", false, false, true)
                  }
                  text={"6 - 8 people"}
                  style={largeClicked ? "clicked" : ""}
                />
              </div>
              {isLoading ? (
                <div className="wrapper-spinner">
                  <div className="spinner-border tex" role="status">
                    <span className="visually-hidden"></span>
                  </div>
                </div>
              ) : (
                <AllCars />
              )}
              <div className="bottom-cars d-flex justify-content-between align-items-center">
                {!isSearch && (
                  <PaginationCars name_car={name_car} category={""} />
                )}
                <p className="m-0 fw-bold d-flex align-items-center gap-3 py-3">
                  Total Cars : {car_list.length ? car_list.length : "0"}
                  <a>|</a>
                  <a href="#">
                    <i className="bi bi-arrow-up-circle fs-4"></i>
                  </a>
                </p>
              </div>
            </div>
          )
        }
      />
    </>
  );
};

export default CarsPage;
