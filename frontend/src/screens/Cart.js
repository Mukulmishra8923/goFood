import React from 'react'
import { useCart, useDispatchCart } from '../Components/ContextReducer'
import fetchDataFromApi from '../api/Api'

const Cart = () => {
    const data = useCart()
    let dispatch = useDispatchCart();
    if(data.length===0){
        return (<div>
            <div className='m-5 w-100 text-center text-white fs-3'>
           This cart is empty!
           <i className="fa-sharp fa-solid fa-cart-circle-xmark"></i>
            </div>
        </div>)
    }
    let totalPrice = data.reduce((total,food) => total + food.price, 0)

  

    const handleCheckOut= async ()=>{
      let userEmail = localStorage.getItem("userEmail");
      // console.log("useremail in cart ", userEmail)

      const params = {
      order_data : data,
      email : userEmail,
      order_date : new Date().toString()
    }
    try {
      const response = await fetchDataFromApi('orderData', params);
      if (response.status === 200) {
        dispatch({ type: 'DROP' });
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      // Handle error state or show an error message to the user
    }
  };

  return (
    <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
        <table className="table table-hover">
  <thead className='text-success fs-4'>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Quantity</th>
      <th scope="col">Options</th>
      <th scope="col">Amount</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
    {data.map((food,index)=>{
      return  (<tr key={index}>
            <th scope='row'>{index+1}</th>
            <td>{food.name}</td>
            <td>{food.qty}</td>
            <td>{food.size}</td>
            <td>{food.price}</td>
            <td><button type='button' className='btn p-0' onClick={()=>dispatch({type :"REMOVE", index:index})}><i className="fa-solid fa-trash"></i></button></td>
        </tr>)
})}
  </tbody>
</table>
<div>
    <h1 className='fs-2 text-white'>total price: {totalPrice}/-</h1>
    <div className='btn bg-success mt-5' onClick={handleCheckOut}>checkOut</div>
</div>
    </div>
  )
}

export default Cart