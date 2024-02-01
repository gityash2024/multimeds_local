import React from "react";
import CategoryCard from "./CategoryCard";

import MedicinesImage from "../assets/categories/medicines.png";
import DevicesImage from "../assets/categories/devices.png";
import essentialsImage from "../assets/categories/essentials.png";
import overTheCounterImage from "../assets/categories/overTheCounter.png";

const Categories = () => {
  return (
    <div className="grid md:grid-cols-4 grid-cols-2 justify-center gap-[4.5rem]">
      <CategoryCard title="Medicines" image={MedicinesImage} />
      <CategoryCard title="Devices" image={DevicesImage} />
      <CategoryCard title="Essentials" image={essentialsImage} />
      <CategoryCard title="Over the Counter" image={overTheCounterImage} />
    </div>
  );
};

export default Categories;
