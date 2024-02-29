import React, { useState } from "react";

import CouponCardLogo from "../../assets/cart/couponCardIcon.svg";
import DropDownIcon from "../../assets/cart/dropDownIcon.svg";
import DropUpIcon from "../../assets/cart/dropUpIcon.svg";
import { useNavigate } from "react-router-dom";

const CouponCard = ({ isDisabled, isInvalid,handleClose }) => {
  const [isDropdown, setIsDropdown] = useState(false);
  const navigate=useNavigate()

  return (
    <div
      className={`${
        isDisabled && "opacity-50 bg-[#F1F5F9]"
      } flex flex-col gap-2 bg-[#FFFFFF] border-b border-[#CBD5E1] py-6 px-3 text-[#0F172A]`}
    >
      {/* Logo */}
      <img src={CouponCardLogo} alt="coupon card icon" className="w-8 h-8" />

      {/* Welcome */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <h1 className="text-[0.875rem] font-HelveticaNeueMedium">
            WELCOME30
          </h1>
          <h2 className="text-[0.74rem] text-[#475569]">
            Get 30% discount on all medicines above Rs 499*.
          </h2>
        </div>

        <div>
          <button
            // disabled={isDisabled}
            onClick={()=>{navigate('/cart');handleClose()}}
            className="text-[0.875rem] font-HelveticaNeueMedium text-[#7487FF]"
          >
            Apply
          </button>
        </div>
      </div>

      <div className="flex items-center border-b border-[#94A3B8] w-fit">
        <h1 className="text-[0.75rem] text-[#94A3B8]">Terms and Conditions</h1>
        <button
          onClick={() => {
            setIsDropdown(!isDropdown);
          }}
        >
          {isDropdown ? (
            <img src={DropUpIcon} alt="cross" className="w-4 h-4" />
          ) : (
            <img src={DropDownIcon} alt="cross" className="w-4 h-4" />
          )}
        </button>
      </div>

      {isDropdown ? (
        <ul className="flex flex-col list-disc text-[#475569] leading-[0.781rem] text-[0.625rem] font-HelveticaNeueLight">
          <li>
            Get up to 10% off (no limit) + extra 15% coupon discount (up to
            ₹320) on your first allopathy medicine order of ₹999 & above.
          </li>
          <li>
            Get up to 10% off (no limit) + extra 5% coupon discount (up to ₹300)
            on your first allopathy medicine order of ₹499 & above.
          </li>
          <li>
            The offers cannot be redeemed for cash or clubbed with any other
            offer or promotion
          </li>
          <li>
            In case of any further query pertaining to the use of vouchers or
            regarding the sale/offers, please email our customer care at
            care@1mg.com
          </li>
          <li>
            Tata 1mg reserves its absolute right at any time to add, alter,
            withdraw, modify or change or vary any or all the terms and
            conditions of the offer at its sole discretion and the same shall be
            binding on the customer at all times.
          </li>
        </ul>
      ) : null}
    </div>
  );
};

export default CouponCard;
