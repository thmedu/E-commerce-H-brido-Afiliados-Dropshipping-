import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Slider } from "./ui/slider";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Filter, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  type: "affiliate" | "dropshipping";
  affiliateUrl?: string;
  inStock: boolean;
  discount: number;
  category: string;
}

interface ProductGridProps {
  products?: Product[];
  onAddToCart?: (id: string) => void;
}

const ProductGrid = ({
  products = [
    {
      id: "1",
      name: "Wireless Bluetooth Headphones",
      price: 129.99,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      description:
        "Premium noise-cancelling headphones with 30-hour battery life and crystal clear sound quality.",
      type: "dropshipping",
      inStock: true,
      discount: 15,
      category: "Electronics",
    },
    {
      id: "2",
      name: "Smart Fitness Watch",
      price: 199.99,
      image:
        "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
      description:
        "Track your fitness goals with heart rate monitoring, GPS, and 7-day battery life.",
      type: "affiliate",
      affiliateUrl: "https://example.com/fitness-watch",
      inStock: true,
      discount: 0,
      category: "Fitness",
    },
    {
      id: "3",
      name: "Portable Bluetooth Speaker",
      price: 79.99,
      image:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1636&q=80",
      description:
        "Waterproof speaker with 360° sound and 12-hour playtime, perfect for outdoor adventures.",
      type: "dropshipping",
      inStock: true,
      discount: 10,
      category: "Electronics",
    },
    {
      id: "4",
      name: "Professional DSLR Camera",
      price: 899.99,
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1638&q=80",
      description:
        "24.1 megapixel camera with 4K video recording and interchangeable lens system.",
      type: "affiliate",
      affiliateUrl: "https://example.com/dslr-camera",
      inStock: true,
      discount: 0,
      category: "Photography",
    },
    {
      id: "5",
      name: "Smart Home Security System",
      price: 299.99,
      image:
        "https://images.unsplash.com/photo-1558002038-1055e2dae1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      description:
        "Complete home security with motion sensors, cameras, and smartphone alerts.",
      type: "dropshipping",
      inStock: false,
      discount: 0,
      category: "Home",
    },
    {
      id: "6",
      name: "Ergonomic Office Chair",
      price: 249.99,
      image:
        "https://images.unsplash.com/photo-1505843490701-5be5d0b19d58?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      description:
        "Adjustable lumbar support and breathable mesh back for all-day comfort.",
      type: "affiliate",
      affiliateUrl: "https://example.com/office-chair",
      inStock: true,
      discount: 20,
      category: "Furniture",
    },
    {
      id: "7",
      name: "Stainless Steel Water Bottle",
      price: 34.99,
      image:
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80",
      description:
        "Double-walled insulation keeps drinks cold for 24 hours or hot for 12 hours.",
      type: "dropshipping",
      inStock: true,
      discount: 0,
      category: "Lifestyle",
    },
    {
      id: "8",
      name: "Wireless Charging Pad",
      price: 49.99,
      image:
        "https://images.unsplash.com/photo-1608042314453-ae338d80c427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      description:
        "Fast wireless charging for all Qi-enabled devices with sleek, minimalist design.",
      type: "affiliate",
      affiliateUrl: "https://example.com/charging-pad",
      inStock: true,
      discount: 5,
      category: "Electronics",
    },
  ],
  onAddToCart = () => {},
}: ProductGridProps) => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showInStock, setShowInStock] = useState<boolean>(true);

  // Extract unique categories from products
  const categories = [...new Set(products.map((product) => product.category))];

  // Filter products based on active filters
  const filteredProducts = products.filter((product) => {
    // Filter by tab (product type)
    if (activeTab !== "all" && product.type !== activeTab) return false;

    // Filter by search query
    if (
      searchQuery &&
      !product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;

    // Filter by price range
    if (product.price < priceRange[0] || product.price > priceRange[1])
      return false;

    // Filter by selected categories
    if (
      selectedCategories.length > 0 &&
      !selectedCategories.includes(product.category)
    )
      return false;

    // Filter by stock status
    if (showInStock && !product.inStock) return false;

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "discount":
        return b.discount - a.discount;
      default: // featured or any other case
        return 0; // maintain original order
    }
  });

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 py-8 bg-gray-50">
      {/* Filters and Search Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setFilterOpen(!filterOpen)}
            className="md:hidden"
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="w-full md:w-48">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="discount">Biggest Discount</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Badge
            variant="outline"
            className="hidden md:flex gap-1 items-center"
          >
            <span>{sortedProducts.length}</span> Products
          </Badge>
        </div>
      </div>

      {/* Mobile Filters Collapsible */}
      <Collapsible
        open={filterOpen}
        onOpenChange={setFilterOpen}
        className="md:hidden mb-6"
      >
        <CollapsibleContent>
          <div className="p-4 border rounded-lg bg-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" /> Filters
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setPriceRange([0, 1000]);
                  setSelectedCategories([]);
                  setShowInStock(true);
                }}
              >
                Reset
              </Button>
            </div>

            <div className="space-y-6">
              {/* Price Range */}
              <div>
                <Label className="mb-2 block">Price Range</Label>
                <div className="pt-4 px-2">
                  <Slider
                    defaultValue={[0, 1000]}
                    max={1000}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-500">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              <Separator />

              {/* Categories */}
              <div>
                <Label className="mb-2 block">Categories</Label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => handleCategoryToggle(category)}
                      />
                      <label
                        htmlFor={`category-${category}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Stock Status */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="in-stock"
                  checked={showInStock}
                  onCheckedChange={(checked) =>
                    setShowInStock(checked as boolean)
                  }
                />
                <label
                  htmlFor="in-stock"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Show only in-stock items
                </label>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Desktop Filters Sidebar */}
        <div className="hidden md:block w-64 shrink-0">
          <div className="sticky top-4 p-4 border rounded-lg bg-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" /> Filters
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setPriceRange([0, 1000]);
                  setSelectedCategories([]);
                  setShowInStock(true);
                }}
              >
                Reset
              </Button>
            </div>

            <div className="space-y-6">
              {/* Price Range */}
              <div>
                <Label className="mb-2 block">Price Range</Label>
                <div className="pt-4 px-2">
                  <Slider
                    defaultValue={[0, 1000]}
                    max={1000}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-500">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              <Separator />

              {/* Categories */}
              <div>
                <Label className="mb-2 block">Categories</Label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`desktop-category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => handleCategoryToggle(category)}
                      />
                      <label
                        htmlFor={`desktop-category-${category}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Stock Status */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="desktop-in-stock"
                  checked={showInStock}
                  onCheckedChange={(checked) =>
                    setShowInStock(checked as boolean)
                  }
                />
                <label
                  htmlFor="desktop-in-stock"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Show only in-stock items
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Product Type Tabs */}
          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
            className="mb-6"
          >
            <TabsList className="w-full grid grid-cols-3 mb-2">
              <TabsTrigger value="all">All Products</TabsTrigger>
              <TabsTrigger value="dropshipping">Dropshipping</TabsTrigger>
              <TabsTrigger value="affiliate">Affiliate</TabsTrigger>
            </TabsList>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">
                Showing {sortedProducts.length} of {products.length} products
              </p>
              <Badge
                variant="outline"
                className="md:hidden flex gap-1 items-center"
              >
                <span>{sortedProducts.length}</span> Products
              </Badge>
            </div>
          </Tabs>

          {/* Product Grid */}
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  description={product.description}
                  type={product.type}
                  affiliateUrl={product.affiliateUrl}
                  inStock={product.inStock}
                  discount={product.discount}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-gray-100 p-6 mb-4">
                <Search className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-gray-500 max-w-md">
                We couldn't find any products matching your current filters. Try
                adjusting your search or filter criteria.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setPriceRange([0, 1000]);
                  setSelectedCategories([]);
                  setActiveTab("all");
                  setShowInStock(true);
                }}
              >
                Reset all filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
