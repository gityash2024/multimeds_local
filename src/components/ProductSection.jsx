import React, { useContext, useRef, useState, useEffect } from "react";

import whatsappIcon from '../assets/whatsapp.png';
import instagramIcon from '../assets/instagram.png';
import telegramIcon from '../assets/telegram.png';
import twitterIcon from '../assets/twitter.png';

import PrimaryHighlight from "./PrimaryHighlight";
import SecondaryHighlight from "./SecondaryHighlight";
import PrimaryButton from "./PrimaryButton";

import ProductImage from "../assets/product/productImage.png";
import Bookmark from "../assets/product/bookmarkIcon.svg";
import Share from "../assets/product/shareIcon.svg";
import Arrow from "../assets/product/arrow.svg";
import Dropdown from "../assets/product/downArrowIcon.svg";
import DropdownUp from "../assets/dropdownUpArrow.svg";
import OfferCoupon from "./OfferCoupon";
import ProductImageCarousel from "./ProductImageCarousel";
import { Link, useNavigate } from "react-router-dom";
import PincodeModal from "./PincodeModal";
import QuantityDropdown from "./Product/QuantityDropdown";
import Context from "../context/AppContext";
import Login from "./Login";
import SubscriptionCard from "./Subscription";
const ProductSection = () => {
  const navigate = useNavigate();
  let userDetails =localStorage.getItem('token');
  const ref = useRef();
  const shareModalRef = useRef();
  const {selectedProduct} = useContext(Context)
  const [isAddressModal, setIsAddressModal] = useState(false);
  const [quantityCount,setQuantityCount] = useState(1);
  const [shareModal,setShareModal] = useState(false);
  const [isQuantityDropdown, setIsQuantityDropdown] = useState(false);
  const [isSelected, setIsSelected] = useState(-1);
  const [quantity, setQuantity] = useState(0);
  let [cartItems,setCartItems] = useState([]);
  let [totalMrp,setTotalMrp] = useState(0);
  let [totalSp,setTotalSp] = useState(0);
  let [itemObj,setItemObj] = useState({});
  const [isLogin, setIsLogin] = useState(true);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shareModal && shareModalRef.current && !shareModalRef.current.contains(event.target)) {
        setShareModal(false);
      }
    };
    // let handler = (e) => {
    //   console.log('1');
    //   setIsLogin(true);
    // };
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
  }, [shareModal,isLogin,cartItems]);
  


  function changeQuantity(event){
    if(!isNaN(event.target.value)) 
      setQuantityCount((event.target.value > 0 || event.target.value=="") ? event.target.value : 1); 
  }

  const onQuantityChange=(e)=>{
    e.preventDefault();
    let product= selectedProduct;

    const existingProductIndex = cartItems.findIndex((item) => item.id === product.id);

    if (existingProductIndex !== -1) {
      // If the product exists, update the quantity
      let newState = [...cartItems];
      newState[existingProductIndex].count = parseInt(e.target.value);
      // newState[existingProductIndex].totalMaxRetailPrice = product.maxRetailPrice*parseInt(e.target.value);
      // newState[existingProductIndex].totalSP = product.sp*parseInt(e.target.value);
      let MrpCost= product.maxRetailPrice*parseInt(e.target.value);
      let spCost = product.sp*parseInt(e.target.value)
      setTotalMrp(MrpCost);
      setTotalSp(spCost);
      setCartItems(newState);
    } else {
      // If the product doesn't exist, add it to the cart
      product.count = parseInt(e.target.value);
      // product.totalMaxRetailPrice= product.maxRetailPrice*parseInt(e.target.value);
      // product.totalSP = product.sp*parseInt(e.target.value)
      let MrpCost= product.maxRetailPrice*parseInt(e.target.value);
      let spCost = product.sp*parseInt(e.target.value)
      setTotalMrp(MrpCost);
      setTotalSp(spCost);
      setCartItems(prevCartItems => [...prevCartItems, product]);
    }
   
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }
  const onCartSubmit=(e)=>{
    e.preventDefault();
    if(userDetails){
      setIsLogin(true);
      if(cartItems.length>0){
       
      // navigate(`/account/orders/order-details`);
      let newStateObj={};
      newStateObj.totalSP= totalSp;
      newStateObj.MrpCost= totalMrp;
      newStateObj.cartItems = cartItems;
      navigate('/account/orders/order-details', { state: newStateObj });
      } else{
        alert('Please Select Quantity ')
      }
    }else{
      setIsLogin(false);
    }
  }

  useEffect(()=>{setShareModal(false)},[])

  return (
    <div className="flex py-12 px-[6.25rem] justify-center gap-[1.25rem] bg-white mb-4">
      {/* Product*/}
      <div className="flex flex-col gap-[1.25rem]">
        {/* Path */}
        <h className="text-[0.875rem] text-[#64748B]">
          Link 1/Link2/
          <span className="text-[#031B89] font-HelveticaNeueMedium">
            Product Page
          </span>
        </h>
{/* {JSON.stringify(cartItems)} */}
        {/* Images */}
        <div className="flex flex-col items-center bg-[#F8FAFC] w-[35.813rem] ">
          <ProductImageCarousel image={selectedProduct["productImages"]} />
        </div>
      </div>

      {/* Product Details */}
      <div>
        {/* section 1 */}
        <div className="flex flex-col gap-6 py-6">
          <div className="border-b border-[#E2E8F0] pb-6 px-4">
            <div className="flex flex-col gap-2 text-[#0F172A]">
              {/* Product name */}
              <div className="w-[38.438rem] flex justify-between items-start">
                <h1 className="text-[2rem] font-HelveticaNeueBold">
                  {selectedProduct["productName"]}
                </h1>
                <div className="flex relative gap-1">
                  <button>
                    <img className="w-[80px]" src={Bookmark} alt="bookmark icon" />
                  </button>
                  <button onClick={()=>{setShareModal(prev => !prev)}}>
                    <img className="w-[80px]" src={Share} alt="share icon" />
                  </button>
                  {shareModal && <div ref={shareModalRef} className="absolute top-[24px] right-[0px] w-[240px] flex flex-col gap-4 bg-white rounded-md px-2 py-4 shadow-lg border">
                    <h1 className="text-[#64748B]">Share with friends</h1>
                      <div className="flex gap-4 justify-center">
                          <img className="cursor-pointer w-[40px]" src={whatsappIcon} alt="whatsapp icon" onClick={()=>{setShareModal(false)}}/>
                          <img className="cursor-pointer w-[40px]" src={instagramIcon} alt="whatsapp icon" onClick={()=>{setShareModal(false)}}/>
                          <img className="cursor-pointer w-[40px]" src={telegramIcon} alt="whatsapp icon" onClick={()=>{setShareModal(false)}}/>
                          <img className="cursor-pointer w-[40px]" src={twitterIcon} alt="whatsapp icon" onClick={()=>{setShareModal(false)}}/>
                      </div>
                      <div className="flex gap-2 text-[12px] border rounded-3xl p-2 w-full">
                        <input type="text" className="outline-none w-[60%] border-r px-2" value="https://xyz.abc/product/share/demo=x4820"/>
                        <p className="cursor-pointer w-fit text-[#64748B] hover:text-black">Copy link</p>
                      </div>
                  </div>}
                </div>
              </div>

              {/* Highlights */}
              <div className="flex gap-2">
                {/* <PrimaryHighlight /> */}
                <SecondaryHighlight title="Pain relief" />
                <SecondaryHighlight title="Ibuprofen" />
              </div>

              <p className="text-[0.75rem] font-HelveticaNeueMedium">
                15 tabs in one sheet.{" "}
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
                    Manufacturer
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
                    Composition
                  </h1>
                  <div>
                    <div className="w-fit border-b border-[#0F172A]">
                      <h2 className="cursor-pointer text-[0.875rem] max-w-[160px] font-HelveticaNeueMedium text-[#0F172A] truncate hover:text-clip">
                        {selectedProduct["Composition"]}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                {/* Storage */}
                <div className="w-[7.188rem]">
                  <h1 className="text-[0.75rem] font-HelveticaNeueItalic text-[#64748B]">
                    Storage
                  </h1>
                  <div>
                    <div className="w-fit">
                      <h2 className="text-[0.875rem] font-HelveticaNeueMedium text-[#0F172A]">
                        {selectedProduct["Storage Instructions"]}
                      </h2>
                    </div>
                  </div>
                </div>
                {/* Country of Origin*/}
                <div className="w-[7.188rem]">
                  <h1 className="text-[0.75rem] font-HelveticaNeueItalic text-[#64748B]">
                    Country of Origin
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
            <div className="flex bg-[#EFF6FF] p-2 gap-2">
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
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div>
          {/* Pricing */}
          <div className="flex justify-between p-4 text-[#0F172A] rounded-4">
            {/* <div>
              <h1 className="text-[1.25rem] font-HelveticaNeueMedium leading-[1.563rem]">
                MRP : Rs {selectedProduct.Price}
              </h1>
              <p className="text-[0.75rem] font-HelveticaNeueItalic text-[#64748B]">
                inclusive of all taxes
              </p>
            </div> */}
             <span className=" text-[0.625rem] font-HelveticaNeueMedium p-2 bg-[#C2F5E9] h-6">
          {10}% OFF
        </span>
             <div className="flex justify-between items-center">
            <h1 className="font-HelveticaNeueMedium text-[#031B89]">
              Rs {selectedProduct.sp}
            </h1>
            <p className="text-[0.75rem] text-[#94A3B8] pl-1">
              {/* MRP:  */}
               <span className="line-through">{selectedProduct.maxRetailPrice} Rs</span>
            </p>
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
                      <span className="text-[#0F172A]">560023</span>
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

          {/* Buying Section */}
          <div className="flex flex-col p-4 gap-1 w-[40.438rem]">
            {/* Buy options */}
            <div className="flex flex-col gap-2">
              {/* Add to cart Options */}
              <div className="relative flex flex-col gap-1">
                {/* Choose Quantity */}
                {/* <button
                  onClick={() => {
                    setIsQuantityDropdown(true);
                  }}
                  className="flex items-center justify-between border p-2 rounded"
                >
                  <input type="text" className="outline-none w-full text-left text-[#94A3B8] text-[0.875rem]" value={isSelected === -1 ? "" : isSelected} onChange={(e)=>{ if(!isNaN(e.target.value)) setIsSelected(e.target.value); else setIsSelected(-1)}} placeholder="Choose Quantity"/>
                 
                  <img
                    src={isQuantityDropdown ? Dropdown : DropdownUp}
                    className="h-[1.5rem] w-[1.5rem]"
                  />
                </button> */}
                {/* {
                  userDetails ?
                  (
                    <QuantityDropdown
                    isSelected={isSelected}
                    setIsSelected={setIsSelected}
                    setIsQuantityDropdown={setIsQuantityDropdown}
                  />
                  )
                  :(
                    <div>please Login</div>
                  )
                } */}
                
                <select onChange={onQuantityChange} className={`left-[0] top-[2.8rem] border border-[#E2E8F0] w-full p-2 gap-2 rounded bg-white`} style={{height:40}}>
                <option value="" selected>select quantity</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    <option value="6">6</option>
        </select>
                {/* {isQuantityDropdown ? (
                  <QuantityDropdown
                    isSelected={isSelected}
                    setIsSelected={setIsSelected}
                    setIsQuantityDropdown={setIsQuantityDropdown}
                  />
                ) : null} */}
                {/* <div className="flex gap-4"><p className="text-[#94A3B8] text-[12px] italic">Choose Quantity:</p>{!quantityCount && <p className="text-red-500 text-[12px] italic">*Please add at least 1 quanity!</p>}</div>
                <div className="flex items-center justify-between border p-2 rounded">
                  <button className="text-[#031B89] text-[24px] font-HelveticaNeueBold border-r px-24" onClick={()=>{setQuantityCount(prev => { if(prev>1) prev--; return prev;})}}> - </button>
                  <input className="outline-none text-center" type="text" ref={ref} placeholder="1" value={quantityCount} onChange={changeQuantity} />
                  <button button className="text-[#031B89] text-[24px] font-HelveticaNeueBold border-l px-24" onClick={()=>{setQuantityCount(prev=>Number(prev)+1)}}> + </button>
                </div> */}
                {/* Add to Cart*/}
                {/* <PrimaryButton title="Add To Cart"  onCartButtonClick={onCartSubmit}/> */}
                <button
      onClick={onCartSubmit}
      className="w-full font-HelveticaNeueMedium rounded text-[white] bg-[#031B89] p-4 leading-[1.25rem]"
    >
      Add To Cart
    </button>
              </div>

              {/* Detail */}
              <div>
                <h1 className="uppercase text-[0.75rem] font-HelveticaNeueMedium text-[#94A3B8]">
                  COD available
                </h1>
              </div>
            </div>

            {/* Subscription */}
            <SubscriptionCard />

            {/* Offers */}
            <div className="flex flex-col gap-2">
              <OfferCoupon />
              <Link className="text-[0.875rem] font-HelveticaNeueMedium text-[#7487FF]">
                Explore more offers
              </Link>
            </div>
          </div>
          {/* {
            !isLogin &&
            (
              <Login isLogin={isLogin} setIsLogin={setIsLogin}/>
            )
          } */}
          {!isLogin ? <Login isLogin={isLogin} setIsLogin={setIsLogin} /> : null}
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
