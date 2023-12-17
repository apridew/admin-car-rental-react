import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TYPES } from "../../redux/type";

const CardCar = ({ img, name, price, capacity, time, id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch({
      type: TYPES.IS_DELETE,
      payload: {
        idCar: id,
        delete: true,
      },
    });
    console.log(id);
  };
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
          <button onClick={() => handleDelete(id)}>
            <i className="bi bi-trash"></i> Delete
          </button>
          <button onClick={() => navigate(`/edit-car/${id}`)}>
            <i className="bi bi-pencil-square"></i> Edit
          </button>
        </div>
      </div>
    </>
  );
};

export default CardCar;
