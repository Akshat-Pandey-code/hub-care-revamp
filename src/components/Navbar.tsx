
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, LogIn, UserPlus } from "lucide-react";
import SearchBar from "./SearchBar";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-purple-700">HealHub</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <SearchBar />
          <ul className="flex items-center gap-6">
            <li><a href="/" className="text-gray-800 hover:text-purple-600 font-medium">Home</a></li>
            <li><a href="#services" className="text-gray-800 hover:text-purple-600 font-medium">Services</a></li>
            <li><a href="#doctors" className="text-gray-800 hover:text-purple-600 font-medium">Doctors</a></li>
            <li><a href="#contact" className="text-gray-800 hover:text-purple-600 font-medium">Contact</a></li>
          </ul>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="outline" className="flex items-center gap-2">
                <LogIn size={18} />
                <span className="hidden sm:inline">Login</span>
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2">
                <UserPlus size={18} />
                <span className="hidden sm:inline">Register</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700 hover:text-purple-600"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden absolute w-full bg-white shadow-md transition-all duration-300 ease-in-out overflow-hidden",
        isMenuOpen ? "max-h-screen py-4" : "max-h-0"
      )}>
        <div className="container mx-auto px-4 flex flex-col gap-4">
          <SearchBar />
          <ul className="flex flex-col gap-4">
            <li><a href="/" className="block py-2 text-gray-800 hover:text-purple-600 font-medium">Home</a></li>
            <li><a href="#services" className="block py-2 text-gray-800 hover:text-purple-600 font-medium">Services</a></li>
            <li><a href="#doctors" className="block py-2 text-gray-800 hover:text-purple-600 font-medium">Doctors</a></li>
            <li><a href="#contact" className="block py-2 text-gray-800 hover:text-purple-600 font-medium">Contact</a></li>
          </ul>
          <div className="flex flex-col gap-3">
            <Link to="/login">
              <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <LogIn size={18} />
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-purple-600 hover:bg-purple-700 w-full flex items-center justify-center gap-2">
                <UserPlus size={18} />
                Register
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
