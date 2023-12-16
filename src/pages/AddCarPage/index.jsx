import Navbar from "../../components/Navbar";
import { Breadcrumb, Col, Row, Form, Button } from "react-bootstrap";
import "./style.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { TYPES } from "../../redux/type";
const AddCarPage = () => {
  const { isSubmit } = useSelector((state) => state.carsReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
  });

  const [image, setImage] = useState(null);
  const [nameImage, setNameImage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleImage = (event) => {
    const uploadedImage = event.target.files[0];
    setImage(uploadedImage);
    setNameImage(uploadedImage.name);
  };
  const handleSubmit = () => {
    const token = localStorage.getItem("accesToken");

    const config = {
      headers: {
        access_token: token,
      },
    };

    const formData = new FormData();
    formData.set("name", form.name);
    formData.set("price", form.price);
    formData.set("category", form.category);
    formData.set("image", image);

    axios
      .post(
        "https://api-car-rental.binaracademy.org/admin/car",
        formData,
        config
      )
      .then((res) => {
        console.log(res);
        dispatch({
          type: TYPES.IS_SUBMIT,
          payload: {
            submit: true,
          },
        });
        setTimeout(() => {
          navigate("/cars");
          dispatch({
            type: TYPES.IS_SUBMIT,
            payload: {
              submit: false,
            },
          });
        }, 2000);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Navbar
        main={
          <>
            <Breadcrumb>
              <Breadcrumb.Item href="/">Cars</Breadcrumb.Item>
              <Breadcrumb.Item href="/cars">List Car</Breadcrumb.Item>
              <Breadcrumb.Item active>Add New Car</Breadcrumb.Item>
            </Breadcrumb>
            {isSubmit && (
              <div className="notification my-3">
                <p className="m-0">Data Berhasil Disimpan</p>
              </div>
            )}
            <h1 className="fw-bold fs-5">Add New Car</h1>
            <div className="container-form">
              <div className="form-section bg-white p-3 gap-2 d-flex flex-column">
                <Row className="pb-2">
                  <Form.Label column="lg" lg={2} className="fs-6">
                    Nama/Tipe Mobil<span>*</span>
                  </Form.Label>
                  <Col lg={4}>
                    <Form.Control
                      size="lg"
                      type="text"
                      placeholder="Input Nama/Tipe Mobil"
                      onChange={handleChange}
                      name="name"
                    />
                  </Col>
                </Row>
                <Row className="pb-2">
                  <Form.Label column="lg" lg={2} className="fs-6">
                    Harga<span>*</span>
                  </Form.Label>
                  <Col lg={4}>
                    <Form.Control
                      size="lg"
                      type="text"
                      placeholder="Input Harga Sewa Mobil"
                      onChange={handleChange}
                      name="price"
                    />
                  </Col>
                </Row>
                <Row className="pb-2">
                  <Form.Label column="lg" lg={2} className="fs-6">
                    Foto<span>*</span>
                  </Form.Label>
                  <Col lg={4}>
                    <div className="form-upload-file d-flex justify-content-between">
                      <input
                        accept="image/*"
                        type="file"
                        id="uploadBtn"
                        size="2097152"
                        onChange={handleImage}
                      />
                      <label
                        htmlFor="uploadBtn"
                        className="d-flex justify-content-between"
                      >
                        {image ? `${nameImage}` : "Upload Foto Mobil"}
                        <i className="bi bi-upload"></i>
                      </label>
                    </div>
                    <p className="text-secondary mt-2">File size max. 2MB</p>
                  </Col>
                </Row>
                <Row className="pb-2">
                  <Form.Label column="lg" lg={2} className="fs-6">
                    Kategori<span>*</span>
                  </Form.Label>
                  <Col lg={4}>
                    <div className="form-category p-0">
                      <Form.Select
                        aria-label="Default select example"
                        onChange={handleChange}
                        name="category"
                      >
                        <option value="">Pilih Kategori Mobil</option>
                        <option value="small">2 - 4 orang</option>
                        <option value="medium">4 - 6 orang</option>
                        <option value="large">6 - 8 orang</option>
                      </Form.Select>
                    </div>
                  </Col>
                </Row>
                <Row className="pb-2">
                  <Form.Label column="lg" lg={2} className="fs-6">
                    Created at
                  </Form.Label>
                  <Col lg={4}>
                    <p>-</p>
                  </Col>
                </Row>
                <Row className="pb-2">
                  <Form.Label column="lg" lg={2} className="fs-6">
                    Updated at
                  </Form.Label>
                  <Col lg={4}>
                    <p>-</p>
                  </Col>
                </Row>
              </div>
            </div>
            <div className="button-submit ">
              <Link to={"/cars"}>
                <Button
                  variant="outline-primary"
                  className="cancel me-2 fw-bold rounded-0 bg-white"
                >
                  Cancel
                </Button>
              </Link>
              <Button
                className="save fw-bold rounded-0"
                style={{ backgroundColor: "#0D28A6" }}
                onClick={handleSubmit}
              >
                Save
              </Button>
            </div>
          </>
        }
      />
    </>
  );
};

export default AddCarPage;
