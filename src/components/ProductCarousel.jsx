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
import transformProductData from '../util/transformProductData';
import products from "../productData";
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxVisibleItems = 5;
  useEffect(() => {
    const transformedData = transformProductData(products);
    console.log(transformedData)
    setProductList(transformedData);
    console.log(transformedData,'========---------------------------------productb list')
    setIsFetched(true);

  }, []);

  useEffect(()=>{
  },[productList])
  // useEffect(()=>{
  //   try{
  //   console.log('data is 123');
  //   console.log(dataList);
  //   console.log(dataList.getCarouselProducts.products);
  //   setProductList(dataList.getCarouselProducts.products);
  //   setIsFetched(true);
  //   }catch(err){
  //     console.log(err);
  //   }
    
  // },[dataList])
  const res = data.filter((item, index) => {
    if (slide === 0) {
      return index < 5;
    } else {
      return index > 4;
    }
  });

  const handleRightArrow = () => {
    setCurrentIndex(prevIndex => Math.min(prevIndex + maxVisibleItems, productList.length - maxVisibleItems));
  };

  const handleLeftArrow = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - maxVisibleItems, 0));
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
      
            {productList.length && productList.slice(currentIndex, currentIndex + maxVisibleItems).map((item) => (
              <ProductCarouselCard
                key={item.id}
                title={item.productName}
                discount={item.discount ? item.discount.toString().slice(0, 4) : '0'}
                sp={item.sp}
                units={item.unitsInPack}
                maxRetailPrice={item.maxRetailPrice}
                marketer={item.marketer}
                image={item.productImages[0]}
                openProduct={() => {
                  setSelectedProduct(item);
                  navigate(`/product/${item.id}`);
                }}
              />
            ))}
          </div>

     

      {/* Navigation Arrows */}
      <div className="w-full flex gap-1">
            <button onClick={handleLeftArrow} className="cursor-pointer">
              <img src={currentIndex === 0 ? LeftArrowInactive : LeftArrowActive} alt="Left Arrow" />
            </button>
            <button onClick={handleRightArrow} className="cursor-pointer">
              <img src={currentIndex >= productList.length - maxVisibleItems ? RightArrowInactive : RightArrowActive} alt="Right Arrow" />
            </button>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};


export default ProductCarousel;
