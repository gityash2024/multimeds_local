import React, { useState } from "react";
import MyProfile from "./MyProfile";
import MyPrescriptions from "./MyPrescriptions";
import MyAddresses from "./MyAddresses";
import AccountNav from "./AccountNav";
import Orders from "./Orders";

const MyAccount = () => {
  const [element, setElement] = useState("account");
  const [subElement, setSubElement] = useState("profile");

  return (
    <div className="flex items-center justify-center py-12 px-[6.25rem]">
      <div className="w-full flex flex-col gap-[1.25rem]">
        <h1 className="text-[2rem] font-HelveticaNeueBold">Account</h1>

        <div className="flex justify-center gap-6">
          {/* Options section*/}
          <AccountNav setElement={setElement} setSubElement={setSubElement} />

          {/* Main section*/}
          <div className="w-full flex flex-col rounded p-12 gap-12 bg-white">
            {element === "account" && (
              <>
                { subElement==='profile'&& <MyProfile />}
                {subElement==='prescriptions'&& <MyPrescriptions />}
                {subElement==='addresses'&& <MyAddresses />}
              </>
            )}

            {element === "orders" && (
              <>
                <Orders />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
