// Mapeo de colores de tipos de Pokémon
export const typeColors: { [key: string]: string } = {
    grass: '#78C850',
    poison: '#A040A0',
    fire: '#F08030',
    water: '#6890F0',
    bug: '#A8B820',
    normal: '#A8A878',
    electric: '#F8D030',
    ground: '#E0C068',
    fairy: '#EE99AC',
    fighting: '#C03028',
    psychic: '#F85888',
    rock: '#B8A038',
    ghost: '#705898',
    ice: '#98D8D8',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    flying: '#A890F0',
};

// Función para obtener el color del tipo de Pokémon
export const getPokemonTypeColor = (type: string): string => {
    return typeColors[type] || '#A8A8A8';
};
