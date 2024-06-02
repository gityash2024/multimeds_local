import React from "react";
import CategoryCard from "./CategoryCard";

import home1 from "../assets/hero1.png";
import home2 from "../assets/hero2.png";
import home3 from "../assets/hero3.png";
import home4 from "../assets/hero4.png";

const Categories = () => {
  return (
    <div className="mt-2" style={{ borderRadius: '10px' }}>
      <div className="flex justify-center">
        <div className="grid md:grid-cols-4 grid-cols-2 gap-4 justify-items-center">
          <CategoryCard title="Medicines" image={home1} subCategory="medicine" />
          <CategoryCard title="Devices" image={home2} subCategory="device" />
          <CategoryCard title="Essentials" image={home3} subCategory="essentials" />
          <CategoryCard title="Over the Counter" image={home4} subCategory="over the counter" />
        </div>
      </div>
    </div>
  );
};

export default Categories;
