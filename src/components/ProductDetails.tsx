import React, { useState } from "react";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  ShieldCheck,
  RotateCcw,
  ExternalLink,
  Plus,
  Minus,
} from "lucide-react";
import ShippingCalculator from "./ShippingCalculator";

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  helpful: number;
}

interface ProductDetailsProps {
  id?: string;
  name?: string;
  price?: number;
  discount?: number;
  description?: string;
  images?: string[];
  type?: "affiliate" | "dropshipping";
  affiliateUrl?: string;
  inStock?: boolean;
  category?: string;
  brand?: string;
  sku?: string;
  features?: string[];
  specifications?: { [key: string]: string };
  reviews?: Review[];
  rating?: number;
  reviewCount?: number;
  relatedProducts?: {
    id: string;
    name: string;
    price: number;
    image: string;
  }[];
  onAddToCart?: (id: string, quantity: number) => void;
  onAddToWishlist?: (id: string) => void;
}

const ProductDetails = ({
  id = "1",
  name = "Wireless Bluetooth Headphones",
  price = 129.99,
  discount = 15,
  description = "Premium noise-cancelling headphones with 30-hour battery life and crystal clear sound quality. Perfect for travel, work, or everyday use with comfortable over-ear design and advanced Bluetooth 5.0 technology.",
  images = [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1465&q=80",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1384&q=80",
  ],
  type = "dropshipping",
  affiliateUrl = "https://example.com/product",
  inStock = true,
  category = "Electronics",
  brand = "SoundMaster",
  sku = "SM-WH-100",
  features = [
    "Active Noise Cancellation",
    "30-hour battery life",
    "Bluetooth 5.0 connectivity",
    "Built-in microphone for calls",
    "Foldable design for easy storage",
    "Quick charge: 5 minutes for 2 hours of playback",
  ],
  specifications = {
    "Driver Size": "40mm",
    "Frequency Response": "20Hz - 20kHz",
    Impedance: "32 Ohm",
    "Battery Capacity": "500mAh",
    "Charging Time": "2 hours",
    Weight: "250g",
    Connectivity: "Bluetooth 5.0, 3.5mm jack",
    "Wireless Range": "10m (33ft)",
  },
  reviews = [
    {
      id: "r1",
      author: "John D.",
      rating: 5,
      date: "2023-05-15",
      title: "Best headphones I've ever owned",
      content:
        "These headphones are amazing! The sound quality is crystal clear, and the noise cancellation works perfectly. Battery life is impressive too - I've been using them for a week on a single charge.",
      helpful: 24,
    },
    {
      id: "r2",
      author: "Sarah M.",
      rating: 4,
      date: "2023-04-28",
      title: "Great sound, slightly tight fit",
      content:
        "The sound quality and noise cancellation are excellent. My only complaint is that they feel a bit tight on my head after a few hours of use. Otherwise, they're perfect!",
      helpful: 15,
    },
    {
      id: "r3",
      author: "Michael T.",
      rating: 5,
      date: "2023-04-10",
      title: "Worth every penny",
      content:
        "I was hesitant to spend this much on headphones, but they are absolutely worth it. The sound is incredible, they're comfortable for long periods, and the battery lasts forever. Highly recommend!",
      helpful: 32,
    },
  ],
  rating = 4.7,
  reviewCount = 142,
  relatedProducts = [
    {
      id: "2",
      name: "Portable Bluetooth Speaker",
      price: 79.99,
      image:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1636&q=80",
    },
    {
      id: "3",
      name: "Wireless Earbuds",
      price: 89.99,
      image:
        "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1378&q=80",
    },
    {
      id: "4",
      name: "Noise Cancelling Headphones",
      price: 149.99,
      image:
        "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1388&q=80",
    },
  ],
  onAddToCart = () => {},
  onAddToWishlist = () => {},
}: ProductDetailsProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showShipping, setShowShipping] = useState(false);

  const discountedPrice =
    discount > 0 ? price - (price * discount) / 100 : price;

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);
  };

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : i < rating ? "text-yellow-400 fill-yellow-400 opacity-50" : "text-gray-300"}`}
        />
      ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div>
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 mb-4">
            <img
              src={images[selectedImage]}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {images.map((image, index) => (
              <div
                key={index}
                className={`aspect-square rounded-md overflow-hidden bg-gray-100 cursor-pointer ${selectedImage === index ? "ring-2 ring-blue-500" : ""}`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image}
                  alt={`${name} - view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <Badge
                className={`${type === "affiliate" ? "bg-purple-500" : "bg-blue-500"} mr-2`}
              >
                {type === "affiliate" ? "Affiliate" : "Dropshipping"}
              </Badge>
              <span className="text-sm text-gray-500">{category}</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">{name}</h1>
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-2">
                {renderStars(rating)}
                <span className="ml-2 text-sm font-medium">{rating}</span>
              </div>
              <span className="text-sm text-gray-500">
                ({reviewCount} reviews)
              </span>
            </div>

            <div className="mb-4">
              {discount > 0 ? (
                <div className="flex items-center">
                  <span className="text-3xl font-bold text-gray-900 mr-2">
                    ${discountedPrice.toFixed(2)}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    ${price.toFixed(2)}
                  </span>
                  <Badge className="ml-2 bg-red-500">{discount}% OFF</Badge>
                </div>
              ) : (
                <span className="text-3xl font-bold text-gray-900">
                  ${price.toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-gray-600 mb-6">{description}</p>

            <div className="mb-6">
              <div className="flex items-center mb-2">
                <span className="font-medium mr-2">Brand:</span>
                <span>{brand}</span>
              </div>
              <div className="flex items-center mb-2">
                <span className="font-medium mr-2">SKU:</span>
                <span>{sku}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium mr-2">Availability:</span>
                {inStock ? (
                  <span className="text-green-600">In Stock</span>
                ) : (
                  <span className="text-red-600">Out of Stock</span>
                )}
              </div>
            </div>

            {type === "dropshipping" ? (
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="flex items-center border rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-none"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-none"
                      onClick={() => handleQuantityChange(1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 flex-1"
                    size="lg"
                    onClick={() => onAddToCart(id, quantity)}
                    disabled={!inStock}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-12 w-12"
                    onClick={() => onAddToWishlist(id)}
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-12 w-12"
                    onClick={() =>
                      navigator.share({ url: window.location.href })
                    }
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>

                <Button
                  variant="link"
                  className="text-blue-600 p-0 h-auto"
                  onClick={() => setShowShipping(!showShipping)}
                >
                  Calculate Shipping
                </Button>

                {showShipping && (
                  <div className="mt-2">
                    <ShippingCalculator subtotal={discountedPrice * quantity} />
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <Button
                  className="bg-purple-600 hover:bg-purple-700 w-full"
                  size="lg"
                  onClick={() => window.open(affiliateUrl, "_blank")}
                >
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Visit Partner Store
                </Button>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => onAddToWishlist(id)}
                  >
                    <Heart className="mr-2 h-5 w-5" />
                    Save for Later
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-12 w-12"
                    onClick={() =>
                      navigator.share({ url: window.location.href })
                    }
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center">
                <Truck className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-sm">Free shipping over $100</span>
              </div>
              <div className="flex items-center">
                <ShieldCheck className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-sm">Secure payment</span>
              </div>
              <div className="flex items-center">
                <RotateCcw className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-sm">30-day returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mb-12">
        <Tabs defaultValue="features">
          <TabsList className="w-full grid grid-cols-3 mb-6">
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent
            value="features"
            className="p-6 border rounded-lg bg-white"
          >
            <h3 className="text-lg font-bold mb-4">Product Features</h3>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2 mt-0.5">
                    <span className="text-blue-600 text-xs font-bold">
                      {index + 1}
                    </span>
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </TabsContent>

          <TabsContent
            value="specifications"
            className="p-6 border rounded-lg bg-white"
          >
            <h3 className="text-lg font-bold mb-4">Technical Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(specifications).map(([key, value], index) => (
                <div key={index} className="flex">
                  <span className="font-medium w-1/2">{key}:</span>
                  <span className="w-1/2">{value}</span>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent
            value="reviews"
            className="p-6 border rounded-lg bg-white"
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <h3 className="text-lg font-bold mb-2">Customer Reviews</h3>
                <div className="flex items-center mb-4">
                  <div className="flex mr-2">{renderStars(rating)}</div>
                  <span className="text-lg font-bold">{rating} out of 5</span>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  Based on {reviewCount} reviews
                </p>
                <Button className="w-full">Write a Review</Button>
              </div>

              <div className="md:w-2/3">
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b pb-6 last:border-0"
                    >
                      <div className="flex justify-between mb-2">
                        <h4 className="font-bold">{review.title}</h4>
                        <div className="flex">{renderStars(review.rating)}</div>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <span>{review.author}</span>
                        <span className="mx-2">•</span>
                        <span>
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{review.content}</p>
                      <div className="flex items-center">
                        <Button variant="ghost" size="sm">
                          Helpful ({review.helpful})
                        </Button>
                        <Separator
                          orientation="vertical"
                          className="h-4 mx-2"
                        />
                        <Button variant="ghost" size="sm">
                          Report
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg overflow-hidden bg-white"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-lg font-bold mb-3">
                  ${product.price.toFixed(2)}
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
