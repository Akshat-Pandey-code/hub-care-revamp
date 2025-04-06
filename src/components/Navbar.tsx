
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import NavLinks from "./navbar/NavLinks";
import AuthButtons from "./navbar/AuthButtons";
import MobileMenu from "./navbar/MobileMenu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLinks />
          </div>

          {/* User Authentication Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <AuthButtons />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </div>
    </header>
  );
};

export default Navbar;
