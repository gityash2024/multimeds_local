import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../loader";
import Context from "../../context/AppContext";
import Device from "../../assets/cart/deviceImage.png";
import PrimaryHighlight from "../PrimaryHighlight";

const UPDATE_CART_QUANTITY = gql`
  mutation updateCartQuantity($cartId: String!, $productCount: Int!) {
    updateCartQuantity(input: { cartId: $cartId, quantity: $productCount }) {
      status
      message
    }
  }
`;
const CART_LIST= gql`
query{cartProductsListing {status,message,  carts {
  id
  product {
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
  quantity
  prescription
  user {
    id
    fullName
    contactNumber
    email
    profilePicture
    walletBalance
    role
    currentAddress {
      id
      houseNumber
      aptOrBuildingName
      streetOrAreaName
      city
      pincode
      state
      label
    }
    department {
      name
      description
      permissions
      creator {
id
    fullName
    contactNumber
    email
    profilePicture
    walletBalance
    role        }
    }
  }
  status
  createdAt
  updatedAt
}}}
`;
const ADD_TO_CART = gql`
  mutation addToCart($productId: ID!, $productCount: Int!) {
    addToCart(input: { productId: $productId, quantity: $productCount }) {
      status
      message
    }
  }
`;
const REMOVE_FROM_CART = gql`
  mutation removeFromCart($cartId: ID!) {
    removeFromCart(input:  $cartId ) {
      status
      message
    }
  }
`;

