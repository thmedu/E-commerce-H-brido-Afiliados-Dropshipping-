import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  ShoppingCart,
  Search,
  User,
  Menu,
  X,
  Heart,
  LogOut,
  Settings,
  ShoppingBag,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Badge } from "./ui/badge";

interface HeaderProps {
  cartItemCount?: number;
  onCartOpen?: () => void;
  onSearch?: (query: string) => void;
  isLoggedIn?: boolean;
  userName?: string;
  userAvatar?: string;
  onLogout?: () => void;
}

const Header = ({
  cartItemCount = 0,
  onCartOpen = () => {},
  onSearch = () => {},
  isLoggedIn = false,
  userName = "Guest User",
  userAvatar = "",
  onLogout = () => {},
}: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="w-full h-20 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto h-full px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <ShoppingBag className="h-8 w-8 text-blue-600 mr-2" />
            <span className="text-xl font-bold text-gray-900">HybridShop</span>
          </a>
        </div>

        {/* Search Bar - Hidden on mobile */}
        <div className="hidden md:flex flex-1 max-w-xl mx-4">
          <form onSubmit={handleSearch} className="w-full relative">
            <Input
              type="text"
              placeholder="Search for products..."
              className="w-full pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full"
            >
              <Search className="h-5 w-5 text-gray-500" />
            </Button>
          </form>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Wishlist */}
          <Button variant="ghost" size="icon">
            <Heart className="h-5 w-5 text-gray-700" />
          </Button>

          {/* Cart */}
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={onCartOpen}
          >
            <ShoppingCart className="h-5 w-5 text-gray-700" />
            {cartItemCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-blue-600">
                {cartItemCount}
              </Badge>
            )}
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                {userAvatar ? (
                  <img
                    src={userAvatar}
                    alt={userName}
                    className="h-8 w-8 rounded-full"
                  />
                ) : (
                  <User className="h-5 w-5 text-gray-700" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {isLoggedIn ? (
                <>
                  <div className="flex items-center p-2">
                    <div className="ml-2">
                      <p className="text-sm font-medium">{userName}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>My Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    <span>My Orders</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Heart className="mr-2 h-4 w-4" />
                    <span>Wishlist</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem>
                    <span>Sign In</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Register</span>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={onCartOpen}
          >
            <ShoppingCart className="h-5 w-5 text-gray-700" />
            {cartItemCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-blue-600">
                {cartItemCount}
              </Badge>
            )}
          </Button>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-gray-700" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw] sm:w-[350px]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="absolute right-4 top-4"
                >
                  <X className="h-4 w-4" />
                </Button>
              </SheetHeader>

              <div className="py-4">
                <form onSubmit={handleSearch} className="w-full relative mb-6">
                  <Input
                    type="text"
                    placeholder="Search for products..."
                    className="w-full pr-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full"
                  >
                    <Search className="h-5 w-5 text-gray-500" />
                  </Button>
                </form>

                <div className="space-y-4">
                  {isLoggedIn ? (
                    <>
                      <div className="flex items-center p-2 border-b pb-4">
                        {userAvatar ? (
                          <img
                            src={userAvatar}
                            alt={userName}
                            className="h-10 w-10 rounded-full mr-3"
                          />
                        ) : (
                          <User className="h-10 w-10 rounded-full mr-3 p-2 bg-gray-100" />
                        )}
                        <div>
                          <p className="text-sm font-medium">{userName}</p>
                        </div>
                      </div>
                      <Button variant="ghost" className="w-full justify-start">
                        <User className="mr-2 h-4 w-4" />
                        <span>My Account</span>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        <span>My Orders</span>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        <Heart className="mr-2 h-4 w-4" />
                        <span>Wishlist</span>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={onLogout}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Logout</span>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="default" className="w-full">
                        Sign In
                      </Button>
                      <Button variant="outline" className="w-full">
                        Register
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
