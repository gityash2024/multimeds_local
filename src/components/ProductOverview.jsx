import React, { useContext, useState } from "react";

import Overview from "./Overview";
import ProductSubstitutes from "./ProductSubstitutes";
import Context from "../context/AppContext";

const ProductOverview = () => {
  const {selectedProduct} = useContext(Context);
  const [isActive, setIsActive] = useState(1);

  const productInfoData = [
    {
      id: 1,
      Heading: "PRODUCT INTRODUCTION",
      content: selectedProduct["description"].split("\n"),
    }
  ];

  const res = productInfoData.filter((item) => item.id === isActive);

  return (
    <div className="flex py-12 px-[6.25rem] justify-center gap-2 mb-4">
      <Overview
        isActive={isActive}
        setIsActive={setIsActive}
        productInfoData={productInfoData}
      />

      {/* Product Introduction */}
      {res.map((item, idx) => {
        return (
          <div className="flex flex-col w-[41.188rem] bg-white p-6 gap-2 rounded">
            <h1 className="font-HelveticaNeueMedium">{item.Heading}</h1>
            {item.content.map(i => <p className="text-justify text-[0.875rem]">{i}<br/><br/></p>)}
          </div>
        );
      })}

      <ProductSubstitutes />
    </div>
  );
};

export default ProductOverview;
