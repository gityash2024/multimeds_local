import React, { useState,useEffect, useContext } from "react";
import CartItemCard from "./CartItemCard";
import Coupons from "./Coupons";
import PrescriptionUpload from "./PrescriptionUpload";
import Bill from "./Bill";
import DeliveringTo from "./DeliveringTo";
import Warning from "../../assets/cart/warning.svg";
import { Link, useNavigate } from "react-router-dom";
import Context from "../../context/AppContext";

const CartItems = ({
  isPrescriptionApproved,
  setProducts,
  setNeedingProducts
}) => {
  const {handleRefetchCart,cartListFromContext} = useContext(Context);
  const [cart, setCart] = useState(cartListFromContext||[]);
  const navigate=useNavigate()
  const [itemsNeedingPrescription, setItemsNeedingPrescription] = useState([]);
  const [regularItems, setRegularItems] = useState([]);






  const handleRefetch = async () => {
    handleRefetchCart()
  };
  

  useEffect(()=>{
    if(cartListFromContext){
      console.log(cartListFromContext,'=================== cart data from cart items ======================')

      setCart(cartListFromContext)
        const prescriptionItems = cartListFromContext.filter(item => item.product.prescriptionRequired);
        const nonPrescriptionItems = cartListFromContext.filter(item => !item.product.prescriptionRequired);
        console.log(prescriptionItems,'=================== prescription items ======================')
        console.log(nonPrescriptionItems,'=================== non prescription items ======================')
        setItemsNeedingPrescription(prescriptionItems);
        setRegularItems(nonPrescriptionItems);
        renderNeedingProducts();
        renderProducts();

    }

  },[cartListFromContext])


  const updateCartItemQuantity = (cartItemId, newQuantity) => {
    const updatedCart = cart.map((item) => {
      if (item.id === cartItemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    if(updatedCart){

      setCart(updatedCart);
    }
  };
  const renderNeedingProducts = () => {
    return itemsNeedingPrescription.map((item, index) => (
      <CartItemCard refetch={handleRefetch} key={index} cartData={item} setProducts={setNeedingProducts} updateQuantity={(newQuantity) => updateCartItemQuantity(item.id, newQuantity)}/>
    ));
  };

  const renderProducts = () => {
    return regularItems.map((item, index) => (
      <CartItemCard refetch={handleRefetch} key={index} cartData={item} setProducts={setProducts} updateQuantity={(newQuantity) => updateCartItemQuantity(item.id, newQuantity)}
      />
    ));
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

{itemsNeedingPrescription.length > 0 && (
          <div className="flex flex-col pb-8 gap-4 border-b border-[#E2E8F0]">
            <h1 className="text-[0.75rem] font-HelveticaNeueMedium capitalize text-[#475569]">
              ITEMS NEEDING PRESCRIPTION
            </h1>
            <div className="flex flex-col gap-2">
              {renderNeedingProducts()}
            </div>
          </div>
        )}

        {regularItems.length > 0 && (
          <div className="flex flex-col pb-8 gap-4 border-b border-[#E2E8F0]">
            <h1 className="text-[0.75rem] font-HelveticaNeueMedium capitalize text-[#475569]">
              PRODUCTS
            </h1>
            <div className="flex flex-col gap-2">
              {renderProducts()}
            </div>
          </div>
        )}

        <button onClick={()=>{navigate('/products')}} className="w-fit text-[#7487FF] text-[0.875rem]  font-HelveticaNeueMedium">
          + Add more Items
        </button>
      </div>

      <div className="w-[26.875rem] pt-8 rounded">
        <Coupons  />

        <PrescriptionUpload  />

        <Bill  cartListCoupon={cart}/>

        <DeliveringTo isAddressSelected isAddressInvalid={true} />

        <div className="p-4 flex flex-col gap-2">
          <Link
          style={{cursor:"not-allowed"}}
            // to="analyzing"
            className={`${ "bg-[#A5B4FC]" } w-full font-HelveticaNeueMedium rounded text-[white] text-center p-4 leading-[1.25rem]`}
          >
            PROCEED
          </Link>
         
            <div className="w-full flex gap-1 bg-[#FEF2F2] text-[#DC2626] font-HelveticaNeueMedium  text-[0.875rem] p-1 rounded">
              <img src={Warning} />
              <h1>You cannot proceed without uploading a prescription.</h1>
            </div>
         
        </div>
      </div>
    </div>
  );
};

export default CartItems;
