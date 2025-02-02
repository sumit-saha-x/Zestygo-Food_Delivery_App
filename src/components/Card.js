import React, { useEffect, useState, useRef } from 'react'
import { useCart, useDispatchCart } from './ContextReducer';

export default function Card(props) {
    let dispatch = useDispatchCart();
    let data = useCart();
    let options = props.options;
    let priceOptions = Object.keys(options)
    const priceRef = useRef();
    const [qty, setQty] = useState(1);         //we pass this in backed to save for user in Cart
    const [size, setSize] = useState("");

    const handleAddToCard = async () => {      //when add to card is clicked send this in bknd
        let food = []
        for (const item of data) {
          if (item.id === props.foodItem._id) {
            food = item;
    
            break;
          }
        }
        if (food !== []) {              
            if (food.size === size) {                         
              await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })  //Update item when Add to cart quantity increased not addinng then once again in list
              return
            }
            else if (food.size !== size) {
              await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
              return
            }
            return
          }
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
    }
    let finalPrice = qty * parseInt(options[size]);
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])
    return (
        <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
            <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
            <div className="card-body">
                <h5 className="card-title">{props.foodItem.name}</h5>
                <div className='container w-100 p-0'>
                    <select className='m-2 h-100 w-20 bg-success rounded' onChange={(e) => setQty(e.target.value)}>
                        {Array.from(Array(6), (e, i) => {
                            return (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            )
                        })}
                    </select>

                    <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                        {
                            priceOptions.map((data) => {
                                return <option key={data} value={data}>{data}</option>
                            })
                        }
                    </select>

                    <div className='d-inline ms-2 h-100 w-20 fs-5'>
                        ₹{finalPrice}/-
                    </div>
                </div>
                <hr />
                <button className="btn btn-success justify-center ms-1" onClick={handleAddToCard}>Add to Cart</button>
            </div>
        </div>)
}
