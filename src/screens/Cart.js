import React from 'react'
import { useCart, useDispatch } from "../components/ContextReducer";
function Cart() {
  let data = useCart();
  let dispatch = useDispatch();
  if(data.length === 0){
    return (
        <div>
            <div className='m-5 w-100 text-center fs-3'>The Cart is Empty</div>
        </div>
    )
  }
  console.log(data);
  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    // console.log(data,localStorage.getItem("userEmail"),new Date())
    let response = await fetch("http://localhost:5000/api/auth/orderData", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });
    console.log("JSON RESPONSE:::::", response.status)
    if (response.status === 200) {
      dispatch({ type: "DROP" })
    }
  }
  

  return (
      <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
        <table className='table table-hover'>
            <thead className='text-success fs-4'>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Description</th>
                    <th scope="col">Amount</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr>
                        <th scope='row'>{index+1}</th>
                        <th scope='row'>{item.name}</th>
                        <th scope='row'>{item.desc}</th>
                        <th scope='row'>{item.price}</th>
                        {/* <td ><button type="button" className="btn p-0"><Delete onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td> */}
                    </tr>
                ))}
            </tbody>
        </table>
        {/* <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div> */}
        <div>
          <button className='btn bg-success mt-5 ' onClick={handleCheckOut} > Check Out </button>
        </div>
      </div>
  )
}

export default Cart
