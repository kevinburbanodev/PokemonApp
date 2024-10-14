import { useState } from "react";
import { PokemonRepositoryImpl } from "../data/PokemonRepositoryImpl";
import { Pokemon } from "../entities/Pokemon";

export const usePokemonViewModel = (repository: PokemonRepositoryImpl) => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
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

    const getPokemon = async (nameOrId: string): Promise<Pokemon | null> => {
        const foundPokemon = await repository.getPokemonByNameOrId(nameOrId);
        setPokemon(foundPokemon);
        return foundPokemon;
    };


    return {
        pokemons,
        pokemon,
        weaknesses,
        evolutions,
        loadPokemons,
        getPokemon,
        getWeaknesses,
        getEvolutions
    };
};
