import { useState, useEffect } from "react";
import type { PokemonDetails } from "@/types/pokemon";
import { getPokemonDetails } from "@/lib/api";

interface PokemonDetailsProps {
  pokemonName: string;
  onClose?: () => void;
}

export default function PokemonDetails({
  pokemonName,
  onClose,
}: PokemonDetailsProps) {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPokemonDetails = async () => {
      // Auch hier war ein Tippfehler: "Pekemon" statt "Pokemon"
      try {
        const data = await getPokemonDetails(pokemonName);
        setPokemonDetails(data);
      } catch (err) {
        setError("Error loading Pokemon Details");
      } finally {
        setIsLoading(false);
      }
    };
    loadPokemonDetails();
  }, [pokemonName]);

  if (isLoading) return <div>Laden...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!pokemonDetails) return null; // Hier geändert zu pokemonDetails

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold capitalize">{pokemonDetails.name}</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            Schließen
          </button>
        )}
      </div>

      {pokemonDetails.sprites.front_default && (
        <img
          src={pokemonDetails.sprites.front_default}
          alt={pokemonDetails.name}
          className="mx-auto"
        />
      )}

      <div className="mt-4">
        <h3 className="font-bold mb-2">Typen:</h3>
        <div className="flex gap-2">
          {pokemonDetails.types.map((type) => (
            <span
              key={type.type.name}
              className="px-2 py-1 bg-gray-100 rounded capitalize"
            >
              {type.type.name}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <h3 className="font-bold mb-2">Status:</h3>
        <div className="space-y-2">
          {pokemonDetails.stats.map((stat) => (
            <div key={stat.stat.name} className="flex items-center">
              <span className="w-24 capitalize">{stat.stat.name}:</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                />
              </div>
              <span className="ml-2 w-12 text-sm">{stat.base_stat}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
