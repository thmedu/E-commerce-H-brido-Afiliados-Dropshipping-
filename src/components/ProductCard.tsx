import React from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { ExternalLink, ShoppingCart } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface ProductCardProps {
  id?: string;
  name?: string;
  price?: number;
  image?: string;
  description?: string;
  type?: "affiliate" | "dropshipping";
  affiliateUrl?: string;
  inStock?: boolean;
  discount?: number;
  onAddToCart?: (id: string) => void;
}

const ProductCard = ({
  id = "1",
  name = "Product Name",
  price = 99.99,
  image = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1399&q=80",
  description = "This is a sample product description that highlights the features of this amazing product.",
  type = "dropshipping",
  affiliateUrl = "https://example.com/product",
  inStock = true,
  discount = 0,
  onAddToCart = () => {},
}: ProductCardProps) => {
  const discountedPrice =
    discount > 0 ? price - (price * discount) / 100 : price;

  return (
    <Card className="w-80 h-[420px] overflow-hidden flex flex-col bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {discount > 0 && (
          <Badge className="absolute top-2 right-2 bg-red-500">
            {discount}% OFF
          </Badge>
        )}
        <Badge
          className={`absolute top-2 left-2 ${type === "affiliate" ? "bg-purple-500" : "bg-blue-500"}`}
        >
          {type === "affiliate" ? "Affiliate" : "Dropshipping"}
        </Badge>
      </div>

      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-lg font-semibold line-clamp-2">
          {name}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-4 pt-2 flex-grow">
        <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
        <div className="mt-2 flex items-center">
          {discount > 0 ? (
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">
                ${discountedPrice.toFixed(2)}
              </span>
              <span className="text-sm text-gray-500 line-through">
                ${price.toFixed(2)}
              </span>
            </div>
          ) : (
            <span className="text-lg font-bold text-gray-900">
              ${price.toFixed(2)}
            </span>
          )}

          {!inStock && type === "dropshipping" && (
            <span className="ml-auto text-xs text-red-500 font-medium">
              Out of stock
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        {type === "affiliate" ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  onClick={() => window.open(affiliateUrl, "_blank")}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visit Store
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>You will be redirected to partner store</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={() => onAddToCart(id)}
            disabled={!inStock}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
