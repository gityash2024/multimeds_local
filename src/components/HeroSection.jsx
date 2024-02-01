import React from "react";

import SearchBar from "./SearchBar";

import Order from "../assets/orderIcon.svg";
import Categories from "./Categories";

const HeroSection = () => {
  return (
    <div className="w-full flex flex-col py-14 justify-center items-center bg-white mb-4 text-[#0F172A]">
      {/* Heading and Subheading */}
      <div className="flex flex-col justify-center items-center gap-1">
        <h1 className="text-[2rem] font-HelveticaNeueBold">
          Welcome to Multimeds!
        </h1>
        <h2 className="max-w-[30rem] text-center text-[1.25rem] text-slate-700">
          Order from over 4000 Medicines, medical devices, and other pharma
          essetials
        </h2>
      </div>

      {/* Search section */}
      <div className="flex flex-col md:min-w-[40.688rem] sm:min-w-[30rem] min my-8 gap-3">
        <SearchBar
          button={true}
          isPincode={false}
          isHero
          placeholderText="Search for medicines, medical devices and other categories"
        />
        <a className="flex justify-end gap-1 items-center font-HelveticaNeueMedium cursor-pointer grow">
          <img src={Order} alt="order icon" />
          <h1>Track your order</h1>
        </a>
      </div>

      {/* Categories */}
      <Categories />
    </div>
  );
};

export default HeroSection;
