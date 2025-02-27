import React from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";

interface BannerProps {
  title?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  backgroundColor?: string;
  textColor?: string;
  image?: string;
  onClose?: () => void;
  position?: "top" | "bottom";
  isSticky?: boolean;
}

const Banner = ({
  title = "Special Offer",
  description = "Get 20% off on all products with code SUMMER20",
  ctaText = "Shop Now",
  ctaLink = "/products",
  secondaryCtaText,
  secondaryCtaLink,
  backgroundColor = "bg-blue-600",
  textColor = "text-white",
  image,
  onClose = () => {},
  position = "top",
  isSticky = false,
}: BannerProps) => {
  return (
    <div
      className={`w-full ${backgroundColor} ${textColor} py-3 px-4 md:px-6 ${position === "top" ? "border-b" : "border-t"} ${isSticky ? `sticky ${position === "top" ? "top-0" : "bottom-0"}` : ""} z-40`}
    >
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center space-x-4 mb-2 sm:mb-0">
          {image && (
            <img
              src={image}
              alt="Banner"
              className="h-10 w-10 object-cover rounded-full"
            />
          )}
          <div className="text-center sm:text-left">
            {title && (
              <h3 className="font-bold text-sm md:text-base">{title}</h3>
            )}
            {description && (
              <p className="text-xs md:text-sm opacity-90">{description}</p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {ctaText && (
            <Button
              asChild
              variant="outline"
              className={`text-xs md:text-sm border-white hover:bg-white hover:text-${backgroundColor.replace("bg-", "")}`}
              size="sm"
            >
              <a href={ctaLink}>{ctaText}</a>
            </Button>
          )}

          {secondaryCtaText && secondaryCtaLink && (
            <Button
              asChild
              variant="link"
              className="text-xs md:text-sm text-white hover:text-gray-200"
              size="sm"
            >
              <a href={secondaryCtaLink}>{secondaryCtaText}</a>
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 rounded-full hover:bg-white/20"
            onClick={onClose}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
