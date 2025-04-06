
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const AuthButtons = () => {
  const navigate = useNavigate();
  const { user, isAdmin, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (user) {
    return (
      <>
        {isAdmin && (
          <Button variant="outline" onClick={() => navigate("/admin")}>
            Admin Dashboard
          </Button>
        )}
        <Button variant="outline" onClick={() => navigate("/profile")}>
          My Profile
        </Button>
        <Button variant="outline" onClick={handleSignOut}>
          Sign Out
        </Button>
      </>
    );
  }

  return (
    <>
      <Button variant="outline" onClick={() => navigate("/login")}>
        Sign In
      </Button>
      <Button onClick={() => navigate("/register")}>Sign Up</Button>
    </>
  );
};

export default AuthButtons;
