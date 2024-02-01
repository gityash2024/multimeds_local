import React, { useState } from "react";

import Device from "../../assets/cart/deviceImage.png";

import PrimaryHighlight from "../PrimaryHighlight";

const CartProductCard = ({
  isDropdown,
  isPrescriptionNeeded,
  isCartModal,
  setItems,
  items,
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [productCount, setProductCount] = useState(2);

  const handleClick = () => {
    if (productCount === 1) {
      setProductCount(productCount - 1);
      setIsHidden(true);
      setItems(items - 1);
    }
    if (productCount > 1) {
      setProductCount(productCount - 1);
    }
  };

  return (
    <div
      onClick={() => {
        setIsSelected(!isSelected);
      }}
      className={isHidden ? "hidden" : "pb-6 border-b border-[#E2E8F0]"}
    >
      <div
        className={`
      ${
        isDropdown
          ? "border-y hover:bg-[#F8FAFC] px-2"
          : "border rounded-[0.5rem] px-6"
      } ${isSelected && isDropdown ? "bg-[#EEF2FF]" : null} ${
          isCartModal ? "py-0 px-0 border-none" : " py-4"
        } w-full flex flex-col gap-4 shadow-cart-item border-[#E2E8F0] text-[#0F172A]`}
      >
        <div className="w-full flex gap-4 justify-between">
          {/* Image name and unit */}
          <div className="flex gap-2 max-w-[15.313rem]">
            <img src={Device} alt="image" className="w-14 h-14" />
            <div className="flex flex-col gap-1 w-full">
              <h1 className="text-[0.875rem] font-HelveticaNeueMedium">
                Sahyog Wellness Single Tube BP Monitor Machine
              </h1>
              <h2 className="text-[0.875rem]">1 Unit</h2>
            </div>
          </div>

          {/* Price and discount */}
          <div className="flex flex-col gap-1 min-w-[6.8rem]">
            <div className="flex items-center gap-2">
              <h1 className="text-[0.875rem] font-HelveticaNeueMedium">
                Rs 1243
              </h1>
              <h2 className="text-[0.75rem] line-through text-[#94A3B8]">
                Rs 1432
              </h2>
            </div>

            <h1 className="text-[0.75rem] font-HelveticaNeueMedium text-[#65A30D]">
              30% OFF
            </h1>
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

          <div className=" min-h-[2.1rem] flex items-center gap-1">
            <button
              onClick={handleClick}
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
                //   // increaseProductCount(id);
              }}
              className="py-1 px-2 bg-[#7487FF] rounded text-white w-[1.625rem] h-[1.75rem]"
            >
              <h1>+</h1>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
