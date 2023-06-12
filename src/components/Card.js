import React from 'react'
// import Checkout from '../screens/Checkout'
import { useDispatch, useCart } from "./ContextReducer"

function Card(props) {
    let copyItem = props.copyItem;
    let dispatch = useDispatch();
    let data = useCart();
    const handleAddToCart = async () => {
        if (!localStorage.getItem("authToken")) {
            alert("Please Login First")
        } else {
            for (const item of data) {
                if (item.id === copyItem._id) {
                    return
                }
            }
            await dispatch({ type: "ADD", id: copyItem._id, name: copyItem.name, desc: copyItem.description, price: copyItem.price })
            console.log(data);
        }
    }

    return (
        <div>
            <div>
                <div className="card mt-3" style={{ "width": "16rem", "maxHeight": "360px" }}>
                    <img src={copyItem.img} className="card-img-top" alt="..." style={{ height: "150px", objectFit: "fill" }} />
                    <div className="card-body">
                        <h5 className="card-title">{copyItem.name}</h5>
                        <p className="card-text">{copyItem.description}</p>
                        <div className='w-200 d-flex'>
                            <div className='d-inline h-100 fs-5 ml-3'>Price: ₹{copyItem.price}/-</div>
                        </div>
                        <hr>
                        </hr>
                        <button className={'btn btn-success justify-center'} onClick={handleAddToCart}>Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
