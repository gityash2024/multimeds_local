import React, { useState } from "react";
import CouponCardNew from "./couponCardsNew";

const CouponsModal = ({ coupons, applyCoupon, closeModal }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-4 rounded">
        <h1 className="text-xl font-bold mb-4">Select a Coupon</h1>
        {coupons.map((coupon, index) => (
          <CouponCardNew key={index} coupon={coupon} applyCoupon={applyCoupon} />
        ))}
        <button onClick={closeModal} className="mt-4 p-2 bg-gray-300 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default CouponsModal;
