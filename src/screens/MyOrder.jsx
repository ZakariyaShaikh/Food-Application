
import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {

    const [orderData, setorderData] = useState({})

    const fetchMyOrder = async () => {
        try {
            const res = await fetch("http://localhost:4000/api/myOrder", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: localStorage.getItem('userEmail') })
            });

            const data = await res.json();
            console.log("Fetched Order Data: ", data);
            setorderData(data.orderData);
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };


    useEffect(() => {
        fetchMyOrder()
    }, [])

    return (
        <div className='bg-dark text-white'>
            <div>
                <Navbar />
            </div>

            <div className='container'>
                <div className='row'>

                    {orderData && orderData.order_data ? (
                        orderData.order_data.slice(0).reverse().map((orderArray, index) => (
                            <React.Fragment key={index}>
                                {/* Check if the first element is Order_date */}
                                {orderArray.map((item, i) => (
                                    item.Order_date ? (
                                        <div key={i} className='m-auto mt-5'>
                                            <b>{item.Order_date}</b>
                                            <hr />
                                        </div>
                                    ) : (
                                        <div key={i} className='col-12 col-md-6 col-lg-3'>
                                            <div className="card mt-3" style={{ width: "16rem", maxHeight: "600px" }}>
                                                <div className="card-body">
                                                    <h5 className="card-title">Name:  {item.name}</h5>
                                                    <div className='container w-100 p-0' style={{ height: "100px" }}>
                                                        <span className='m-1'>Quantity:{item.quantity}</span>
                                                        <span className='m-1'>Size:{item.size}</span>
                                                        <hr />
                                                        <div className=' ms-2 h-100 w-20 fs-5'>Price:
                                                            ₹{item.price}/-
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                ))}
                            </React.Fragment>
                        ))
                    ) : (
                        <div>No data yet..</div>
                    )}

                </div>


            </div>

            <Footer />
        </div>
    )
}
// {"orderData":{"_id":"63024fd2be92d0469bd9e31a","email":"mohanDas@gmail.com","order_data":[[[{"id":"62ff20fbaed6a15f800125e9","name":"Chicken Fried Rice","qty":"4","size":"half","price":520},{"id":"62ff20fbaed6a15f800125ea","name":"Veg Fried Rice","qty":"4","size":"half","price":440}],"2022-08-21T15:31:30.239Z"],[[{"id":"62ff20fbaed6a15f800125f4","name":"Mix Veg Pizza","qty":"4","size":"medium","price":800},{"id":"62ff20fbaed6a15f800125f3","name":"Chicken Doub;e Cheeze Pizza","qty":"4","size":"regular","price":480}],"2022-08-21T15:32:38.861Z"]],"__v":0}}
