import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import Dropdown from "../assets/dropdownArrow.svg";
import DropdownUp from "../assets/dropdownUpArrow.svg";
import Search from "../assets/searchIcon.svg";
import PincodeModal from "./PincodeModal";
import SearchBarDropdown from "./SearchBarDropdown";
import { gql,useQuery,useLazyQuery } from "@apollo/client";
const PRODUCT_LIST= gql`
query {
  getAllProducts {
    status
    message
    products {
      id
  productName
  productImages
  manufacturer
  composition
  price
  prescriptionRequired
  type
  tags
  concerns
  sku
  manufacturerAddress
  marketer
  marketerAddress
  description
  directionToUse
  safetyInformation
  ingredients
  productForm
  consumeType
  unitsInPack
  boxContent
  size
  scentOrFlavour
  stockQuantity
  packForm
  productWeightInGrams
  lengthInCentimeters
  widthInCentimeters
  heightInCentimeters
  hsn
  gstPercentage
  maxRetailPrice
  sp
  discount
    }
  }
}`;

const SearchBar = ({
  isPincode,
  button,
  isHero,
  placeholderText,
  isFilter,
}) => {
  const [input, setInput] = useState("");
  const [isPincodeModal, setIsPincodeModal] = useState(false);
  const [isSearchDropdown, setIsSearchDropdown] = useState(true);
  const [isInFocus, setIsInFocus] = useState(false);
  const [isSelected, setIsSelected] = useState(-1);
  const [productList, setProductList] = useState([]);
  const { loading, error, data:dataList } = useQuery(PRODUCT_LIST);
//  console.log(dataList,'{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{')

  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    const filtered = input ? dataList?.getAllProducts?.products.filter(product => {
      const inputLower = input.toLowerCase().trim().replace(/\s+/g, ' ');

      const manufacturerMatch = product.manufacturer && product.manufacturer.toLowerCase().includes(inputLower);
      const productName = product.productName && product.productName.toLowerCase().includes(inputLower);

      return  manufacturerMatch || productName;
    }) : [];

    setFilteredProducts(filtered);
  }, [input]);



  const AddressData = [
    { id: 1, code: 560095 },
    { id: 2, code: 560096 },
  ];

  const res = AddressData.filter((items, idx) => items.id === isSelected);

  let searchDropdownRef = useRef();


  const onSearchTextChange=(e)=>{
    e.preventDefault();
    const userInput = e.target.value;
    setInput(userInput);

  }
  
  return (
    <div
      className={`${
        isHero ? "flex" : "w-full lg:flex hidden"
      } items-center py-0.5 px-2 md:max-w-[40.688rem] lg:mx-0 grow h-[2.75rem] border border-slate-300 rounded`}
    >
      {isPincode ? (
        <button
          onClick={() => {
            setIsPincodeModal(true);
          }}
          className="flex justify-between items-center p-2 gap-1"
        >
          <div>
            {isSelected === -1 ? (
              <h1 className="font-InterMedium w-[7.2rem]">
                {isSelected === -1 ? "Select Pincode" : "ok"}
              </h1>
            ) : (
              res.map((item, idx) => {
                return (
                  <h1 className="font-InterMedium w-[7.2rem]">
                    {isSelected === -1 ? "Select Pincode" : item.code}
                  </h1>
                );
              })
            )}
          </div>
          <img
            src={isPincodeModal ? DropdownUp : Dropdown}
            alt="drop down arrow icon"
            className="h-[1.5rem] w-[1.5rem]"
          />
          <div className="h-[1.438rem] border-l border-slate-400" />

          {/* Dropdown box */}
          {isPincodeModal ? (
            <PincodeModal
              isLoggedIn={true}
              setIsPincodeModal={setIsPincodeModal}
              isDropdown={true}
              isSelected={isSelected}
              setIsSelected={setIsSelected}
            />
          ) : null}
        </button>
      ) : null}

      {/* Search Input */}
      <div className="group relative flex p-2 gap-1 grow">
        <Link to="/results">
          <img
            src={Search}
            alt="search icon"
            className="min-h-[1.5rem] min-w-[1.5rem]"
          />
        </Link>
        <input
          onBlur={() => {
            setIsInFocus(false);
          }}
          onFocus={() => {
            setIsSearchDropdown(true);
            setIsInFocus(true);
          }}
          type="text"
          value={input}
          onChange={onSearchTextChange}
          placeholder={placeholderText}
          className={`${
            isFilter ? "max-w-[9.5rem]" : null
          } text-[0.875rem] placeholder:text-[#94A3B8] focus:outline-none grow overflow-hidden sm:overflow-visible`}
        />
        <div
          ref={searchDropdownRef}
          className={input !== "" && isSearchDropdown ? "null" : "hidden"}
        >
          {/* <SearchBarDropdown isHero={isHero}  data={productList.length>0? productList:[]}/> */}

          {filteredProducts.length > 0 && (
        <SearchBarDropdown isHero={isHero} data={filteredProducts} setFilteredProducts={setFilteredProducts} />
      )}

        </div>
      </div>

      {/* Search Button */}
      {button ? (
        <div className="ml-auto">
          <button
            className="xl:block hidden bg-[#031B89] text-white font-HelveticaNeueMedium
             py-1 px-4 rounded"
          >
            Search
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default SearchBar;
