import React, { useContext, useRef,usena, useState,useEffect } from "react";
import ProductCard from "../Product/ProductCard";
import IndexSortBy from "./IndexSortBy";
import data from "../../data";
import { useQuery, gql,useMutation } from "@apollo/client";
import CartItemCard from "../Cart/CartItemCard";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../loader";
import Context from "../../context/AppContext";
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



const FindByIndex = () => {
  let isIllness=false;
  const { type } = useParams();
  if(type){
    isIllness=true
  }
  const {setSelectedProduct}=useContext(Context)
  console.log(type)
  const navigate=useNavigate()
  const [isFetched, setIsFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [productList, setProductList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeLetter, setActiveLetter] = useState('All');
  const [isPrescriptionRequired, setIsPrescriptionRequired] = useState(null);
  const { loadingProduct, errorproduct, data:dataListProduct } = useQuery(PRODUCT_LIST,{
    onCompleted: (data) => {
      let products = data?.getAllProducts?.products;
      if(type){
        setProductList(products?.filter((product) => product.concerns[0] === type));
        setFilteredProducts(products?.filter((product) => product.concerns[0] === type));
      }else{
        setProductList(data?.getAllProducts?.products);
        setFilteredProducts(data?.getAllProducts?.products); 
      }
        setIsFetched(true);
        setIsLoading(false)
    },
    onError: (err) => {
      setIsLoading(false)

    }
  });   

  const handleAlphabetFilter = (letter) => {
    setActiveLetter(letter);
    applyFilters(letter, isPrescriptionRequired);
  };

  const handlePrescriptionFilter = (required) => {
    setIsPrescriptionRequired(required);
    applyFilters(activeLetter, required);
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


  return (
     <div>
      {/* <ToastContainer /> */}
      {
        isLoading && <Loader /> 
      }
       {
         isFetched ?
         (
          <div className="flex flex-col justify-between py-12 px-[6.25rem] gap-[1.25rem] bg-white mb-4">
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
              {isIllness ? `Sort By Illness (${type})` : "Find your Medicines"}
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
            <div className="grid grid-cols-5 gap-4">
            {filteredProducts.map((product, i) => (
              <div style={{ cursor: 'pointer' }} onClick={() =>{ setSelectedProduct(product); navigate(`/product/${product.id}`)}} key={"product-" + product.id} className="flex items-center">
                <img
                  src={product.productImages[0]}
                  alt={product.productName}
                  className={isIllness ? "w-16 h-16 mr-2" : "w-24 h-24 mr-4"}
                />
                <h2 className={isIllness ? "text-[0.875rem] " : "text-[0.875rem] font-HelveticaNeueMedium"}>
                  {isIllness ? product.productName : product.manufacturer}
                </h2>
              </div>
            ))}
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
