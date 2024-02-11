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
query {
  getAllProducts {
    status
    message
    products {
      id
  productName
  productImages
  manufacturer
  composition
  price
  prescriptionRequired
  type
  tags
  concerns
  sku
  manufacturerAddress
  marketer
  marketerAddress
  description
  directionToUse
  safetyInformation
  ingredients
  productForm
  consumeType
  unitsInPack
  boxContent
  size
  scentOrFlavour
  stockQuantity
  packForm
  productWeightInGrams
  lengthInCentimeters
  widthInCentimeters
  heightInCentimeters
  hsn
  gstPercentage
  maxRetailPrice
  sp
  discount
    }
  }
}`;
// const ADD_TO_CART= gql`mutation{addToCart(input:{productId:"3a92f6bd-c09a-42d5-aae8-dde29f2b5230",quantity:1}){status,message}}`;

const ADD_TO_CART = gql`
  mutation addToCart(
    $productId: ID!
    $quantity: Int!
  
      ) {
        addToCart(
      input: {
        productId: $productId
        quantity: $quantity
      }
    ) {
      status
      message
    }
  }
`;

const ProductCarousel = ({id, title, subtitle, description, isViewProducts }) => {
  const [productId,setProductId]=useState("")
  const [quantity,setProductQuantity]=useState(1)
  const { loading, error, data:dataList } = useQuery(PRODUCT_LIST,{
    onCompleted: (data) => {
      // setLoading(false);
      // console.log(data?.getAllProducts?.products,'++++++++++++=====+++====+++===+++====++====++=')
      // console.log(transformedData)
      setProductList(data?.getAllProducts?.products);
      // console.log(transformedData,'========---------------------------------productb list')
      setIsFetched(true);
    },
    onError: (err) => {
      // setLoading(false)
    }
  });

  const [addToCart, { loading: addToCartLoading }] = useMutation(
    ADD_TO_CART,
    {
      variables: {
     
        productId: productId,
        quantity: quantity,
     
      },
      onCompleted: (data) => {
        if (data.addToCart.status === "SUCCESS") {
          // setProductId("")
        } else {
          // setLoading(false);

          // toast.error("Error : Add Address ");
        }
      },
      onError: (err) => {
        // setLoading(false);

        // toast.error("Error : " + err?.message);

        // setBtnDisable(false)
        // setLoading(false)
      },
    }
  );
    const navigate = useNavigate();
  const {setSelectedProduct} = useContext(Context)
  const [slide, setSlide] = useState(0);
  const [isFetched, setIsFetched] = useState(false);
  const [productList, setProductList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxVisibleItems = 5;


 
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

  const addToCartFunc=(item)=>{
    setProductId(item.id);
    setSelectedProduct(item);
    // addToCart()
    navigate(`/product/${item.id}`);
  }

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
                id={item.id}
                title={item.productName}
                discount={item.discount ? item.discount.toString().slice(0, 4) : '0'}
                sp={item.sp}
                units={item.unitsInPack}
                maxRetailPrice={item.maxRetailPrice}
                marketer={item.marketer}
                image={item.productImages[0]}
                openProduct={() => {
                  
                 addToCartFunc(item)
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
