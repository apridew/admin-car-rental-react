import "./style.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TYPES } from "../../redux/type";
import { getListCars } from "../../redux/actions/carsAction";
import Navbar from "../../components/Navbar";
import ButtonSearch from "../../components/ButtonSearch";
import AllCars from "../../components/AllCars";
import { Breadcrumb } from "react-bootstrap";

const CarsPage = () => {
  const { isLoading, name_car } = useSelector((state) => state.carsReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [allClicked, setAllClicked] = useState(true);
  const [smallClicked, setSmallClicked] = useState(false);
  const [mediumClicked, setMediumClicked] = useState(false);
  const [largeClicked, setLargeClicked] = useState(false);

  useEffect(() => {
    dispatch(getListCars(name_car, category));
    dispatch({
      type: TYPES.CHOOSE_SIDEBAR,
      payload: {
        sidebar: false,
      },
    });
  }, [category]);

  const submitSearch = () => {
    dispatch(getListCars(name_car, category));
    dispatch({
      type: TYPES.IS_SUBMIT,
      payload: {
        submit: true,
      },
    });
  };

  const resetSearch = () => {
    dispatch({
      type: TYPES.IS_SUBMIT,
      payload: {
        submit: false,
      },
    });
    dispatch({
      type: TYPES.NAME_CAR,
      payload: {
        name_car: "",
      },
    });
    dispatch(getListCars("", ""));

    setAllClicked(true);
    setSmallClicked(false);
    setMediumClicked(false);
    setLargeClicked(false);
  };

  const chooseCategory = (selected) => {
    setCategory(selected);
    setAllClicked(true);
    setSmallClicked(false);
    setMediumClicked(false);
    setLargeClicked(false);
  };

  const chooseCategorySmall = (selected) => {
    setCategory(selected);
    setAllClicked(false);
    setSmallClicked(true);
    setMediumClicked(false);
    setLargeClicked(false);
  };

  const chooseCategoryMedium = (selected) => {
    setCategory(selected);
    setAllClicked(false);
    setSmallClicked(false);
    setMediumClicked(true);
    setLargeClicked(false);
  };

  const chooseCategoryLarge = (selected) => {
    setCategory(selected);
    setAllClicked(false);
    setSmallClicked(false);
    setMediumClicked(false);
    setLargeClicked(true);
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
                  handleClick={() => chooseCategory("")}
                  text={"All"}
                  style={allClicked ? "clicked" : ""}
                />
                <ButtonSearch
                  name={"small"}
                  handleClick={() => chooseCategorySmall("small")}
                  text={"2 - 4 people"}
                  style={smallClicked ? "clicked" : ""}
                />
                <ButtonSearch
                  name={"medium"}
                  handleClick={() => chooseCategoryMedium("medium")}
                  text={"4 - 6 people"}
                  style={mediumClicked ? "clicked" : ""}
                />
                <ButtonSearch
                  name={"large"}
                  handleClick={() => chooseCategoryLarge("large")}
                  text={"6 - 8 people"}
                  style={largeClicked ? "clicked" : ""}
                />
              </div>
              <AllCars />
            </div>
          )
        }
      />
    </>
  );
};

export default CarsPage;
