import React from "react";

const HealthConcernCard = ({ title, image }) => {
  return (
    <div className="relative max-h-[14.375rem]">
      <img src={image} alt={`${title} image`} className="max-w-[200px] h-[200px] object-cover rounded-md" />
      <h1 className="absolute top-0 font-HelveticaNeueMedium text-white p-2">
        {title}
      </h1>
      <div className="absolute bottom-0 right-0 p-2">
        <button
          className="bg-[#031B89]
          text-white font-HelveticaNeueMedium py-1 px-4 rounded"
        >
          Explore
        </button>
      </div>
    </div>
  );
};

export default HealthConcernCard;
