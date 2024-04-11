import React, { useEffect, useState } from 'react'
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import fetchDataFromApi from '../api/Api';

export default function MyOrder() {
  const [orderData, setOrderData] = useState({});


  const userEmail = localStorage.getItem("userEmail");
    const params = {
      email: userEmail,
    };
  const fetchMyOrder = async () => {
    try {
      const response = await fetchDataFromApi("myOrderData", params);
      console.log("Response data in myOrder section", response);
       setOrderData(response);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

 

useEffect(() => {
  fetchMyOrder();
  console.log("setstate", orderData);
}, []);



return (
  <div>
    <div>
      <Navbar />
    </div>

    <div className="container">
      <div className="row">
        {orderData.length}
       
        <p style={{fontSize :"49px"}}> {orderData.length}</p>
        </div>
         
               
            
    </div>

    <Footer />
  </div>
);
          }