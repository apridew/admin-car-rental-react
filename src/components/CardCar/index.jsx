import React from "react";
import "./style.css";

const CardCar = ({ img, name, price, capacity, time }) => {
  return (
    <>
      <div id="card-car" className="card">
        <img src={img} alt={name} />
        <p>{name}</p>
        <p>{price} / hari</p>
        <p>
          <i className="bi bi-people"></i>
          {capacity}
        </p>
        <p>
          <i className="bi bi-clock"></i>
          {time}
        </p>
        <div className="button-bottom d-flex gap-3">
          <button>
            <i className="bi bi-trash"></i> Delete
          </button>
          <button>
            <i className="bi bi-pencil-square"></i> Edit
          </button>
        </div>
      </div>
    </>
  );
};

export default CardCar;
