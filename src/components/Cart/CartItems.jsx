import React, { useState,useEffect, useContext } from "react";
import CartItemCard from "./CartItemCard";
import Coupons from "./Coupons";
import PrescriptionUpload from "./PrescriptionUpload";
import Bill from "./Bill";
import DeliveringTo from "./DeliveringTo";
import Warning from "../../assets/cart/warning.svg";
import { Link, useNavigate } from "react-router-dom";
import Context from "../../context/AppContext";
import axios from "axios";
import { gql, useMutation } from "@apollo/client";

const CREATE_PAYMENT_INTENT = gql`
  mutation CreatePaymentIntent($input: CreatePaymentIntentsInput!) {
    createPaymentIntents(input: $input) {
      orderId
      status
      message
    }
  }
`;

const VERIFY_PAYMENT_SIGNATURE = gql`
  mutation VerifyPaymentSignature($input: VerifyPaymentSignatureInput!) {
    verifyPaymentSignature(input: $input) {
      status
      message
    }
  }
`;

const PROCESS_SUCCESS_PAYMENT = gql`
  mutation ProcessSuccessPayment($input: ProcessPaymentInput!) {
    processSuccessPayment(input: $input) {
      status
      message
    }
  }
`;



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
        const prescriptionItems = cartListFromContext.filter(item => item?.product?.prescriptionRequired);
        const nonPrescriptionItems = cartListFromContext.filter(item => !item?.product?.prescriptionRequired);
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

  // Inside your component
const [createPayment] = useMutation(CREATE_PAYMENT_INTENT, {
  onError: (error) => {
    console.error('Error creating payment intent:', error);
    alert('Failed to create payment intent.');
  },
  onCompleted: (data) => {
    console.log('Payment intent created:', data.createPaymentIntents);
  }
});

const [verifySignature] = useMutation(VERIFY_PAYMENT_SIGNATURE, {
  onError: (error) => {
    console.error('Error verifying payment signature:', error);
    alert('Payment verification failed.');
  },
  onCompleted: (data) => {
    console.log('Payment signature verified:', data.verifyPaymentSignature);
  }
});

const [processPayment] = useMutation(PROCESS_SUCCESS_PAYMENT, {
  onError: (error) => {
    console.error('Error processing success payment:', error);
    alert('Error processing the payment.');
  },
  onCompleted: (data) => {
    console.log('Payment processed successfully:', data.processSuccessPayment);
  }
});



async function displayRazorpay() {
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
  if (!res) {
    alert("Razorpay SDK failed to load. Are you online?");
    return;
  }

  const amount = 2130; // Replace with dynamic value
  const currency = "INR"; // Replace with dynamic value

  createPayment({
    variables: {
      input: {
        amount,
        currency
      }
    }
  }).then((response) => {
    const { orderId, status, message } = response.data.createPaymentIntents;
    if (status !== "created") {
      alert(`Failed to create payment intent: ${message}`);
      return;
    }

    // Configure Razorpay options
    const options = {
      key: "rzp_test_FELPeq7HeVvV2w",
      amount: amount.toString(),
      currency: currency,
      name: "Multimeds",
      description: "Test Transaction",
      order_id: orderId,
      handler: async function (response) {
        // Verify payment signature
        verifySignature({
          variables: {
            input: {
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature
            }
          }
        }).then((verificationResponse) => {
          if (verificationResponse.data.verifyPaymentSignature.status === "SUCCESS") {
            // Process success payment
            processPayment({
              variables: {
                input: {
                  amount: amount.toString(),
                  paymentMethod: "Razorpay"
                }
              }
            }).then((paymentResponse) => {
              if (paymentResponse?.data?.processSuccessPayment?.status === "SUCCESS") {
                alert("Payment successful");
              } else {
                alert("Payment could not be verified");
              }
            });
          }
        });
      },
      prefill: {
        name: "Multimeds",
        email: "contact@mymultimeds.com",
        contact: "902838890"
      },
      theme: {
        color: "#61dafb"
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  });
}


  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

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
          <Link onClick={displayRazorpay} className={`${ "bg-[#A5B4FC]" } w-full font-HelveticaNeueMedium rounded text-[white] text-center p-4 leading-[1.25rem]`}>
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
