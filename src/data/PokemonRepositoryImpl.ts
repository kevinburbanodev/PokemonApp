import { Pokemon } from "../entities/Pokemon";
import { PokemonRepository } from "../interfaces/PokemonRepository";
import { PokemonManager } from "./PokemonManager";

export class PokemonRepositoryImpl implements PokemonRepository {
    constructor(private pokemonManager: typeof PokemonManager) { }

    async getAllPokemons(offset: number, limit: number): Promise<Pokemon[]> {
        const pokemons = await this.pokemonManager.getPokemons(offset, limit);
        return pokemons;
    }
    async getPokemonById(): Promise<Pokemon> {
        throw new Error("Method not implemented.");
    }
}