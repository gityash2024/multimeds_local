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
import { gql, useMutation, useQuery } from "@apollo/client";
import Loader from "../loader";
import CouponsModal from "../couponsModal";

const GET_WALLET_BALANCE = gql`
  query GetWalletBalance {
    getWalletBalance {
      status
      message
      walletBalance
    }
  }
`;

const CREATE_PAYMENT_INTENT = gql`
  mutation createPaymentIntents($input: CreatePaymentIntentsInput!) {
    createPaymentIntents(input: $input) {
      orderId
      status
      message
    }
  }
`;
const CLEAR_CART = gql`
mutation {
  clearCart {
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


const CartItems = ({
  isPrescriptionApproved,
  setProducts,
  setNeedingProducts
}) => {
  const { loading: balanceLoading, error: balanceError, data: balanceData, refetch: refetchBalance } = useQuery(GET_WALLET_BALANCE);
  const walletBalance = balanceData?.getWalletBalance?.walletBalance;
  const {handleRefetchCart,cartListFromContext,userWalletDebit,useWallet} = useContext(Context);
  const [cart, setCart] = useState(cartListFromContext||[]);
  const navigate=useNavigate()
  const [itemsNeedingPrescription, setItemsNeedingPrescription] = useState([]);
  const [regularItems, setRegularItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalMrp, setTotalMrp] = useState(0);
  const [totalSp, setTotalSp] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const[appliedCoupon,setAppliedCoupon]=useState(null)
  const [showModal, setShowModal] = useState(false);




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

const [clearCart] = useMutation(CLEAR_CART, {
  onError: (error) => {
    console.error('Error clearing cart:', error);
  },
  onCompleted: (data) => {
    console.log('Cart cleared:', data.clearCart);
    if (data.clearCart.status === "SUCCESS") {
      handleRefetch();
      navigate("/transaction/success");
    } else {
      console.error('Error clearing cart:', data.clearCart.message);
    }
  }
});
const calculateCartTotals = () => {
  let mrp = 0;
  let discount = 0;
  cart?.forEach(item => {
    const quantity = item?.quantity || 0;
    mrp += item?.product?.stocks?.[0]?.mrpPerSheet * quantity;
    discount += (item?.product?.stocks?.[0]?.mrpPerSheet * quantity) * (item?.product?.coupon?.percentage / 100);
  });

  
  const couponDiscount = Number(mrp) * (Number(appliedCoupon?.percentage||0)/ 100);
  console.log(appliedCoupon?.percentage,'couponDiscount')
  discount += couponDiscount;
  
  let walletAmountToUse = Number(userWalletDebit);
  console.log(mrp, discount, walletAmountToUse)
  const finalAmount = mrp - discount - walletAmountToUse;

  setTotalMrp(mrp);
  setTotalDiscount(discount);
  setFinalPrice(finalAmount);
};


useEffect(() => {
  calculateCartTotals();
}, [cart, appliedCoupon,useWallet , userWalletDebit, walletBalance]);


async function displayRazorpay() {
  console.log(finalPrice);
  
  if (finalPrice <= 0) {
    navigate("/verifying-prescription");
    setTimeout(() => {
      navigate("/transaction/success");
    }, 10000);
    localStorage.removeItem("useWalletForPayment")
    localStorage.removeItem("amountDebitedFromWallet")
    return;
  }
  setLoading(true);
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

  if (!res) {
    alert("Razorpay SDK failed to load. Are you online?");
    setLoading(false);
    return;
  }


  createPayment({
    variables: {
      input: {
        'amount':parseInt(finalPrice),
        'currency':"INR"
      }
    }
  }).then((response) => {
    const { orderId, status, message } = response.data.createPaymentIntents;
    if (status !== "created") {
      alert(`Failed to create payment intent: ${message}`);
      setLoading(false);
      return;
    }

    const options = {
      key: "rzp_test_FELPeq7HeVvV2w",
      amount: (finalPrice*100)?.toString(),
      currency: 'INR',
      name: "Multimeds",
      description: "Test Transaction",
      order_id: orderId,
      handler: async function (response) {
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
            setLoading(false); // Stop loading when verification starts
            // Show VerifyingPrescription component for 10 seconds
            navigate("/verifying-prescription");
            setTimeout(() => {
              // After 10 seconds, redirect to transaction success or fail based on condition
              clearCart().then(() => {
                navigate("/transaction/success");
              }).catch((error) => {
                console.error('Clear cart failed after successful payment', error);
                navigate("/transaction/fail");
              });
            }, 10000);
          } else {
            navigate("/transaction/fail");
          }
        }).catch((error) => {
          console.error('Error verifying payment signature:', error);
          setLoading(false);
          navigate("/transaction/fail");
        }).finally(() => {
          localStorage.removeItem("useWalletForPayment")
          localStorage.removeItem("amountDebitedFromWallet")
        });
      },
      prefill: {
        name: "Multimeds",
        email: "contact@mymultimeds.com",
        contact: "902838890"
      },
      theme: {
        color: "#61dafb"
      },
      modal: {
        ondismiss: function () {
          setLoading(false);
        }
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }).catch((err) => {
    console.error("Error during payment creation or Razorpay modal opening:", err);
    setLoading(false);
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

  // Dummy coupon data for demonstration


  const handleApplyCoupon = (coupon) => {
    // Apply coupon logic here
    
    console.log("Applying coupon:", coupon.code);
    setAppliedCoupon(coupon);
    setShowModal(false);
  };

  const handleRemoveCoupon = () => {
    // Remove applied coupon
    setAppliedCoupon(null);
  };

  const toggleModal = () => {
  if(appliedCoupon){
    setAppliedCoupon(null);
  }
    setShowModal(!showModal);
  };


  return (
    <div className="flex justify-center py-12 px-[6.25rem] gap-[1.25rem]">
      {/* Items */}
      <div className="flex flex-col w-[49.375rem] gap-4">
        {/* {!isPrescriptionApproved && (
          <div className="w-full flex gap-2 bg-[#FEF2F2] text-[#DC2626] font-HelveticaNeueMedium text-[0.875rem] p-1 rounded">
            <img src={Warning} alt="warning" />
            <h1>
              Your prescription was not approved. Please re-upload your prescription.
            </h1>
          </div>
        )} */}
  
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
  
        <button onClick={()=>{navigate('/products')}} className="w-fit text-[#7487FF] text-[0.875rem] font-HelveticaNeueMedium">
          + Add more Items
        </button>
      </div>
  
      <div className="w-[26.875rem] pt-8 rounded">
       <button onClick={toggleModal}>
        {appliedCoupon ? `Remove ${appliedCoupon.code}` : "Apply Promo Code"}
      </button>
   {showModal && (
            <CouponsModal  applyCoupon={handleApplyCoupon} closeModal={toggleModal} />
          )}  
        <PrescriptionUpload />
  
        <Bill cartListCoupon={cart} discountPercent={appliedCoupon?.percentage} />
  
        <DeliveringTo isAddressSelected isAddressInvalid={true} />
  
        <div className="p-4 flex flex-col gap-2">
          <button
            onClick={displayRazorpay }
            className={`w-full font-HelveticaNeueMedium rounded text-white text-center p-4 leading-[1.25rem] ${showModal ? "bg-gray-300" : "bg-[blue]"} `}
            disabled={showModal}
          >
            {showModal ? "LOADING..." : "PROCEED"}
          </button>
          
          {/* {!appliedCoupon && (
            <div className="w-full flex gap-1 bg-[#FEF2F2] text-[#DC2626] font-HelveticaNeueMedium text-[0.875rem] p-1 rounded">
              <img src={Warning} alt="warning" />
              <h1>You cannot proceed without uploading a prescription.</h1>
            </div>
          )} */}
        </div>
      </div>
  
      {loading && <Loader />}
    </div>
  );
  
};  

export default CartItems;
