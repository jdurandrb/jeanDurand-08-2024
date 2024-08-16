import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';

export const usePokemonStore = defineStore('pokemonStore', () => {
  const pokemons = ref<Pokemon[]>([]);
  const isLoadingPokemons = ref<boolean>(false);
  let offset = 0;
  const limit = pokemons.value.length === 0 ? 151 : 25;

  const loadPokemons = async (): Promise<void> => {
    isLoadingPokemons.value = true;
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon', {
        params: {
          limit,
          offset
        }
      });

      const loadedPokemons = await Promise.all(
        response.data.results.map(async (pokemon: any, index: number) => {
          const pokemonData = {
            name: pokemon.name,
            url: pokemon.url,
            id: offset + index + 1,
          };

          try {
            const pokemonResponse = await axios.get(pokemon.url);
            pokemonData.response = pokemonResponse.data;
          } catch (error) {
          }

          return pokemonData;
        })
      );
      let returnedPokemons = loadedPokemons;
      returnedPokemons = returnedPokemons.map(pokemon => {
        pokemon.isAdded = false;
        return pokemon;
      })
      pokemons.value.push(...returnedPokemons);
      offset += 25;
    } catch (error) {
    } finally {
      isLoadingPokemons.value = false;
    }
  };

  return {
    pokemons,
    isLoadingPokemons,
    loadPokemons
  };
});
