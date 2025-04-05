
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Here you would typically handle the search functionality
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
