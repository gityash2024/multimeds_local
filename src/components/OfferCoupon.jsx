import React from "react";

import Coupon from "../assets/product/couponIcon.svg";

const OfferCoupon = () => {
  return (
    <div className="flex items-center w-full gap-2 bg-[#F7FEE7] text-[#65A30D] font-HelveticaNeueMedium  text-[0.875rem] p-2 rounded">
      <img src={Coupon} className="w-[1.5rem] h-[1.5rem]" />
      <h1>Get 30% OFF Using Code WELCOME30</h1>
    </div>
  );
};

export default OfferCoupon;
