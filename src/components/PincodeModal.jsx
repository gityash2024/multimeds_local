import React, { useEffect, useRef, useState } from "react";
import AddressCard from "./AddressCard";
import PincodesModal from "./PincodesModal";

import Cross from "../assets/crossIcon.svg";

const PincodeModal = ({
  isSelected,
  setIsSelected,
  isLoggedIn,
  setIsPincodeModal,
  isDropdown,
}) => {
  const [pincodesModal, setPincodesModal] = useState(false);

  let pincodeModalRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!pincodeModalRef.current.contains(e.target)) {
        setIsPincodeModal(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const AddressData = [
    { id: 1, code: 560095 },
    { id: 2, code: 560096 },
  ];

  return (
    <div
      ref={pincodeModalRef}
      className={`${
        !isDropdown ? "w-[31.25rem] p-4" : "w-[16.625rem] p-2"
      } absolute z-50 flex flex-col gap-3 border border-[#E2E8F0]  top-[60px]  bg-white rounded`}
    >
      {!isDropdown ? (
        <div className="flex justify-between items-center py-2">
          <h1 className="text-[0.875rem] font-HelveticaNeueMedium">
            Select Pincode or Address
          </h1>
          <button
            onClick={() => {
              setIsPincodeModal(false);
            }}
          >
            <img src={Cross} alt="cross Icon" className="w-6 h-6" />
          </button>
        </div>
      ) : null}

      <input
        onFocus={() => {
          setPincodesModal(true);
        }}
        onBlur={() => {
          setPincodesModal(false);
        }}
        placeholder="Enter your pincode here"
        className="bg-[#F8FAFC] border border-[#E2E8F0] py-1 px-1.5 placeholder:text-[0.75rem] rounded placeholder:text-[#94A3B8] focus:outline-none"
      />

      {isLoggedIn ? (
        <div className="relative flex flex-col gap-2">
          {isDropdown ? (
            <div className="flex justify-between text-[0.75rem]">
              <h1>Select an Address :</h1>
              <button className="text-[#031B89]">+ Add New</button>
            </div>
          ) : null}

          <div className="flex flex-col gap-1">
            {AddressData.map((item, idx) => {
              return (
                <AddressCard
                  key={idx}
                  item={item}
                  isSelected={isSelected}
                  setIsSelected={setIsSelected}
                />
              );
            })}
          </div>

          {!isDropdown ? (
            <button className="text-[0.75rem] font-HelveticaNeueMedium text-[#7487FF]">
              Edit or Add new
            </button>
          ) : null}

          {/* pincodes */}
          {pincodesModal ? (
            <PincodesModal
              isSelected={isSelected}
              setIsSelected={setIsSelected}
              isDropdown={isDropdown}
            />
          ) : null}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <h1 className="text-[0.75rem]">Select an Address :</h1>
          <h1 className="text-[0.75rem] font-HelveticaNeueMedium">
            <button className="text-[#031B89]">Log in</button> or{" "}
            <button className="text-[#031B89]">Sign up</button> to select an
            address
          </h1>
        </div>
      )}
    </div>
  );
};

export default PincodeModal;
