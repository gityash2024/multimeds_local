import React from "react";

import SecondaryButton from "./SecondaryButton";

const ProductCarouselCard = ({id,title, discount, image, units, price, openProduct,maxRetailPrice,sp,marketer }) => {
//  if(image?.length) console.log(image[0],'++++++++++++++ images +________________________')
  return (
    <div className="w-[14.375rem] flex gap-[0.781rem] flex-col justify-center items-stretch p-2">
      {/* Product Image */}
      <div className="flex justify-center items-center relative h-[8.438rem] w-full" >
        {image?.length && <img onClick={()=>{openProduct()}}
          src={image}
          className="h-full object-cover"
        />}
        <h1 className="absolute top-0 left-0 text-[0.625rem] font-HelveticaNeueMedium p-2 bg-[#C2F5E9]">
          {discount}% OFF
        </h1>
      </div>

      {/* Product Details */}
      <div className="flex flex-col gap-2 text-[#0F172A]" onClick={()=>{openProduct()}}>
        <div className="flex justify-between items-center">
          <h1 className="font-HelveticaNeueMedium">{title}</h1>
          <p className="text-[0.875rem] text-[#64748B]">{units} Units</p>
        </div>
        <div>
          <div className="flex justify-between items-center">
            <h1 className="font-HelveticaNeueMedium text-[#031B89]">
              Rs {sp}
            </h1>
            <p className="text-[0.75rem] text-[#94A3B8]">
              MRP: Rs <span className="line-through">{maxRetailPrice}</span>
            </p>
          </div>
          <p className="text-[0.625rem] font-HelveticaNeueItalic text-[#64748B]">
            {marketer}
          </p>
        </div>
        <button className="w-[13.313rem] font-HelveticaNeueMedium border-[1px] rounded text-[#031B89] border-[#031B89] py-2">
      ADD TO CART
    </button>
      </div>

      {/* Add to Card Button */}
      {/* <SecondaryButton /> */}
    </div>
  );
};

export default ProductCarouselCard;
