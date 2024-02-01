import React, { useContext, useRef, useState,useEffect } from "react";
import ProductCard from "../Product/ProductCard";
import IndexSortBy from "./IndexSortBy";
import data from "../../data";
import { useQuery, gql,useMutation } from "@apollo/client";
import CartItemCard from "../Cart/CartItemCard";

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
  const { loading, error, data:dataList } = useQuery(PRODUCT_LIST);
  const [isFetched, setIsFetched] = useState(false);
  const [productList, setProductList] = useState([]);

  
  useEffect(()=>{
    try{
    console.log('data is 123');

    console.log(dataList.getAllProducts.products);
    setProductList(dataList.getAllProducts.products);
    setIsFetched(true);
    }catch(err){
      console.log(err);
    }
    
  },[dataList])

  return (
     <div>
       {
         isFetched ?
         (
          <div className="flex flex-col justify-between py-12 px-[6.25rem] gap-[1.25rem] bg-white mb-4">
          {/* Path */}
          <h1 className="w-full text-[0.875rem] text-[#64748B]">
            Link 1/Link2/
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
            <IndexSortBy isIndex />
          </div>
    
          {/* Sort Indexes */}
          <div className="flex flex-col gap-2">
            <h1 className="font-[0.75rem]">Sort by:</h1>
    
            <div className="flex gap-6 text-[#334155]">
              <button className="text-[#7487FF] font-HelveticaNeueMedium">
                All Kapil
              </button>
              <button>A</button>
              <button>B</button>
              <button>C</button>
              <button>D</button>
              <button>E</button>
              <button>F</button>
              <button>G</button>
              <button>H</button>
              <button>I</button>
              <button>J</button>
              <button>K</button>
              <button>L</button>
              <button>M</button>
              <button>N</button>
              <button>O</button>
              <button>P</button>
              <button>Q</button>
              <button>R</button>
              <button>T</button>
              <button>U</button>
              <button>V</button>
              <button>W</button>
              <button>X</button>
              <button>Y</button>
              <button>Z</button>
            </div>
          </div>
    
          {/* Products/Illness */}
          {!isIllness ? (
            // <div className="grid w-full md:grid-cols-2  lg:grid-cols-3 gap-3">
            // { data.map((product, i)=> {
            //       return (
            //         <div key={'p'+i}>
            //           <ProductCard product={product} isPrescriptionNeeded={true}/>
            //         </div>
            //       )
            //     }
            //   )}
            // </div>
            <div className="grid w-full md:grid-cols-2  lg:grid-cols-3 gap-3">
            { productList.map((product, i)=> {
                  return (
                    <div key={'p'+i}>
                      <ProductCard product={product} isPrescriptionNeeded={product.prescriptionRequired}/>
                    </div>
                  )
                }
              )}
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
