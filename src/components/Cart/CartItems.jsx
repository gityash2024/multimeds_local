import React, { useState } from "react";

import CartItemCard from "./CartItemCard";
import Coupons from "./Coupons";
import PrescriptionUpload from "./PrescriptionUpload";
import Bill from "./Bill";
import DeliveringTo from "./DeliveringTo";
import Warning from "../../assets/cart/warning.svg";
import { Link } from "react-router-dom";

const CartItems = ({
  isPrescriptionApproved,
  setProducts,
  setNeedingProducts,
  products,
  needingProducts,
}) => {
  const [isUploaded, setIsUploaded] = useState(false);

  const renderProducts = () => {
    const divElements = [];
    for (let i = 0; i < products; i++) {
      divElements.push(
        <CartItemCard setProducts={setProducts} products={products} />
      );
    }
    return divElements;
  };

  const renderNeedingProducts = () => {
    const divElements = [];
    for (let i = 0; i < needingProducts; i++) {
      divElements.push(
        <CartItemCard
          prescriptionRequired
          products={needingProducts}
          setProducts={setNeedingProducts}
        />
      );
    }
    return divElements;
  };

  return (
    <div className="flex justify-center py-12 px-[6.25rem] gap-[1.25rem]">
      {/* Items */}
      <div className="flex flex-col w-[49.375rem] gap-4">
        {!isPrescriptionApproved ? (
          <div className="w-full flex gap-2 bg-[#FEF2F2] text-[#DC2626] font-HelveticaNeueMedium  text-[0.875rem] p-1 rounded">
            <img src={Warning} />
            <h1>
              Your prescription was not approved. Please re-upload your
              prescription.
            </h1>
          </div>
        ) : null}

        {/* items needing prescription */}
        {needingProducts > 0 ? (
          <div className="flex flex-col pb-8 gap-4 border-b border-[#E2E8F0]">
            <h1 className="text-[0.75rem] font-HelveticaNeueMedium capitalize text-[#475569]">
              ITEMS NEEDING PRESCRIPTION
            </h1>

            <div className="flex flex-col gap-2">
              {renderNeedingProducts()}
              {/* <CartItemCard isPrescription />
            <CartItemCard isPrescription /> */}
            </div>
          </div>
        ) : null}

        {/* products */}
        {products > 0 ? (
          <div className="flex flex-col pb-8 gap-4 border-b border-[#E2E8F0]">
            <h1 className="text-[0.75rem] font-HelveticaNeueMedium capitalize text-[#475569]">
              PRODUCTS
            </h1>

            <div className="flex flex-col gap-2">
              {renderProducts()}
              {/* <CartItemCard />
            <CartItemCard />
            <CartItemCard /> */}
            </div>
          </div>
        ) : null}

        <button className="w-fit text-[#7487FF] text-[0.875rem]  font-HelveticaNeueMedium">
          + Add more Items
        </button>
      </div>

      {/* Prescription */}
      <div className="w-[26.875rem] pt-8 rounded">
        <Coupons />

        <PrescriptionUpload isUploaded={false} />

        <Bill />

        <DeliveringTo isAddressSelected isAddressInvalid={true} />

        <div className="p-4 flex flex-col gap-2">
          <Link
            to="analyzing"
            className={`${
              isUploaded ? "bg-[#031B89]" : "bg-[#A5B4FC]"
            } w-full font-HelveticaNeueMedium rounded text-[white] text-center p-4 leading-[1.25rem]`}
          >
            PROCEED
          </Link>
          {!isUploaded ? (
            <div className="w-full flex gap-1 bg-[#FEF2F2] text-[#DC2626] font-HelveticaNeueMedium  text-[0.875rem] p-1 rounded">
              <img src={Warning} />
              <h1>You cannot proceed without uploading a prescription.</h1>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CartItems;
