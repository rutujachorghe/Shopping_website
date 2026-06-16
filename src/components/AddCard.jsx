import React, { useCallback, useEffect, useState } from "react";
import "./AddCard.css";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import {
  FaMinus,
  FaPlus,
  FaRegStar,
  FaRupeeSign,
  FaStar,
  FaTrash,
} from "react-icons/fa";

export default function AddCard() {
  const [cardData, setcarddata] = useState([]);
  const [showform, setshowform] = useState(false);
  const [name, setname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [orderData, setOrderData] = useState([]);
  const [showOrderPopUp, setShowOrderPopUp] = useState(false);

  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [addressError, setAddressError] = useState("");
  useEffect(() => {
    getData();
  }, []);

  //get addtocart data from localstorage
  function getData() {
    const data = localStorage.getItem("cart");
    if (data) {
      setcarddata(JSON.parse(data));
      // console.log(data)
    }
  }

  //handleOrderStore  at local storage
  const handleOrderStore = (items) => {
    let OrderData = JSON.parse(localStorage.getItem("OrderStore")) || [];

    const newOrder = {
      items: cardData,
      orderdate: new Date().toLocaleDateString(),
      OrderTime: new Date().toLocaleTimeString(),
    };
    OrderData.push(newOrder);
    localStorage.setItem("OrderStore", JSON.stringify(OrderData));
    console.log("order");
    // console.log("new order Place", newOrder);
    localStorage.removeItem("cart");
    // getData();
    // window.location.reload();
  };

  //total Price
  function totalprice() {
    let price = 0;
    cardData.map((item) => {
      price = price + item.price * item.quantity;
    });
    return price;
  }

  //Add Quantity by + 1
  const handleaddquantity = (id) => {
    console.log(id);
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart = cart
      .map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);

    localStorage.setItem("cart", JSON.stringify(cart));
    getData();
  };

  //minus quantity by -1
  const handleMinusquantity = (id) => {
    let card = JSON.parse(localStorage.getItem("cart")) || [];

    card = card
      .map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);
    // console.log("decrease", card);
    localStorage.setItem("cart", JSON.stringify(card));
    getData();
  };

  // Remove from add to cart
  function handleremove(id) {
    const updatedData = cardData.filter((item) => item.id !== id);
    setcarddata(updatedData);
    localStorage.setItem("cart", JSON.stringify(updatedData));
    console.log("card removed");
  }

  //Delivery charges 3 rs
  function handledelivery() {
    let delivery = 0;
    cardData.map((item) => {
      delivery += item.quantity * 3;
    });
    // console.log(delivery)
    return delivery;
  }

  function handleItemCount() {
    let totalcount = 0;
    cardData.map((item) => {
      totalcount += item.quantity;
    });
    return totalcount;
  }

  //validation for form
  function handleSubmit(e) {
    e.preventDefault();

    let valid = true;

    setNameError("");
    setPhoneError("");
    setAddressError("");

    // Name validation
    if (name.length < 3) {
      setNameError("Name must be at least 3 characters");
      valid = false;
    }

    // Phone validation
    if (!/^[0-9]{10}$/.test(phone)) {
      setPhoneError("Phone number must be exactly 10 digits");
      valid = false;
    }

    // Address validation
    if (address.length < 10) {
      setAddressError("Address must be at least 10 characters");
      valid = false;
    }

    if (!valid) return;

    // handleOrderStore();
    // alert("Order Confirmed");
  }

  return (
    <>
      <Navbar />
      {cardData.length ? (
        <div>
          <div className="row addcard-container">
            <div className="col-lg-7 col-md-12">
              {/* ternary operator used for (card is added or not) */}

              {cardData.map((item) => (
                <div className="card-info mb-4" key={item.id}>
                  <div className="row">
                    <div className="col-md-4">
                      <img
                        src={item?.thumbnail}
                        alt={item?.title}
                        className="img-fluid"
                      />
                    </div>

                    <div className="col-md-8">
                      <div className="pb-3">
                        <h2>{item?.title}</h2>
                      </div>

                      <div className="rating-stars mb-3">
                        {[1, 2, 3, 4, 5].map((star) =>
                          star <= Math.round(item?.rating) ? (
                            <FaStar key={star} color="gold" />
                          ) : (
                            <FaRegStar key={star} color="lightgray" />
                          ),
                        )}
                      </div>

                      <div className="d-flex align-items-center mb-3">
                        <p className="product-price mb-0">
                          <span>
                            <FaRupeeSign />
                            {item?.price}
                          </span>
                        </p>

                        <p className="discount-box mb-0">
                          <span>{item?.discountPercentage}% OFF</span>
                        </p>
                      </div>

                      <div className="d-flex justify-content-between">
                        <p>
                          <span className="info-title">Shipping :</span>
                          {item?.shippingInformation}
                        </p>

                        <button
                          className="p-2 remove-btn btn"
                          type="button"
                          onClick={() => handleremove(item.id)}
                        >
                          <FaTrash size={18} />
                          Remove
                        </button>
                      </div>

                      <div className="quantity-box">
                        <p>Quantity</p>

                        <button onClick={() => handleMinusquantity(item.id)}>
                          <FaMinus />
                        </button>

                        <div className="quantity-number">{item.quantity}</div>

                        <button onClick={() => handleaddquantity(item.id)}>
                          <FaPlus />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="col-lg-5 col-md-12">
              <div className="card-price-info">
                <div className="price-details-box p-4">
                  <h6>Price Details</h6>
                  <hr></hr>
                  <div className="drop-down products-details">
                    <p className="text-bold d-flex justify-content-between">
                      Price: ({handleItemCount()} items)
                      <span>{totalprice().toFixed(2)}</span>
                    </p>
                    {/* <p className="text-bold">discount</p> */}
                    <p className="text-bold d-flex justify-content-between">
                      Delivery charges :
                      <span>{handledelivery().toFixed(2)}</span>
                    </p>
                    <hr></hr>
                    <p className="d-flex justify-content-between">
                      Total Amount
                      <span>
                        ₹ {(totalprice() + handledelivery()).toFixed(2)}
                      </span>
                    </p>
                  </div>
                </div>

                <div className=" p-4 ">
                  <div className="d-flex justify-content-between place-order p-2">
                    <div className="p-2">
                      ₹ {(totalprice() + handledelivery()).toFixed(2)}
                    </div>
                    <button
                      className="place p-2"
                      onClick={() => setshowform(true)}
                    >
                      Place Order
                    </button>
                  </div>
                </div>

                {/* form for order details */}
                {showform && (
                  <div className="order-form-container">
                    <div className="order-form">
                      <h2 className="order-title">Place Your Order</h2>

                      <form className="order" onSubmit={handleSubmit}>
                        <input
                          type="text"
                          placeholder="Enter Your Name"
                          value={name}
                          maxLength={15}
                          onChange={(e) => {
                            setname(e.target.value);
                            setNameError("");
                          }}
                          className="form-control"
                          required
                        />

                        {nameError && <p className="error-msg">{nameError}</p>}

                        <input
                          type="tel"
                          name="phone"
                          placeholder="Enter Phone Number"
                          value={phone}
                          maxLength={10}
                          onChange={(e) => {
                            if (/^[0-9]*$/.test(e.target.value)) {
                              setPhone(e.target.value);
                              setPhoneError("");
                            }
                          }}
                          className="form-control"
                          required
                        />

                        {phoneError && (
                          <p className="error-msg">{phoneError}</p>
                        )}

                        <input
                          type="text"
                          placeholder="Enter Address"
                          value={address}
                          maxLength={35}
                          onChange={(e) => {
                            setAddress(e.target.value);
                            setAddressError("");
                          }}
                          className="form-control"
                          required
                        />

                        {addressError && (
                          <p className="error-msg">{addressError}</p>
                        )}

                        <div className="product-box">
                          {cardData.map((item) => (
                            <div className="product-item">
                              <div>
                                <h5>{item.title}</h5>
                                <p>Quantity : {item.quantity}</p>
                              </div>

                              <span>₹ {item.price}</span>
                            </div>
                          ))}
                        </div>

                        <div className="total-box">
                          <h4>Total Amount</h4>

                          <h3>
                            <span>₹</span> {totalprice().toFixed(2)}
                          </h3>
                        </div>

                        <div className="btn-box">
                          <button
                            type="submit"
                            className="btn btn-success"
                            onClick={() => {
                              setOrderData([
                                {
                                  id: Math.floor(Math.random() * 1000000),
                                  date: new Date().toLocaleString(),
                                  total: totalprice() + handledelivery(),
                                },
                              ]);
                              // handleOrderStore();
                              setShowOrderPopUp(true);
                              // setshowform(false);
                            }}
                          >
                            Confirm Order
                          </button>

                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => setshowform(false)}
                          >
                            Close
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                {showOrderPopUp && (
                  <div className="order-history  ">
                    <div className="order-history-content">
                      <h3>Order Confirmed</h3>
                      {orderData.map((order, index) => (
                        <div key={index} className="order-item">
                          <p>Order ID: {order.id}</p>
                          <p>Date: {order.date}</p>
                          <p>Total: ₹ {order.total.toFixed(2)}</p>
                          {/* link to home page */}
                          < a href="/" className="btn btn-primary">
                             <button
                            type="button"
                            className="btn btn-primary"
                            // onClick={() => 
                            //   setShowOrderPopUp(false)
                            //   setshowform(false)
                            // }
                          >
                            Ok
                          </button>
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-cart-container">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
            alt="empty cart"
            className="empty-cart-img"
          />

          <h2>Missing Cart Items?</h2>

          <p>Your cart is empty. Start shopping and add products to cart.</p>

          <Link to="/">
            <button className="continue-btn">Continue Shopping</button>
          </Link>
        </div>
      )}
    </>
  );
}
