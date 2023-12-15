import Navbar from "../../components/Navbar";
import { Breadcrumb, Col, Row, Form, Button } from "react-bootstrap";
import "./style.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const AddCarPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const token = localStorage.getItem("accesToken");

    const config = {
      headers: {
        access_token: token,
      },
    };

    axios
      .post("https://api-car-rental.binaracademy.org/admin/car", form, config)
      .then((res) => {
        console.log(res);
        navigate("/cars");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Navbar
        main={
          <>
            <Breadcrumb>
              <Breadcrumb.Item href="#">Cars</Breadcrumb.Item>
              <Breadcrumb.Item href="#">List Car</Breadcrumb.Item>
              <Breadcrumb.Item active>Add New Car</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="fw-bold fs-5">Add New Car</h1>
            <div className="container-form">
              <div className="form-section bg-white p-3">
                <Row className="pb-2">
                  <Form.Label column="lg" lg={2} className="fs-6">
                    Nama/Tipe Mobil*
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
                    Harga*
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
                    Foto*
                  </Form.Label>
                  <Col lg={4}>
                    <div className="form-upload-file">
                      <input
                        placeholder="Upload Foto Mobil"
                        type="file"
                        id="uploadBtn"
                        onChange={handleChange}
                        name="image"
                      />
                      <label for="uploadBtn">
                        <i class="bi bi-upload"></i>
                      </label>
                    </div>
                    <p className="text-secondary fs-6">File size max. 2MB</p>
                  </Col>
                </Row>
                <Row className="pb-2">
                  <Form.Label column="lg" lg={2} className="fs-6">
                    Kategori
                  </Form.Label>
                  <Col lg={4}>
                    <div className="form-category">
                      <Form.Select
                        aria-label="Default select example"
                        onChange={handleChange}
                        name="category"
                      >
                        <option value="">Pilih Kategori Mobil</option>
                        <option value="2 - 4 orang">2 - 4 orang</option>
                        <option value="4 - 6 orang">4 - 6 orang</option>
                        <option value="6 - 8 orang">6 - 8 orang</option>
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
                  className="me-2 fw-bold rounded-0 bg-white"
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
