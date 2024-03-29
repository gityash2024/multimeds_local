import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Order from "../assets/orderIcon.svg";
import Categories from "./Categories";
import { gql, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import ConfettiExplosion from 'react-confetti-explosion';
import { GET_ALL_PRODUCTS } from "../context/mutation";

const GET_BANNER = gql`
  query GetBanner {
    getBanners {
      status
      message
      banners {
        id
        url
        index
      }
    }
  }
`;

const HeroSection = () => {
  const [confetti, setConfetti] = useState(false);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const { error: productsError, data: productsData } = useQuery(GET_ALL_PRODUCTS);
  const { data: bannerData } = useQuery(GET_BANNER);
  const banners = bannerData?.getBanners?.banners || [];

  useEffect(() => {
    if(localStorage.getItem('isLoggedInNow')){
      setConfetti(true);
      localStorage.removeItem('isLoggedInNow');
    }
  }, [localStorage.getItem('isLoggedInNow')]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex(prevIndex => (prevIndex + 1) % banners.length);
    }, 4000); // Change image every 1 second

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [banners.length]);

  const navigate = useNavigate();
  const bannerUrl = banners[currentBannerIndex]?.url || '';

  return (
    <div 
    className="w-full flex flex-col py-14 justify-center items-center  text-[#0F172A] relative "
    style={{ 
      backgroundImage: `url(${bannerUrl})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center'
    }}
    >
      {/* Display confetti if applicable */}
      {confetti && <ConfettiExplosion />}

      {/* Content goes here */}
      <div className="flex flex-col justify-center items-center gap-1 bg-white/75 backdrop-blur-sm p-4 z-10" style={{borderRadius: '10px'}}>
        <h1 className="text-[2rem] font-HelveticaNeueBold">
          Welcome to Multimeds!
        </h1>
        <h2 className="max-w-[30rem] text-center text-[1.25rem] text-slate-700">
          Order from over {productsData?.getAllProducts?.products?.length || 0} products including Medicines, medical devices, and other pharma essentials
        </h2>
      </div>

      <div className="flex flex-col md:min-w-[40.688rem] sm:min-w-[30rem] min my-8 gap-3 bg-white/75 backdrop-blur-sm p-4 z-10" style={{borderRadius: '10px'}}>
        <SearchBar
          button={true}
          isPincode={false}
          isHero
          placeholderText="Search for medicines, medical devices and other categories"
        />
        <div className="flex justify-end gap-1 items-center font-HelveticaNeueMedium cursor-pointer grow">
          <img src={Order} alt="order icon" />
          <h1 onClick={() => navigate('/track-order')}>Track your order</h1>
        </div>
      </div>

      <Categories />
    </div>
  );
};

export default HeroSection;
