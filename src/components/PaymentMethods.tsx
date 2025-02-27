import React, { useState } from "react";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { CreditCard, DollarSign, CreditCardIcon } from "lucide-react";
import { Separator } from "./ui/separator";

interface PaymentMethodsProps {
  onSelectPaymentMethod: (method: string, data?: any) => void;
  total: number;
}

const PaymentMethods = ({
  onSelectPaymentMethod,
  total,
}: PaymentMethodsProps) => {
  const [selectedMethod, setSelectedMethod] = useState<string>("credit-card");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
  });
  const [pixEmail, setPixEmail] = useState("");

  const handleMethodChange = (value: string) => {
    setSelectedMethod(value);
    onSelectPaymentMethod(value);

    // Show feedback to user
    if (value === "credit-card") {
      console.log("Credit card payment method selected");
    } else if (value === "pix") {
      console.log("PIX payment method selected");
    } else if (value === "mercado-pago") {
      console.log("Mercado Pago payment method selected");
    }
  };

  const handleCardDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Format card number with spaces every 4 digits
    if (name === "number") {
      const formattedValue = value.replace(/\s/g, "").replace(/\D/g, "");
      setCardDetails((prev) => ({
        ...prev,
        [name]: formattedValue,
      }));
    }
    // Format expiry date with slash
    else if (name === "expiry") {
      const formattedValue = value
        .replace(/\D/g, "")
        .replace(/^(\d{2})/, "$1/");
      setCardDetails((prev) => ({
        ...prev,
        [name]: formattedValue,
      }));
    } else {
      setCardDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Update parent component with card details
    if (name === "number" && value.replace(/\D/g, "").length === 16) {
      onSelectPaymentMethod("credit-card", cardDetails);
      console.log("Valid card number entered");
    }
  };

  const handlePixEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPixEmail(e.target.value);
    onSelectPaymentMethod("pix", { email: e.target.value });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Payment Methods</h3>

      <RadioGroup
        value={selectedMethod}
        onValueChange={handleMethodChange}
        className="space-y-3"
      >
        {/* Credit Card Option */}
        <div
          className={`border rounded-md p-4 ${selectedMethod === "credit-card" ? "border-blue-500 bg-blue-50" : ""}`}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="credit-card" id="credit-card" />
            <Label
              htmlFor="credit-card"
              className="flex items-center cursor-pointer"
            >
              <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
              <span>Credit Card</span>
            </Label>
          </div>

          {selectedMethod === "credit-card" && (
            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input
                  id="card-number"
                  name="number"
                  placeholder="1234 5678 9012 3456"
                  value={cardDetails.number}
                  onChange={handleCardDetailsChange}
                  maxLength={16}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="card-name">Cardholder Name</Label>
                <Input
                  id="card-name"
                  name="name"
                  placeholder="John Doe"
                  value={cardDetails.name}
                  onChange={handleCardDetailsChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="card-expiry">Expiry Date</Label>
                  <Input
                    id="card-expiry"
                    name="expiry"
                    placeholder="MM/YY"
                    value={cardDetails.expiry}
                    onChange={handleCardDetailsChange}
                    maxLength={5}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="card-cvc">CVC</Label>
                  <Input
                    id="card-cvc"
                    name="cvc"
                    placeholder="123"
                    value={cardDetails.cvc}
                    onChange={handleCardDetailsChange}
                    maxLength={3}
                    type="password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Processed by Stripe</span>
                <div className="flex space-x-2">
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visa/visa-original.svg"
                    className="h-6"
                    alt="Visa"
                  />
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mastercard/mastercard-original.svg"
                    className="h-6"
                    alt="Mastercard"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Pix Option */}
        <div
          className={`border rounded-md p-4 ${selectedMethod === "pix" ? "border-blue-500 bg-blue-50" : ""}`}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pix" id="pix" />
            <Label htmlFor="pix" className="flex items-center cursor-pointer">
              <svg
                className="h-5 w-5 mr-2"
                viewBox="0 0 512 512"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M112 96H400V416H112V96Z" fill="#32BCAD" />
                <path
                  d="M336 176L256 256L176 176L208 144L256 192L304 144L336 176Z"
                  fill="white"
                />
                <path
                  d="M176 336L256 256L336 336L304 368L256 320L208 368L176 336Z"
                  fill="white"
                />
              </svg>
              <span>PIX</span>
            </Label>
          </div>

          {selectedMethod === "pix" && (
            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pix-email">Email for PIX</Label>
                <Input
                  id="pix-email"
                  type="email"
                  placeholder="your@email.com"
                  value={pixEmail}
                  onChange={handlePixEmailChange}
                />
              </div>

              <div className="bg-gray-100 p-4 rounded-md text-center">
                <p className="text-sm text-gray-600 mb-2">
                  After clicking "Complete Purchase", you'll receive a PIX QR
                  code to scan with your banking app.
                </p>
                <div className="w-32 h-32 mx-auto bg-white p-2 rounded-md flex items-center justify-center">
                  <svg className="w-24 h-24" viewBox="0 0 256 256" fill="none">
                    <rect
                      width="256"
                      height="256"
                      fill="#32BCAD"
                      fillOpacity="0.1"
                    />
                    <path d="M76 76H100V100H76V76Z" fill="#32BCAD" />
                    <path d="M124 76H148V100H124V76Z" fill="#32BCAD" />
                    <path d="M76 124H100V148H76V124Z" fill="#32BCAD" />
                    <path d="M124 124H148V148H124V124Z" fill="#32BCAD" />
                    <path d="M172 76H196V100H172V76Z" fill="#32BCAD" />
                    <path d="M172 124H196V148H172V124Z" fill="#32BCAD" />
                    <path d="M76 172H100V196H76V172Z" fill="#32BCAD" />
                    <path d="M124 172H148V196H124V172Z" fill="#32BCAD" />
                    <path d="M172 172H196V196H172V172Z" fill="#32BCAD" />
                  </svg>
                </div>
                <p className="text-xs text-gray-500 mt-2">Sample QR Code</p>
              </div>
            </div>
          )}
        </div>

        {/* Mercado Pago Option */}
        <div
          className={`border rounded-md p-4 ${selectedMethod === "mercado-pago" ? "border-blue-500 bg-blue-50" : ""}`}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="mercado-pago" id="mercado-pago" />
            <Label
              htmlFor="mercado-pago"
              className="flex items-center cursor-pointer"
            >
              <svg
                className="h-5 w-5 mr-2"
                viewBox="0 0 512 512"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="512" height="512" rx="256" fill="#009EE3" />
                <path
                  d="M339.5 164H172.5C158.4 164 147 175.4 147 189.5V322.5C147 336.6 158.4 348 172.5 348H339.5C353.6 348 365 336.6 365 322.5V189.5C365 175.4 353.6 164 339.5 164Z"
                  fill="white"
                />
                <path
                  d="M256 256C256 238.3 270.3 224 288 224C305.7 224 320 238.3 320 256C320 273.7 305.7 288 288 288C270.3 288 256 273.7 256 256Z"
                  fill="#009EE3"
                />
                <path
                  d="M192 256C192 238.3 206.3 224 224 224C241.7 224 256 238.3 256 256C256 273.7 241.7 288 224 288C206.3 288 192 273.7 192 256Z"
                  fill="#32BCAD"
                />
              </svg>
              <span>Mercado Pago</span>
            </Label>
          </div>

          {selectedMethod === "mercado-pago" && (
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>
                  You'll be redirected to Mercado Pago to complete your payment
                  of ${total.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <img
                  src="https://http2.mlstatic.com/frontend-assets/mp-web-navigation/badge-checkout.svg"
                  className="h-8"
                  alt="Mercado Pago"
                />
              </div>
            </div>
          )}
        </div>
      </RadioGroup>

      <Separator />

      <div className="text-xs text-gray-500">
        <p>
          All payment information is encrypted and securely processed. We do not
          store your payment details.
        </p>
      </div>
    </div>
  );
};

export default PaymentMethods;
