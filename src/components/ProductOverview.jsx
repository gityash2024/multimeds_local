import React, { useContext, useState } from "react";

import Overview from "./Overview";
import ProductSubstitutes from "./ProductSubstitutes";
import Context from "../context/AppContext";

const ProductOverview = () => {
  const {selectedProduct} = useContext(Context);
  const [isActive, setIsActive] = useState(1);

  const productInfoData = [];

  if (selectedProduct.bulletPoint1) {
    productInfoData.push({
      id: 1,
      Heading: "PRODUCT INTRODUCTION",
      content: selectedProduct.bulletPoint1.split("\n"),
    });
  }
  
  if (selectedProduct.bulletPoint2) {
    productInfoData.push({
      id: 2,
      Heading: "PRODUCT INTRODUCTION",
      content: selectedProduct.bulletPoint2.split("\n"),
    });
  }
  
  if (selectedProduct.bulletPoint3) {
    productInfoData.push({
      id: 3,
      Heading: "PRODUCT INTRODUCTION",
      content: selectedProduct.bulletPoint3.split("\n"),
    });
  }
  
  if (selectedProduct.bulletPoint4) {
    productInfoData.push({
      id: 4,
      Heading: "PRODUCT INTRODUCTION",
      content: selectedProduct.bulletPoint4.split("\n"),
    });
  }
  
  if (selectedProduct.bulletPoint5) {
    productInfoData.push({
      id: 5,
      Heading: "PRODUCT INTRODUCTION",
      content: selectedProduct.bulletPoint5.split("\n"),
    });
  }
  

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
