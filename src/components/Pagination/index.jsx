import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { getListCars } from "../../redux/actions/carsAction";

const PaginationCars = ({ category, name_car }) => {
  const dispatch = useDispatch();
  const { totalPage, currentPage, car_list } = useSelector(
    (state) => state.carsReducer
  );
  const paginationNext = () => {
    const newCurrentPage = currentPage + 1;
    if (currentPage < totalPage) {
      dispatch(getListCars({ name_car }, { category }, newCurrentPage, 4));
    }
  };

  const paginationBack = () => {
    const newCurrentPage = currentPage - 1;
    if (currentPage > 1) {
      dispatch(getListCars({ name_car }, { category }, newCurrentPage, 4));
    }
  };

  const renderPaginationNumber = () => {
    const numberPage = [];
    for (let i = 1; i <= totalPage; i++) {
      numberPage.push(
        <li key={i} className="page-item">
          <a
            className={`page-link ${currentPage === i ? "active" : ""}`}
            onClick={() => dispatch(getListCars("", "", i, 9))}
          >
            {i}
          </a>
        </li>
      );
    }
    return numberPage;
  };
  return (
    <>
      {car_list.length ? (
        <div className="pagination mt-3">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item" onClick={paginationBack}>
                <a
                  className={`page-link ${
                    currentPage === 1 ? " disabled" : ""
                  }`}
                  aria-label="Previous"
                >
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              {renderPaginationNumber()}
              <li className="page-item" onClick={paginationNext}>
                <a
                  className={`page-link ${
                    currentPage === totalPage ? " disabled" : ""
                  }`}
                  aria-label="Next"
                >
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default PaginationCars;
