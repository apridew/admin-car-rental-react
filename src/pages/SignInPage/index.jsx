import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import "./style.css"

const SignInPage = () => {

  const { login } = useSelector((state) => state)
  const dispatch = useDispatch()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleUsername = (e) => {
      console.log(e.target.value);
      setEmail(e.target.value)
      setError("")
  }

  const handlePassword = (e) => {
      console.log(e.target.value);
      setPassword(e.target.value)
      setError("")
  }

  const handleSubmit = async (e) => {
      e.preventDefault()

      const bodyPayload = {
          email: email,
          password: password
      }

      if(!email || !password) {
          setError("Password dan Email harus diisi")
          return
      }

      try {
          const ress = await axios.post(`https://api-car-rental.binaracademy.org/admin/auth/login`, bodyPayload)
          localStorage.setItem("accesToken", ress.data.access_token
          )
          console.log(ress.data);

          dispatch({
              type: "SET_LOGIN",
              payload: {
                  data: true
              }
          })

          alert("succes")
      } catch (error) {
          console.log(error.response.data);
          setError("Masukkan username dan password yang benar. Perhatikan penggunaan huruf kapital.")
      }

  }

  return (
      <>
          <div className="login-container">
              <div className="login-side">
                  <div className="logo"></div>

                  <div className="login-detail">
                      <h1>Welcome admin BCR</h1>

                      {login ? "" : <p className="login-error">{error}</p>}

                      <div className="login-input">
                          <label htmlFor="email">Email</label>
                          <input type="text" id="email" placeholder="Contoh: binar@gmail.com" onChange={handleUsername} />

                          <label htmlFor="password">Password</label>
                          <input type="password" id="password" placeholder="6+ karakter" onChange={handlePassword} />
                      </div>
                      <button onClick={handleSubmit}>Sign In</button>
                  </div>
              </div>
          </div>
      </>
  )
}


export default SignInPage;
