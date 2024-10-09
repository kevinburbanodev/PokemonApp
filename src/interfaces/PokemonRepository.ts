import { Pokemon } from "../entities/Pokemon";

export interface PokemonRepository {
    getAllPokemons(offset: number, limit: number): Promise<Pokemon[]>;
    getPokemonWeaknesses(typeUrl: string): Promise<string[]>
    getPokemonEvolutions(chainUrl: string): Promise<{ name: string; officialArtwork: { frontDefault: string | null } }[]>
    getPokemonById(): Promise<Pokemon>;
}