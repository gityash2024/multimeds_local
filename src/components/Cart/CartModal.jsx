import React from "react";

import GoToButton from "./GoToButton";
import { Link } from "react-router-dom";
import CartProductCard from "./CartProductCard";

const CartModal = ({ items, setItems }) => {
  // const renderItems = () => {
  //   const divElements = [];
  //   for (let i = 0; i < 2; i++) {
  //     divElements.push(
  //       <CartProductCard setItems={setItems} items={items} isCartModal />
  //     );
  //   }
  //   return divElements;
  // };

  return (
    <div className="absolute right-0 z-50 flex flex-col w-[28.25rem] rounded border gap-4 bg-white border-[#E2E8F0] py-4 px-6 text-[#0F172A]">
      {/* heading */}
      <div className="flex justify-between items-center border-b border-[#A9B5FF] py-2">
        <h1 className="font-HelveticaNeueMedium">My Cart</h1>

        {/* number of items and price */}
        <div className="flex gap-1">
          <h2 className=" text-[0.875rem]">{items} Items</h2>
          {items > 0 ? (
            <>
              <h2 className=" text-[0.875rem]">|</h2>
              <h3 className=" text-[0.875rem] font-HelveticaNeueMedium">
                Total: Rs 00.00
              </h3>
            </>
          ) : null}
        </div>
      </div>

      {/* items */}
      {items === 0 ? (
        <div className="flex justify-center items-center p-1 h-[10.125rem] bg-white rounded">
          <p className="text-[0.875rem] text-[#64748B] font-HelveticaNeueMedium">
            Your cart is empty!
          </p>
        </div>
      ) : (
        <>
          {/* renderItems() */}
          <CartProductCard setItems={setItems} items={items} isCartModal />
          <CartProductCard setItems={setItems} items={items} isCartModal />
        </>
      )}

      {items > 2 ? (
        <div className="text-[0.875rem] text-[#475569] flex justify-end">
          <Link>+ {items - 2} more items</Link>
        </div>
      ) : null}

      {/* button */}
      <GoToButton title="GO TO CART" goTo="cart" />
    </div>
  );
};

export default CartModal;
