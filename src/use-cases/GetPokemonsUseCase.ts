import { Pokemon } from "../entities/Pokemon";
import { PokemonRepository } from "../interfaces/PokemonRepository";

export class GetPokemonsUseCase {
    constructor(private pokemonRepository: PokemonRepository) { }

    execute(offset: number, limit: number): Promise<Pokemon[]> {
        return this.pokemonRepository.getAllPokemons(offset, limit);
    }
}