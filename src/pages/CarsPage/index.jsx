import { useEffect } from 'react';
import CardCar from '../../components/CardCar';
import Navbar from '../../components/Navbar';
import * as reqApi from '../../helpers/apis';
import ButtonSearch from '../../components/ButtonSearch';
import './style.css';

const CarsPage = () => {
  useEffect(() => {
    getListCars();
  }, []);

  const getListCars = async () => {
    try {
      const res = await reqApi.getCars('', '', '', '', '');
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar
        main={
          <div id="cars-page">
            <div className="cars-row-1 d-flex gap-2">
              <p className="fw-bold">Car</p>
              <p className="fw-bold">&gt;</p>
              <p>List Car</p>
            </div>
            <div className="cars-row-2 d-flex justify-content-between align-items-center mb-3">
              <p>List Car</p>
              <button>
                <i className="bi bi-plus"></i> Add New Car
              </button>
            </div>

            <div className="button-search mb-4">
              <ButtonSearch value={'All'} />
              <ButtonSearch value={'2 - 4 people'} />
              <ButtonSearch value={'4 - 6 people'} />
              <ButtonSearch value={'6 - 8 people'} />
            </div>
            <CardCar img={'asd'} price={'asd'} name={'asd'} capacity={'asd'} time={'asd'} />
          </div>
        }
      />
    </>
  );
};

export default CarsPage;
