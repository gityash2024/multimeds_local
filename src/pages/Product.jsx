import React, { useContext, useEffect } from "react";

import Navbar from "../components/Navbar";
import ProductCarousel from "../components/ProductCarousel";
import WhyChooseUs from "../components/WhyChooseUs";
import Footer from "../components/Footer";
import ProductSection from "../components/ProductSection";
import ProductOverview from "../components/ProductOverview";
import CompareProducts from "../components/CompareProducts";
import Context from "../context/AppContext";

const Product = () => {
  const {selectedProduct} = useContext(Context);
  useEffect(()=>{
    window.scrollTo(0, 0);
  },[selectedProduct])
  return (
    <div>
      <ProductSection  />
      <ProductOverview />
      <CompareProducts />
      <ProductCarousel title="View Similar Products" isViewProducts={false} />
      <WhyChooseUs columns={5} />
      {/* <Footer /> */}
    </div>
  );
};

export default Product;
