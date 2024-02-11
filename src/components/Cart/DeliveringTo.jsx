import React, { useState } from "react";
import { Link } from "react-router-dom";

import HouseIcon from "../../assets/cart/houseIcon.svg";
import Warning from "../../assets/cart/warning.svg";
import PincodeModal from "../PincodeModal";
import { gql ,useQuery} from "@apollo/client";
const GET_MY_ADDRESSES = gql`
  query getMyAddresses {
    getMyAddresses {
      status
      message
      addresses {
        id
        houseNumber
        aptOrBuildingName
        streetOrAreaName
        city
        pincode
        state 
        label 
      }
    }
  }
`;

const DeliveringTo = () => {
  let userData = JSON.parse(localStorage.getItem('userInfo'));

 const [isAddressModal, setIsAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const { data, loading, error } = useQuery(GET_MY_ADDRESSES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setIsAddressModal(false);
  };
  return (
    <div className="flex flex-col border-b border-[#CBD5E1] border-dashed px-3 py-6 gap-4 bg-white text-[#0F172A]">
        <div className="flex gap-1 items-center justify-between">
            <div className="flex items-center gap-1">
                <img src={HouseIcon} alt="House Icon"/>
                <h1 className="font-HelveticaNeueMedium">Delivering to :</h1>
            </div>

                          <button
                    onClick={() => {
                        setIsAddressModal(true);
                    }}
                    className="font-HelveticaNeueMedium text-[0.875rem] text-[#7487FF]"
                >
                    {selectedAddress ? "Change" : "Select an address"}
                </button>
            
        </div>

        {selectedAddress ? (
            <>
                 <div
                  className={` "bg-[#F8FAFC] hover:bg-[#F1F5F9]"} flex flex-col gap-2 py-2 px-1 cursor-pointer rounded`}
                >
                  <div className="flex text-[0.75rem] font-HelveticaNeueMedium gap-1">
                    <p>{selectedAddress.label}</p>
                    <p>|</p>
                    <p>{userData.name || 'xxxx..xx'} ({userData.contactNumber})</p>
                  </div>
                  <p className="text-[0.75rem] text-left">
                    {selectedAddress?.houseNumber}, {selectedAddress?.aptOrBuildingName}, {selectedAddress?.streetOrAreaName}, {selectedAddress?.city} ({selectedAddress?.state}) {selectedAddress?.pincode}
                  </p>
                </div>

              
                    <div className="w-full flex gap-2 bg-[#FEF2F2] text-[#DC2626] font-HelveticaNeueMedium text-[0.875rem] tracking-tight p-1 rounded">
                        <img src={Warning} alt="Warning"/>
                        <h1>
                            Sorry, we do not deliver here. Please select another address.
                        </h1>
                    </div>
               
            </>
        ) : (
            <h1 className="text-[0.75rem]">Select address to proceed</h1>
        )}

        {isAddressModal && (
            <div className="w-screen h-screen fixed top-0 left-0 z-50 flex justify-center items-center bg-black bg-opacity-40">
                <PincodeModal
                    setIsPincodeModal={setIsAddressModal}
                    isLoggedIn={true}
                    isDropdown={false}
                    onAddressSelect={handleAddressSelect}
                    addresses={data.getMyAddresses.addresses}                 />
            </div>
        )}
    </div>
);

};

export default DeliveringTo;
