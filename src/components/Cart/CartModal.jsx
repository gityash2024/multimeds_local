import React from "react";

import GoToButton from "./GoToButton";
import { Link } from "react-router-dom";
import CartProductCard from "./CartProductCard";

const CartModal = ({ cartData ,refetch}) => {
  const calculateTotal = () => {
    let amount=0
    cartData.forEach(element => {
     amount+= element.product.sp * element.quantity
    });
    return amount;

  };

  
  const totalAmount = calculateTotal();
  return (
    <div className="absolute right-0 z-50 flex flex-col w-[28.25rem] rounded border gap-4 bg-white border-[#E2E8F0] py-4 px-6 text-[#0F172A]">
      {/* heading */}
      <div className="flex justify-between items-center border-b border-[#A9B5FF] py-2">
        <h1 className="font-HelveticaNeueMedium">My Cart</h1>

        <div className="flex gap-1">
          <h2 className=" text-[0.875rem]">{cartData?.length||0} Items</h2>
          {cartData.length > 0 ? (
            <>
              <h2 className=" text-[0.875rem]">|</h2>
              <h3 className=" text-[0.875rem] font-HelveticaNeueMedium">
                Total: Rs {totalAmount}.00
              </h3>
            </>
          ) : null}
        </div>
      </div>

      {/* items */}
      {cartData.length === 0 ? (
        <div className="flex justify-center items-center p-1 h-[10.125rem] bg-white rounded">
          <p className="text-[0.875rem] text-[#64748B] font-HelveticaNeueMedium">
            Your cart is empty!
          </p>
        </div>
      ) : (
        <>
         {cartData.length > 0 && <CartProductCard  key={`${cartData[0]?.productId}-${cartData[0]?.quantity}`}   refetch={refetch} items={cartData[0]} isCartModal />}
         {cartData.length > 1 && <CartProductCard    key={`${cartData[1]?.productId}-${cartData[1]?.quantity}`}  refetch={refetch} items={cartData[1]} isCartModal />}
        </>
      )}

      {cartData.length > 2 ? (
        <div className="text-[0.875rem] text-[#475569] flex justify-end">
          <Link>+ {cartData.length - 2} more items</Link>
        </div>
      ) : null}

      {/* button */}
      <GoToButton title="GO TO CART" goTo="cart" />
    </div>
  );
};

export default CartModal;
