import React, { useContext, useRef,usena, useState,useEffect } from "react";
import ProductCard from "../Product/ProductCard";
import IndexSortBy from "./IndexSortBy";
import data from "../../data";
import { useQuery, gql,useMutation } from "@apollo/client";
import CartItemCard from "../Cart/CartItemCard";
import products from "../../productData";
import transformProductData from '../../util/transformProductData';
import { useNavigate } from "react-router-dom";

const PRODUCT_LIST= gql`
query{
  getAllProducts{
    status
    message
    products{
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
  }`;

const FindByIndex = ({ isIllness }) => {
  console.log('isIllness');
  console.log(isIllness);
  const navigate=useNavigate()
  const { loading, error, data:dataList } = useQuery(PRODUCT_LIST);
  const [isFetched, setIsFetched] = useState(false);
  const [productList, setProductList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeLetter, setActiveLetter] = useState('All');
  const [isPrescriptionRequired, setIsPrescriptionRequired] = useState(null); 
  useEffect(() => {
    const transformedData = transformProductData(products);
    setProductList(transformedData);
    console.log(transformedData)
    setFilteredProducts(transformedData); // Initially, no filter applied
        setIsFetched(true);

  }, []);
  const handleAlphabetFilter = (letter) => {
    setActiveLetter(letter);
    applyFilters(letter, isPrescriptionRequired);
  };

  const handlePrescriptionFilter = (required) => {
    setIsPrescriptionRequired(required);
    applyFilters(activeLetter, required);
  };

  const clearFilters = () => {
    setActiveLetter('All');
    setIsPrescriptionRequired(null);
    setFilteredProducts(productList); // Reset to all products
  };
  const applyFilters = (letter, prescription) => {
    let filtered = productList;

    // Filter by prescription if needed
    if (prescription !== null) {
      filtered = filtered.filter((product) => product.prescriptionRequired === prescription);
    }

    // Filter by letter if not 'All'
    if (letter !== 'All') {
      filtered = filtered.filter((product) => product.productName.toUpperCase().startsWith(letter));
    }

    setFilteredProducts(filtered);
  };
  const alphabetButtons = Array.from({ length: 26 }, (_, i) => String.fromCharCode(i + 65)).map((letter) => (
    <button
      key={letter}
      className={activeLetter === letter ? "text-[#7487FF] font-HelveticaNeueMedium" : ""}
      onClick={() => handleAlphabetFilter(letter)}
    >
      {letter}
    </button>
  ));
  // useEffect(()=>{
  //   try{
  //   console.log('data is 123');

  //   console.log(dataList.getAllProducts.products);
  //   setProductList(dataList.getAllProducts.products);
  //   setIsFetched(true);
  //   }catch(err){
  //     console.log(err);
  //   }
    
  // },[dataList])

  return (
     <div>
       {
         isFetched ?
         (
          <div className="flex flex-col justify-between py-12 px-[6.25rem] gap-[1.25rem] bg-white mb-4">
          {/* Path */}
          <h1 className="w-full text-[0.875rem] text-[#64748B]">
          <span onClick={()=>{navigate('/')}} className="text-[#94A3B8] font-HelveticaNeueMedium" style={{cursor:'pointer'}}>
               Home/
            </span>
            <span className="text-[#031B89] font-HelveticaNeueMedium">
              Product Page
            </span>
          </h1>
    
          {/* Heading */}
          <div className="w-full flex justify-between items-center">
            <h1 className="text-[1.25rem] font-HelveticaNeueMedium text-[#031B89]">
              {isIllness ? "Sort By Illness" : "Find your Medicines"}
            </h1>
    
            {/* SortBy */}
            {/* <IndexSortBy isIndex /> */}
            <select className="text-[#94A3B8] text-[0.875rem] relative w-[21.875rem] flex justify-between p-2 rounded border border-[#CBD5E1] items-center" onChange={(e) => handlePrescriptionFilter(e.target.value === 'required')}>
          <option className="text-[#94A3B8] text-[0.875rem]" value="required">Prescription Required</option>
          <option className="text-[#94A3B8] text-[0.875rem]" value="notRequired">No Prescription Required</option>
        </select>
          </div>
    
          {/* Sort Indexes */}
          <div className="flex flex-col gap-2">
        {/* Alphabetical Filter */}
        {/* <button style={{    width:' 8%',
    float: 'right',
    display: 'flex',
    justifyContent: 'center',    position: 'relative',
    left: '92%'
}} className="w-[5.5rem] py-2 px-4 bg-[#7487FF] text-white rounded font-HelveticaNeueMedium" onClick={() => clearFilters()}>Clear Filters</button> */}
        <div className="flex gap-6 text-[#334155]">
          <button
            className={activeLetter === 'All' ? "text-[#7487FF] font-HelveticaNeueMedium" : ""}
            onClick={() => handleAlphabetFilter('All')}
          >
            All
          </button>
          {alphabetButtons}
        </div>

        {/* Prescription Filter Dropdown */}
        {/* <select onChange={(e) => handlePrescriptionFilter(e.target.value === 'required')}>
          <option value="required">Prescription Required</option>
          <option value="notRequired">No Prescription Required</option>
        </select> */}
      </div>

      {/* Products */}
      {!isIllness ? (
        <div className="grid w-full md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredProducts.map((product, i) => (
            <div key={'product-' + product.id}>
              <ProductCard product={product} isPrescriptionNeeded={product.prescriptionRequired} />
            </div>
          ))}
        </div>
      ) : (
            // find by illness
            <div className="flex gap-12">
              <div className="flex flex-col gap-[1.25rem]">
                <div className="flex flex-col gap-3 p-2">
                  <h1 className="text-[0.875rem] font-HelveticaNeueMedium">A</h1>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                </div>
    
                <div className="flex flex-col gap-3 p-2">
                  <h1 className="text-[0.875rem] font-HelveticaNeueMedium">A</h1>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                </div>
              </div>
              <div className="flex flex-col gap-[1.25rem]">
                <div className="flex flex-col gap-3 p-2">
                  <h1 className="text-[0.875rem] font-HelveticaNeueMedium">A</h1>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                </div>
    
                <div className="flex flex-col gap-3 p-2">
                  <h1 className="text-[0.875rem] font-HelveticaNeueMedium">A</h1>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                </div>
              </div>
              <div className="flex flex-col gap-[1.25rem]">
                <div className="flex flex-col gap-3 p-2">
                  <h1 className="text-[0.875rem] font-HelveticaNeueMedium">A</h1>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                </div>
    
                <div className="flex flex-col gap-3 p-2">
                  <h1 className="text-[0.875rem] font-HelveticaNeueMedium">A</h1>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                </div>
              </div>
              <div className="flex flex-col gap-[1.25rem]">
                <div className="flex flex-col gap-3 p-2">
                  <h1 className="text-[0.875rem] font-HelveticaNeueMedium">A</h1>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                </div>
    
                <div className="flex flex-col gap-3 p-2">
                  <h1 className="text-[0.875rem] font-HelveticaNeueMedium">A</h1>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                </div>
              </div>
              <div className="flex flex-col gap-[1.25rem]">
                <div className="flex flex-col gap-3 p-2">
                  <h1 className="text-[0.875rem] font-HelveticaNeueMedium">A</h1>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                </div>
    
                <div className="flex flex-col gap-3 p-2">
                  <h1 className="text-[0.875rem] font-HelveticaNeueMedium">A</h1>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                  <h2 className="text-[0.875rem]">Brand Name</h2>
                </div>
              </div>
            </div>
          )}
        </div>
         )
         :(
           <div></div>
         )
       }
     </div>
  );
};

export default FindByIndex;
