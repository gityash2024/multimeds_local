import React, { useContext, useRef, useState, useEffect } from "react";
import whatsappIcon from "../assets/whatsapp.png";
import telegramIcon from "../assets/telegram.png";
import twitterIcon from "../assets/twitter.png";
import SecondaryHighlight from "./SecondaryHighlight";
import { gql, useMutation, useQuery } from "@apollo/client";
import Bookmark from "../assets/product/bookmarkIcon.svg";
import Share from "../assets/product/shareIcon.svg";
import Arrow from "../assets/product/arrow.svg";
import OfferCoupon from "./OfferCoupon";
import ProductImageCarousel from "./ProductImageCarousel";
import { Link, useNavigate } from "react-router-dom";
import PincodeModal from "./PincodeModal";
import Context from "../context/AppContext";
import Login from "./Login";
import SubscriptionCard from "./Subscription";
import { toast } from "react-toastify";
import Loader from "./loader";
import CouponModal from "./Cart/CouponModal";

const ADD_TO_FAVORITE = gql`
  mutation setAsFavorite($productId: String!) {
    setAsFavorite(input: { productId: $productId }) {
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

const ADD_TO_CART = gql`
  mutation addToCart($productId: ID!, $quantity: Int!) {
    addToCart(input: { productId: $productId, quantity: $quantity }) {
      status
      message
    }
  }
`;

const GET_USER_SUBSCRIPTIONS = gql`
  query GetUserSubscriptions {
    getUserSubscriptions {
      status
      message
      subscriptions {
        productId
      }
    }
  }
`;


const ProductSection = () => {
  const { selectedProduct,handleRefetchCart,cartListFromContext } = useContext(Context);
  const { subscriptionLoading, error: subscriptionError, data:subscriptionData } = useQuery(GET_USER_SUBSCRIPTIONS);
console.log(subscriptionData)
  const [cartList] = useState(cartListFromContext||[]);
  const[isOpen,setIsopne]=useState(false)
  const currentUrl = encodeURIComponent(window.location.href);
  const whatsappShareUrl = `https://wa.me/?text=${currentUrl}`;
  const telegramShareUrl = `https://t.me/share/url?url=${currentUrl}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${currentUrl}`;
  const [cartId, setCartId] = useState("");
console.log(selectedProduct,'selectedProduct')
  const navigate = useNavigate();
  const shareModalRef = useRef();
  const [isAddressModal, setIsAddressModal] = useState(false);
  const [error, setError] = useState();
  const [shareModal, setShareModal] = useState(false);
  const [quantity, setQuantity] = useState(Number(0));
  const [isLogin, setIsLogin] = useState(true);
  const [productInCart, setProductAlreadyInCart] = useState(false);
const[selectedAddress,setSelectedAddress]=useState({})
  const [setAsFavorite] = useMutation(
    ADD_TO_FAVORITE,
    {
      variables: {
        productId: selectedProduct?.id,
      },
      onCompleted: (data) => {
        if (data.setAsFavorite.status === "SUCCESS") {
          handleRefetchCart();

        } else {
        }
      },
      onError: (err) => {
      },
    }
  );
  const [updateCartQuantity] = useMutation(UPDATE_CART_QUANTITY, {
    variables: { cartId, quantity },
    onCompleted: (data) => {
      if (data.updateCartQuantity.status === "SUCCESS") {
        setTimeout(()=>{
          navigate('/cart');
        },500) ;

      } else {

      }
    }
  });

  const [addToCart] = useMutation(ADD_TO_CART, {
    variables: { productId: selectedProduct?.id, quantity },
    onCompleted: (data) => {
      if (data.addToCart.status === "SUCCESS") {
       
        setTimeout(()=>{
          navigate('/cart');
        },500)
      } 
    }
  });


