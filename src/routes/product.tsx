import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductDetails from "../components/ProductDetails";
import ShoppingCart from "../components/ShoppingCart";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  discount?: number;
}

const ProductPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Handle adding product to cart
  const handleAddToCart = (id: string, quantity: number) => {
    // In a real app, you would fetch product details from an API
    // For this example, we'll use hardcoded data
    const productToAdd = {
      id,
      name: "Wireless Bluetooth Headphones",
      price: 129.99,
      discount: 15,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      quantity,
    };

    setCartItems((prevItems) => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex((item) => item.id === id);

      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Add new item to cart
        return [...prevItems, productToAdd];
      }
    });

    // Open cart when adding item
    setIsCartOpen(true);
  };

  // Handle removing item from cart
  const handleRemoveItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Handle updating item quantity
  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  // Handle checkout
  const handleCheckout = (items: CartItem[]) => {
    console.log("Processing checkout for:", items);
    setCartItems([]);
    setIsCartOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header
        cartItemCount={cartItems.reduce(
          (count, item) => count + item.quantity,
          0,
        )}
        onCartOpen={() => setIsCartOpen(true)}
      />
      <main className="flex-grow">
        <ProductDetails
          onAddToCart={handleAddToCart}
          onAddToWishlist={(id) => console.log("Added to wishlist:", id)}
        />
      </main>
      <ShoppingCart
        items={cartItems}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={handleCheckout}
        onApplyCoupon={(coupon) => console.log("Applied coupon:", coupon)}
      />
      <Footer />
    </div>
  );
};

export default ProductPage;
