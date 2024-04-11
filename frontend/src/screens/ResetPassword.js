import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import fetchDataFromApi from "../api/Api";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [credentials, setCredentials] = useState({
    password: "",
    password_confirmation: "",
  });
  const navigate = useNavigate();

  //  to get id and token from URL
  const { id, token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const params = {
      password: credentials.password,
      password_confirmation: credentials.password_confirmation,
    };

    //  -------------------API CALL--------------------
    try {
      const apiData = await fetchDataFromApi(
        `reset-password/${id}/${token}`,
        params
      );

      const finalData = apiData.data;

      if (!finalData) {
        throw new Error("Invalid credentials");
      }

      if (finalData) {
        toast.success("Password Reset successfully");
        navigate("/");
      }
    } catch (error) {
      toast.error("Password Reset unSuccessfull");
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
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={inputData}
                value={credentials.password}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password_confirmation"
                onChange={inputData}
                value={credentials.password_confirmation}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button
              type="submit"
              className="btn btn-success m-3"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </form>
        </div>
        <Footer />
      </>
    </>
  );
};

export default ResetPassword;
