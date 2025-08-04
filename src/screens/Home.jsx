import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Cards from '../components/Cards';
// import { Link } from 'react-router-dom';

const Home = () => {

  const [search, setsearch] = useState("")
  const [foodItem, setfoodItem] = useState([]);
  const [foodCayegory, setfoodCayegory] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:4000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });
    response = await response.json();
    setfoodItem(response[0]);
    setfoodCayegory(response[1]);
    // console.log(response[0],response[1])
  };

  useEffect(() => {
    loadData();
  }, [])





  return (
    <div>
      <div><Navbar /></div>
      <div><div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner position-relative">
          {/* Search Bar Overlay */}
          <div className="position-absolute w-100 d-flex justify-content-center align-items-end" style={{ top: 0, bottom: 0, zIndex: 10, paddingBottom: '40px' }}>
            <div className="d-flex bg-white rounded-pill p-2 shadow" style={{ width: '60%', maxWidth: '600px' }}>
              <input className="form-control me-2 border-0" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setsearch(e.target.value)}} />
            </div>
          </div>

          {/* Carousel Images */}
          <div className="carousel-item active">
            <img src="https://picsum.photos/1500/400?blur" className="d-block w-100" alt="..." style={{ height: '400px', objectFit: 'cover' }} />
          </div>
          <div className="carousel-item">
            <img src="https://picsum.photos/1500/400?blur" className="d-block w-100" alt="..." style={{ height: '400px', objectFit: 'cover' }} />
          </div>
          <div className="carousel-item">
            <img src="https://picsum.photos/1500/400?blur" className="d-block w-100" alt="..." style={{ height: '400px', objectFit: 'cover' }} />
          </div>
        </div>

        {/* Carousel Controls */}
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div></div>
      <div className='container'>
        {
          foodCayegory != []
            ? foodCayegory.map((data) => {
              return (
                <div key={data._id} className='row mb-5'>
                  <div key={data._id} className='fs-3 m-3'>
                    {data.CategoryName}
                  </div>
                  <hr />
                  {foodItem != [] ? foodItem.filter((item) =>
                    (item.CategoryName === data.CategoryName) &&
                    (item.name.toLowerCase().includes(search.toLowerCase()))
                  ).map((filterItem => {
                    return (
                      <div key={filterItem._id} className='col-12 col-md-6 col-lg-3'>
                        <Cards foodItem={filterItem}
                          options={filterItem.options[0]}
                           />
                      </div>
                    )

                  })) : <div>No such data available</div>}
                </div>
              )
            })
            : ""
        }
      </div>
      <div> <Footer /></div>
    </div>
  );
}

export default Home;
