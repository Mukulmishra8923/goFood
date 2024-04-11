import React, { useEffect } from "react";
import fetchDataFromApi from "../api/Api";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {  toast } from 'react-toastify';

const ResetPasswordLink = () => {
  const [credentials, setCredentials] = useState({
    email: "",
  });
  const navigate = useNavigate();

  const sendEmail = async (e) => {
      e.preventDefault();

    const params = {
      email: credentials.email,
    };

    try {
      const response = await fetchDataFromApi("send-reset-password-email",params);
      console.log("sendEmail response ", response);

      if (response.data.status === 'success') {
      toast.success("Reset Password link has beent sent on you registered mail Id");
      } else {
        toast.error("Email id is not correct")
        console.log("resetPassword error");
      }
    } catch (error) {
      toast.error("network error")
      console.log("catch block of resetPassword error ", error);
    }
  };
  const inputData = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <Navbar />
      <div className="container m-3">
        <form onSubmit={sendEmail}>
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
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default ResetPasswordLink;
