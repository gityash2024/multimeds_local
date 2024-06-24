import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import FooterLogo from "../assets/footer/footerLogo.svg";
import Facebook from "../assets/footer/facebook.svg";
import Instagram from "../assets/footer/instagram.svg";
import CouponModal from "./Cart/CouponModal";
import { WhatsApp } from "@material-ui/icons";

const Footer = () => {
  const navigate = useNavigate();
  const [isOpen, setIsopne] = useState(false);
  const handleClose = () => {
    setIsopne(false);
  };
  const handleWhatsAppClick = () => {
    const phoneNumber = '+918899000992';
    const whatsappURL = `https://wa.me/${phoneNumber}`;
    window.open(whatsappURL, '_blank');
  };
  return (
    <div className="w-full flex flex-col justify-center items-center bg-[#031B89] text-white py-5 px-8 gap-6">
      <div className="w-full flex flex-wrap gap-4">
        <div className="flex flex-col gap-4 w-[16.125rem] font-HelveticaNeueMedium">
          <Link to="/">
            <div className="w-[11.125rem] h-[2.5rem]">
              <img
                src={FooterLogo}
                alt="footer logo"
                className="h-full w-full cursor-pointer"
              />
            </div>
          </Link>
          <div className="row gap-8"  style={{display:"flex"}}>

          <div className="col-md-4  flex flex-col text-[0.875rem] gap-1">
          <h1  style={{width:"200px"}}>
            Multimeds Healthcare OPC
            <br /> 456, Emerald Avenue, Indiranagar,
            <br /> Bangalore - 560038,
            <br /> Karnataka, India
          </h1>
</div>
          <div className="col-md-4 flex flex-col text-[0.875rem] gap-1">
            <p>Contact</p>
            <p>91 902838890</p>
            <p>contact@mymultimeds.com</p>
          </div>
          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-2 md:grid-cols-5 gap-4">
      <div className="flex flex-col gap-4">
  <h1 className="font-HelveticaNeueMedium">Multimeds pharma</h1>
  <ul className="flex flex-col text-[0.875rem] gap-1">
    {/* subCategory : medicine,device,essentials,over the counter */}
    <Link
      to="/products"
      state={{ subCategory: 'medicine' }}
    >
      <li className="font-HelveticaNeueMedium">Medicines</li>
    </Link>
    <Link
      to="/products"
      state={{ subCategory: 'device' }}
    >
      <li className="font-HelveticaNeueMedium">Devices</li>
    </Link>
    <Link
      to="/products"
      state={{ subCategory: 'essentials' }}
    >
      <li className="font-HelveticaNeueMedium">Essentials</li>
    </Link>
    <Link
      to="/products"
      state={{ subCategory: 'over the counter' }}
    >
      <li className="font-HelveticaNeueMedium">Over the Counter</li>
    </Link>
  </ul>
</div>

        <div className="flex flex-col gap-4">
          <Link to="/account" className="font-HelveticaNeueMedium">
            Account
          </Link>
          <ul className="flex flex-col text-[0.875rem] gap-1">
            <Link to="/account">
              <li className="font-HelveticaNeueMedium">Profile</li>
            </Link>
            <Link onClick={() => setIsopne(true)}>
              <li className="font-HelveticaNeueMedium">Offers</li>
            </Link>
            <Link to="/track-order">
              <li className="font-HelveticaNeueMedium">Track your Order</li>
            </Link>
            <Link
              to="/account"
              onClick={() => {
                localStorage.setItem("referral", true);
              }}
            >
              <li className="font-HelveticaNeueMedium">Referrals</li>
            </Link>
          </ul>
        </div>
        {isOpen && <CouponModal handleClose={handleClose} />}

        <div className="flex flex-col gap-4">
          <h1 className="font-HelveticaNeueMedium">More about Us</h1>
          <ul className="flex flex-col text-[0.875rem] gap-1">
            <Link to="/about">
              <li className="font-HelveticaNeueMedium">About Us</li>
            </Link>
            <Link to="/contact-us">
              <li className="font-HelveticaNeueMedium">Contact Us</li>
            </Link>
            <Link to="/blog">
              <li className="font-HelveticaNeueMedium">Blogs</li>
            </Link>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="font-HelveticaNeueMedium">Policies</h1>
          <ul className="flex flex-col text-[0.875rem] gap-1">
            <Link to="/privacypolicy">
              <li className="font-HelveticaNeueMedium">Privacy Policy</li>
            </Link>
            <Link to="/legal">
              <li className="font-HelveticaNeueMedium">Legal</li>
            </Link>
            <Link to="/shippingpolicy">
              <li className="font-HelveticaNeueMedium">Shipping Policy</li>
            </Link>
            <Link to="/returnpolicy">
              <li className="font-HelveticaNeueMedium">Return Policy</li>
            </Link>
            <Link to="/terms-and-conditions">
              <li className="font-HelveticaNeueMedium">Terms and Conditions</li>
            </Link>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="font-HelveticaNeueMedium">Connect with us</h1>
          <div className="flex gap-4">
            <Link>
              <img src={Facebook} alt="facebook icon" />
            </Link>
            <Link>
              <img src={Instagram} alt="instagram icon" />
            </Link>
          <Link to="#" onClick={handleWhatsAppClick}>
            {/* <li>Whatsapp Us : +91 8899000992</li> */}
            <WhatsApp/>
          </Link>
          </div>
        </div>
      </div>

      <h1 className="w-full text-center text-[0.75rem]">
        2024 Multimeds Healthcare OPC. All rights reserved. All medicines are
        dispensed in compliance with the Drugs and Cosmetics Act, 1940 and Drugs
        and Cosmetics Rules, 1945. We do not process requests for Schedule X and
        habit forming drugs.
      </h1>
    </div>
  );
};

export default Footer;
