import { useState } from "react";
import { GetPokemonsUseCase } from "../use-cases/GetPokemonsUseCase";
import { Pokemon } from "../entities/Pokemon";

export const usePokemonViewModel = (getPokemonsUseCase: GetPokemonsUseCase) => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);

    const loadPokemons = async () => {
        const pokemonsList = await getPokemonsUseCase.execute();
        setPokemons(pokemonsList);
    }

    return {
        pokemons,
        loadPokemons
    }
}