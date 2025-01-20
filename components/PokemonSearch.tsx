import React, { useState } from "react";
import { Input } from "./ui/input";

interface SearchParams {
  searchTerm: string;
  selectedType: string;
}

interface PokemonSearchProps {
  onSearch: (params: SearchParams) => void;
}

const PokemonSearch: React.FC<PokemonSearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");

  // Pokemon-Typen
  const types = [
    "normal",
    "fire",
    "water",
    "electric",
    "grass",
    "ice",
    "fighting",
    "poison",
    "ground",
    "flying",
    "psychic",
    "bug",
  ];

  const handleSearch = () => {
    onSearch({ searchTerm, selectedType });
  };

  return (
    <div className="flex gap-4">
      <Input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          handleSearch();
        }}
        placeholder="Pokemon suchen..."
        className="flex-1"
      />
      <select
        value={selectedType}
        onChange={(e) => {
          setSelectedType(e.target.value);
          handleSearch();
        }}
        className="border rounded p-2"
      >
        <option value="">Alle Typen</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PokemonSearch;
