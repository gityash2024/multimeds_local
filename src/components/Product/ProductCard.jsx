import React, { useContext, useState } from "react";
import Device from "../../assets/cart/deviceImage.png";
import PrimaryHighlight from "../PrimaryHighlight";
import { Link, useNavigate } from "react-router-dom";
import Context from "../../context/AppContext";

export default function ProductCard(props){
  const {setSelectedProduct} = useContext(Context)
  const navigate = useNavigate();
  const { product, isDropdown, isPrescriptionNeeded, isCartModal } = props;
  const [isSelected, setIsSelected] = useState(false);
  const [productCount, setProductCount] = useState(0);
  console.log(product,'{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{')
  if(!product) return <></>
  return (
    <div
      onClick={() => {
        setIsSelected(!isSelected);
      }}
      className={`${
        isDropdown
          ? "border-y hover:bg-[#F8FAFC] px-2"
          : "border rounded-[0.5rem] px-6"
      } ${isSelected && isDropdown ? "bg-[#EEF2FF]" : null} ${
        isCartModal ? "py-0 px-0 border-none" : " py-4"
      } w-full flex flex-col gap-4 shadow-cart-item border-[#E2E8F0] text-[#0F172A]`}
    >
      <div className="w-full flex gap-4 justify-between">
        {/* Image name and unit */}
        <div className="cursor-pointer flex gap-2 max-w-[15.313rem]" onClick={()=>{setSelectedProduct(product); navigate(`/product/${product.id}`)}}>
        {/* openProduct={()=>{setSelectedProduct(item);navigate(`/product/${item.id}`)}} */}
        {product.productImages[0] && product.productImages[0][0] && (
    <img src={product.productImages[0][0]} alt={product.productName} className="w-14 h-14" />
)}
          <div className="flex flex-col gap-1 w-full">
            <h1 className="text-[0.875rem] font-HelveticaNeueMedium">
              {product.productName}
              {/* Sahyog Wellness Single Tube BP Monitor Machine */}
            </h1>
            <h2 className="text-[0.875rem]">{product.unitsInPack} Unit</h2>
          </div>
        </div>

        {/* Price and discount */}
        <div className="flex flex-col gap-1 min-w-[6.8rem]">
          <div className="flex items-center gap-2">
            <h1 className="text-[0.875rem] font-HelveticaNeueMedium">
              Rs {product.sp}
            </h1>
            <h2 className="text-[0.75rem] line-through text-[#94A3B8]">
              Rs {product.maxRetailPrice}
            </h2>
          </div>

          <h1 className="text-[0.75rem] font-HelveticaNeueMedium text-[#65A30D]">
            {product.discount.toFixed(2)}% OFF
          </h1>
        </div>

        {/* Drop Down */}
        <div className={!isDropdown ? "hidden" : "w-[5.5rem]"}>
          {productCount === 0 ? (
            <button
              onClick={() => {
                setProductCount(productCount + 1);
              }}
              className="w-[5.5rem] h-9 py-2 px-4 bg-[#7487FF] text-white rounded font-HelveticaNeueMedium"
            >
              ADD
            </button>
          ) : (
            <div className=" flex gap-1">
              <button
                onClick={() => {
                  setProductCount(productCount === 0 ? 0 : productCount - 1);
                }}
                className="py-1 px-2 bg-[#7487FF] rounded text-white w-[2.625rem] h-[2.25rem]"
              >
                <h1>-</h1>
              </button>

              <div className="flex justify-center items-center p-2 rounded bg-white w-4 h-[2.25rem]">
                <h1>{productCount}</h1>
              </div>

              <button
                onClick={() => {
                  setProductCount(productCount + 1);
                }}
                className="py-1 px-2 bg-[#7487FF] rounded text-white w-[2.625rem] h-[2.25rem]"
              >
                <h1>+</h1>
              </button>
            </div>
          )}
        </div>
      </div>

      {/*Not Dropdown/ is Cart modal */}
      <div
        className={
          isDropdown
            ? "hidden"
            : `flex ${isCartModal ? "justify-start" : "justify-end"} ${
                isPrescriptionNeeded ? "justify-between" : null
              } `
        }
      >
        {isPrescriptionNeeded ? <PrimaryHighlight /> : null}

        {productCount === 0 ? (
          <button
            onClick={() => {
              setProductCount(productCount + 1);
            }}
            className="w-[5.5rem] py-2 px-4 bg-[#7487FF] text-white rounded font-HelveticaNeueMedium"
          >
            ADD
          </button>
        ) : (
          <div className=" min-h-[2.1rem] flex items-center gap-1">
            <button
              onClick={() => {
                setProductCount(productCount === 0 ? 0 : productCount - 1);
              }}
              className="py-1 px-2 bg-[#7487FF] rounded text-white w-[1.625rem] h-[1.75rem]"
            >
              <h1>-</h1>
            </button>

            <div className="flex justify-center items-center p-2 rounded bg-white w-4 h-[1.75rem]">
              <h1>{productCount}</h1>
            </div>

            <button
              onClick={() => {
                setProductCount(productCount + 1);
              }}
              className="py-1 px-2 bg-[#7487FF] rounded text-white w-[1.625rem] h-[1.75rem]"
            >
              <h1>+</h1>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

