import { useState } from "react";
import "./style.css";
import logo from "../../assets/img/logo.png";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { TYPES } from "../../redux/type";
const Navbar = ({ main, submitSearch, resetSearch }) => {
  const { chooseSidebar, login } = useSelector((state) => state.loginReducer);
  const { isSearch, name_car } = useSelector((state) => state.carsReducer);
  const [showSidebar, setshowSidebar] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dashboardClick = () => {
    dispatch({
      type: TYPES.CHOOSE_SIDEBAR,
      payload: {
        sidebar: true,
      },
    });
    navigate("/");
  };
  const carsClick = () => {
    dispatch({
      type: TYPES.CHOOSE_SIDEBAR,
      payload: {
        sidebar: false,
      },
    });
    navigate("/cars");
  };

  const sidebarShow = () => {
    setshowSidebar(!showSidebar);
  };

  const searchChange = (e) => {
    dispatch({
      type: TYPES.NAME_CAR,
      payload: {
        name_car: e.target.value,
      },
    });
    dispatch({
      type: TYPES.IS_SEARCH,
      payload: {
        search: false,
      },
    });
    // console.log(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem("accesToken");
    dispatch({
      type: TYPES.SET_LOGIN,
      payload: {
        data: true,
      },
    });

    setTimeout(() => {
      navigate("/sign-in");
      dispatch({
        type: TYPES.CHOOSE_SIDEBAR,
        payload: {
          sidebar: true,
        },
      });
      dispatch({
        type: TYPES.SET_LOGIN,
        payload: {
          data: false,
        },
      });
    }, 1000);
  };

  return (
    <div id="navbar" className="container-fluid p-0">
      <div className="row wrapper-bar p-0 m-0 d-flex">
        {/* START SIDEBAR */}
        <div
          className={`col side-bar d-flex p-0 flex-grow-0 ${
            showSidebar ? "d-none" : ""
          }`}
        >
          <div className="side-bar-left d-flex flex-column fixed-top">
            <div className="logo d-flex justify-content-center p-2 align-items-center">
              <img className="w-50 h-50" src={logo} alt="logo" />
            </div>
            <div
              className={`box text-center ${chooseSidebar ? "bg-box" : ""}`}
              onClick={dashboardClick}
            >
              <i className="bi bi-house"></i>
              <p>Dashboard</p>
            </div>
            <div
              className={`box text-center ${chooseSidebar ? "" : "bg-box"}`}
              onClick={carsClick}
            >
              <i className="bi bi-truck"></i>
              <p>Cars</p>
            </div>
          </div>
          <div className="side-bar-right d-none d-xl-flex flex-column">
            <h5 className="d-flex align-items-center">Binar Car Rental</h5>
            <p>{chooseSidebar ? "Dashboard" : "Cars"}</p>
            <button>{chooseSidebar ? "Dashboard" : "List Car"}</button>
          </div>
        </div>
        {/* END SIDEBAR */}

        {/* START NAVBAR*/}
        <div className="col bar-content bg-body-secondary">
          <div className="header-bar h-auto py-3 d-flex align-items-center justify-content-between bg-white">
            {showSidebar ? (
              <i className="bi bi-x" onClick={sidebarShow}></i>
            ) : (
              <i className="bi bi-list" onClick={sidebarShow}></i>
            )}
            <div className="header-bar-right flex-column flex-sm-row d-flex gap-4">
              <div className="searh-box d-flex align-items-center">
                <span>
                  <i className="bi bi-search"></i>
                </span>
                <input
                  onChange={searchChange}
                  type="text"
                  placeholder="Search"
                  className="ps-5"
                  value={name_car}
                />
                {isSearch ? (
                  <button
                    onClick={resetSearch}
                    className="btn btn-outline-danger border-danger fw-bold"
                  >
                    Reset
                  </button>
                ) : (
                  <button
                    onClick={submitSearch}
                    className="btn btn-outline-primary fw-bold"
                  >
                    Search
                  </button>
                )}
              </div>
              <div className="user-profile d-flex justify-content-end align-items-center gap-2">
                <a className="avatar">A</a>
                <div className="dropdown">
                  <button
                    className="btn border-0 dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Admin
                  </button>
                  <ul className="dropdown-menu mt-1">
                    <li>
                      <a className="dropdown-item">Profile</a>
                    </li>
                    <li>
                      <a
                        onClick={handleLogout}
                        className="dropdown-item text-danger"
                        role="button"
                      >
                        Sign Out
                        <i className="bi bi-box-arrow-right ps-2"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* END NAVBAR*/}

          <div className="content">
            {login && (
              <div className="card mb-3 text-danger bg-danger-subtle d-flex justify-content-center align-items-center p-2 border-0">
                <p className="m-0">Berhasil Sign Out</p>
                <div className="spinner-border" role="status">
                  <span className="visually-hidden"></span>
                </div>
              </div>
            )}
            {main}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
