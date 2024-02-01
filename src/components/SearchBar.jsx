import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import Dropdown from "../assets/dropdownArrow.svg";
import DropdownUp from "../assets/dropdownUpArrow.svg";
import Search from "../assets/searchIcon.svg";
import PincodeModal from "./PincodeModal";
import SearchBarDropdown from "./SearchBarDropdown";
import { gql,useQuery,useLazyQuery } from "@apollo/client";

// const PRODUCT_LIST=gql`
// query{
//   searchProducts(input:String){
//     status
//     message
//     products{
//       id
//       productName
//     }
//   }
// }`;

const PRODUCT_LIST = gql`
  query SearchProducts($input: String!) {
    searchProducts(input: $input) {
      status
      message
      products {
        id
        productName
        marketer
        unitsInPack
        maxRetailPrice
        sp
        discount
        productImages
        description
        prescriptionRequired
      }
    }
  }
`;
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
  // const { loading, error, data: productList } = useQuery(PRODUCT_LIST, {
  //   variables: { input: input }, // Pass the dynamic input as a variable
  // });
  const [SearchProducts, { loading, error, data }] = useLazyQuery(PRODUCT_LIST);
  const AddressData = [
    { id: 1, code: 560095 },
    { id: 2, code: 560096 },
  ];

  const res = AddressData.filter((items, idx) => items.id === isSelected);

  let searchDropdownRef = useRef();

  useEffect(() => {
    if (input) {
      const getData = setTimeout(() => {
        console.log('user input is');
        console.log(input);
        SearchProducts({ variables: { input: input } }).then(response=>{
          console.log('res is');
          console.log(response);
          if(response.data.searchProducts.status === "SUCCESS"){
            setProductList(response.data.searchProducts.products);
          }
        }).catch(error=>{
          console.log(error);
          alert("Something Went Wrong");
        });
      }, 1000); // Delay of 2000ms (2 seconds)

      // Clear the timeout if the pinCode changes before the delay completes
      return () => clearTimeout(getData);
    }
    let handler = (e) => {
      if (!searchDropdownRef.current.contains(e.target) && !isInFocus) {
        setIsSearchDropdown(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  },[input]);

  // const { products } = productList;

  const onSearchTextChange=(e)=>{
    e.preventDefault();
    const userInput = e.target.value;
    setInput(userInput);
    // if (userInput.trim() !== '') {
    //   SearchProducts({ variables: { input: userInput } }).then(response=>{
    //     console.log('res is');
    //     console.log(response);
    //     if(response.data.searchProducts.status === "SUCCESS"){
    //       setProductList(response.data.searchProducts.products);
    //     }
    //   }).catch(error=>{
    //     console.log(error);
    //     alert("Something Went Wrong");
    //   });
    // }
  }
  
  return (
    <div
      className={`${
        isHero ? "flex" : "w-full lg:flex hidden"
      } items-center py-0.5 px-2 md:max-w-[40.688rem] lg:mx-0 grow h-[2.75rem] border border-slate-300 rounded`}
    >
      {/* Pincode Dropdown */}
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
          <SearchBarDropdown isHero={isHero}  data={productList.length>0? productList:[]}/>
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
