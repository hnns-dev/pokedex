import { getPokemonList } from "@/lib/api";

export default async function Pokemonlist() {
  const data = await getPokemonList();

  return (
    <div>
      <h1 className="text-blue-500 font-roboto text-2xl font-bold m-5 text-center">
        Pokédex
      </h1>
      <ul>
        {" "}
        {data.results.map((pokemon, index) => (
          <li key={pokemon.name} className="capitalize cursor-pointer">
            #{(index + 1).toString().padStart(3, "0")} - {pokemon.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
