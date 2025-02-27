import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import {
  X,
  Minus,
  Plus,
  ShoppingCart as CartIcon,
  CreditCard,
  Truck,
  MapPin,
} from "lucide-react";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  discount?: number;
}

interface ShoppingCartProps {
  items?: CartItem[];
  isOpen?: boolean;
  onClose?: () => void;
  onRemoveItem?: (id: string) => void;
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onCheckout?: (items: CartItem[]) => void;
  onApplyCoupon?: (coupon: string) => void;
}

const ShoppingCart = ({
  items = [
    {
      id: "1",
      name: "Wireless Bluetooth Headphones",
      price: 79.99,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      quantity: 1,
      discount: 10,
    },
    {
      id: "2",
      name: "Smart Watch with Fitness Tracking",
      price: 129.99,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1399&q=80",
      quantity: 2,
    },
  ],
  isOpen = true,
  onClose = () => {},
  onRemoveItem = () => {},
  onUpdateQuantity = () => {},
  onCheckout = () => {},
  onApplyCoupon = () => {},
}: ShoppingCartProps) => {
  const [couponCode, setCouponCode] = useState("");
  const [checkoutDialogOpen, setCheckoutDialogOpen] = useState(false);

  // Calculate totals
  const subtotal = items.reduce((total, item) => {
    const itemPrice = item.discount
      ? item.price - item.price * (item.discount / 100)
      : item.price;
    return total + itemPrice * item.quantity;
  }, 0);

  const [selectedShipping, setSelectedShipping] = useState<{
    id: string;
    name: string;
    price: number;
    estimatedDays: string;
  }>({
    id: "standard",
    name: "Standard Shipping",
    price: 5.99,
    estimatedDays: "5-7",
  });

  const shipping =
    subtotal > 0
      ? subtotal >= 100 && selectedShipping.id === "standard"
        ? 0
        : selectedShipping.price
      : 0;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const handleQuantityChange = (id: string, change: number) => {
    const item = items.find((item) => item.id === id);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + change);
      onUpdateQuantity(id, newQuantity);
    }
  };

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      onApplyCoupon(couponCode);
      setCouponCode("");
    }
  };

  const handleCheckout = () => {
    setCheckoutDialogOpen(false);
    onCheckout(items);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <CartIcon className="h-5 w-5" />
          {items.length > 0 && (
            <Badge className="absolute -top-2 -right-2 px-1.5 py-0.5 bg-blue-600">
              {items.reduce((count, item) => count + item.quantity, 0)}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md bg-white">
        <SheetHeader className="pb-4">
          <SheetTitle className="text-xl font-bold">Your Cart</SheetTitle>
          <SheetDescription>
            {items.length === 0
              ? "Your cart is empty"
              : `You have ${items.reduce((count, item) => count + item.quantity, 0)} items in your cart`}
          </SheetDescription>
        </SheetHeader>

        <Separator />

        {items.length > 0 ? (
          <>
            <ScrollArea className="flex-1 my-4 h-[calc(100vh-300px)]">
              <div className="space-y-4 pr-4">
                {items.map((item) => {
                  const discountedPrice = item.discount
                    ? item.price - item.price * (item.discount / 100)
                    : item.price;

                  return (
                    <div key={item.id} className="flex gap-4 py-2">
                      <div className="h-20 w-20 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium line-clamp-2">
                          {item.name}
                        </h4>
                        <div className="flex items-center mt-1">
                          {item.discount ? (
                            <div className="flex items-center gap-1">
                              <span className="text-sm font-bold">
                                ${discountedPrice.toFixed(2)}
                              </span>
                              <span className="text-xs text-gray-500 line-through">
                                ${item.price.toFixed(2)}
                              </span>
                            </div>
                          ) : (
                            <span className="text-sm font-bold">
                              ${item.price.toFixed(2)}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border rounded-md">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-none"
                              onClick={() => handleQuantityChange(item.id, -1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-none"
                              onClick={() => handleQuantityChange(item.id, 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-500 hover:text-red-500"
                            onClick={() => onRemoveItem(item.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>

            <Separator className="my-4" />

            <div className="space-y-4">
              <div className="flex items-center">
                <Input
                  placeholder="Coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  className="ml-2"
                  onClick={handleApplyCoupon}
                >
                  Apply
                </Button>
              </div>

              <div className="space-y-4">
                {/* Shipping Calculator */}
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="flex items-center mb-2">
                    <Truck className="h-4 w-4 mr-2 text-gray-500" />
                    <h4 className="text-sm font-medium">Shipping Options</h4>
                  </div>

                  <div className="space-y-2">
                    {[
                      {
                        id: "standard",
                        name: "Standard Shipping",
                        price: 5.99,
                        estimatedDays: "5-7",
                      },
                      {
                        id: "express",
                        name: "Express Shipping",
                        price: 12.99,
                        estimatedDays: "2-3",
                      },
                      {
                        id: "overnight",
                        name: "Overnight Shipping",
                        price: 24.99,
                        estimatedDays: "1",
                      },
                    ].map((option) => {
                      const isSelected = selectedShipping.id === option.id;
                      const isFreeStandard =
                        subtotal >= 100 && option.id === "standard";
                      const displayPrice = isFreeStandard ? 0 : option.price;

                      return (
                        <div
                          key={option.id}
                          className={`flex items-center justify-between p-2 rounded-md cursor-pointer border ${isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
                          onClick={() => setSelectedShipping(option)}
                        >
                          <div>
                            <div className="text-sm font-medium">
                              {option.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {option.estimatedDays} business days
                            </div>
                          </div>
                          <div className="font-medium text-sm">
                            {displayPrice === 0 ? (
                              <span className="text-green-600">FREE</span>
                            ) : (
                              `${displayPrice.toFixed(2)}`
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {subtotal >= 100 && (
                    <div className="text-xs text-green-600 mt-2 flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      Free standard shipping on orders over $100
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <SheetFooter className="mt-6">
              <Dialog
                open={checkoutDialogOpen}
                onOpenChange={setCheckoutDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Proceed to Checkout
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-white">
                  <DialogHeader>
                    <DialogTitle>Checkout</DialogTitle>
                    <DialogDescription>
                      Complete your purchase by providing payment details
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Order Summary</h4>
                      <div className="bg-gray-50 p-3 rounded-md">
                        <div className="space-y-1">
                          {items.map((item) => (
                            <div
                              key={item.id}
                              className="flex justify-between text-sm"
                            >
                              <span>
                                {item.name} (x{item.quantity})
                              </span>
                              <span>
                                $
                                {(
                                  (item.discount
                                    ? item.price -
                                      (item.price * item.discount) / 100
                                    : item.price) * item.quantity
                                ).toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>
                        <Separator className="my-2" />
                        <div className="flex justify-between font-medium">
                          <span>Total</span>
                          <span>${total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Payment form would go here in a real implementation */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Payment Method</h4>
                      <div className="border rounded-md p-3">
                        <div className="flex items-center">
                          <CreditCard className="h-5 w-5 mr-2 text-gray-500" />
                          <span className="text-sm">Credit Card</span>
                        </div>
                        {/* Payment form fields would go here */}
                      </div>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setCheckoutDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={handleCheckout}
                    >
                      Complete Purchase
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
            <CartIcon className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">
              Your cart is empty
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Add some products to your cart to see them here
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCart;