const handleAddressSelect=(data)=>{
  console.log("address selected",data)
  setSelectedAddress(data);
  setIsAddressModal(false)
}

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        shareModal &&
        shareModalRef.current &&
        !shareModalRef.current.contains(event.target)
      ) {
        setShareModal(false);
      }
    };

    const handleScroll = () => {
      if (shareModal) {
        setShareModal(false);
      }
    };

    // document.addEventListener("mousedown", handler);
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
      // document.removeEventListener("mousedown", handler);
    };
  }, [shareModal, isLogin]);

  const handleSaveProduct = () => {
    setAsFavorite();
  };

  const onQuantityChange = (e) => {
    setError("");
    e.preventDefault();
    setQuantity(Number(e.target.value));
  
  };



  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        console.log("Page URL copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const shareOnWhatsApp = () => {
    window.open(whatsappShareUrl, "_blank");
  };

 
  useEffect(() => {
    handleRefetchCart();
    // eslint-disable-next-line
  }, [selectedProduct]);

  useEffect(() => {
    const productInCart = cartList.find(item => item.product.id === selectedProduct?.id);
    if (productInCart) {
      setCartId(productInCart.id);
      setQuantity(productInCart.quantity);
      setProductAlreadyInCart(true);
    } else {
      setQuantity(0);
      setProductAlreadyInCart(false);
    }
    // eslint-disable-next-line
  }, [cartListFromContext, selectedProduct]);

  const handleAddToCart=()=>{
    if(quantity){

      if(productInCart){
        updateCartQuantity().then(() => handleRefetchCart());
      }else{
        addToCart().then(() => handleRefetchCart());
      }
    }else{
      toast.info("Please select a valid quantity")
    }
  }
  const handleClose=()=>{
    setIsopne(false);
  }

  return (
    <div className="flex py-12 px-[6.25rem] justify-center gap-[1.25rem] bg-white mb-4">
     
      <div className="flex flex-col gap-[1.25rem]">
        <h className="text-[0.875rem] text-[#64748B]">
          <span
            onClick={() => {
              navigate("/");
            }}
            className="text-[#94A3B8] font-HelveticaNeueMedium"
            style={{ cursor: "pointer" }}
          >
            Home/
          </span>
          <span
            onClick={() => {
              navigate("/products");
            }}
            className="text-[#94A3B8] font-HelveticaNeueMedium"
            style={{ cursor: "pointer" }}
          >
            All Products/
          </span>
          <span className="text-[#031B89] font-HelveticaNeueMedium">
            Product Page
          </span>
        </h>

        <div className="flex flex-col items-center bg-[#F8FAFC] w-[35.813rem] ">
          <ProductImageCarousel image={selectedProduct["productImages"]} />
        </div>
      </div>

      <div>
        <div className="flex flex-col gap-6 py-6">
          <div className="border-b border-[#E2E8F0] pb-6 px-4">
            <div className="flex flex-col gap-2 text-[#0F172A]">
              {/* Product name */}
              <div className="w-[38.438rem] flex justify-between items-start">
                <h1 className="text-[2rem] font-HelveticaNeueBold">
                  {selectedProduct["productName"]}
                </h1>
                <div className="flex relative gap-1">
                  <button
                    onClick={() => {
                      handleSaveProduct(selectedProduct);
                    }}
                  >
                    <img
                      className="w-[35px]"
                      src={Bookmark}
                      alt="bookmark icon"
                    />
                  </button>
                  <button
                    onClick={() => {
                      setShareModal((prev) => !prev);
                    }}
                  >
                    <img className="w-[35px]" src={Share} alt="share icon" />
                  </button>
                  {shareModal && (
                    <div
                      ref={shareModalRef}
                      className="absolute top-[24px] right-[0px] w-[240px] flex flex-col gap-4 bg-white rounded-md px-2 py-4 shadow-lg border"
                    >
                      <h1 className="text-[#64748B]">Share with friends</h1>
                      <div className="flex gap-4 justify-center">
                        <img
                          className="cursor-pointer w-[40px]"
                          src={whatsappIcon}
                          alt="whatsapp icon"
                          onClick={shareOnWhatsApp}
                        />
                        <img
                          className="cursor-pointer w-[40px]"
                          src={telegramIcon}
                          alt="telegram icon"
                          onClick={() =>
                            window.open(telegramShareUrl, "_blank")
                          }
                        />
                        <img
                          className="cursor-pointer w-[40px]"
                          src={twitterIcon}
                          alt="twitter icon"
                          onClick={() => window.open(twitterShareUrl, "_blank")}
                        />
                      </div>
                      <div className="flex gap-2 text-[12px] border rounded-3xl p-2 w-full">
                        <input
                          type="text"
                          readOnly
                          className="outline-none w-[60%] border-r px-2"
                          value={window.location.href}
                        />
                        <p
                          className="cursor-pointer w-fit text-[#64748B] hover:text-black"
                          onClick={() => {
                            setShareModal(false);
                            handleCopyLink();
                          }}
                        >
                          Copy link
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                {selectedProduct?.tags[0]&&<SecondaryHighlight title={selectedProduct?.tags[0]} />}
                {selectedProduct?.tags[1]&&<SecondaryHighlight title={selectedProduct?.tags[1]} />}
                {selectedProduct?.tags[2]&&<SecondaryHighlight title={selectedProduct?.tags[2]} />}
               {selectedProduct?.tags[3]&& <SecondaryHighlight title={selectedProduct?.tags[3]} />}
              </div>

              <p className="text-[0.75rem] font-HelveticaNeueMedium">
              {selectedProduct.unitsInPack} unit in one sheet.{" "}
                <Link className="text-[#7487FF]">See other variants</Link>
              </p>
            </div>
          </div>

          {/* Details */}
          <div className="flex justify-between py-2 px-4">
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                {/* Manufacturer */}
                <div className="w-[7.188rem]">
                  <h1 className="text-[0.75rem] font-HelveticaNeueItalic text-[#64748B]">
                    {selectedProduct["marketer"]}
                  </h1>
                  <div>
                    <div className="w-fit border-b border-[#0F172A]">
                      <h2 className="cursor-pointer text-[0.875rem] font-HelveticaNeueMedium text-[#0F172A]">
                        {selectedProduct.Manufacturer}
                      </h2>
                    </div>
                  </div>
                </div>
                {/* Composition*/}
                <div className="w-[7.188rem]">
                  <h1 className="text-[0.75rem] font-HelveticaNeueItalic text-[#64748B]">
                    Composition <br />
                    {selectedProduct?.composition||'--'}
                  </h1>
                  <div>
                    <div className="w-fit border-b border-[#0F172A]">
                      <h2 className="cursor-pointer text-[0.875rem] max-w-[160px] font-HelveticaNeueMedium text-[#0F172A] truncate hover:text-clip">
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                {/* Storage */}
                <div className="w-[7.188rem]">
                  <h1 className="text-[0.75rem] font-HelveticaNeueItalic text-[#64748B]">
                    Storage <br />
                    {selectedProduct?.safetyInformation}

                  </h1>
                  <div>
                    <div className="w-fit">
                      <h2 className="text-[0.875rem] font-HelveticaNeueMedium text-[#0F172A]">
                        {/* {selectedProduct?.safetyInformation} */}
                      </h2>
                    </div>
                  </div>
                </div>
                {/* Country of Origin*/}
                <div className="w-[7.188rem]">
                  <h1 className="text-[0.75rem] font-HelveticaNeueItalic text-[#64748B]">
                    Country <br /> India
                  </h1>
                  <div>
                    <div className="w-fit">
                      <h2 className="text-[0.875rem] font-HelveticaNeueMedium text-[#0F172A]">
                        {selectedProduct["Country of Origin"]}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Generic Substitutes */}
            {/* <div className="flex bg-[#EFF6FF] p-2 gap-2">
              <div className="flex flex-col w-[16rem] gap-2">
                <h1 className="font-HelveticaNeueMedium">
                  Opt for generic substitutes!
                </h1>
                <p className="text-[0.75rem] leading-[0.938rem]">
                  Generic substitutes have the similar chemical compositions and
                  can help you save upto 50% on medicines!
                </p>
              </div>
              <Link>
                <img src={Arrow} className="w-6 h-6" />
              </Link>
            </div> */}
          </div>
        </div>

        <div>
          <div className="flex justify-between p-4 text-[#0F172A] rounded-4">
            <span className=" text-[0.625rem] font-HelveticaNeueMedium p-2 bg-[#C2F5E9] h-6">
              {selectedProduct?.discount?.toFixed(2)}% OFF
            </span>
            <div>
                <div className="flex justify-between items-center">
                  <h1 className="font-HelveticaNeueMedium text-[#031B89]">
                    MRP : Rs {selectedProduct.sp}
                  </h1>
                  <p className="text-[0.75rem] text-[#94A3B8] pl-1">
                    <span className="line-through">
                      {selectedProduct.maxRetailPrice} Rs
                    </span>
                  </p>
                </div>

                <br/>

                <div className="flex justify-between items-center">
                  <h1 className="font-HelveticaNeueMedium text-[#031B89]">
                    TOTAL : Rs {quantity * selectedProduct.sp}
                  </h1>
                  <p className="text-[0.75rem] text-[#94A3B8] pl-1">
                    <span className="line-through">
                      {quantity * selectedProduct.maxRetailPrice} Rs
                    </span>
                  </p>
                </div>
              </div>


            {/* Delivery */}
            <div className="flex flex-col w-[19rem] p-2 gap-2 shadow-custom">
              {/* Main */}
              <div>
                <div className="flex justify-between text-[1.125rem] font-HelveticaNeueMedium">
                  <h1>Delivery ETA:</h1>
                  <h2>
                    <span className="text-[#65A30D]">2pm</span> today
                  </h2>
                </div>
                <div>
                  <div className="flex justify-between text-[0.875rem] font-HelveticaNeueMedium">
                    <h1 className="text-[#64748B]">
                      Delivering to:{" "}
                      <span className="text-[#0F172A]">{selectedAddress?.pincode||'xxxxxx'}</span>
                    </h1>
                    <button
                      onClick={() => {
                        setIsAddressModal(true);
                      }}
                      className="text-[#7487FF]"
                    >
                      change
                    </button>
                    {isAddressModal ? (
                      <div className="w-screen h-screen fixed top-0 left-0 z-50 flex justify-center items-center bg-black bg-opacity-40">
                        <PincodeModal
                          setIsPincodeModal={setIsAddressModal}
                          onAddressSelect={handleAddressSelect}
                          isLoggedIn={true}
                          isDropdown={false}
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              {/* note */}
              <p className="text-[0.625rem] text-[#64748B] font-HelveticaNeueItalic">
                Note : Shipping charges will be calculated at checkout
              </p>
            </div>
          </div>

          <div className="flex flex-col p-4 gap-1 w-[40.438rem]">
            <div className="flex flex-col gap-2">
              <div className="relative flex flex-col gap-1">
                <select
                  onChange={onQuantityChange}
                  value={quantity}
                  className={`left-[0] top-[2.8rem] border border-[#E2E8F0] w-full p-2 gap-2 rounded bg-white`}
                  style={{ height: 40 }}
                >
                  <option value={0} selected disabled>
                    select quantity
                  </option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                </select>
                {error && <p className="text-[#EF4444] text-xs">{error}</p>}

                <button
                onClick={()=>{handleAddToCart()}}
                  className="w-full font-HelveticaNeueMedium rounded text-[white] bg-[#031B89] p-4 leading-[1.25rem]"
                >
                  {productInCart?'Update':'Add To'} Cart
                </button>
              </div>

              <div>
                <h1 className="uppercase text-[0.75rem] font-HelveticaNeueMedium text-[#94A3B8]">
                  COD available
                </h1>
              </div>
            </div>

            <SubscriptionCard  />

            <div className="flex flex-col gap-2">
              <OfferCoupon />
              <Link onClick={()=>{setIsopne(true)}}className="text-[0.875rem] font-HelveticaNeueMedium text-[#7487FF]">
                Explore more offers
              </Link>
            </div>
          </div>
          {isOpen && <CouponModal handleClose={handleClose}/>}

          {!isLogin ? (
            <Login isLogin={isLogin} setIsLogin={setIsLogin} />
          ) : null}
          {subscriptionLoading && <Loader/> }
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
