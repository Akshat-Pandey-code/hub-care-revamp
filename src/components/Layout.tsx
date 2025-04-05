
import React from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>{children}</main>
      <footer className="bg-purple-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 HealHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
