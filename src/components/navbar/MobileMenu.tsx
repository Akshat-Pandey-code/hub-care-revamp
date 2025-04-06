
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const navigate = useNavigate();
  const { user, isAdmin, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="md:hidden mt-4 pb-4">
      <nav className="flex flex-col space-y-3">
        <Link to="/" className="py-2 hover:text-purple-600" onClick={onClose}>
          Home
        </Link>
        <Link to="/doctors" className="py-2 hover:text-purple-600" onClick={onClose}>
          Doctors
        </Link>
        <Link to="/services" className="py-2 hover:text-purple-600" onClick={onClose}>
          Services
        </Link>
        <Link to="/appointments" className="py-2 hover:text-purple-600" onClick={onClose}>
          Appointments
        </Link>
        
        <div className="pt-4 border-t">
          {user ? (
            <>
              {isAdmin && (
                <Button 
                  variant="outline" 
                  className="w-full mb-2" 
                  onClick={() => handleNavigation("/admin")}
                >
                  Admin Dashboard
                </Button>
              )}
              <Button 
                variant="outline" 
                className="w-full mb-2" 
                onClick={() => handleNavigation("/profile")}
              >
                My Profile
              </Button>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline" 
                className="w-full mb-2" 
                onClick={() => handleNavigation("/login")}
              >
                Sign In
              </Button>
              <Button 
                className="w-full" 
                onClick={() => handleNavigation("/register")}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default MobileMenu;
