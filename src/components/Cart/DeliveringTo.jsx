import React, { useState } from "react";
import { Link } from "react-router-dom";

import HouseIcon from "../../assets/cart/houseIcon.svg";
import Warning from "../../assets/cart/warning.svg";
import PincodeModal from "../PincodeModal";

const DeliveringTo = ({ isAddressSelected, isAddressInvalid, isOrdered }) => {
  const [isAddressModal, setIsAddressModal] = useState(false);

  return (
    <div className="flex flex-col border-b border-[#CBD5E1] border-dashed px-3 py-6 gap-4 bg-white text-[#0F172A]">
      <div className="flex gap-1 items-center justify-between">
        <div className="flex items-center gap-1">
          <img src={HouseIcon} />
          <h1 className=" font-HelveticaNeueMedium">Delivering to :</h1>
        </div>

        {/* buttons */}
        {!isOrdered ? (
          <button
            onClick={() => {
              setIsAddressModal(true);
            }}
            className=" font-HelveticaNeueMedium text-[0.875rem] text-[#7487FF]"
          >
            {isAddressSelected ? "Change" : "Select an address"}
          </button>
        ) : null}

        {isAddressModal ? (
          <div className="w-screen h-screen fixed top-0 left-0 z-50 flex justify-center items-center bg-black bg-opacity-40">
            <PincodeModal
              setIsPincodeModal={setIsAddressModal}
              isLoggedIn={true}
              isDropdown={false}
            />
          </div>
        ) : null}
      </div>

      {isAddressSelected ? (
        <>
          <div className="flex flex-col bg-[#F8FAFC] px-1 py-2 gap-2">
            <div className="flex gap-1 ">
              <p className="text-[0.75rem] font-HelveticaNeueMedium">
                My House
              </p>
              <p className="text-[0.75rem] font-HelveticaNeueMedium">|</p>
              <p className="text-[0.75rem] font-HelveticaNeueMedium">
                Lajo Lakshman (9606041618)
              </p>
            </div>
            <h1 className="text-[0.75rem]">
              123, Sapphire Street, Koramangala 5th Block, 560095
            </h1>
          </div>

          {isAddressInvalid && !isOrdered ? (
            <div>
              <div className="w-full flex gap-2 bg-[#FEF2F2] text-[#DC2626] font-HelveticaNeueMedium text-[0.875rem] tracking-tight p-1 rounded">
                <img src={Warning} />
                <h1>
                  Sorry, we do not deliver here. Please select another address.
                </h1>
              </div>
            </div>
          ) : null}
        </>
      ) : (
        <h1 className="text-[0.75rem]">Bangalore</h1>
      )}
    </div>
  );
};

export default DeliveringTo;
