import React, { useState } from "react";
import Footer from "../components/Footer";
import ProductCarousel from "../components/ProductCarousel";
import WhyChooseUs from "../components/WhyChooseUs";
import CartItems from "../components/Cart/CartItems";
import EmptyCart from "../components/Cart/EmptyCart";

// import { useCart } from "../CartContext";

const Cart = () => {
  const [needingProducts, setNeedingProducts] = useState(0);
  const [products, setProducts] = useState(0);
  // const { cartItems } = useCart();

  // const { addItemToCart } = useCart();
  // const { removeItemFromCart } = useCart();

  // const handleAddToCart = () => {
  //   addItemToCart(product);
  // };

  // const handleRemoveFromCart = () => {
  //   removeItemFromCart(item.id);
  // };

  return (
    <div>
      {needingProducts + products === 0 ? (
        <EmptyCart />
      ) : (
        <CartItems
          isPrescriptionApproved={false}
          products={products}
          needingProducts={needingProducts}
          setNeedingProducts={setNeedingProducts}
          setProducts={setProducts}
        />
      )}

      <ProductCarousel title="View Similar products" />
      <WhyChooseUs />
      {/* <Footer /> */}
    </div>
  );
};

export default Cart;
