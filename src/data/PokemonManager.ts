import axios, { AxiosResponse } from 'axios';
import { Pokemon } from '../entities/Pokemon';

interface PokemonResult {
    name: string;
    url: string;
}

interface PokemonResponse {
    count: number;
    next: string | null; // Puede ser null si no hay más resultados
    previous: string | null; // Puede ser null si no hay resultados anteriores
    results: PokemonResult[];
}

export const PokemonManager = {
    pokeApiUrl: 'https://pokeapi.co/api/v2' as string,
    pokemons: [] as Pokemon[],

    async getPokemons(offset: number = 0, limit: number = 30): Promise<Pokemon[]> {
        try {
            const url: string = `${this.pokeApiUrl}/pokemon?limit=${limit}&offset=${offset}`;
            const response: AxiosResponse<PokemonResponse, any> = await axios.get<PokemonResponse>(url);
            const data: PokemonResponse = response.data;
            const summaryPokemons: PokemonResult[] = data.results;

            const pokemonPromises = summaryPokemons.map(async (detailedPokemon) => {
                const response = await axios.get(detailedPokemon.url);
                const data = response.data;
                const types = data?.types.map((element: { type: { name: string; }; }) => element.type.name) || [];

                return {
                    id: data.id,
                    name: data.name,
                    baseExperience: data.base_experience,
                    height: data.height,
                    abilities: data.abilities.map((ability: { ability: { name: string } }) => ability.ability.name),
                    moves: data.moves.map((move: { move: { name: string } }) => move.move.name),
                    forms: data.forms.map((form: { name: string }) => form.name),
                    officialArtwork: {
                        frontDefault: data?.sprites?.other?.['official-artwork']?.front_default || null
                    },
                    types: types,
                    order: data.order,
                } as Pokemon;
            });

            this.pokemons = await Promise.all(pokemonPromises);
            return this.pokemons;
        } catch (error) {
            console.error('Error fetching Pokémon data:', error);
            return [];
        }
    }
}