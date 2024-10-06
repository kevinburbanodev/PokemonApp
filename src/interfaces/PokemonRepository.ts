import { Pokemon } from "../entities/Pokemon";

export interface PokemonRepository {
    getAllPokemons(offset: number, limit: number): Promise<Pokemon[]>;
    getPokemonById(): Promise<Pokemon>;
}