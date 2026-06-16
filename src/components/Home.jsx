import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaRegStar, FaRupeeSign, FaStar, FaHeart, FaRegHeart, FaLaptop, FaShoppingBasket, FaFemale, FaMale } from "react-icons/fa";
import { FaCouch, FaMotorcycle, FaMobileAlt, FaTshirt } from "react-icons/fa";
import { GiPerfumeBottle, GiShirt } from "react-icons/gi";

import Navbar from "./Navbar";
import "./Home.css";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [like, setlike] = useState(false);
  const [favorites, getfavorites] = useState([]);

  // API Fetch
  useEffect(() => {
    getData();
    Favorite();
  }, []);

  async function getData() {
    const url = "https://dummyjson.com/products";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    setProducts(data.products);
  }

  //handleaddtocard
  // function handleAddToCart(item) {
  //   console.log(item);
  //   let cardData = JSON.parse(localStorage.getItem("cart")) || [];
  //   cardData.push(item);
  //   localStorage.setItem("cart", JSON.stringify(cardData));
  //   console.log("Added To Cart", cardData);
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

  async function handlecategory(value) {
    // console.log(value);
    // setselectcategory(value);
    const response = await fetch(
      `https://dummyjson.com/products/category/${value}`,
    );
    const getlist = await response.json();
    // console.log(getlist);
    setProducts(getlist.products);
  }

  return (
    <>
      <Navbar
        // navProducts={products}
        // search={search}
        // handleSearch={handlesearch}
        setProducts={setProducts}
      />

      <div className="home-container">
        {/* <h1 className="d-flex justify-content-center align-items-center p-3">
          All Products
        </h1> */}
        <div className="d-none d-md-flex justify-content-center  small-nav">
          <div className="p-2" onClick={() => handlecategory("beauty")}>
            <p >
              <FaCouch />
              {/* <img src="images/beauty_icon.png" alt="beauty"   /> */}
              <span>beauty</span>
            </p>
          </div>
          <div className="p-2" onClick={() => handlecategory("motorcycle")}>
            <p>
              <FaMotorcycle />
              <span>Motorcycle</span>
            </p>
          </div>
          <div className="p-2" onClick={() => handlecategory("mobile-accessories")}>
            <p>
              <FaMobileAlt />
              <span>Phones</span>
            </p>
          </div>
          <div className="p-2" onClick={() => handlecategory("fragrances")}>
            <p>
              <GiPerfumeBottle />
              <span>Fragrances</span>
            </p>
          </div>
          <div className="p-2" onClick={() => handlecategory("tops")}>
            <p>
              <FaFemale />
              <span>Dress</span>
            </p>
          </div>
          <div className="p-2" onClick={() => handlecategory("mens-shirts")}>
            <p>
              <FaTshirt />
              <span>Men shirt</span>
            </p>
          </div>
          <div className="p-2" onClick={() => handlecategory("groceries")}>
            <p>
              <FaShoppingBasket />
              <span>Groceries</span>
            </p>
          </div>
          <div className="p-2" onClick={() => handlecategory("laptops")}>
            <p>
              <FaLaptop />
              <span>Laptop</span>
            </p>
          </div>
        </div>
        <div className="products row">
          {products.map((product) => {
            const isFavorite = favorites.some((fav) => fav.id === product.id);
            return (
              <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={product.id}>
                <Link
                  to={`/card/${product.id}`}
                  className="text-decoration-none text-dark h-100 d-block"
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
                      <img
                        src={product?.images[0]}
                        alt={product?.title}
                        className=""
                      />
                    </div>

                    <div>
                      <h4 className="product-title ">
                        {product?.title}
                      </h4>
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
      </div>
    </>
  );
}
