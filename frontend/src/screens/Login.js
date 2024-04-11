import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchDataFromApi from "../api/Api";
import { toast } from 'react-toastify';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const params = {
      email: credentials.email,
      password: credentials.password,
    };

    //  -------------------API CALL--------------------
    try {
      const apiData = await fetchDataFromApi("login", params);

      const finalData = apiData.data;

      if (!finalData) {
        throw new Error("Invalid credentials");
      }
      // console.log("LOGIN FINAL DATA",finalData);
      if (finalData) {
        localStorage.setItem("userEmail", credentials.email);
        localStorage.setItem("authToken", finalData.authToken);
       toast.success("login successfully");
        navigate("/");
      }
    } catch (error) {
      toast.error("invalid credentials");
    }
  };
  useEffect(() => {}, []);
  const inputData = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <>
      <>
        <Navbar />
        <div className="container m-3">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email"
                onChange={inputData}
                value={credentials.email}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                name="password"
                onChange={inputData}
                value={credentials.password}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button
              type="submit"
              className="btn btn-danger m-3"
              onClick={() => navigate("/signup")}
            >
              I'm a new user
            </button>
            <button
              type="submit"
              className="btn btn-danger m-3"
              onClick={() => navigate("/send-reset-password-email")}
            >
              Forget password
            </button>
          </form>
        </div>
        <Footer />
      </>
    </>
  );
};

export default Login;
