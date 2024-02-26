import React,{useEffect, useState} from "react";
import { gql, useQuery,useMutation } from "@apollo/client";
import Loader from '../loader';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Document from "../../assets/cart/documentIcon.svg";

const Coupons = (props) => {
  const {cartListCoupon}=props;
  // console.log(cartListCoupon,'++++=++++==++++++====+++===+++===+++===+++====+++====+++===+++====++++====++===++++==++++==++++===+++==++++=+++++')
  const [cart, setCart] = useState([]);
  const [totalMrp, setTotalMrp] = useState(0);
  const [totalSp, setTotalSp] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);

  useEffect(()=>{
    let mrp = 0;
        let sp = 0;
        let discount = 0;
        cartListCoupon?.forEach(item => {
          mrp += item?.product?.maxRetailPrice * item?.quantity;
          sp += item?.product?.sp * item?.quantity;
          discount += (item?.product?.maxRetailPrice - item?.product?.sp) * item?.quantity;
        });
        setTotalMrp(mrp);
        setTotalSp(sp);
        setTotalDiscount(discount);

  },[cartListCoupon])



  // if (loading) return <Loader />;
  // if (error) return <p>Error: {error.message}</p>;


  // useEffect(() => {
  //   if (localStorage.getItem('changeInQuantity')) {
  //     refetch();
  //   }
  // }, [localStorage.getItem('changeInQuantity')]);
  return (

    <div className="flex flex-col border-b border-dashed border-[#CBD5E1] px-3 py-6 gap-4 bg-white text-[#0F172A]">
        {/* <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />   */}
          <div className="flex gap-1 items-center">
        <img src={Document} className="h-6 w-6" />
        <h1 className=" font-HelveticaNeueMedium">Bill Summary</h1>
      </div>

      {/* billing details */}
      <div className="flex flex-col gap-3 text-[0.75rem] text-[#1E293B]">
        <div className="flex gap-1 items-center justify-between">
          <h1>Item total (MRP)</h1>
          <h2>Rs. {totalMrp.toFixed(2)}</h2>
        </div>

        <div className="flex justify-between gap-1">
          <div className="flex flex-col gap-2">
            <h1>Total Discount:</h1>
            <div className="text-[#64748B] flex flex-col gap-1 px-6">
              <h2>Coupon:</h2>
              <h2>Wallet Money:</h2>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            {/* <h1>-200</h1> */}
            <h1>-{totalDiscount.toFixed(2)}</h1>
            <div className="text-[#64748B] flex flex-col items-end gap-1">
              <h2>-Rs 34.49</h2>
              <h2>-Rs 165.65</h2>
            </div>
          </div>
        </div>

        <div className="flex gap-1 items-center justify-between">
          <h1>Shipping Free</h1>
          <h2>Free</h2>
        </div>
      </div>

      {/* Total Ammount */}
      <div className=" font-HelveticaNeueMedium flex justify-between items-center">
        <h1>Total Amount:</h1>
        <h2>Rs. {totalSp ? (((totalSp -34.49 - 165.65)>0)?(totalSp -34.49 - 165.65).toFixed(2):0):0}</h2>
      </div>

      {/* COD */}
      <h1 className="capitalize text-[0.75rem] text-[#94A3B8]">
        COD AVAILABLE
      </h1>
    </div>
  );
};

export default Coupons;
