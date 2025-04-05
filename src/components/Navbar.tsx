
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, LogIn, UserPlus, Calendar, User, Settings, LogOut, LayoutDashboard } from "lucide-react";
import SearchBar from "./SearchBar";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    // Check if user is logged in (this would normally use an auth system)
    const userLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(userLoggedIn);
    
    // Check if user is admin (this would normally use an auth system with roles)
    const userIsAdmin = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(userIsAdmin);
  }, [location]);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const handleLogin = () => {
    // This is a mock implementation - in a real app, auth would be handled by a backend
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };
  
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isAdmin");
    setIsLoggedIn(false);
    setIsAdmin(false);
  };
  
  // Mock function to set admin status (for demo purposes)
  const toggleAdminStatus = () => {
    const newAdminStatus = !isAdmin;
    localStorage.setItem("isAdmin", newAdminStatus.toString());
    setIsAdmin(newAdminStatus);
  };

  return (
    <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-purple-700">HealHub</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <SearchBar />
          <ul className="flex items-center gap-6">
            <li><Link to="/" className={cn("text-gray-800 hover:text-purple-600 font-medium", location.pathname === "/" ? "text-purple-600" : "")}>Home</Link></li>
            <li><Link to="/services" className={cn("text-gray-800 hover:text-purple-600 font-medium", location.pathname === "/services" ? "text-purple-600" : "")}>Services</Link></li>
            <li><Link to="/doctors" className={cn("text-gray-800 hover:text-purple-600 font-medium", location.pathname === "/doctors" ? "text-purple-600" : "")}>Doctors</Link></li>
            <li><Link to="/appointments" className={cn("text-gray-800 hover:text-purple-600 font-medium", location.pathname === "/appointments" ? "text-purple-600" : "")}>Appointments</Link></li>
          </ul>
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <User size={18} />
                    <span className="hidden sm:inline">My Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                      <User size={16} />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/appointments" className="flex items-center gap-2 cursor-pointer">
                      <Calendar size={16} />
                      <span>My Appointments</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="flex items-center gap-2 cursor-pointer">
                      <Settings size={16} />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/admin" className="flex items-center gap-2 cursor-pointer text-purple-600">
                          <LayoutDashboard size={16} />
                          <span>Admin Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 cursor-pointer text-red-500">
                    <LogOut size={16} />
                    <span>Logout</span>
                  </DropdownMenuItem>
                  {/* Dev only - toggle admin (would be removed in production) */}
                  <DropdownMenuItem onClick={toggleAdminStatus} className="flex items-center gap-2 cursor-pointer text-gray-400 text-xs">
                    <Settings size={14} />
                    <span>{isAdmin ? "Remove Admin" : "Make Admin"}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="flex items-center gap-2" onClick={handleLogin}>
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
              </>
            )}
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
            <li><Link to="/" className="block py-2 text-gray-800 hover:text-purple-600 font-medium">Home</Link></li>
            <li><Link to="/services" className="block py-2 text-gray-800 hover:text-purple-600 font-medium">Services</Link></li>
            <li><Link to="/doctors" className="block py-2 text-gray-800 hover:text-purple-600 font-medium">Doctors</Link></li>
            <li><Link to="/appointments" className="block py-2 text-gray-800 hover:text-purple-600 font-medium">Appointments</Link></li>
          </ul>
          <div className="flex flex-col gap-3">
            {isLoggedIn ? (
              <>
                <Link to="/profile">
                  <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                    <User size={18} />
                    Profile
                  </Button>
                </Link>
                {isAdmin && (
                  <Link to="/admin">
                    <Button variant="outline" className="w-full flex items-center justify-center gap-2 text-purple-600 border-purple-200">
                      <LayoutDashboard size={18} />
                      Admin Dashboard
                    </Button>
                  </Link>
                )}
                <Button 
                  className="bg-red-500 hover:bg-red-600 w-full flex items-center justify-center gap-2"
                  onClick={handleLogout}
                >
                  <LogOut size={18} />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="w-full flex items-center justify-center gap-2" onClick={handleLogin}>
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
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
