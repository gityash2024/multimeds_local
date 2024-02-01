import React from "react";

const CategoryCard = ({ title, image }) => {
  return (
    <div className="cursor-pointer">
      <img alt={`${title} image`} src={image} className="rounded-lg" />
      <h1 className="mt-3 font-HelveticaNeueMedium">{title}</h1>
    </div>
  );
};

export default CategoryCard;
