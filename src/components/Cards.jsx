import React, { useState, useEffect, useRef } from 'react';
import { useDispatchCart, useCart } from './ContexReducer';




function Cards(props) {

    let dispatch = useDispatchCart();
    let data = useCart()

    const priceRef = useRef()
    const options = props.options
    const priceOptions = Object.keys(options)
    const [quantity, setquantity] = useState(1)
    const [size, setsize] = useState("")

    const handleAddToCart = async () => {


        let food = []
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;
                break;
            }
        }
        if (food != []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, quantity: quantity })
                return
            }
            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, quantity: quantity, size: size, img: props.img })
                console.log("Size different so simply ADD one more to the list")
                return
            }
            return
        }

        await dispatch({
            type: "ADD", id: props.foodItem._id, name: props.foodItem.name,
            price: finalPrice, quantity: quantity, size: size
        })
        console.log(data)
    }

    useEffect(() => {
        setsize(priceRef.current.value)
    }, [])


    let finalPrice = quantity * parseInt(options[size]);
    return (
        <div>
            <div className='main'>
                <div className="card m-5" style={{ "width": "18rem" }}>
                    <img src={props.foodItem.img} className="card-img-top" alt="No image is found.." style={{ height: "250px", objectFit: "fill" }} />
                    <div className="card-body">
                        <h5 className="card-title">{props.foodItem.name}</h5>
                        <div className="container w-100">
                            {/*  Select element for quantity  */}
                            <select className='rounded-5' onChange={(e) => setquantity(e.target.value)}>
                                {/* array is the reserved key word in JS so we used it and take the value from the that array as 6  */}
                                {Array.from(Array(10), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    )
                                })}
                            </select>
                            <select className='rounded-5 ms-3' onChange={(e) => setsize(e.target.value)} ref={priceRef}>
                                {priceOptions.map((price) => {
                                    return <option key={price} value={price}>{price}</option>
                                })}
                            </select>
                            <div className='d-inline ms-3'>
                                ${finalPrice}/-
                            </div>
                            <hr />
                            <button className='btn btn-success justify-center ms-2' onClick={handleAddToCart}>Add To Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cards;
