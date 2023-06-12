import { React, useState } from 'react'
import { useCart, useDispatch } from "../components/ContextReducer";
import { useNavigate } from "react-router-dom";

export default function Checkout() {

  const [tot, setTot] = useState(0);

  let data = useCart();
  const quantity = new Array(data.length).fill(0);
  const [quant, setQuant] = useState(quantity);
  let dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch("http://localhost:5000/api/orderData", {
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
    // console.log("response: " + response);
    if (response.status === 200) {
      dispatch({ type: "DROP" });
      alert("Order Placed");
    }
    navigate("/");
  }
  return (
    <>
      <div className="container mt-4">
        <div className='row justify-content-between'>
          <div className='col-4'>
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">Your Cart</span>
            </h4>
            {data.map((item, index) => (
              <ul className="list-group mb-3">
                <li className="list-group-item d-flex justify-content-between lh-condensed">
                  <div className>
                    <h6 className="my-0">{item.name}</h6>
                    <small className="text-muted">{item.desc}</small>
                  </div>
                  <span className="text-muted">{item.price}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <div className='row justify-content-between'>
                    <div className='col-10'>
                      <label>Quantity</label>
                      <input type="number" className="form-control" id="quantity" placeholder="0" required="" min="0" onChange={(event) => {
                        const arr = quant.map((num, ind) => {
                          if (ind === index) {
                            if (event.target.value > quant[index]) {
                              setTot(tot + item.price);
                              return num + 1;
                            }
                            else {
                              setTot(tot - item.price);
                              return num - 1;
                            }
                          }
                          else
                            return num;
                        })
                        setQuant(arr);
                        // console.log(quant);
                        // console.log(event.target.value + " " + index + " " + quant[index]);
                      }}></input>
                    </div>
                    <div className='col-1'>
                      <button type="button" className='btn p-0' onClick={() => dispatch({ type: "REMOVE", index: index })}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                      </svg></button>
                    </div>
                  </div>
                </li>
              </ul>
            ))}
            <li className="list-group-item d-flex justify-content-between">
              <span>Total (INR)</span>
              <strong>{tot}</strong>
            </li>
          </div>
          <div className='col-6'>
            <h4 className="mb-3">Billing address</h4>
            <form>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>First name</label>
                  <input type="text" className="form-control" id="firstName" placeholder=""></input>
                </div>
                <div className="col-md-6 mb-3">
                  <label>Last name</label>
                  <input type="text" className="form-control" id="lastName" placeholder=""></input>
                </div>
              </div>
              <div className="mb-3">
                <label>Address</label>
                <input type="text" className="form-control" id="address" placeholder="1234 Main St"></input>
              </div>
              <div className="row">
                <div className="col-md-3 mb-3">
                  <label>Zip</label>
                  <input type="text" className="form-control" id="zip" placeholder=""></input>
                </div>
              </div>
              <hr className="mb-4"></hr>
              <h4 className="mb-3">Payment</h4>
              <div className="d-block my-3">
                <div className="custom-control custom-radio">
                  <input type="radio" className="custom-control-input"></input>
                  <label className="custom-control-label">Cash On Delivery</label>
                </div>
              </div>
              <hr className="mb-4"></hr>
              <button className="btn btn-primary mb-5" type="submit" onClick={handleCheckout}>Place Order</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
