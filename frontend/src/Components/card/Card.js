import React, { useRef, useEffect, useState } from "react";
import { useDispatchCart, useCart } from "../ContextReducer";
import './Card.css'

const Card = (props) => {
  let options = props.options[0];
  let priceOptions = Object.keys(options);
  const priceRef = useRef();
  const foodItem = props.foodItem;
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const cart = useCart();
  const dispatch = useDispatchCart();

  const handleAddToCart = async () => {
    let food = [];
    for (const item of cart) {
      if (item.id === foodItem._id) {
        food = item;
        break;
      }
    }
    if (food.length !== 0) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: foodItem._id,
          price: finalPrice,
          qty: qty,
          size: size,
        })
        return;
      }
      else if (food.size !== size){
        await dispatch({
       type: "ADD",
       id: foodItem._id,
       name: foodItem.name,
       price: finalPrice,
       qty: qty,
       size: size,
     });
     return
     }
  
   }

    await dispatch({
      type: "ADD",
      id: foodItem._id,
      name: foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
    });
  };
  // -------PRICE CALC LOGIC-------------

  let finalPrice = qty * parseInt(options[size]);

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <>
      <div
        className="card m-4 rounded"
        style={{ width: "19rem", maxHeight: "360px",backgroundColor:"#F7F7F7" }}
      >
        <img
          src={foodItem.img}
          alt="..."
          className="card-img-top:hover"
          style={{ height: "150px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{foodItem.name}</h5>
          <p className="card-text " style={{"maxHeight":"30px", overflow:"hidden", fontSize:'14px',textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{foodItem.description}</p>
          <div className="container w-100">
            <select
              className="m-2 h-100 w-10 bg-success rounded"
              onChange={(e) => {
                setQty(e.target.value);
              }}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              className="m-2 h-100 w-10 bg-success rounded"
              ref={priceRef}
              onChange={(e) => {
                setSize(e.target.value);
              }}
            >
              {priceOptions.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
            <div className="d-inline h-100 fs-5 m-3">Rs. {finalPrice}/-</div>
            <hr />
            <button
              className="btn btn-success rounded "
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
