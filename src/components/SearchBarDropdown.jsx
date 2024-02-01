import React, { useContext, useState } from "react";
import ProductCard from "./Product/ProductCard";
import { Link, useNavigate } from "react-router-dom";
import Context from "../context/AppContext";
const SearchBarDropdown = ({ isHero,data }) => {
  const navigate = useNavigate();
  const {setSelectedProduct} = useContext(Context);
  return (
    <div
      className={`${
        isHero ? "top-12 -left-2" : "top-12 right-3"
      } absolute border gap-6 rounded p-2 w-[40.688rem] bg-white`}
    >
      <div className="flex flex-col gap-2">
        <div className="w-full flex flex-col gap-1">
          {/* <Link className="w-full py-2 px-1 rounded bg-[#F8FAFC]">
            <h1 className=" text-[0.875rem] font-HelveticaNeueLight ">
              BP Monitors
            </h1>
          </Link>

          <Link className="py-2 px-1 rounded bg-[#F8FAFC]">
            <h1 className=" text-[0.875rem] font-HelveticaNeueLight">
              BP Monitors
            </h1>
          </Link> */}
          {
            data.map((item,i)=>(
            //   <Link className="py-2 px-1 rounded bg-[#F8FAFC]" key={item.id} >
            //   <h1 className=" text-[0.875rem] font-HelveticaNeueLight">
            //     {item.productName}
            //   </h1>
            // </Link>
            <div className="py-2 px-1 rounded bg-[#F8FAFC]" key={item.id} onClick={()=>{setSelectedProduct(item); navigate(`/product/${item.id}`)}}>
              <h1 className=" text-[0.875rem] font-HelveticaNeueLight">
                {item.productName}
              </h1>
            </div>
            ))
          }

          <ProductCard isDropdown={true} isSelected={false} />
          <ProductCard isDropdown={true} isSelected={false} />
        </div>

        <div className="py-2 flex justify-center items-center">
          <Link className=" text-[0.75rem] text-[#031B89]">
            View all search results
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchBarDropdown;
