import Navbar from "../../components/Navbar";
import { Breadcrumb, Col, Row, Form, Button } from "react-bootstrap";
import "./style.css";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { TYPES } from "../../redux/type";
import { updateCar } from "../../helpers/apis";
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

  const [imageURL, setImageURL] = useState(null);
  const [image, setImage] = useState(imageURL);
  // const [imagePreview, setImagePreview] = useState(imageURL);
  const [isFormEdited, setIsFormEdited] = useState(false);
  const [nameImage, setNameImage] = useState("");

  useEffect(() => {
    carDetail();
    // convertUrlToBinary();
    console.log(imageURL);
  }, []);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
    !image ? setImage(imageURL) : setImage(image);
    setIsFormEdited(true);
  };

  const handleImage = (event) => {
    const uploadedImage = event.target.files[0];
    setImage(uploadedImage);
    // setImagePreview(URL.createObjectURL(uploadedImage));
    setNameImage(uploadedImage.name);
    setIsFormEdited(true);
  };

  const convertUrlToBinary = async () => {
    try {
      const response = await fetch(imageURL, { mode: "no-cors" });
      const arrayBuffer = await response.arrayBuffer();

      setImageURL(arrayBuffer);
    } catch (error) {
      console.error("Error converting image URL to binary:", error.response);
    }
  };

  const handleSubmit = () => {
    const token = localStorage.getItem("accesToken");

    const config = {
      headers: {
        access_token: token,
      },
    };

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("image", image);

    axios
      .put(
        `https://api-car-rental.binaracademy.org/admin/car/${param.id}`,
        formData,
        config
      )
      .then((res) => {
        console.log(res);
        navigate("/cars");
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
      })
      .catch((err) => console.log(err));
  };

  const carDetail = async () => {
    try {
      const res = await updateCar(param.id);
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
                          type="text"
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
                            size="2097152"
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
                        {/* <img
                      style={{ width: "100%", borderRadius: "10px" }}
                      src={!image ? imageURL : imagePreview}
                      alt="preview image"
                    /> */}
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
                    disabled={!isFormEdited}
                  >
                    Save
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
