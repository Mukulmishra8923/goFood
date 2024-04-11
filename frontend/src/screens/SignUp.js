import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import fetchDataFromApi from "../api/Api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const [credintials, setCredintials] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    location: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const params = {
      name: credintials.name,
      email: credintials.email,
      password: credintials.password,
      confirm_password: credintials.confirm_password,
      location: credintials.location,
    };

    try {
      const apiData = await fetchDataFromApi("createuser", params);

      const finalData = apiData.data;

      if (!finalData) {
        throw new Error("Registration Unsuccessfull");
      }
      console.log(finalData);
      toast.success("Registration successfull");
      navigate("/");
    } catch (error) {
      toast.error("Registration unSuccessfull");
    }
  };

  const inputData = (event) => {
    setCredintials({
      ...credintials,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <>
      <Navbar />
      <div className="container m-3">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              onChange={inputData}
              value={credintials.name}
            />
          </div>
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
              value={credintials.email}
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
              value={credintials.password}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword2" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword2"
              name="confirm_password"
              onChange={inputData}
              value={credintials.confirm_password}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              name="location"
              onChange={inputData}
              value={credintials.location}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default SignUp;
