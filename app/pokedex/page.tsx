"use client";

import { useState, useEffect } from "react";
import { getPokemonList } from "@/lib/api";
import PokemonSearch from "@/components/PokemonSearch";
import { PokemonList, PokemonItemlist } from "@/types/pokemon";

type SearchParams = {
  searchTerm: string;
  selectedType?: string;
};
import PokemonDetails from "@/components/PokemonDetails";

export default function Pokemonlist() {
  const [pokemonData, setPokemonData] = useState<PokemonList | null>(null);
  const [filteredPokemon, setFilteredPokemon] = useState<PokemonItemlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const data = await getPokemonList();
        setPokemonData(data);
        setFilteredPokemon(data.results);
        setIsLoading(false);
      } catch (err) {
        setError("Fehler beim Laden der Pokemon");
        setIsLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  const handleSearch = ({ searchTerm, selectedType }: SearchParams) => {
    if (!pokemonData) return;

    const filtered = pokemonData.results.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredPokemon(filtered);
  };

  if (isLoading) return <div className="text-center mt-8">Laden...</div>;
  if (error)
    return <div className="text-center mt-8 text-red-500">{error}</div>;

  const handlePokemonClick = (pokemonName: string) => {
    setSelectedPokemon(pokemonName);
  };

  const handleCloseDetails = () => {
    setSelectedPokemon(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-blue-500 font-roboto text-2xl font-bold mb-8 text-center">
        Pokédex
      </h1>

      <div className="mb-8">
        <PokemonSearch onSearch={handleSearch} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Pokemon Liste */}
        <div
          className={`${selectedPokemon ? "lg:col-span-2" : "lg:col-span-3"}`}
        >
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredPokemon.map((pokemon, index) => (
              <li
                key={pokemon.name}
                className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow capitalize cursor-pointer"
                onClick={() => handlePokemonClick(pokemon.name)}
              >
                #{(index + 1).toString().padStart(3, "0")} - {pokemon.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Pokemon Details */}
        {selectedPokemon && (
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <PokemonDetails
                pokemonName={selectedPokemon}
                onClose={handleCloseDetails}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
