import { Pokemon } from "../entities/Pokemon";

export interface PokemonRepository {
    getAllPokemons(): Promise<Pokemon[]>;
    getPokemonById(): Promise<Pokemon>;
}