import React, { useEffect } from 'react'
import fetchDataFromApi from '../api/Api'
import { useState } from 'react';
import Navbar from '../Components/Navbar';

const Profile = () => {
    const [userDetails, setUserDetails] = useState({
        name:"",
        email: "",
        address: "",
      });

    const fetchData = async ()=>{
        const response =await  fetchDataFromApi("loggeduser");
        setUserDetails({
            name:response.data.user.name,
            email:response.data.user.email,
            address:response.data.user.location
        })
    }
    useEffect(()=>{
        fetchData()
    },[])

  return (
    <div>
        <Navbar/>
        <section style={{backgroundColor: "#eee"}}>
  <div className="container py-5">
    <div className="row">
      <div className="col">
        <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
          <ol className="breadcrumb mb-0">
           
            <li className="breadcrumb-item active" aria-current="page">User Profile</li>
          </ol>
        </nav>
      </div>
    </div>

    <div className="row">
      <div className="col-lg-4">
        <div className="card mb-4">
          <div className="card-body text-center">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
              className="rounded-circle img-fluid" style={{"width": "150px"}}/>
            <h5 className="my-3">{userDetails.name}</h5>
          </div>
        </div>
      </div>
      <div className="col-lg-8">
        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Full Name</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{userDetails.name}</p>
              </div>
            </div>
            <hr/>
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Email</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{userDetails.email}</p>
              </div>
            </div>
            <hr/>
          
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Mobile</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">(098) 765-4321</p>
              </div>
            </div>
            <hr/>
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Address</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{userDetails.address}</p>
              </div>
            </div>
          </div>
        </div>
       
      </div>
    </div>
  </div>
</section>
</div>
  
  )
}

export default Profile