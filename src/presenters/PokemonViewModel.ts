// PokemonViewModel.ts
import { useState } from "react";
import { GetPokemonsUseCase } from "../use-cases/GetPokemonsUseCase";
import { Pokemon } from "../entities/Pokemon";

export const usePokemonViewModel = (getPokemonsUseCase: GetPokemonsUseCase) => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [offset, setOffset] = useState<number>(0);
    const limit = 30;

    const loadPokemons = async () => {
        const pokemonsList = await getPokemonsUseCase.execute(offset, limit);
        setPokemons(prevPokemons => [...prevPokemons, ...pokemonsList]);
        setOffset(prevOffset => prevOffset + limit);
    }

    return {
        pokemons,
        loadPokemons
    }
}