import { Pokemon } from "../entities/Pokemon";
import { PokemonRepository } from "../interfaces/PokemonRepository";
import { PokemonManager } from "./PokemonManager";

export class PokemonRepositoryImpl implements PokemonRepository {
    constructor(private pokemonManager: typeof PokemonManager) { }

    async getAllPokemons(): Promise<Pokemon[]> {
        const pokemons = await this.pokemonManager.getPokemons();
        return pokemons;
    }
    async getPokemonById(): Promise<Pokemon> {
        throw new Error("Method not implemented.");
    }
}