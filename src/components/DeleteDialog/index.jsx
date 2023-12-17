import "./style.css";
import dialogImage from "../../assets/img/car-alert.png";
import ButtonSearch from "../ButtonSearch";
import { useSelector } from "react-redux";
const DeleteDialog = ({ handleClickYes, handleClickNo }) => {
  const { successDelete } = useSelector((state) => state.carsReducer);

  return (
    <div className="container" id="delete-dialog">
      <div className="row ">
        <div className="col d-flex justify-content-center">
          <img className="img-fluid" src={dialogImage} alt="delete car alert" />
        </div>
        <div className="col">
          <h2>
            {successDelete
              ? "Berhasil Hapus Data Mobil"
              : "Menghapus Data Mobil"}
          </h2>
          <p>
            {successDelete
              ? "Data mobil sudah dihapus, mohon tunggu beberapa saat untuk kembali melihat data."
              : "Setelah dihapus, data mobil tidak dapat dikembalikan. Yakin ingin menghapus?"}
          </p>
        </div>
        {successDelete ? (
          <i className="bi bi-check2-circle text-center fs-2 text-success"></i>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default DeleteDialog;
