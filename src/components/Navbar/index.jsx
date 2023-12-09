import { useState } from 'react';
import './style.css';
import logo from '../../assets/img/logo.png';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
const Navbar = ({ main }) => {
  const [showSidebar, setshowSidebar] = useState(false);
  const { chooseSidebar } = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dashboardClick = () => {
    dispatch({
      type: 'CHOOSE_SIDEBAR',
      payload: {
        sidebar: true,
      },
    });
    navigate('/');
  };
  const carsClick = () => {
    dispatch({
      type: 'CHOOSE_SIDEBAR',
      payload: {
        sidebar: false,
      },
    });
    navigate('/cars');
  };

  const sidebarShow = () => {
    setshowSidebar(!showSidebar);
  };

  return (
    <div id="navbar" className="container-fluid p-0">
      <div className="row wrapper-bar p-0 m-0 d-flex">
        {/* START SIDEBAR*/}
        <div className={`col side-bar d-flex p-0 flex-grow-0 ${showSidebar ? 'd-none' : ''}`}>
          <div className="side-bar-left d-flex flex-column">
            <div className="logo d-flex justify-content-center p-2 align-items-center">
              <img className="w-50 h-50" src={logo} alt="logo" />
            </div>
            <div
              className={`box text-center ${chooseSidebar ? 'bg-box' : ''}`}
              onClick={dashboardClick}
            >
              <i className="bi bi-house"></i>
              <p>Dashboard</p>
            </div>
            <div className={`box text-center ${chooseSidebar ? '' : 'bg-box'}`} onClick={carsClick}>
              <i className="bi bi-truck"></i>
              <p>Cars</p>
            </div>
          </div>
          <div className="side-bar-right d-flex flex-column">
            <h5 className="d-flex align-items-center">Binar Car Rental</h5>
            <p>{chooseSidebar ? 'Dashboard' : 'Cars'}</p>
            <button>{chooseSidebar ? 'Dashboard' : 'List Car'}</button>
          </div>
        </div>
        {/* END SIDEBAR*/}

        <div className="col bar-content bg-body-secondary">
          {/* START HEADER BAR*/}
          <div className="header-bar d-flex align-items-center justify-content-between bg-white gap-4">
            {showSidebar ? (
              <i className="bi bi-x w-75" onClick={sidebarShow}></i>
            ) : (
              <i className="bi bi-list w-75" onClick={sidebarShow}></i>
            )}

            <div className="searh-box d-flex align-items-center">
              <span>
                <i className="bi bi-search"></i>
              </span>
              <input type="text" placeholder="Search" className="ps-5" />
              <button className="btn btn-outline-primary fw-bold">Search</button>
            </div>
            <div className="user-profile d-flex align-items-center gap-2">
              <a className="avatar">U</a>
              <select name="" id="" className="border-0" disabled>
                <option value="">Unis Badri</option>
              </select>
            </div>
          </div>
          {/* END HEADER BAR*/}
          <div className="content">{main}</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
