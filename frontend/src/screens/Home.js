import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

import Card from "../Components/card/Card";
import fetchDataFromApi from "../api/Api";


const Home = () => {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState();

  useEffect(() => {
    const dataCall = async () => {
      const dd = await fetchDataFromApi("foodData");
      setFoodItem(dd.data[0]);
      setFoodCat(dd.data[1]);
    };
    dataCall();
  }, []);

  return (
    <>
      <div>
        <Navbar />
        <div
          id="carouselExampleCaptions"
          className="carousel slide"
          data-bs-ride="false"
        >
          {/* ------------SEARCH BAR------------ */}
          <div
            className="carousel-caption d-none d-md-block"
            style={{ zIndex: "10" }}
          >
            <div className="container-fluid">
              <div className="d-flex justify-content-center" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <button
                  className="btn btn-outline-success bg-success text-white"
                  type="submit"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner" id="carousel">
            <div className="carousel-item active">
              <img
                src="https://static1.bigstockphoto.com/8/1/3/large1500/318491239.jpg"
                className="d-block w-100"
                alt="..."
                style={{ filter: "brightness(90%)" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://www.mashed.com/img/gallery/the-ultimate-list-of-your-favorite-fast-food-copycat-recipes/l-intro-1603229426.jpg"
                className="d-block w-100"
                alt="..."
                style={{ filter: "brightness(50%)" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://bangkokhasyou.com/wp-content/uploads/2013/12/hamburger.jpg"
                className="d-block w-100"
                alt="..."
                style={{ filter: "brightness(50%)" }}
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        {/* <Carousel /> */}

        <div className="container overflow-hidden">
          {foodCat.length > 0
            ? foodCat.map((category) => {
                return (
                  <div className="row mb-3 text-white">
                    <div key={category._id } className="fs-3 m-3">
                      {category.CategoryName}
                    </div>
                    <hr />
    {/* -----------------Filtering---------------   */}
                    {foodItem.length > 0
                      ? foodItem
                          .filter(
                            (item) =>
                            item.CategoryName === category.CategoryName &&
                            item.name.toLowerCase().includes(search ? search.toLowerCase() : "")
                          )
                          .map((filterItem) => {
                            return (
                              <div
                                key={filterItem.name }
                                className="col-12 col-md-6 col-lg-4  "
                              >
                                <Card
                                  foodItem={filterItem}
                                  options={filterItem.options}
                             
                                />
                              </div>
                            );
                          })
                      : ""}
                  </div>
                );
              })
            : ""}
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Home;
