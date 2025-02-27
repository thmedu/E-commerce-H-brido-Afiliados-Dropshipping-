import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Truck, Package, Clock } from "lucide-react";

interface ShippingOption {
  id: string;
  name: string;
  price: number;
  estimatedDays: string;
  icon: React.ReactNode;
}

interface ShippingCalculatorProps {
  subtotal?: number;
  onSelectShipping?: (option: ShippingOption) => void;
  selectedOption?: string;
}

const ShippingCalculator = ({
  subtotal = 0,
  onSelectShipping = () => {},
  selectedOption = "standard",
}: ShippingCalculatorProps) => {
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("BR");
  const [isCalculating, setIsCalculating] = useState(false);
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([
    {
      id: "standard",
      name: "Standard Shipping",
      price: 5.99,
      estimatedDays: "5-7",
      icon: <Truck className="h-4 w-4 text-blue-500" />,
    },
    {
      id: "express",
      name: "Express Shipping",
      price: 12.99,
      estimatedDays: "2-3",
      icon: <Package className="h-4 w-4 text-green-500" />,
    },
    {
      id: "overnight",
      name: "Overnight Shipping",
      price: 24.99,
      estimatedDays: "1",
      icon: <Clock className="h-4 w-4 text-red-500" />,
    },
  ]);

  // Free shipping threshold
  const freeShippingThreshold = 100;
  const isFreeShippingEligible = subtotal >= freeShippingThreshold;

  const calculateShipping = () => {
    if (!zipCode) return;

    setIsCalculating(true);

    // Simulate API call to calculate shipping based on zip code and country
    setTimeout(() => {
      // In a real app, this would be an API call to calculate shipping rates
      // For now, we'll just update the prices based on the country
      const multiplier = country === "BR" ? 1 : country === "US" ? 1.5 : 2;

      setShippingOptions((prev) =>
        prev.map((option) => ({
          ...option,
          price:
            isFreeShippingEligible && option.id === "standard"
              ? 0
              : option.price * multiplier,
        })),
      );

      setIsCalculating(false);
    }, 1000);
  };

  const handleSelectOption = (option: ShippingOption) => {
    onSelectShipping(option);
  };

  return (
    <div className="space-y-4 p-4 border rounded-md bg-gray-50">
      <h3 className="font-medium text-lg">Shipping Options</h3>

      {isFreeShippingEligible && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-md text-sm flex items-center">
          <Package className="h-4 w-4 mr-2" />
          You qualify for free standard shipping!
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="country">Country</Label>
          <Select value={country} onValueChange={setCountry}>
            <SelectTrigger id="country">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="BR">Brazil</SelectItem>
              <SelectItem value="US">United States</SelectItem>
              <SelectItem value="CA">Canada</SelectItem>
              <SelectItem value="MX">Mexico</SelectItem>
              <SelectItem value="UK">United Kingdom</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="zipCode">Postal/Zip Code</Label>
          <div className="flex">
            <Input
              id="zipCode"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              placeholder="Enter postal code"
              className="flex-1"
            />
            <Button
              onClick={calculateShipping}
              disabled={!zipCode || isCalculating}
              className="ml-2"
            >
              {isCalculating ? "Calculating..." : "Calculate"}
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-3 mt-4">
        {shippingOptions.map((option) => (
          <div
            key={option.id}
            className={`border rounded-md p-3 cursor-pointer transition-colors ${selectedOption === option.id ? "border-blue-500 bg-blue-50" : "hover:border-gray-300"}`}
            onClick={() => handleSelectOption(option)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {option.icon}
                <div className="ml-3">
                  <div className="font-medium">{option.name}</div>
                  <div className="text-sm text-gray-500">
                    Estimated delivery: {option.estimatedDays} business days
                  </div>
                </div>
              </div>
              <div className="font-medium">
                {option.price === 0 ? (
                  <span className="text-green-600">FREE</span>
                ) : (
                  `$${option.price.toFixed(2)}`
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShippingCalculator;
