import { useState } from "react";
import { PokemonRepositoryImpl } from "../data/PokemonRepositoryImpl";
import { Pokemon } from "../entities/Pokemon";

export const usePokemonViewModel = (repository: PokemonRepositoryImpl) => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [weaknesses, setWeaknesses] = useState<string[]>([]);
    const [evolutions, setEvolutions] = useState<{ name: string; officialArtwork: { frontDefault: string | null } }[]>([]);
    const [offset, setOffset] = useState<number>(0);
    const limit = 30;

    const loadPokemons = async (): Promise<void> => {
        const pokemonsList = await repository.getAllPokemons(offset, limit);
        setPokemons(prevPokemons => [...prevPokemons, ...pokemonsList]);
        setOffset(prevOffset => prevOffset + limit);
    };

    const getWeaknesses = async (typeUrl: string): Promise<void> => {
        const weaknessesList = await repository.getPokemonWeaknesses(typeUrl);
        setWeaknesses(weaknessesList);
    }

    const getEvolutions = async (chainUrl: string): Promise<void> => {
        const evolutionsList = await repository.getPokemonEvolutions(chainUrl);
        setEvolutions(evolutionsList);
    }

    return {
        pokemons,
        weaknesses,
        evolutions,
        loadPokemons,
        getWeaknesses,
        getEvolutions
    };
};
