import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Separator } from "./ui/separator";

interface FooterProps {
  companyName?: string;
  companyLogo?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  categories?: string[];
  legalLinks?: {
    text: string;
    url: string;
  }[];
}

const Footer = ({
  companyName = "E-commerce Híbrido",
  companyLogo = "/vite.svg",
  socialLinks = {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    twitter: "https://twitter.com",
    youtube: "https://youtube.com",
  },
  contactInfo = {
    email: "contact@ecommerce-hibrido.com",
    phone: "+55 11 9999-9999",
    address: "Av. Paulista, 1000 - São Paulo, SP",
  },
  categories = [
    "Electronics",
    "Fashion",
    "Home & Garden",
    "Sports",
    "Beauty",
    "Toys",
  ],
  legalLinks = [
    { text: "Terms of Service", url: "/terms" },
    { text: "Privacy Policy", url: "/privacy" },
    { text: "Refund Policy", url: "/refunds" },
    { text: "Affiliate Program", url: "/affiliate" },
  ],
}: FooterProps) => {
  return (
    <footer className="w-full bg-gray-900 text-white py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <img
                src={companyLogo}
                alt={companyName}
                className="h-8 w-8 mr-2"
              />
              <h3 className="text-xl font-bold">{companyName}</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Your one-stop shop for both affiliate and dropshipping products.
              Find the best deals across multiple platforms or buy directly from
              us.
            </p>
            <div className="flex space-x-4">
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  <Facebook size={20} />
                </a>
              )}
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400 transition-colors"
                >
                  <Instagram size={20} />
                </a>
              )}
              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  <Twitter size={20} />
                </a>
              )}
              {socialLinks.youtube && (
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-500 transition-colors"
                >
                  <Youtube size={20} />
                </a>
              )}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((category, index) => (
                <li key={index}>
                  <a
                    href={`/category/${category.toLowerCase().replace(/ /g, "-")}`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              {contactInfo.email && (
                <li className="flex items-center">
                  <Mail size={16} className="mr-2 text-gray-400" />
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {contactInfo.email}
                  </a>
                </li>
              )}
              {contactInfo.phone && (
                <li className="flex items-center">
                  <Phone size={16} className="mr-2 text-gray-400" />
                  <a
                    href={`tel:${contactInfo.phone.replace(/[^0-9+]/g, "")}`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {contactInfo.phone}
                  </a>
                </li>
              )}
              {contactInfo.address && (
                <li className="flex items-start">
                  <MapPin size={16} className="mr-2 mt-1 text-gray-400" />
                  <span className="text-gray-400">{contactInfo.address}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        <Separator className="bg-gray-700 my-6" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} {companyName}. All rights reserved.
          </p>
          <p className="mt-2 md:mt-0">
            Affiliate & Dropshipping Hybrid Platform
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
