import React from "react";

import GoToIcon from "../../assets/cart/goToIcon.svg";
import { Link } from "react-router-dom";

const GoToButton = ({ title, goTo }) => {
  return (
    <Link
      to={`/${goTo}`}
      className="flex justify-center gap-1 items-center w-full bg-[#031B89] text-white py-3 px-4 rounded font-HelveticaNeueMedium"
    >
      <h1>{title}</h1>
      <img src={GoToIcon} alt="go to icon" className="w-6 h-6" />
    </Link>
  );
};

export default GoToButton;
