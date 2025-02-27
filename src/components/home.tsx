import React, { useState, useEffect } from "react";
import Header from "./Header";
import ProductGrid from "./ProductGrid";
import ShoppingCart from "./ShoppingCart";
import Footer from "./Footer";
import Banner from "./Banner";
import CategorySection from "./CategorySection";
import NewsletterModal from "./NewsletterModal";
import AuthModal from "./AuthModal";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  discount?: number;
}

const Home = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showBanner, setShowBanner] = useState(true);
  const [showNewsletterModal, setShowNewsletterModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Guest User");

  // Show newsletter modal after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNewsletterModal(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Handle adding product to cart
  const handleAddToCart = (id: string) => {
    // Find the product in the default products list (in a real app, this would come from an API)
    const defaultProducts = ProductGrid({}).products || [];
    const productToAdd = defaultProducts.find((product) => product.id === id);

    if (!productToAdd) return;

    setCartItems((prevItems) => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex((item) => item.id === id);

      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        // Add new item to cart
        return [
          ...prevItems,
          {
            id: productToAdd.id,
            name: productToAdd.name,
            price: productToAdd.price,
            image: productToAdd.image,
            quantity: 1,
            discount: productToAdd.discount,
          },
        ];
      }
    });

    // Open cart when adding item
    setIsCartOpen(true);

    // Show confirmation message
    alert("Item added to cart successfully!");
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

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Handle checkout
  const handleCheckout = (items: CartItem[]) => {
    // In a real app, this would process the checkout
    console.log("Processing checkout for:", items);
    // Clear cart after successful checkout
    setCartItems([]);
    setIsCartOpen(false);
  };

  // Handle login
  const handleLogin = (email: string, password: string) => {
    console.log("Login with:", email, password);
    setIsLoggedIn(true);
    setUserName(email.split("@")[0]);
    setShowAuthModal(false);
  };

  // Handle register
  const handleRegister = (name: string, email: string, password: string) => {
    console.log("Register with:", name, email, password);
    setIsLoggedIn(true);
    setUserName(name);
    setShowAuthModal(false);
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("Guest User");
  };

  // Handle newsletter subscription
  const handleNewsletterSubscribe = (email: string, preferences: string[]) => {
    console.log("Newsletter subscription:", email, preferences);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Top Banner */}
      {showBanner && (
        <Banner
          title="Special Offer"
          description="Free shipping on orders over $100. Limited time only!"
          ctaText="Shop Now"
          ctaLink="/products"
          backgroundColor="bg-blue-600"
          onClose={() => setShowBanner(false)}
        />
      )}

      {/* Header with cart integration */}
      <Header
        cartItemCount={cartItems.reduce(
          (count, item) => count + item.quantity,
          0,
        )}
        onCartOpen={() => setIsCartOpen(true)}
        onSearch={handleSearch}
        isLoggedIn={isLoggedIn}
        userName={userName}
        onLogout={handleLogout}
      />

      {/* Main content */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Hero section */}
          <section className="mb-12">
            <div className="relative rounded-xl overflow-hidden h-[400px] md:h-[500px] bg-gradient-to-r from-blue-600 to-purple-600">
              <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 text-white">
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                  Shop Smarter, Not Harder
                </h1>
                <p className="text-lg md:text-xl mb-6 max-w-lg">
                  Discover the best products from multiple platforms or buy
                  directly from us with fast shipping.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition-colors">
                    Shop Dropshipping
                  </button>
                  <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-md font-medium transition-colors">
                    Explore Affiliate Deals
                  </button>
                  <button
                    className="bg-transparent border border-white text-white hover:bg-white/20 px-6 py-3 rounded-md font-medium transition-colors"
                    onClick={() => setShowAuthModal(true)}
                  >
                    {isLoggedIn ? "My Account" : "Sign In"}
                  </button>
                </div>
              </div>
              <div className="absolute right-0 bottom-0 w-1/3 h-full hidden lg:block">
                <img
                  src="https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Shopping bags"
                  className="object-cover h-full w-full opacity-80"
                />
              </div>
            </div>
          </section>

          {/* Category Section */}
          <CategorySection
            onCategoryClick={(categoryId) =>
              console.log("Category clicked:", categoryId)
            }
          />

          {/* Product grid with filtering */}
          <section className="py-12">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Featured Products
            </h2>
            <ProductGrid onAddToCart={handleAddToCart} />
          </section>
        </div>
      </main>

      {/* Shopping cart */}
      <ShoppingCart
        items={cartItems}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={handleCheckout}
        onApplyCoupon={(coupon) => console.log("Applied coupon:", coupon)}
      />

      {/* Footer */}
      <Footer />

      {/* Newsletter Modal */}
      <NewsletterModal
        isOpen={showNewsletterModal}
        onOpenChange={setShowNewsletterModal}
        onSubscribe={handleNewsletterSubscribe}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onOpenChange={setShowAuthModal}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onSocialLogin={(provider) =>
          console.log(`Social login with ${provider}`)
        }
      />
    </div>
  );
};

export default Home;
