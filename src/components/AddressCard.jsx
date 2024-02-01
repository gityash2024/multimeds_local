import React from "react";

const AddressCard = ({ isSelected, setIsSelected, item }) => {
  return (
    <div
      onClick={() => {
        setIsSelected(item.id);
      }}
      className={`${
        isSelected === item.id
          ? "bg-[#E0E7FF]"
          : "bg-[#F8FAFC] hover:bg-[#F1F5F9]"
      }  flex flex-col gap-2 py-2 px-1  cursor-pointer rounded`}
    >
      <div className="flex text-[0.75rem] font-HelveticaNeueMedium gap-1">
        <p>My House</p>
        <p>|</p>
        <p>Lajo Lakshman (9606041618)</p>
      </div>
      <p className="text-[0.75rem] text-left">
        123, Sapphire Street, Koramangala 5th Block, 560095
      </p>
    </div>
  );
};

export default AddressCard;
