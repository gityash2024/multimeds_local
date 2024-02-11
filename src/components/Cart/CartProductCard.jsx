import React, { useContext, useEffect, useState } from "react";
import { useQuery, gql,useMutation } from "@apollo/client";
import PrimaryHighlight from "../PrimaryHighlight";
import { useNavigate } from "react-router-dom";
import Context from "../../context/AppContext";

const REMOVE_FROM_CART = gql`
  mutation removeFromCart($cartId: ID!) {
    removeFromCart(input:  $cartId ) {
      status
      message
    }
  }
`;

const UPDATE_CART_QUANTITY = gql`
  mutation updateCartQuantity($cartId: String!, $quantity: Int!) {
    updateCartQuantity(input: { cartId: $cartId, quantity: $quantity }) {
      status
      message
    }
  }
`;

const CartProductCard = ({ isDropdown, isPrescriptionNeeded, isCartModal, items, productList,refetch }) => {
// console.log('{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}')
const navigate=useNavigate()
const {setSelectedProduct} = useContext(Context)

  const [productCount, setProductCount] = useState(items?.quantity);
  const [cartId] = useState(items?.id);

  const [removeFromCart] = useMutation(REMOVE_FROM_CART, {
    variables: { cartId },
    onCompleted: (data) => {
      if (data.removeFromCart.status === "SUCCESS") {
        refetch()
      } 
    }
  });
  

  const [updateCartQuantity] = useMutation(UPDATE_CART_QUANTITY, {
    variables: { cartId, quantity: productCount },
    onCompleted: (data) => {
      if (data.updateCartQuantity.status === "SUCCESS") {
        refetch()
      } 
    }
  });

    
  const handleQuantityChange = (newQuantity) => {
    if(newQuantity<0){
      return;
    }
    setProductCount(newQuantity);
    if (newQuantity === 0) {
      removeFromCart().then(() => refetch()); // Consider updating Apollo Client cache here instead
    } else {
      updateCartQuantity();
    }
  };

  useEffect(() => {
    if (productCount !== items?.quantity) {
      updateCartQuantity();
    }
  }, [productCount, items?.quantity, updateCartQuantity]);
  



  return (
    <div className={"pb-6 border-b border-[#E2E8F0]"}>
      <div className={`${isDropdown ? "border-y hover:bg-[#F8FAFC] px-2" : "border rounded-[0.5rem] px-6"} ${ isDropdown ? "bg-[#EEF2FF]" : null} ${isCartModal ? "py-0 px-0 border-none" : " py-4"} w-full flex flex-col gap-4 shadow-cart-item border-[#E2E8F0] text-[#0F172A]`}>
        <div className="w-full flex gap-4 justify-between">
          <div className="flex gap-2 max-w-[15.313rem]">
            <img src={items.product?.productImages[0]} onClick={() => {setSelectedProduct(items?.product);navigate(`/product/${items.product.id}`)}} alt="image" className="w-14 h-14" />
            <div className="flex flex-col gap-1 w-full">
              <h1 className="text-[0.875rem] font-HelveticaNeueMedium">
                {items?.product?.productName}
              </h1>
              <h2 className="text-[0.875rem]">{items?.quantity} Unit</h2>
            </div>
          </div>
          <div className="flex flex-col gap-1 min-w-[6.8rem]">
            <div className="flex items-center gap-2">
              <h1 className="text-[0.875rem] font-HelveticaNeueMedium">
                Rs {items?.product?.sp * items?.quantity}
              </h1>
              <h2 className="text-[0.75rem] line-through text-[#94A3B8]">
                Rs {items?.product?.maxRetailPrice * items?.quantity}  
              </h2>
            </div>
            <h1 className="text-[0.75rem] font-HelveticaNeueMedium text-[#65A30D]">
              {items?.product?.discount ? items?.product?.discount.toString().slice(0, 4) : '0'}% OFF
            </h1>
          </div>
        </div>
        <div className={isDropdown ? "hidden" : `flex ${isCartModal ? "justify-start" : "justify-end"} ${isPrescriptionNeeded ? "justify-between" : null}`}>
          {isPrescriptionNeeded ? <PrimaryHighlight /> : null}
          <div className="min-h-[2.1rem] flex items-center gap-1">
                <button onClick={() => handleQuantityChange(productCount - 1)} className="py-1 px-2 bg-[#7487FF] rounded text-white w-[1.625rem] h-[1.75rem]">
              <h1>-</h1>
            </button>
            <div className="flex justify-center items-center p-2 rounded bg-white w-4 h-[1.75rem]">
              <h1>{productCount}</h1>
            </div>
            <button onClick={() => handleQuantityChange(productCount + 1)} className="py-1 px-2 bg-[#7487FF] rounded text-white w-[1.625rem] h-[1.75rem]">
              <h1>+</h1>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
