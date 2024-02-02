import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from "./ConfirmationModal";
import { Link, NavLink } from "react-router-dom";

import Logo from "../assets/multimedsLogo.svg";
import Menu from "../assets/menuIcon.svg";
import Cart from "../assets/cartIcon.svg";
import Order from "../assets/orderIcon.svg";
import Offer from "../assets/offerIcon.svg";
import Search from "../assets/searchIcon.svg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "./loader";
import SearchBar from "./SearchBar";
import Navlinks from "./Navlinks";
import MobileMenu from "./MobileMenu";
import DiscountBanner from "./DiscountBanner";
import Login from "./Login";
import CartModal from "./Cart/CartModal";
import { useLocation } from "react-router-dom";
import {
  BrowserRouter,
  Navigate,
  Route,
  Router,
  Routes,
} from "react-router-dom";
const Navbar = ({ isDiscountBanner  }) => {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState(localStorage.getItem('token'));
  console.log(userDetails)
  const [isMenu, setIsMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [isLogin, setIsLogin] = useState(false);
  const [isCartModal, setIsCartModal] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (location.state?.openLoginModal) {
      setIsLogin(true)
    }
  }, [location]);


  // cart modal items
  const [items, setItems] = useState(0);

  const handleMenu = () => {
    setIsMenu(!isMenu);
  };
  useEffect(()=>{
    setLoading(false)
  })

  const onLogoutClick = (e) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };
  

  // const onLogoutClick=(e)=>{
  //   e.preventDefault();
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('userInfo');
  //   // toast.info('Logged out successfully');
    
  //   setLoading(true)
  //   setUserDetails(localStorage.getItem('token'));
  //   navigate('/', { state: { openLoginModal: true } });

  //   // window.location.reload();
  // }

  return (
    <div className="lg:static w-full fixed top-0 z-50 flex flex-col justify-center ">
       <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {( loading) && <Loader />}
      <div className="py-2 px-8 h-[4.5rem] flex justify-between items-center bg-white border-b border-slate-300">
        {/* Logo */}
        <Link to="/">
          <img
            src={Logo}
            alt="logo"
            className="w-[11.144rem] h-[2.555rem] cursor-pointer"
          />
        </Link>

        {/* SearchBar */}
        <SearchBar
          isPincode={true}
          placeholderText="Search for medicines, medical devices and other categories"
        />

        {/* Order and Offers*/}
        <div className="xl:flex gap-2 font-HelveticaNeueMedium hidden">
          <Link className="flex gap-1 cursor-pointer items-center">
            <img
              src={Order}
              alt="order icon"
              className="w-[1.5rem] h-[1.5rem]"
            />
            <h1>Track your order</h1>
          </Link>
          <div className="h-[1.375rem] border-l-2 border-slate-900" />
          <Link className="flex gap-1 cursor-pointer items-center">
            <img
              src={Offer}
              alt="offer icon"
              className="w-[1.5rem] h-[1.5rem]"
            />
            <h1>Explore Offers</h1>
          </Link>
        </div>

        {/* Login Button and login dialog*/}
        {
          userDetails ?
          (
            <button
          className="xl:block hidden bg-[#7487FF] text-white font-HelveticaNeueMedium ${
             py-2 px-4 rounded"
          // onClick={() => setIsLogin(true)}
          onClick={onLogoutClick}
        >
          Logout
        </button>
          )
          :(
            <button id='login-btn'
          className="xl:block hidden bg-[#7487FF] text-white font-HelveticaNeueMedium ${
             py-2 px-4 rounded"
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
          )
        }
        

        {isLogin ? <Login isLogin={isLogin} setIsLogin={setIsLogin} setUserDetails={setUserDetails} /> : null}

        <div className="xl:hidden flex gap-8">
          {/* Menu */}
          <button>
            <img src={Search} alt="Menu" className="w-6 h-6" />
          </button>

          {/* HamBurger */}
          <button onClick={handleMenu}>
            <img src={Menu} alt="Menu" className="w-6 h-6 p-1" />
          </button>
        </div>

        {/* Cart */}
        <div
          onMouseEnter={() => {
            setIsCartModal(true);
          }}
          onMouseLeave={() => {
            setIsCartModal(false);
          }}
          className="relative"
        >
          <Link to="#" className="hidden xl:block h-[1.5rem] w-[1.5rem]">
            <img src={Cart} alt="cart icon" className="h-[full] w-[full]" />
          </Link>

          {isCartModal ? <CartModal setItems={setItems} items={items} /> : null}
        </div>
      </div>
      {/* Navlinks */}
      {/* <Navlinks /> */}
      <MobileMenu isMenu={isMenu} />
      {
  showConfirmModal && (
    <ConfirmationModal
      onConfirm={() => {
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        navigate('/', { state: { openLoginModal: true } });
        setShowConfirmModal(false);
        setUserDetails(localStorage.getItem('token'));
      }}
      onCancel={() => setShowConfirmModal(false)}
    />
  )
}

      {/* Navlinks */}
      {isDiscountBanner ? <DiscountBanner /> : null}
    </div>
  );
};

export default Navbar;
