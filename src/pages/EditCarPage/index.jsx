import "./style.css";
import Navbar from "../../components/Navbar";
import { Breadcrumb, Col, Row, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TYPES } from "../../redux/type";
import { detailCar, editCar } from "../../helpers/apis";
const EditCarPage = () => {
  const { isLoading } = useSelector((state) => state.carsReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const param = useParams();

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
  });

  const [isSave, setIsSave] = useState(false);
  const [imageURL, setImageURL] = useState(null);
  const [image, setImage] = useState(imageURL);
  const [isFormEdited, setIsFormEdited] = useState(false);
  const [nameImage, setNameImage] = useState("");
  const [imageSize, setImageSize] = useState(0);

  useEffect(() => {
    carDetail();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
    !image ? setImage(imageURL) : setImage(image);
    // setIsFormEdited(true);
  };

  const handleImage = (event) => {
    const uploadedImage = event.target.files[0];
    setImageSize(uploadedImage.size);
    setNameImage("Upload Foto Mobil");

    if (uploadedImage.size < 2000000) {
      setIsFormEdited(true);
      setNameImage(uploadedImage.name);
      setImage(uploadedImage);
    }
  };

  const handleSubmit = async () => {
    setIsSave(true);

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("image", image);

    try {
      const res = await editCar(formData, param.id);
      console.log(res);

      setTimeout(() => {
        navigate("/cars");
      }, 500);
      dispatch({
        type: TYPES.IS_SUBMIT,
        payload: {
          submit: true,
        },
      });
      setTimeout(() => {
        dispatch({
          type: TYPES.IS_SUBMIT,
          payload: {
            submit: false,
          },
        });
      }, 2000);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const carDetail = async () => {
    try {
      const res = await detailCar(param.id);
      setForm(res.data);
      setImageURL(res.data.image);
      dispatch({
        type: TYPES.IS_LOADING,
        payload: {
          loading: false,
        },
      });
      // console.log(res.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <>
      <Navbar
        main={
          <>
            {isLoading ? (
              <div className="wrapper-spinner">
                <div className="spinner-border tex" role="status">
                  <span className="visually-hidden"></span>
                </div>
              </div>
            ) : (
              <div className="ms-5 ms-lg-0">
                <Breadcrumb>
                  <Breadcrumb.Item href="/">Cars</Breadcrumb.Item>
                  <Breadcrumb.Item href="/cars">List Car</Breadcrumb.Item>
                  <Breadcrumb.Item active>Edit Car</Breadcrumb.Item>
                </Breadcrumb>
                <h1 className="fw-bold fs-5">Edit Car</h1>
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
                          value={form.name}
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
                          type="number"
                          placeholder="Input Harga Sewa Mobil"
                          onChange={handleChange}
                          name="price"
                          value={form.price}
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
                            onChange={handleImage}
                          />
                          <label
                            htmlFor="uploadBtn"
                            className="d-flex justify-content-between imageLabel align-items-center"
                          >
                            {!form.image
                              ? image
                                ? nameImage
                                : "Upload Foto Mobil"
                              : nameImage || form.image}
                            <i className="bi bi-upload"></i>
                          </label>
                        </div>
                        <p className="text-secondary mt-2">
                          File size max. 2MB
                        </p>
                        {imageSize > 2000000 && (
                          <p className="text-danger p-2 fw-semibold text-center z-0 bg-danger-subtle rounded-2">
                            Image size must be less than 2MB
                          </p>
                        )}
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
                            value={form.category}
                          >
                            <option disabled value="">
                              Pilih Kategori Mobil
                            </option>
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
                      className="cancel me-2 fw-bold bg-white"
                    >
                      Cancel
                    </Button>
                  </Link>
                  <Button
                    className="save fw-bold"
                    style={{ backgroundColor: "#0D28A6" }}
                    onClick={handleSubmit}
                    disabled={!isFormEdited || isSave}
                  >
                    {isSave ? (
                      <div className="spinner-border cars" role="status">
                        <span className="visually-hidden"></span>
                      </div>
                    ) : (
                      "Save"
                    )}
                  </Button>
                </div>
              </div>
            )}
          </>
        }
      />
    </>
  );
};

export default EditCarPage;
