<template>
  <div class="pokemon-home-container">
    <h1 class="pokemon-home-title">Pokémon List</h1>
    <PokemonList
      :pokemons="pokemons"
      :team="team"
      @pokemonClick="addToTeam"
    />
    <div ref="loadMoreRef"></div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { usePokemonStore } from '@/pokemon/store';
import { useTeamStore } from '@/team/store';
import PokemonList from '@/pokemon/components/PokemonList.vue';
import LoadingScreen from '@/components/LoadingScreen.vue';

// Usar stores
const pokemonStore = usePokemonStore();
const teamStore = useTeamStore();

// Referencias a las propiedades del store
const pokemons = pokemonStore.pokemons;
const team = teamStore.team;
const isLoading = pokemonStore.isLoadingPokemons;
const loadMoreRef = ref<null | HTMLDivElement>(null);

// Configurar IntersectionObserver
const observer = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      pokemonStore.loadPokemons();
    }
  },
  {
    rootMargin: '0px',
    threshold: 1.0,
  }
);

// Configurar onMounted
onMounted(async () => {
  if (loadMoreRef.value) {
    observer.observe(loadMoreRef.value);
  }
  if (pokemons.length === 0) {
    await pokemonStore.loadPokemons();
  }
});

// Método para añadir Pokémon al equipo
const addToTeam = (pokemon: any) => {
  teamStore.addToTeam(pokemon);
};

</script>

<style scoped>
.pokemon-home-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.pokemon-home-title {
  font-size: 2.5em;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.loading-message {
  text-align: center;
  font-size: 1.2em;
  color: #777;
  margin-top: 20px;
}
</style>
