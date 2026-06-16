import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./OrderStore.css";

export default function OrderStore() {
  const [OrderData, SetOrderData] = useState();

  useEffect(() => {
    getOrder();
  }, []);

  function getOrder() {
    const Store = localStorage.getItem("OrderStore");
    // console.log(Store);
    if (Store) {
      SetOrderData(JSON.parse(Store));
    }
  }
  return (
    <>
      <Navbar />

      <div className="container py-4">
        {OrderData?.map((order, index) => {
          return (
            <div className="order-card mb-4">
              {/* <div className="order-header">
                <div>
                <h3>Order: {index + 1}</h3>
                <p>Date: {order.orderdate}</p>
                <p>Time: {order.OrderTime}</p>
              </div>

              <button className="status-btn">
                Delivered
              </button>
              </div> */}

              <div className="order-products">
                {order.items.map((product) => (
                  <div key={product.id} className="order-product">
                    <div className="product-image">
                      <img src={product.thumbnail} alt={product.title} />
                    </div>
                    <div className="product-details">
                      <h4>{product.title}</h4>
                      <p>
                        Price :<span> ₹ {product.price}</span>
                      </p>

                      <p>
                        Quantity :<span> {product.quantity}</span>
                      </p>

                      <p>{product.warrantyInformation}</p>
                    </div>

                    <div>
                      {/* <h3>Order: {index + 1}</h3> */}
                      <button className="status-btn">Delivered</button>
                      <p className="pt-3">Date: {order.orderdate}</p>
                      <p>Time: {order.OrderTime}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
