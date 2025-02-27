import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import {
  User,
  Package,
  CreditCard,
  MapPin,
  Heart,
  Settings,
  Bell,
  ShoppingBag,
  Clock,
  CheckCircle,
  Truck,
  AlertCircle,
} from "lucide-react";

interface Order {
  id: string;
  date: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  trackingNumber?: string;
}

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  type: "affiliate" | "dropshipping";
  inStock: boolean;
}

interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

interface PaymentMethod {
  id: string;
  type: "credit" | "paypal" | "other";
  lastFour?: string;
  expiryDate?: string;
  isDefault: boolean;
}

interface UserDashboardProps {
  userName?: string;
  email?: string;
  orders?: Order[];
  wishlist?: WishlistItem[];
  addresses?: Address[];
  paymentMethods?: PaymentMethod[];
  onLogout?: () => void;
}

const UserDashboard = ({
  userName = "John Doe",
  email = "john.doe@example.com",
  orders = [
    {
      id: "ORD-12345",
      date: "2023-06-15",
      status: "delivered" as const,
      total: 129.99,
      items: [
        {
          id: "1",
          name: "Wireless Bluetooth Headphones",
          price: 79.99,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
        },
        {
          id: "2",
          name: "Smart Watch with Fitness Tracking",
          price: 49.99,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
        },
      ],
      trackingNumber: "TRK-987654321",
    },
    {
      id: "ORD-67890",
      date: "2023-07-02",
      status: "shipped" as const,
      total: 89.99,
      items: [
        {
          id: "3",
          name: "Portable Bluetooth Speaker",
          price: 89.99,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
        },
      ],
      trackingNumber: "TRK-123456789",
    },
    {
      id: "ORD-54321",
      date: "2023-07-10",
      status: "processing" as const,
      total: 249.99,
      items: [
        {
          id: "4",
          name: "Smart Home Security System",
          price: 249.99,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1558002038-1055e2dae1d7",
        },
      ],
    },
  ],
  wishlist = [
    {
      id: "1",
      name: "Professional DSLR Camera",
      price: 899.99,
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
      type: "affiliate" as const,
      inStock: true,
    },
    {
      id: "2",
      name: "Ergonomic Office Chair",
      price: 249.99,
      image: "https://images.unsplash.com/photo-1505843490701-5be5d0b19d58",
      type: "affiliate" as const,
      inStock: true,
    },
    {
      id: "3",
      name: "Stainless Steel Water Bottle",
      price: 34.99,
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8",
      type: "dropshipping" as const,
      inStock: true,
    },
  ],
  addresses = [
    {
      id: "addr-1",
      name: "Home",
      street: "123 Main St",
      city: "São Paulo",
      state: "SP",
      zip: "01000-000",
      country: "Brazil",
      isDefault: true,
    },
    {
      id: "addr-2",
      name: "Work",
      street: "456 Business Ave",
      city: "São Paulo",
      state: "SP",
      zip: "04000-000",
      country: "Brazil",
      isDefault: false,
    },
  ],
  paymentMethods = [
    {
      id: "pm-1",
      type: "credit" as const,
      lastFour: "4242",
      expiryDate: "05/25",
      isDefault: true,
    },
    {
      id: "pm-2",
      type: "paypal" as const,
      isDefault: false,
    },
  ],
  onLogout = () => {},
}: UserDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200"
          >
            <Clock className="h-3 w-3 mr-1" /> Pending
          </Badge>
        );
      case "processing":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            <Package className="h-3 w-3 mr-1" /> Processing
          </Badge>
        );
      case "shipped":
        return (
          <Badge
            variant="outline"
            className="bg-indigo-50 text-indigo-700 border-indigo-200"
          >
            <Truck className="h-3 w-3 mr-1" /> Shipped
          </Badge>
        );
      case "delivered":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            <CheckCircle className="h-3 w-3 mr-1" /> Delivered
          </Badge>
        );
      case "cancelled":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200"
          >
            <AlertCircle className="h-3 w-3 mr-1" /> Cancelled
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <User className="h-10 w-10 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold">{userName}</h2>
              <p className="text-gray-500 text-sm">{email}</p>
            </div>
            <Button
              variant="outline"
              className="w-full mb-4"
              onClick={onLogout}
            >
              Sign Out
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="p-4 border-b">
              <h3 className="font-medium">Dashboard Menu</h3>
            </div>
            <nav className="p-2">
              <ul className="space-y-1">
                <li>
                  <Button
                    variant={activeTab === "overview" ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("overview")}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Overview
                  </Button>
                </li>
                <li>
                  <Button
                    variant={activeTab === "orders" ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("orders")}
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Orders
                  </Button>
                </li>
                <li>
                  <Button
                    variant={activeTab === "wishlist" ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("wishlist")}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Wishlist
                  </Button>
                </li>
                <li>
                  <Button
                    variant={activeTab === "addresses" ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("addresses")}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Addresses
                  </Button>
                </li>
                <li>
                  <Button
                    variant={activeTab === "payment" ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("payment")}
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Payment Methods
                  </Button>
                </li>
                <li>
                  <Button
                    variant={activeTab === "settings" ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveTab("settings")}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Account Settings
                  </Button>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">
                      Total Orders
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{orders.length}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">
                      Wishlist Items
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{wishlist.length}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">
                      Saved Addresses
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{addresses.length}</div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  {orders.slice(0, 3).map((order) => (
                    <div key={order.id} className="mb-4 last:mb-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{order.id}</h4>
                          <p className="text-sm text-gray-500">
                            {new Date(order.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center">
                          {getStatusBadge(order.status)}
                          <span className="ml-4 font-medium">
                            ${order.total.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <Separator className="my-2" />
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    className="w-full mt-2"
                    onClick={() => setActiveTab("orders")}
                  >
                    View All Orders
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Account Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={userName}
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        value={email}
                        readOnly
                        className="bg-gray-50"
                      />
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setActiveTab("settings")}
                    >
                      Edit Account Information
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Your Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  {orders.length > 0 ? (
                    <div className="space-y-6">
                      {orders.map((order) => (
                        <div
                          key={order.id}
                          className="border rounded-lg overflow-hidden"
                        >
                          <div className="bg-gray-50 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium">{order.id}</h4>
                                {getStatusBadge(order.status)}
                              </div>
                              <p className="text-sm text-gray-500">
                                Ordered on{" "}
                                {new Date(order.date).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">
                                ${order.total.toFixed(2)}
                              </div>
                              {order.trackingNumber && (
                                <p className="text-xs text-gray-500">
                                  Tracking: {order.trackingNumber}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="p-4">
                            <h5 className="text-sm font-medium mb-2">Items</h5>
                            <div className="space-y-3">
                              {order.items.map((item) => (
                                <div
                                  key={item.id}
                                  className="flex items-center gap-3"
                                >
                                  <div className="h-12 w-12 rounded bg-gray-100 overflow-hidden flex-shrink-0">
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className="h-full w-full object-cover"
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="font-medium text-sm truncate">
                                      {item.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      Qty: {item.quantity} × $
                                      {item.price.toFixed(2)}
                                    </p>
                                  </div>
                                  <div className="text-sm font-medium">
                                    ${(item.price * item.quantity).toFixed(2)}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="bg-gray-50 p-4 flex justify-end">
                            <Button variant="outline" size="sm">
                              View Order Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Package className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium mb-2">
                        No orders yet
                      </h3>
                      <p className="text-gray-500 mb-4">
                        When you place orders, they will appear here.
                      </p>
                      <Button>Start Shopping</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Wishlist Tab */}
            <TabsContent value="wishlist" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Your Wishlist</CardTitle>
                </CardHeader>
                <CardContent>
                  {wishlist.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {wishlist.map((item) => (
                        <div
                          key={item.id}
                          className="border rounded-lg overflow-hidden"
                        >
                          <div className="h-40 bg-gray-100 relative">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                            <Badge
                              className={`absolute top-2 left-2 ${item.type === "affiliate" ? "bg-purple-500" : "bg-blue-500"}`}
                            >
                              {item.type === "affiliate"
                                ? "Affiliate"
                                : "Dropshipping"}
                            </Badge>
                          </div>
                          <div className="p-4">
                            <h4 className="font-medium mb-1 line-clamp-1">
                              {item.name}
                            </h4>
                            <p className="text-lg font-bold mb-3">
                              ${item.price.toFixed(2)}
                            </p>
                            <div className="flex gap-2">
                              <Button
                                className={`flex-1 ${item.type === "affiliate" ? "bg-purple-600 hover:bg-purple-700" : "bg-blue-600 hover:bg-blue-700"}`}
                                size="sm"
                              >
                                {item.type === "affiliate"
                                  ? "Visit Store"
                                  : "Add to Cart"}
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-9 w-9"
                              >
                                <Heart className="h-4 w-4 fill-current" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Heart className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium mb-2">
                        Your wishlist is empty
                      </h3>
                      <p className="text-gray-500 mb-4">
                        Save items you like to your wishlist and they will
                        appear here.
                      </p>
                      <Button>Start Shopping</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Addresses Tab */}
            <TabsContent value="addresses" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Your Addresses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {addresses.map((address) => (
                      <div
                        key={address.id}
                        className={`border rounded-lg p-4 relative ${address.isDefault ? "border-blue-500 bg-blue-50" : ""}`}
                      >
                        {address.isDefault && (
                          <Badge className="absolute top-2 right-2 bg-blue-500">
                            Default
                          </Badge>
                        )}
                        <h4 className="font-medium mb-1">{address.name}</h4>
                        <p className="text-sm text-gray-600 mb-3">
                          {address.street}, {address.city}, {address.state}{" "}
                          {address.zip}, {address.country}
                        </p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          {!address.isDefault && (
                            <Button variant="outline" size="sm">
                              Set as Default
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button>
                    <MapPin className="h-4 w-4 mr-2" /> Add New Address
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Payment Methods Tab */}
            <TabsContent value="payment" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Your Payment Methods
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className={`border rounded-lg p-4 relative ${method.isDefault ? "border-blue-500 bg-blue-50" : ""}`}
                      >
                        {method.isDefault && (
                          <Badge className="absolute top-2 right-2 bg-blue-500">
                            Default
                          </Badge>
                        )}
                        <div className="flex items-center mb-3">
                          {method.type === "credit" ? (
                            <CreditCard className="h-6 w-6 mr-2 text-blue-600" />
                          ) : method.type === "paypal" ? (
                            <div className="h-6 w-6 mr-2 text-blue-600 font-bold">
                              P
                            </div>
                          ) : (
                            <CreditCard className="h-6 w-6 mr-2 text-gray-600" />
                          )}
                          <h4 className="font-medium">
                            {method.type === "credit"
                              ? `Credit Card ending in ${method.lastFour}`
                              : method.type === "paypal"
                                ? "PayPal"
                                : "Other Payment Method"}
                          </h4>
                        </div>
                        {method.expiryDate && (
                          <p className="text-sm text-gray-600 mb-3">
                            Expires: {method.expiryDate}
                          </p>
                        )}
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          {!method.isDefault && (
                            <Button variant="outline" size="sm">
                              Set as Default
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button>
                    <CreditCard className="h-4 w-4 mr-2" /> Add Payment Method
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Account Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="settings-name">Full Name</Label>
                          <Input id="settings-name" defaultValue={userName} />
                        </div>
                        <div>
                          <Label htmlFor="settings-email">Email Address</Label>
                          <Input id="settings-email" defaultValue={email} />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="font-medium">Password</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="current-password">
                            Current Password
                          </Label>
                          <Input id="current-password" type="password" />
                        </div>
                        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="new-password">New Password</Label>
                            <Input id="new-password" type="password" />
                          </div>
                          <div>
                            <Label htmlFor="confirm-password">
                              Confirm New Password
                            </Label>
                            <Input id="confirm-password" type="password" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="font-medium">Notification Preferences</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="font-medium">Order Updates</Label>
                            <p className="text-sm text-gray-500">
                              Receive updates about your orders
                            </p>
                          </div>
                          <Button variant="outline" size="sm" className="gap-2">
                            <Bell className="h-4 w-4" /> Enabled
                          </Button>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="font-medium">
                              Promotional Emails
                            </Label>
                            <p className="text-sm text-gray-500">
                              Receive emails about promotions and discounts
                            </p>
                          </div>
                          <Button variant="outline" size="sm" className="gap-2">
                            <Bell className="h-4 w-4" /> Enabled
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Cancel</Button>
                      <Button>Save Changes</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
