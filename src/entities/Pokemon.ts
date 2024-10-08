export interface Pokemon {
    id: number;
    name: string;
    description: string;
    baseExperience: number;
    height: number;
    abilities: string[];
    moves: string[];
    forms: string[];
    officialArtwork: {
        frontDefault: string;
    };
    types: string[];
    order: number;
}