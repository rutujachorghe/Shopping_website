import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { FaHeart, FaRegHeart, FaRegStar, FaRupeeSign, FaStar } from "react-icons/fa";
import "./Like.css";
import Home from "./Home";

export default function Like() {
  const [favorite, getfavorites] = useState([]);
  const [like, setlike] = useState(false);
  // const [favorites, getfavorites] = useState([]);

  useEffect(() => {
    const getLike = localStorage.getItem("like");
    if (getLike) {
      getfavorites(JSON.parse(getLike));
    }
    Favorite();
  }, []);


  function handleLike(item) {
    // setlike(item);
    // console.log("like", item)
    let cardLike = JSON.parse(localStorage.getItem("like")) || [];

    const exist = cardLike.find(
      (data) => data.id === item.id);
    if (exist) {
      cardLike = cardLike.filter(
        (data) => data.id !== item.id);
    } else {
      cardLike.push(item);
    }

    localStorage.setItem("like", JSON.stringify(cardLike));
    console.log("favorite Product ", cardLike);
    Favorite();
  }

  //to get likedata
  function Favorite() {
    const getLike = localStorage.getItem("like");
    if (getLike) {
      getfavorites(JSON.parse(getLike));
    }
  }


  //handleaddtocart
  //  function handleAddToCart(item) {
  //   // console.log(item);
  //   let cardData = JSON.parse(localStorage.getItem("cart")) || [];
  //   cardData.push(item);
  //   localStorage.setItem("cart", JSON.stringify(cardData));
  //   // console.log("Added To Cart", cardData);
  // }

  return (
    <>
      <Navbar />

      <div className="row whishlist ">
        {favorite?.length > 0 ? (
          // {
          favorite.map((product, index) => {
            const isFavorite = favorite.some((fav) => fav.id === product.id);
            return (
              <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={product.id}>
                <div className="product">
                  <div
                    className="like-img-home"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLike(product);
                    }}
                  >
                    {isFavorite ? (
                      <FaHeart color="red" size={20} />
                    ) : (
                      <FaRegHeart size={20} />
                    )}
                  </div>

                  <div className="images">
                    <img
                      src={product?.images[0]}
                      alt={product?.title}
                      className=""
                    />
                  </div>

                  <div>
                    <h2 className="product-title px-1">
                      {product?.title}
                    </h2>
                  </div>

                  <div className="cat-brand d-flex justify-content-between px-1">
                    <p>{product?.category}</p>

                    {product?.brand ? (
                      <p className="d-none d-sm-block">
                        <b>Brand :</b>
                        {product?.brand}
                      </p>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="price px-1">
                    <p className="price-p">
                      <FaRupeeSign className="rupee-icon" />
                      {product?.price}
                    </p>

                    <p className="price-dis">
                      {product?.discountPercentage}% off
                    </p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center px-1">
                    <div className="discount-rating d-flex align-items-center justify-content-start">
                      {[1, 2, 3, 4, 5].map((star) =>
                        star <= Math.round(product?.rating) ? (
                          <FaStar key={star} color="gold" size={14} />
                        ) : (
                          <FaRegStar key={star} color="gray" size={14} />
                        )
                      )}
                    </div>

                    <Link to="/addcard">
                      <div className="addbutton">
                        <button
                          className="card-btn"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleAddToCart(product);
                          }}
                        >
                          Add To Cart
                        </button>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
          // }
        ) : (
          <div className=" pt-5">

            {/* <div> */}
            <h1 className="text-center">No whishlist added</h1>
            <Home />
            {/* </div> */}
          </div>


        )
        }
      </div>

    </>
  );
}
