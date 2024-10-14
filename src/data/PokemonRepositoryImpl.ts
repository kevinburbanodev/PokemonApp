import { Pokemon } from "../entities/Pokemon";
import { PokemonRepository } from "../interfaces/PokemonRepository";
import { PokemonManager } from "./PokemonManager";

export class PokemonRepositoryImpl implements PokemonRepository {
    constructor(private pokemonManager: typeof PokemonManager) { }

    async getPokemonEvolutions(chainUrl: string): Promise<{ name: string; officialArtwork: { frontDefault: string | null; }; }[]> {
        const evolutions = await this.pokemonManager.getEvolutions(chainUrl);
        return evolutions;
    }

    async getPokemonByNameOrId(nameOrId: string): Promise<Pokemon | null> {
        const pokemon = await this.pokemonManager.getPokemonByNameOrId(nameOrId);
        return pokemon;
    }

    async getPokemonWeaknesses(typeUrl: string): Promise<string[]> {
        const weaknesses = await this.pokemonManager.getWeaknesses(typeUrl);
        return weaknesses;
    }

    async getAllPokemons(offset: number, limit: number): Promise<Pokemon[]> {
        const pokemons = await this.pokemonManager.getPokemons(offset, limit);
        return pokemons;
    }
}