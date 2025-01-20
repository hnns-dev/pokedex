import React, { useState } from "react";
import { Input } from "./ui/input";

const PokemonSearch = (onSearch) => {
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
    "rock",
    "ghost",
    "dragon",
    "dark",
    "steel",
    "fairy",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ searchTerm, selectedType });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 rounded-lg shadow-md bg-blue-50"
    >
      <div className="space-y-4">
        <div>
          <label
            htmlFor="search"
            className="block text-sm font-medium text-zinc-700"
          >
            Pokemon Name
          </label>
          <Input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-1 pl-5 p-2 block w-full rounded-full border-zinc-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Rattata"
          />
        </div>

        <div>
          <label
            htmlFor="type"
            className="block text-sm font-medium text-zinc-700"
          >
            Pokemon Type
          </label>
          <select
            id="type"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="mt-1 pl-5 py-2 block w-full rounded-full border-zinc-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">All Type</option>
            {types.map((type) => (
              <option key={type} value={type} className="capitalize">
                {type}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors mt-4"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default PokemonSearch;
