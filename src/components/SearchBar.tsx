
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchQuery.trim() === "") {
      return;
    }
    
    // In a real application, this would search a database or API
    // For now, we'll just simulate a search
    toast({
      title: "Search executed",
      description: `You searched for: ${searchQuery}`,
    });
    
    // Navigate to a search results page (would be implemented in a real app)
    // For now, we'll just navigate to a relevant page based on the query
    if (searchQuery.toLowerCase().includes("doctor")) {
      navigate("/doctors");
    } else if (searchQuery.toLowerCase().includes("service")) {
      navigate("/services");
    } else if (searchQuery.toLowerCase().includes("appointment")) {
      navigate("/appointments");
    }
    
    console.log("Searching for:", searchQuery);
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-sm">
      <Input
        type="text"
        placeholder="Search doctors, services..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pr-10 w-full bg-white/90 border-purple-100 focus:border-purple-300 placeholder:text-gray-400"
      />
      <button 
        type="submit" 
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600"
      >
        <Search size={18} />
      </button>
    </form>
  );
};

export default SearchBar;