export default function ProductCard(props) {
    const { setSelectedProduct } = useContext(Context);
    const navigate = useNavigate();
    const { product, isDropdown, isPrescriptionNeeded, isCartModal } = props;
    const [isSelected, setIsSelected] = useState(false);
    const [productCount, setProductCount] = useState(0);
    const [cartList, setCartList] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [cartId, setCartId] = useState("");
    const [productInCart, setProductAlreadyInCart] = useState(false);

    const [updateCartQuantity] = useMutation(UPDATE_CART_QUANTITY);
    const [addToCart] = useMutation(ADD_TO_CART);
    const [removeFromCart] = useMutation(REMOVE_FROM_CART);
    const { loading: loadingCartData, data: cartData, refetch: refetchCart } = useQuery(CART_LIST, { fetchPolicy: "network-only" });

    useEffect(() => {
        if (cartData?.cartProductsListing?.carts) {
            const cartItems = cartData.cartProductsListing.carts;
            setCartList(cartItems);
            const foundItem = cartItems.find(item => item.product.id === product?.id);
            if (foundItem) {
                setCartId(foundItem.id);
                setProductCount(foundItem.quantity);
                setProductAlreadyInCart(true);
            } else {
                setProductCount(0);
                setProductAlreadyInCart(false);
            }
        }
    }, [cartData, product]);

    const handleAddClick = async () => {
        setLoading(true);
        try {
            if (productInCart) {
                await updateCartQuantity({ variables: { cartId, productCount: productCount + 1 } });
            } else {
                await addToCart({ variables: { productId: product.id, productCount: 1 } });
            }
            toast.success("Cart updated successfully!");
            refetchCart();
        } catch (error) {
            toast.error("Error updating cart.");
        } finally {
            setLoading(false);
        }
    };

    const handleQuantityChange = async (newCount) => {
        setLoading(true);
        try {
            if (newCount === 0) {
                await removeFromCart({ variables: { cartId } });
                toast.success("Item removed from cart!");
            } else {
                await updateCartQuantity({ variables: { cartId, productCount: newCount } });
                toast.success("Cart updated successfully!");
            }
            refetchCart();
        } catch (error) {
            toast.error("Error updating cart.");
        } finally {
            setLoading(false);
        }
    };

    if (!product) return <></>;
  return (
    <div
      onClick={() => {
        setIsSelected(!isSelected);
      }}
      className={`${
        isDropdown
          ? "border-y hover:bg-[#F8FAFC] px-2"
          : "border rounded-[0.5rem] px-6"
      } ${isSelected && isDropdown ? "bg-[#EEF2FF]" : null} ${
        isCartModal ? "py-0 px-0 border-none" : " py-4"
      } w-full flex flex-col gap-4 shadow-cart-item border-[#E2E8F0] text-[#0F172A]`}
    >
      {
        isLoading && <Loader /> 
      }
    <div className="w-full flex gap-4 justify-between">
          <div className="cursor-pointer flex gap-2 max-w-[15.313rem]" onClick={() => { setSelectedProduct(product); navigate(`/product/${product.id}`) }}>
              {product.productImages[0] && (
                  <img src={product.productImages[0]} alt={product.productName} className="w-14 h-14" />
              )}
              <div className="flex flex-col gap-1 w-full">
                  <h1 className="text-[0.875rem] font-HelveticaNeueMedium">{product.productName}</h1>
                  <h2 className="text-[0.875rem]">{product.unitsInPack} Unit</h2>
              </div>
          </div>

          <div className="flex flex-col gap-1 min-w-[6.8rem]">
              <div className="flex items-center gap-2">
                  <h1 className="text-[0.875rem] font-HelveticaNeueMedium">Rs {product.sp}</h1>
                  <h2 className="text-[0.75rem] line-through text-[#94A3B8]">Rs {product.maxRetailPrice}</h2>
              </div>
              <h1 className="text-[0.75rem] font-HelveticaNeueMedium text-[#65A30D]">{product?.discount?.toFixed(2)}% OFF</h1>
          </div>


        {/* Drop Down */}
        <div className={!isDropdown ? "hidden" : "w-[5.5rem]"}>
          {productCount === 0 ? (
            <button
             onClick={handleAddClick}
              className="w-[5.5rem] h-9 py-2 px-4 bg-[#7487FF] text-white rounded font-HelveticaNeueMedium"
            >
              ADD
            </button>
          ) : (
            <div className=" flex gap-1">
              <button
               onClick={() => handleQuantityChange(productCount - 1)}
                className="py-1 px-2 bg-[#7487FF] rounded text-white w-[2.625rem] h-[2.25rem]"
              >
                <h1>-</h1>
              </button>

              <div className="flex justify-center items-center p-2 rounded bg-white w-4 h-[2.25rem]">
                <h1>{productCount}</h1>
              </div>

              <button
                onClick={() => handleQuantityChange(productCount + 1)}
                className="py-1 px-2 bg-[#7487FF] rounded text-white w-[2.625rem] h-[2.25rem]"
              >
                <h1>+</h1>
              </button>
            </div>
          )}
        </div>
      </div>

      {/*Not Dropdown/ is Cart modal */}
      <div
        className={
          isDropdown
            ? "hidden"
            : `flex ${isCartModal ? "justify-start" : "justify-end"} ${
                isPrescriptionNeeded ? "justify-between" : null
              } `
        }
      >
        {isPrescriptionNeeded ? <PrimaryHighlight /> : null}

        {productCount === 0 ? (
          <button
          onClick={handleAddClick}
            className="w-[5.5rem] py-2 px-4 bg-[#7487FF] text-white rounded font-HelveticaNeueMedium"
          >
            ADD
          </button>
        ) : (
          <div className=" min-h-[2.1rem] flex items-center gap-1">
            <button
             onClick={() => handleQuantityChange(productCount - 1)}
              className="py-1 px-2 bg-[#7487FF] rounded text-white w-[1.625rem] h-[1.75rem]"
            >
              <h1>-</h1>
            </button>

            <div className="flex justify-center items-center p-2 rounded bg-white w-4 h-[1.75rem]">
              <h1>{productCount}</h1>
            </div>

            <button
             onClick={() => handleQuantityChange(productCount + 1)}
              className="py-1 px-2 bg-[#7487FF] rounded text-white w-[1.625rem] h-[1.75rem]"
            >
              <h1>+</h1>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

