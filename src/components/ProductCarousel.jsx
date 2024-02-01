import React, { useContext, useRef, useState,useEffect } from "react";

import ProductCarouselCard from "./ProductCarouselCard";
import SampleProductImage from "../assets/sampleProduct.png";
import LeftArrowActive from "../assets/leftArrowActive.svg";
import RightArrowActive from "../assets/rightArrowActive.svg";
import RightArrowInactive from "../assets/rightArrowInactive.svg";
import LeftArrowInactive from "../assets/leftArrowInactive.svg";
import { Link, useNavigate } from "react-router-dom";
import data from "../data";
import Context from "../context/AppContext";
import { useQuery, gql,useMutation } from "@apollo/client";

const PRODUCT_LIST= gql`
query{
  getCarouselProducts{
    status
    message
    products{
      id
      productName
      marketer
      unitsInPack
      maxRetailPrice
      sp
      discount
      productImages
      description
      prescriptionRequired
    }
    
  }
  }`;

const ProductCarousel = ({id, title, subtitle, description, isViewProducts }) => {
  const { loading, error, data:dataList } = useQuery(PRODUCT_LIST);
  const navigate = useNavigate();
  const {setSelectedProduct} = useContext(Context)
  const [slide, setSlide] = useState(0);
  const [isFetched, setIsFetched] = useState(false);
  const [productList, setProductList] = useState([]);
  const slideData = [
    {
      id: 1,
      image: SampleProductImage,
      title: "Product 1",
    },
    {
      id: 2,
      image: SampleProductImage,
      title: "Product 2",
    },
    {
      id: 3,
      image: SampleProductImage,
      title: "Product 3",
    },
    {
      id: 4,
      image: SampleProductImage,
      title: "Product 4",
    },
    {
      id: 5,
      image: SampleProductImage,
      title: "Product 5",
    },
    {
      id: 6,
      image: SampleProductImage,
      title: "Product 6",
    },
    {
      id: 7,
      image: SampleProductImage,
      title: "Product 7",
    },
    {
      id: 8,
      image: SampleProductImage,
      title: "Product 8",
    },
    {
      id: 9,
      image: SampleProductImage,
      title: "Product 9",
    },
    {
      id: 10,
      image: SampleProductImage,
      title: "Product 10",
    },
  ];

  useEffect(()=>{
    try{
    console.log('data is 123');
    console.log(dataList);
    console.log(dataList.getCarouselProducts.products);
    setProductList(dataList.getCarouselProducts.products);
    setIsFetched(true);
    }catch(err){
      console.log(err);
    }
    
  },[dataList])
  const res = data.filter((item, index) => {
    if (slide === 0) {
      return index < 5;
    } else {
      return index > 4;
    }
  });

  const handleRightArrow = () => {
    setSlide(5);
  };

  const handleLeftArrow = () => {
    setSlide(0);
  };

  return (
    <div>
      {
        isFetched ?
        (
          <div className="flex flex-col justify-between items-center bg-white py-14 px-[6.25rem] text-[#0F172A] mb-4 gap-8 overflow-auto scroll-auto scrollbar-hide">
      {/* Heading and Sub-heading */}
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col w-[54.5rem] gap-1">
          <h1 className="text-[1.25rem] font-HelveticaNeueMedium">{title}</h1>
          <div>
            <p className="text-[#475569]">{subtitle}</p>
            <p className="text-[#475569]">{description}</p>
          </div>
        </div>
        {isViewProducts ? (
          <div>
            <Link
              to="/products"
              className=" font-HelveticaNeueMedium text-[#7487FF]"
            >
              View All Products
            </Link>
          </div>
        ) : null}
      </div>

      {/* Carousel */}
      <div className="w-full flex justify-between items-end gap-6">
        {/* <div className="max-w-[81.5rem] grid grid-flow-col gap-[2rem] overflow-auto scroll-auto my-8 scrollbar-hide"> */}

        {/* {res.map((item, idx) => {
          return (
            <ProductCarouselCard
              title={item.productName}
              // discount={item["Discount coupon code & Discount expiry"]?item["Discount coupon code & Discount expiry"]:'0'}
              discount={item["discount"]?item["discount"]:'0'}
              sp={item.sp}
              units={item.unitsInPack}
              price={item.price}
              maxRetailPrice={item.maxRetailPrice}
              image={item["Product Image"][0]}
              openProduct={()=>{setSelectedProduct(item);navigate(`/product/${item.id}`)}}
            />
          );
        })} */}
        {productList.map((item, idx) => {
          return (
            <ProductCarouselCard
              title={item.productName}
              // discount={item["Discount coupon code & Discount expiry"]?item["Discount coupon code & Discount expiry"]:'0'}
              discount={item["discount"]?item["discount"]:'0'}
              sp={item.sp}
              units={item.unitsInPack}
              // price={item.price}
              maxRetailPrice={item.maxRetailPrice}
              image={item["productImages"][0]}
              openProduct={()=>{setSelectedProduct(item);navigate(`/product/${item.id}`)}}
              // openProduct={()=>{navigate(`/product/${item.id}`)}}
            />
          );
        })}
        {/* </div> */}
      </div>

      {/* Navigation Arrows */}
      <div className="w-full flex gap-1">
        <button onClick={handleLeftArrow} className="cursor-pointer">
          <img src={slide === 0 ? LeftArrowInactive : LeftArrowActive} />
        </button>
        <button onClick={handleRightArrow} className="cursor-pointer">
          <img src={slide === 5 ? RightArrowInactive : RightArrowActive} />
        </button>
      </div>
    </div>
        )
        :(
          <div>Loading</div>
        )
      }
    </div>
  );
};

export default ProductCarousel;
