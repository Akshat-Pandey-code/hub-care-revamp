
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  UserCog, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  Menu,
  Home
} from "lucide-react";
import SearchBar from "../SearchBar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };
  
  const navItems = [
    { 
      title: "Dashboard", 
      icon: <LayoutDashboard className="h-5 w-5" />, 
      href: "/admin" 
    },
    { 
      title: "Patients", 
      icon: <Users className="h-5 w-5" />, 
      href: "/admin/patients" 
    },
    { 
      title: "Appointments", 
      icon: <Calendar className="h-5 w-5" />, 
      href: "/admin/appointments" 
    },
    { 
      title: "Staff", 
      icon: <UserCog className="h-5 w-5" />, 
      href: "/admin/staff" 
    },
    { 
      title: "Settings", 
      icon: <Settings className="h-5 w-5" />, 
      href: "/admin/settings" 
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar for desktop */}
      <aside 
        className={`fixed top-0 left-0 h-full bg-white shadow-md z-40 transition-all duration-300 ease-in-out 
          ${sidebarCollapsed ? 'w-20' : 'w-64'} 
          hidden md:block`}
      >
        <div className="p-4 flex items-center justify-between border-b">
          <Link to="/admin" className={`flex items-center ${sidebarCollapsed ? 'justify-center' : ''}`}>
            {!sidebarCollapsed && <span className="text-xl font-bold text-purple-700">HealHub Admin</span>}
            {sidebarCollapsed && <LayoutDashboard className="h-6 w-6 text-purple-700" />}
          </Link>
          <button 
            onClick={toggleSidebar}
            className="text-gray-500 hover:text-purple-700"
          >
            {sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item, idx) => (
              <li key={idx}>
                <Link 
                  to={item.href}
                  className="flex items-center py-2 px-4 rounded-md hover:bg-purple-50 text-gray-700 hover:text-purple-700"
                >
                  {item.icon}
                  {!sidebarCollapsed && <span className="ml-3">{item.title}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className={`absolute bottom-0 w-full p-4 border-t ${sidebarCollapsed ? 'flex justify-center' : ''}`}>
          {sidebarCollapsed ? (
            <button onClick={handleLogout} className="text-red-500 hover:text-red-700">
              <LogOut className="h-5 w-5" />
            </button>
          ) : (
            <div className="flex justify-between items-center">
              <Link to="/" className="text-gray-700 hover:text-purple-700 flex items-center">
                <Home className="h-5 w-5 mr-2" />
                <span>Main Site</span>
              </Link>
              <button onClick={handleLogout} className="text-red-500 hover:text-red-700 flex items-center">
                <LogOut className="h-5 w-5 mr-2" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </aside>
      
      {/* Mobile header */}
      <div className="md:hidden w-full fixed top-0 left-0 bg-white shadow-sm z-30">
        <div className="p-4 flex items-center justify-between">
          <button onClick={toggleMobileMenu} className="text-gray-700">
            <Menu size={24} />
          </button>
          <span className="text-xl font-bold text-purple-700">HealHub Admin</span>
          <div>
            <Link to="/" className="text-gray-700 hover:text-purple-700">
              <Home size={24} />
            </Link>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40" onClick={toggleMobileMenu}>
            <div 
              className="absolute top-0 left-0 w-64 h-full bg-white shadow-md p-4 transition-all duration-300 ease-in-out"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b">
                <span className="text-xl font-bold text-purple-700">HealHub Admin</span>
                <button onClick={toggleMobileMenu} className="text-gray-500">
                  <ChevronLeft size={20} />
                </button>
              </div>
              
              <div className="mb-6">
                <SearchBar />
              </div>
              
              <nav>
                <ul className="space-y-2">
                  {navItems.map((item, idx) => (
                    <li key={idx}>
                      <Link 
                        to={item.href}
                        className="flex items-center py-2 px-4 rounded-md hover:bg-purple-50 text-gray-700 hover:text-purple-700"
                        onClick={toggleMobileMenu}
                      >
                        {item.icon}
                        <span className="ml-3">{item.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              
              <div className="absolute bottom-0 w-full p-4 border-t left-0">
                <div className="flex justify-between items-center">
                  <Link to="/" className="text-gray-700 hover:text-purple-700 flex items-center" onClick={toggleMobileMenu}>
                    <Home className="h-5 w-5 mr-2" />
                    <span>Main Site</span>
                  </Link>
                  <button onClick={handleLogout} className="text-red-500 hover:text-red-700 flex items-center">
                    <LogOut className="h-5 w-5 mr-2" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Main content */}
      <div className={`w-full md:ml-${sidebarCollapsed ? '20' : '64'} transition-all duration-300 ease-in-out`}>
        {/* Mobile top padding */}
        <div className="md:hidden pt-16"></div>
        
        {/* Content */}
        <main className="min-h-screen">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
