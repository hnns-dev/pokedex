import { PokemonList } from "@/types/pokemon";

// lib/api.ts
const BASE_URL = "https://pokeapi.co/api/v2";

export async function getPokemonList(
  limit: number = 151
): Promise<PokemonList> {
  const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}`);
  if (!response.ok) {
    throw new Error("Failed to fetch PokemonList");
  }
  return response.json();
}
