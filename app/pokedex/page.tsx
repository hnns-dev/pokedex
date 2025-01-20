"use client";

import { useState, useEffect } from "react";
import { getPokemonList } from "@/lib/api";
import PokemonSearch from "@/components/PokemonSearch";
import { PokemonList, PokemonItemlist } from "@/types/pokemon";

export default function Pokemonlist() {
  const [pokemonData, setPokemonData] = useState<PokemonList | null>(null);
  const [filteredPokemon, setFilteredPokemon] = useState<PokemonItemlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const handleSearch = ({ searchTerm, selectedType }) => {
    if (!pokemonData) return;

    const filtered = pokemonData.results.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredPokemon(filtered);
  };

  if (isLoading) return <div className="text-center mt-8">Laden...</div>;
  if (error)
    return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-blue-500 font-roboto text-2xl font-bold mb-8 text-center">
        Pokédex
      </h1>

      <div className="mb-8">
        <PokemonSearch onSearch={handleSearch} />
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPokemon.map((pokemon, index) => (
          <li
            key={pokemon.name}
            className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow capitalize cursor-pointer"
          >
            #{(index + 1).toString().padStart(3, "0")} - {pokemon.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
