import React, { useEffect, useState } from "react";
import { FaRegStar, FaRupeeSign, FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
// import { FaRegStar, FaRupeeSign, FaStar } from "react-icons/fa";
import "./Card.css";
import { Link, useParams } from "react-router-dom";
import Navbar from "./Navbar";

export default function Card() {
  const [products, setproducts] = useState([]);
  const [relatedproduct, setrelatedproduct] = useState([]);
  const [like, setlike] = useState(false);
  const [favorites, getfavorites] = useState([]);

  const { id } = useParams();

  let isFavorite = false

  useEffect(() => {
    getCardData();
    Favorite();
  }, [id]);

  async function getCardData() {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    const getdata = await response.json();
    // console.log(getdata);
    // console.log(object);
    setproducts(getdata);

    handlecategory(getdata.category);
  }
  


  async function handlecategory(category) {
    // console.log(category);
    const response = await fetch(
      `https://dummyjson.com/products/category/${category}`,
    );
    const getlist = await response.json();
    // console.log(getlist);
    setrelatedproduct(getlist.products);
  }

  //handleaddtocard to store at local storage
  // function handleAddToCart(item) {
  //   // console.log(item);
  //   let cardData = JSON.parse(localStorage.getItem("cart")) || [];
  //   cardData.push(item);
  //   localStorage.setItem("cart", JSON.stringify(cardData));
  //   // console.log("Added To Cart", cardData);
  // }

    const handleAddToCart = (product) => {
    // Get existing cart
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check product already exists
    const existingProductIndex = cart.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      // Increase quantity
      cart[existingProductIndex].quantity += 1;
    } else {
      // Add new product
      cart.push({
        ...product,
        quantity: 1,
      });
    }

    // Save updated cart
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  //handleLike
  function handleLike(item) {
    let cardLike = JSON.parse(localStorage.getItem("like")) || [];

    const exist = cardLike.find((data) => data.id === item.id);
    if (exist) {
      cardLike = cardLike.filter((data) => data.id !== item.id);
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
      // console.log(getLike)
    }
  }
  isFavorite = favorites.some(
      (fav) => fav.id === products.id
    );
  return (
    <>
      <Navbar />

      <div className="product-container container ">
        <div className="product-card row">
          <div className="col-lg-5 text-center mb-4">
            <div className="heart-img-div">
              <div className="like-img-card"
                
                  size={28}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLike(products);
                  }} >
                {isFavorite ? (
                  <FaHeart color="red" size={28} />
                ) : (
                  <FaRegHeart  size={28} />
                )}
              </div>
              <img
                src={products?.images?.[0]}
                alt={products?.title}
                className="product-image img-fluid"
              />
            </div>

            <h3 className="product-title mt-3">{products?.title}</h3>
          </div>

          <div className="col-lg-7">
            <p className="product-description">{products?.description}</p>

            <div className="d-flex align-items-center gap-3 mb-3">
              <p className="product-price mb-0">
                <FaRupeeSign />
                {products?.price}
              </p>

              <p className="discount-box mb-0">
                {products?.discountPercentage}% OFF
              </p>
            </div>

            <div className="rating-stars mb-3">
              {[1, 2, 3, 4, 5].map((star) =>
                star <= Math.round(products?.rating) ? (
                  <FaStar key={star} color="gold" />
                ) : (
                  <FaRegStar key={star} color="lightgray" />
                ),
              )}
            </div>

            <div className="product-info">
              <p>
                <span className="info-title">Availability :</span>
                {products?.availabilityStatus}
              </p>

              <p>
                <span className="info-title">Shipping :</span>
                {products?.shippingInformation}
              </p>

              <p>
                <span className="info-title">Stock :</span>
                {products?.stock}
              </p>

              <p>
                <span className="info-title">Warranty :</span>
                {products?.warrantyInformation}
              </p>
            </div>

            <div className="addbutton pt-4">
              <button
                className="card-btn"
                onClick={(e) => {
                  handleAddToCart(products);
                }}
              >
                Add To Cart
              </button>
            </div>
          </div>

          {/* reviews  */}
          <div className="review-box mt-4 text-center p-3 ">
            <h5 className="review-heading">Customer Review</h5>

            <div className="row">
              {products?.reviews?.map((review, index) => (
                <div className="col-md-4 mb-3" key={index}>
                  <div className="review p-3 border rounded h-100">
                    <div className="d-flex justify-content-between">
                      <p>
                        <span className="info-title">Name :</span>
                        {review.reviewerName}
                      </p>

                      <p>
                        {[1, 2, 3, 4, 5].map((star) =>
                          star <= review.rating ? (
                            <FaStar key={star} color="gold" />
                          ) : (
                            <FaRegStar key={star} color="gray" />
                          ),
                        )}
                      </p>
                    </div>

                    <p>
                      <span className="info-title">Comment :</span>
                      {review.comment}
                    </p>

                    <p>
                      <span className="info-title">Date :</span>
                      {review.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* *** */}

        </div>
      </div>

      <div className="products row">
        {relatedproduct.map((product) => {
          const isFavorite = favorites.some(
              (fav) => fav.id === product.id
            );
          return (
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={product.id}>
              <Link
                to={`/card/${product.id}`}
                className="text-decoration-none text-dark"
              >
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
                    <img src={product?.images[0]} alt={product?.title} />
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
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
