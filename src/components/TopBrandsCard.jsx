import React from "react";

const TopBrandsCard = ({ title, image }) => {
  return (
    <div className="flex flex-col justify-between h-full max-h-[12rem] w-auto">
      <div></div>
      <img
        src={image}
        alt={`${title} image`}
        className="rounded-lg cursor-pointer w-[150px] object-contain p-2"
      />
      <h1 className="mt-3 font-HelveticaNeueMedium">{title}</h1>
    </div>
  );
};

export default TopBrandsCard;
