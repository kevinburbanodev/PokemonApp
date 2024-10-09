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
                const speciesResponse = await axios.get(`${this.pokeApiUrl}/pokemon-species/${data.id}`);
                const types = data?.types.map((element: { type: { name: string; }; }) => element.type.name) || [];
                const description = speciesResponse.data.flavor_text_entries.find((entry: any) => entry.language.name === 'en')?.flavor_text || '';

                // Obtenemos las URLs de debilidades y evoluciones
                const typeUrl = data.types[0].type.url;
                const evolutionChainUrl = speciesResponse.data.evolution_chain.url;

                return {
                    id: data.id,
                    name: data.name,
                    description: description,
                    baseExperience: data.base_experience,
                    height: data.height,
                    abilities: data.abilities.map((ability: { ability: { name: string } }) => ability.ability.name),
                    moves: data.moves.map((move: { move: { name: string } }) => move.move.name),
                    forms: data.forms.map((form: { name: string }) => form.name),
                    officialArtwork: {
                        frontDefault: data?.sprites?.other?.['official-artwork']?.front_default || null
                    },
                    types: types,
                    weaknessUrl: typeUrl,
                    evolutionsUrl: evolutionChainUrl,
                    order: data.order,
                } as Pokemon;
            });

            this.pokemons = await Promise.all(pokemonPromises);
            return this.pokemons;
        } catch (error) {
            console.error('Error fetching Pokémon data:', error);
            return [];
        }
    },

    async getWeaknesses(typeUrl: string): Promise<string[]> {
        try {
            const response = await axios.get(typeUrl);
            return response.data?.damage_relations?.double_damage_from?.map((element: { name: string }) => element.name) || [];
        } catch (error) {
            console.error('Error fetching Pokémon weaknesses:', error);
            return [];
        }
    },

    async getEvolutions(chainUrl: string): Promise<{ name: string; officialArtwork: { frontDefault: string | null } }[]> {
        const evolutions: { name: string; officialArtwork: { frontDefault: string | null } }[] = [];

        try {
            const chainResponse = await axios.get(chainUrl);
            const chainData = chainResponse.data.chain;

            // Añadir el Pokémon inicial a la lista de evoluciones
            await this.addInitialPokemonToEvolutions(chainData, evolutions);

            // Procesar el resto de la cadena de evolución
            await this.processEvolutionChain(chainData, evolutions);
        } catch (error) {
            console.error('Error fetching Pokémon evolutions:', error);
        }

        return evolutions;
    },

    // Función para añadir el Pokémon inicial a la lista de evoluciones
    async addInitialPokemonToEvolutions(chainData: any, evolutions: { name: string; officialArtwork: { frontDefault: string | null } }[]) {
        const speciesUrl = chainData.species.url;

        // Solicita el ID de la especie para obtener la imagen del Pokémon inicial
        const speciesResponse = await axios.get(speciesUrl);
        const pokemonId = speciesResponse.data.id;

        // Usa el ID para obtener la información del Pokémon y su imagen
        const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        const officialArtwork = pokemonResponse.data.sprites?.other?.['official-artwork']?.front_default || null;

        evolutions.push({
            name: chainData.species.name,
            officialArtwork: { frontDefault: officialArtwork },
        });
    },

    // Función para procesar recursivamente la cadena de evolución
    async processEvolutionChain(chain: any, evolutions: { name: string; officialArtwork: { frontDefault: string | null } }[]) {
        for (const evolution of chain.evolves_to) {
            const speciesUrl = evolution.species.url;

            // Solicita el ID de la especie para obtener la imagen del Pokémon
            const speciesResponse = await axios.get(speciesUrl);
            const pokemonId = speciesResponse.data.id;

            // Usa el ID para obtener la información del Pokémon y su imagen
            const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
            const officialArtwork = pokemonResponse.data.sprites?.other?.['official-artwork']?.front_default || null;

            evolutions.push({
                name: evolution.species.name,
                officialArtwork: { frontDefault: officialArtwork },
            });

            // Si hay más evoluciones, realiza la llamada recursiva para procesarlas
            if (evolution.evolves_to.length > 0) {
                await this.processEvolutionChain(evolution, evolutions);
            }
        }
    }

};
