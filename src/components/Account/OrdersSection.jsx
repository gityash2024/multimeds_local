import React from "react";
import { Link } from "react-router-dom";

import OpenIcon from "../../assets/account/openIccon.svg";
import ProductImage from "../../assets/cart/deviceImage.png";
import CheckIcon from "../../assets/product/tickIcon.svg";

const OrdersSection = () => {
  const ordersData = [
    {
      id: 1,
      name: "1 strip : 15 capsules x 1",
      image: ProductImage,
    },
    {
      id: 2,
      name: "1 strip : 15 capsules x 1",
      image: ProductImage,
    },
    {
      id: 3,
      name: "1 strip : 15 capsules x 1",
      image: ProductImage,
    },
    {
      id: 4,
      name: "1 strip : 15 capsules x 1",
      image: ProductImage,
    },
    {
      id: 5,
      name: "1 strip : 15 capsules x 1",
      image: ProductImage,
    },
    {
      id: 6,
      name: "1 strip : 15 capsules x 1",
      image: ProductImage,
    },
    {
      id: 7,
      name: "1 strip : 15 capsules x 1",
      image: ProductImage,
    },
    {
      id: 8,
      name: "1 strip : 15 capsules x 1",
      image: ProductImage,
    },
  ];

  return (
    <div className="flex flex-col gap-4 rounded-lg bg-white border border-[#E2E8F0] pb-4 shadow-order-section text-[#0F172A]">
      {/* header */}
      <div className="flex border-b border-[#CBD5E1] justify-between py-4 px-6">
        {/* id and details button */}
        <div className="w-full items-center flex gap-4">
          <h1 className="font-medium">12399102XDJJ</h1>

          <Link
            to="orders/order-details"
            className="w-full flex gap-1 items-center"
          >
            <h2 className="text-[#7487FF] text-[0.75rem] font-medium">
              View order details
            </h2>
            <img src={OpenIcon} alt="open icon" className="h-4 w-4" />
          </Link>
        </div>

        {/* date and items */}
        <div className="min-w-[13rem] flex gap-6">
          <div className="min-w-[5rem] flex flex-col">
            <h1 className="text-[#64748B] text-[0.625rem] font-HelveticaNeueItalic">
              Date of order
            </h1>
            <h2 className="text-[0.75rem] font-HelveticaNeueMedium">
              11th September 2023
            </h2>
          </div>

          <div className="flex flex-col">
            <h1 className=" text-[#64748B] text-[0.625rem] font-HelveticaNeueItalic">
              Total No items
            </h1>
            <h2 className="text-[0.75rem] font-HelveticaNeueMedium">10</h2>
          </div>
        </div>
      </div>

      {/* items */}
      <div className="flex items-center">
        <div className="grid grid-cols-3 grid-rows-3 gap-x-6 gap-y-2 px-6">
          {ordersData.map((item, idx) => {
            return (
              <div className="w-[12rem] flex gap-2 items-center">
                <img
                  src={item.image}
                  alt="product image"
                  className="w-1.813rem] h-[1.813rem]"
                />

                <h1 className="text-[0.875rem] text-[#475569]">{item.name}</h1>
              </div>
            );
          })}
        </div>
        <h1 className="text-[0.875rem] text-[#64748B]">+ 2 more items</h1>
      </div>

      {/* prescription */}
      <div className="rounded py-2 px-6 bg-[#F8FAFC] flex gap-1">
        <img src={CheckIcon} alt="check" className="w-4 h-4" />

        <h1 className="text-[0.875rem] text-[#1E293B]">
          Prescription approved : XDAHAollalsps..... .pdf
        </h1>
      </div>

      {/* total */}
      <div className="px-6 flex justify-between">
        <div className="flex gap-6 items-center">
          <h1 className="text-[0.875rem]  font-HelveticaNeueMedium text-[#1E293B]">
            Order total : Rs 1243
          </h1>

          <h1 className="text-[0.875rem] font-HelveticaNeueMedium text-[#1E293B]">
            Delivering to : <span className="text-[#7487FF]">Home</span>
          </h1>
        </div>

        <Link to="orders/order-details">
          <button className="w-[15.313rem] rounded py-3 px-4 text-white bg-[#031B89] font-HelveticaNeueMedium">
            Complete Purchase
          </button>
        </Link>
      </div>
    </div>
  );
};

export default OrdersSection;
