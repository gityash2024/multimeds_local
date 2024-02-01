import React from "react";

import CopyIcon from "../assets/copyIcon.svg";

const DiscountBanner = () => {
  return (
    <div className="hidden lg:flex w-full justify-center items-center py-[1rem] text-[#021156] gap-2 bg-[#C2F5E9]">
      <div className="text-center my-[0.5px] sm:text-[1.125rem] text-sm font-HelveticaNeueMedium">
        Use WELCOME30 and get 30% off on your FIRST ORDER!
      </div>
      <img
        src={CopyIcon}
        alt="copy icon"
        className="cursor-pointer w-[1.5rem] h-[1.5rem]"
      />
    </div>
  );
};

export default DiscountBanner;
