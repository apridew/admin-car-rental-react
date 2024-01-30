import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { TYPES } from "../../redux/type";

const SignInPage = () => {
  const { login, error } = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   console.log(login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUsername = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
    setErrorMessage("");
  };

  const handlePassword = (e) => {
    console.log(e.target.value);
    setPassword(e.target.value);
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bodyPayload = {
      email: email,
      password: password,
    };

    if (!email || !password) {
      setErrorMessage("Password dan Email harus diisi");
      return;
    }

    try {
      const ress = await axios.post(
        `https://api-car-rental.binaracademy.org/admin/auth/login`,
        bodyPayload
      );
      localStorage.setItem("accesToken", ress.data.access_token);
      console.log(ress.data);

      dispatch({
        type: TYPES.SET_LOGIN,
        payload: {
          data: true,
        },
      });
      // alert("succes")
      setTimeout(() => {
        navigate("/");
        dispatch({
          type: TYPES.SET_LOGIN,
          payload: {
            data: false,
          },
        });
      }, 1500);
    } catch (error) {
      console.log(error.response.data);
      dispatch({
        type: TYPES.IS_ERROR,
        payload: {
          error: true,
        },
      });
      setTimeout(() => {
        dispatch({
          type: TYPES.IS_ERROR,
          payload: {
            error: false,
          },
        });
        setErrorMessage(
          "Masukkan username dan password yang benar. Perhatikan penggunaan huruf kapital."
        );
      }, 500);
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-side">
          <div className="logo"></div>

          <div className="login-detail">
            <h1>Welcome, Admin BCR</h1>

            {errorMessage && <p className="login-error">{errorMessage}</p>}
            {login && <p className="login-success">Sign in berhasil</p>}

            <div className="login-input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Contoh: binar@gmail.com"
                onChange={handleUsername}
              />

              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="6+ karakter"
                onChange={handlePassword}
              />
            </div>
            <button disabled={login || error} onClick={handleSubmit}>
              {login || error ? (
                <div className="spinner-border" role="status">
                  <span className="visually-hidden"></span>
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
