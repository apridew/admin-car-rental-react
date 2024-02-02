import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import * as formater from "../../helpers/formaters";
import { TYPES } from "../../redux/type";
import * as reqAPI from "../../helpers/apis";

import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import { StyleSheetManager } from "styled-components";
import {
  DatePicker,
  LocalizationProvider,
  YearCalendar,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ChevronDown } from "react-feather";
import dayjs from "dayjs";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";

import "./style.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const customStyles = {
  headRow: {
    style: {
      backgroundColor: "#CFD4ED",
      color: "black",
      fontSize: "14px",
    },
  },
  headCells: {
    style: {
      fontSize: "16px",
      fontWeight: "bold",
    },
  },
  cells: {
    style: {
      fontSize: "15px",
      // textTransform: 'lowercase',
    },
  },
};

const DashboardPage = () => {
  const { orders } = useSelector((state) => state.tableReducer);
  // console.log(orders);
  const [limit, setlimit] = useState("");
  const [jumpToPage, setJumpToPage] = useState("");

  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Amount of Car Rented",
        position: "left",
      },
    },
  };

  const [data, setData] = useState({
    labels: [...Array(30)].map((_, index) => index + 1),
    datasets: [
      {
        label: "Date",
        data: [],
        backgroundColor: "#586B90",
      },
    ],
  });

  const handleValue = (newValue) => {
    console.log(`new value selected: ${newValue.$M + 1}-${newValue.$y}`);
    setValue(`${newValue.$M + 1}-${newValue.$y}`);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("accesToken");
    const config = {
      headers: {
        access_token: token,
      },
    };

    const [selectedMonth, selectedYear] = value.split("-");
    const firstDayOfMonth = `${selectedYear}-${selectedMonth}-01`;
    const lastDayOfMonth = new Date(
      selectedYear,
      new Date(`${selectedMonth} 1, ${selectedYear}`).getMonth() + 1,
      0
    )
      .toISOString()
      .split("T")[0];

    try {
      const ress = await axios.get(
        `https://api-car-rental.binaracademy.org/admin/order/reports?from=${firstDayOfMonth}&until=${lastDayOfMonth}`,
        config
      );
      console.log(ress.data);

      const newLabels = Array.from(
        { length: ress.data.length },
        (_, index) => index + 1
      );

      const newData = {
        labels: newLabels,
        datasets: [
          {
            label: "orderCount",
            data: ress.data.map((item) => item.orderCount),
            backgroundColor: "#586B90",
          },
        ],
      };
      setData(newData);
      setValue("");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    handleTable({ selected: 0 });
  }, []);

  const columns = [
    {
      name: "No",
      selector: (row) => row.id - 1,
      sortable: true,
    },
    {
      name: "User Email",
      selector: (row) => row.User.email,
      sortable: true,
    },
    {
      name: "Car Name",
      selector: (row) => "Car",
      sortable: true,
    },
    {
      name: "Start Rent",
      selector: (row) => `${formater.formatDate(row.start_rent_at)}`,
      sortable: true,
    },
    {
      name: "Finish Rent",
      selector: (row) => `${formater.formatDate(row.finish_rent_at)}`,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => `${formater.idrFormater(row.total_price)}`,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => "Category",
      sortable: true,
    },
  ];

  const handleTable = async ({ selected }) => {
    try {
      const ress = await reqAPI.getAllOrder({ selected, limit });
      console.log(ress.data);

      dispatch({
        type: TYPES.ALL_ORDER,
        payload: {
          orders: ress.data,
        },
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handlePageClick = (e) => {
    console.log(e.selected);
    handleTable({ selected: e.selected });
  };

  const handleChangeSelect = (e) => {
    console.log(e.target.value);
    setlimit(e.target.value);
    // handleTable({ selected: 0 })
  };

  const handleJumpToPage = (e) => {
    console.log(e.target.value);
    setJumpToPage(e.target.value);
  };
  const handleButton = () => {
    console.log(limit, jumpToPage);

    if (limit && jumpToPage) {
      const selectedPage = parseInt(jumpToPage) - 1;
      handleTable({ selected: selectedPage });
    } else if (limit) {
      handleTable({ selected: 0 });
    } else if (jumpToPage) {
      const selectedPage = parseInt(jumpToPage) - 1;
      handleTable({ selected: selectedPage });
    }
  };

  return (
    <>
      <StyleSheetManager shouldForwardProp={(prop) => prop !== "sortActive"}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Navbar
            main={
              <div className="dashboard" id="dashboard">
                {/* Dashboard chart */}
                <div className="dashboard-row-1 d-flex gap-2">
                  <p className="fw-bold">Dashboard</p>
                  <p className="fw-bold">&gt;</p>
                  <p>Dashboard</p>
                </div>

                <div className="dashbboard-container">
                  <div className="dashboard-title d-flex gap-2">
                    <div className="dashboard-logo"></div>
                    <p className="fw-bold">Rented Car Data Visualization</p>
                  </div>
                  <p className="mb-2 mt-3">Month</p>
                  <div className="dashboard-month mt-0 mb-5">
                    <DatePicker
                      defaultValue={dayjs(new Date())}
                      views={["year", "month"]}
                      onChange={handleValue}
                      maxDate={dayjs(new Date())}
                      slots={{ openPickerIcon: ChevronDown }}
                    />

                    <button onClick={handleSubmit} className="calendar-btn">
                      Go
                    </button>
                  </div>

                  <div className="dashboard-chart ">
                    <Bar options={options} data={data} width={"100"} height={"50"}/>
                  </div>
                </div>

                {/*Table */}
                <div className="table-container">
                  <h1 className="fw-bold fs-4">Dashboard</h1>
                  <div className="dashboard-order d-flex gap-2">
                    <div className="dashboard-logo"></div>
                    <p className="fw-bold fs-6">List Orders</p>
                  </div>

                  <div className="dashboard-table">
                    <DataTable
                      columns={columns}
                      data={orders.orders}
                      customStyles={customStyles}
                      sortIcon={<UnfoldMoreIcon />}
                      defaultSortFieldId="No"
                    ></DataTable>
                  </div>

                  <div className="dashboard-paginate">
                    <div className="page-limit">
                      <div className="limit">
                        <p>Limit</p>
                        <select
                          name="limit"
                          id="limit"
                          onChange={handleChangeSelect}
                          value={limit}
                        >
                          <option value="10" defaultChecked>
                            10
                          </option>
                          <option value="15">15</option>
                          <option value="20">20</option>
                        </select>
                      </div>

                      <div className="jump-to-page">
                        <p>Jump To Page</p>
                        <select
                          name="jump-to-page"
                          id="jump-to-page"
                          onChange={handleJumpToPage}
                          value={jumpToPage}
                        >
                          {Array.from(
                            { length: orders.pageCount },
                            (_, i) => i + 1
                          ).map((item, index) => (
                            <option key={index} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>
                        <button onClick={handleButton}>Go</button>
                      </div>
                    </div>

                    <ReactPaginate
                      previousLabel="&laquo;"
                      nextLabel="&raquo;"
                      pageCount={orders.pageCount}
                      // pageRangeDisplayed={}
                      marginPagesDisplayed={(2, 1)}
                      breakLabel="..."
                      onPageChange={handlePageClick}
                      containerClassName={"pagination"}
                      pageClassName={"page-item"}
                      pageLinkClassName={"page-link"}
                      previousClassName={"page-item"}
                      previousLinkClassName={"page-link"}
                      nextClassName={"page-item"}
                      nextLinkClassName={"page-link"}
                      activeClassName={"active"}
                      breakClassName={"page-item"}
                      breakLinkClassName={"page-link"}
                    ></ReactPaginate>
                  </div>
                </div>
              </div>
            }
          />
        </LocalizationProvider>
      </StyleSheetManager>
    </>
  );
};

export default DashboardPage;
