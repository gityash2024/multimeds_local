import React, { useState } from "react";

import CrossIcon from "../../assets/crossIcon.svg";
import TickIcon from "../../assets/cart/tickIcon.svg";
import Warning from "../../assets/cart/warning.svg";
import { Link } from "react-router-dom";

const PrescriptionUpload = ({ isUploaded, setIsUploaded, isOrdered }) => {
  return (
    <div className="flex flex-col border-b border-dashed border-[#CBD5E1] px-3 py-6 gap-4 bg-white text-[#0F172A]">
      <div className="flex gap-1 items-center justify-between">
        <div className="flex items-center gap-1">
          <img src={TickIcon} />
          <h1 className=" font-HelveticaNeueMedium">Prescription</h1>
        </div>
        <Link>
          <p className=" font-HelveticaNeueMedium text-[0.75rem] text-[#7487FF]">
            Why do we need a prescription?
          </p>
        </Link>
      </div>

      {!isUploaded ? (
        <div
          className={
            isUploaded
              ? "hidden"
              : "flex items-center justify-between bg-[#F8FAFC] px-1 py-3"
          }
        >
          <div className="flex items-center gap-1">
            <img src={TickIcon} className="w-4 h-4" />
            <h1 className="text-[0.875rem]">
              Prescription uploaded : XDAHAollalsps..... .pdf
            </h1>
          </div>

          {!isOrdered ? (
            <button onClick={() => setIsUploaded(true)}>
              <img src={CrossIcon} alt="cross icon" className="w-6 h-6" />
            </button>
          ) : null}
        </div>
      ) : (
        <div className="w-full flex gap-2 bg-[#FEF2F2] text-[#DC2626] font-HelveticaNeueMedium  text-[0.875rem] p-1 rounded">
          <img src={Warning} />
          <h1>2 items in your cart need a prescription to be purchased!</h1>
        </div>
      )}

      {!isOrdered ? (
        <button className="border border-[#031B89] rounded px-3 py-4 text-[#031B89] font-HelveticaNeueMedium">
          {isUploaded ? "UPLOAD PRESCRIPTION" : "UPLOAD ANOTHER PRESCRIPTION"}
        </button>
      ) : (
        <button className="border border-[#031B89] rounded px-3 py-4 text-[#031B89] font-HelveticaNeueMedium">
          SAVE THIS PRESCRIPTION
        </button>
      )}
    </div>
  );
};

export default PrescriptionUpload;
