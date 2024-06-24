import React from "react";
import CategoryCard from "./CategoryCard";

import home1 from "../assets/categories/medicines.png";
import home2 from "../assets/categories/devices.png";
import home3 from "../assets/categories/essentials.png";
import home4 from "../assets/categories/overTheCounter.png";

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
