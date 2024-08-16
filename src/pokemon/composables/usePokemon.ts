import axios from 'axios';

export function usePokemon() {

  const getPokemonDetails = async (id: number) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return response.data;
  };

  return {
    getPokemonDetails,
  };
}
