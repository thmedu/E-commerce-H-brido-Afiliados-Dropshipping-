import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Mail } from "lucide-react";

interface NewsletterModalProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubscribe?: (email: string, preferences: string[]) => void;
  title?: string;
  description?: string;
  image?: string;
}

const NewsletterModal = ({
  isOpen = false,
  onOpenChange = () => {},
  onSubscribe = () => {},
  title = "Join Our Newsletter",
  description = "Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.",
  image = "https://images.unsplash.com/photo-1555421689-491a97ff2040?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
}: NewsletterModalProps) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [preferences, setPreferences] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      onSubscribe(email, preferences);
      setIsLoading(false);
      setIsSuccess(true);

      // Close modal after success
      setTimeout(() => {
        onOpenChange(false);
        // Reset state after modal is closed
        setTimeout(() => {
          setEmail("");
          setIsSuccess(false);
          setPreferences([]);
        }, 300);
      }, 2000);
    }, 1000);
  };

  const togglePreference = (value: string) => {
    setPreferences((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md md:max-w-xl p-0 overflow-hidden bg-white">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="hidden md:block relative h-full">
            <img
              src={image}
              alt="Newsletter"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30 flex items-end p-6">
              <div className="text-white">
                <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
                <p className="text-sm opacity-90">
                  Get the latest products and deals straight to your inbox
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>

            {isSuccess ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-medium mb-2">
                  Thank you for subscribing!
                </h3>
                <p className="text-gray-500 text-sm">
                  You've been added to our mailing list and will receive updates
                  soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Interests (optional)</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "electronics", label: "Electronics" },
                      { id: "fashion", label: "Fashion" },
                      { id: "home", label: "Home & Garden" },
                      { id: "deals", label: "Special Deals" },
                    ].map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={item.id}
                          checked={preferences.includes(item.id)}
                          onCheckedChange={() => togglePreference(item.id)}
                        />
                        <label
                          htmlFor={item.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {item.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Subscribing..." : "Subscribe"}
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">
                    By subscribing, you agree to our{" "}
                    <a
                      href="/privacy"
                      className="text-blue-600 hover:underline"
                    >
                      Privacy Policy
                    </a>{" "}
                    and consent to receive marketing emails.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewsletterModal;
