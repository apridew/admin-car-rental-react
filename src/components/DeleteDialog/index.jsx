import "./style.css";
import dialogImage from "../../assets/img/car-alert.png";
import ButtonSearch from "../ButtonSearch";
const DeleteDialog = ({ handleClickYes, handleClickNo }) => {
  return (
    <div className="wrapper-delete d-flex flex-column w-100 vh-100 align-items-center justify-content-center">
      <div className="container" id="delete-dialog">
        <div className="row ">
          <div className="col d-flex justify-content-center">
            <img
              className="img-fluid"
              src={dialogImage}
              alt="delete car alert"
            />
          </div>
          <div className="col">
            <h2>Menghapus Data Mobil</h2>
            <p>
              Setelah dihapus, data mobil tidak dapat dikembalikan. Yakin ingin
              menghapus?
            </p>
          </div>
          <div className="col d-flex justify-content-center gap-3">
            <ButtonSearch
              text={"Ya"}
              style={"button-yes"}
              handleClick={handleClickYes}
            />
            <ButtonSearch
              text={"Tidak"}
              style={"button-no"}
              handleClick={handleClickNo}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteDialog;
