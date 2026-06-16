import { Link } from "react-router-dom";
// import { useState }  from "react";
import "./Navbar.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaHeart, FaUserCircle } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";

export default function Navbar({
  // navProducts, search, handleSearch, SETPRODUCTS,
  setProducts,
}) {
  // const categories = [...new Set(navProducts?.map((p) => p.category))];
  const [category, setcategory] = useState([]);
  const [selectcatecory, setselectcategory] = useState([]);
  // const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  // const { id } = useParams();

  useEffect(() => {
    getcategory();
  }, []);

  async function getcategory() {
    const response = await fetch("https://dummyjson.com/products/categories");
    const getlist = await response.json();
    // console.log(getlist);
    setcategory(getlist);
  }

  //  handlesearch
  async function handlesearch(value) {
    setSearch(value);
    if (value === "") {
      getData();
      return;
    }
    const response = await fetch(
      `https://dummyjson.com/products/search?q=${value}`,
    );
    const data = await response.json();
    setProducts(data.products);
  }

  //handlecategory function
  async function handlecategory(value) {
    // console.log(value);
    setselectcategory(value);
    const response = await fetch(
      `https://dummyjson.com/products/category/${value}`,
    );
    const getlist = await response.json();
    // console.log(getlist);
    setProducts(getlist.products);
  }

  return (
    <div className="container-fluid navbar navbar-expand-lg custom-navbar px-4 py-3">

 
  <Link className="navbar-brand brand-logo fw-bold" to="/">
    ShopZone
  </Link>

 
  <button
    className="navbar-toggler border-0 shadow-none"
    type="button"
    data-bs-toggle="collapse"
    data-bs-target="#navbarNav"
  >
    <span className="navbar-toggler-icon"></span>
  </button>

  
  <div
    className="collapse navbar-collapse justify-content-between align-items-center"
    id="navbarNav"
  >

    
    <div className="d-flex flex-column flex-lg-row align-items-center gap-4 mt-3 mt-lg-0">

      <Link
        to="/"
        className="nav-link nav-hover active-link fw-semibold"
      >
        Home
      </Link>

      
      <select
        className="form-select category-select shadow-sm"
        onChange={(e) => handlecategory(e.target.value)}
      >
        <option value="">All Category</option>

        {category.map((list, index) => (
          <option key={index} value={list.name}>
            {list.name}
          </option>
        ))}
      </select>
    </div>

   
    <div className="search-wrapper mt-3 mt-lg-0">
      <input
        className="search-input-box shadow-sm"
        type="search"
        placeholder="Search products..."
        value={search}
        onChange={(e) => handlesearch(e.target.value)}
      />
    </div>

    
    <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">

      
      <Link
        to="/like"
        className="nav-link nav-hover like-btn"
      >
        <FaHeart size={18} />
      </Link>

      
      <Link
        to="/addcard"
        className="nav-link p-0"
      >
        <button className="btn btn-dark custom-btn">
          <FaCartPlus className="me-2" />
          Cart
        </button>
      </Link>

      
      <Link
        to="/orderstore"
        className="nav-link p-0"
      >
        <button className="btn btn-dark custom-btn">
          My Orders
        </button>
      </Link>

    </div>
  </div>
</div>
  );
}
