import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../screens/Modal";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";
import Settings from "./settings/Settings";

const Navbar = () => {
  const cartItemsCount = useCart();
  const [cartView, setCartView] = useState(false)

 
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <Link className="navbar-brand p-2 fs-2 " to="/">
          GoFood
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarNav">
          <ul className="navbar-nav me-auto ">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>

            {/* ----------MY-ORDER SECTION----------------      */}


            {/* {localStorage.getItem("authToken") ? (
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/myorder">
                  MyOrder
                </Link>
              </li>
            ) : (
              " "
            )
            } */}

                   {/* ----------MY-ORDER SECTION- END----------------      */}
          </ul>

          {!localStorage.getItem("authToken") ? (
            <div className="d-flex">
              <Link className="btn bg-white text-success mx-1" to="/login">
                Login
              </Link>

              <Link className="btn bg-white text-success mx-1" to="/signup">
                SignUp
              </Link>
            </div>
          ) : (
            <>
              <Link className="btn  text-white mx-1 fs-4" onClick={()=>setCartView(true)}>
                 <i className="fa-solid fa-cart-shopping"  ></i>
                <span className="  badge rounded-pill bg-danger" >
         
  {cartItemsCount.length}
  </span> </Link> {/* ---------------cart close btn---------------         */}
                  {cartView? <Modal onClose={()=>setCartView(false)}><Cart/></Modal> : null}

                  {/* ----------------------DROP Down----------------------- */}
                 <Settings/>
                 
              
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
