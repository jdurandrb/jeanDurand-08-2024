<template>
  <div class="pokemon-list">
    <PokemonCard
      v-for="pokemon in pokemons"
      :key="pokemon.id"
      :pokemon="pokemon"
      :team="team"
      @click="() => $emit('pokemonClick', pokemon)"
    />
  </div>
</template>

<script setup lang="ts">
import PokemonCard from './PokemonCard.vue';

const props = defineProps({
  pokemons: {
    type: Array as () => any[],
    required: true
  },
  team: {
    type: Array as () => any[],
    required: true
  },
});
</script>
<style scoped>
.pokemon-list {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;
  padding: 20px;
}

@media (min-width: 600px) {
  .pokemon-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 900px) {
  .pokemon-list {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>