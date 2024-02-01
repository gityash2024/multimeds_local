import React, { useState } from "react";

import PrimaryHighlight from "../PrimaryHighlight";

import DeviceImage from "../../assets/cart/deviceImage.png";
import Delete from "../../assets/cart/deleteIcon.svg";

const CartItemCard = ({
  isPrescription,
  setProducts,
  products,
  needingProducts,
  setNeedingProducts,
}) => {
  const [productCount, setProductCount] = useState(0);
  const [isHidden, setIsHidden] = useState(false);

  return (
    <div
      className={
        isHidden
          ? "hidden"
          : "flex flex-col rounded-2 gap-4 border border-[#E2E8F0] bg-white py-4 px-6 shadow-cartItem"
      }
    >
      {isPrescription ? <PrimaryHighlight /> : null}

      {/* Product */}
      <div className="flex justify-between">
        <div className="flex justify-between items-center gap-2">
          <img
            src={DeviceImage}
            className="rounded h-[3.625rem] w-[3.625rem] object-cover"
          />

          <div className="flex flex-col gap-1">
            <h1 className="w-[14rem] text-[0.875rem] font-HelveticaNeueMedium">
              Dolonext DT
            </h1>
            <h2 className="text-[0.875rem] text-[#475569]">
              1 strip : 15 capsules
            </h2>
            <h2 className="text-[0.75rem] font-HelveticaNeueItalic text-[#DC2626]">
              only 3 left in stock
            </h2>
          </div>
        </div>

        {/* Manufacturer and composition */}
        <div className="flex gap-4">
          {/* Manufacturer */}
          <div className="w-[7.188rem]">
            <h1 className="text-[0.75rem] font-HelveticaNeueItalic text-[#64748B]">
              Manufacturer
            </h1>
            <div>
              <div className="w-fit border-b border-[#0F172A]">
                <h2 className="text-[0.875rem] font-HelveticaNeueMedium text-[#0F172A]">
                  Pfizer Ltd
                </h2>
              </div>
            </div>
          </div>
          {/* Composition*/}
          <div className="w-[7.188rem]">
            <h1 className="text-[0.75rem] font-HelveticaNeueItalic text-[#64748B]">
              Composition
            </h1>
            <div>
              <div className="w-fit border-b border-[#0F172A]">
                <h2 className="text-[0.875rem] font-HelveticaNeueMedium text-[#0F172A]">
                  Piroxicam (20mg)
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* buttons */}
        {productCount === 0 ? (
          <button
            onClick={() => {
              setProductCount(productCount + 1);
            }}
            className="h-[1.75rem] w-[5.5rem] py-2 px-4 bg-[#7487FF] text-white rounded font-HelveticaNeueMedium"
          >
            ADD
          </button>
        ) : (
          <div className=" justify-center w-[5.5rem] h-[1.75rem] flex items-center gap-1">
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
        {/* <div className=" flex gap-1">
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
        </div> */}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <div className="flex gap-1 items-center">
            <p className="text-[0.75rem] text-[#94A3B8]">
              Rs <span className="line-through">1432</span>
            </p>
            <h2 className="font-HelveticaNeueMedium text-[#031B89] text-[0.875rem]">
              Rs 1234
            </h2>
            <h3 className="text-[0.625rem] font-HelveticaNeueMedium p-1 bg-[#C2F5E9] rounded-[0.125rem]">
              30% OFF
            </h3>
          </div>

          <button
            onClick={() => {
              setProducts(products - 1);
            }}
          >
            <img src={Delete} className="h-6 w-6" />
          </button>
        </div>

        <h1 className="text-[#475569] text-[0.75rem]">
          ETA Delivery to 560023 : today, 3pm
        </h1>
      </div>
    </div>
  );
};

export default CartItemCard;
