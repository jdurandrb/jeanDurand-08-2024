<template>
  <div v-if="props.pokemon" class="pokemon-detail-container">
    <div
      :class="Object.keys(router.currentRoute.value.params).length === 0 ? 'full-pokemon-detail-view' : ''"
      class="pokemon-detail-view"
      @click="navigateToDetail"
    >
      <h1 class="pokemon-name">{{ props.pokemon.name }}</h1>
      <img
        :src="props.pokemon.sprites?.front_default || 'default-sprite-url'"
        :alt="props.pokemon.name"
        class="pokemon-sprite"
      />
      <p class="pokemon-detail">Height: {{ props.pokemon.height }}</p>
      <p class="pokemon-detail">Weight: {{ props.pokemon.weight }}</p>
    </div>

    <h2 class="pokemon-section-title">Types</h2>
    <ul class="pokemon-types">
      <li
        v-for="type in props.pokemon.types"
        :key="type.type.name"
        class="pokemon-type"
      >
        {{ type.type.name }}
      </li>
    </ul>

    <h2 class="pokemon-section-title" v-if="abilities">Abilities</h2>
    <ul v-if="abilities" class="pokemon-abilities">
      <li
        v-for="ability in abilities"
        :key="ability.ability.name"
        class="pokemon-ability"
      >
        {{ ability.ability.name }}
      </li>
    </ul>

    <p class="pokemon-detail" v-if="baseExperience">
      Base Experience: {{ baseExperience }}
    </p>

    <h2 class="pokemon-section-title">Stats</h2>
    <PokemonStatsChart
      v-if="props.pokemon.stats"
      :stats="props.pokemon.stats"
    />

    <h2 class="pokemon-section-title">Evolution Chain</h2>
    <ul class="pokemon-evolution-chain" v-if="evolutionChain.length">
      <li
        v-for="evolution in evolutionChain"
        :key="evolution.species.name"
        class="pokemon-evolution"
      >
        <img
          :src="evolution.sprite"
          :alt="evolution.species.name"
          class="pokemon-evolution-sprite"
        />
        <p class="pokemon-evolution-name">{{ evolution.species.name }}</p>
      </li>
    </ul>

    <h2 class="pokemon-section-title">Sound</h2>
    <audio :src="pokemonSound" controls class="pokemon-sound"></audio>
    <button
      class="remove-button"
      @click="$emit('removeFromTeam', props.pokemon)"
    >
      Remove from Team
    </button>
  </div>
    <LoadingScreen v-else />
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import PokemonStatsChart from "@/pokemon/components/PokemonStatsChart.vue";
import LoadingScreen from "@/components/LoadingScreen.vue";

const router = useRouter();

const props = defineProps<{
  pokemon: {
    id: number;
    name: string;
    height: number;
    weight: number;
    sprites?: {
      front_default?: string;
    };
    types: PokemonType[];
    stats: PokemonStat[];
    species: {
      url: string;
    };
  };
  abilities?: Array<{ ability: { name: string } }>;
  baseExperience?: number;
}>();

const evolutionChain = ref<EvolutionChain[]>([]);
const pokemonSound = ref<string>("");

// Función para cargar la cadena evolutiva y obtener imágenes
const loadEvolutionChain = async (url: string) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const extractEvolutions = async (chain: any): Promise<EvolutionChain[]> => {
      const evolutions: EvolutionChain[] = [];
      let current = chain;

      while (current) {
        const pokemonResponse = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${current.species.name}`
        );
        const pokemonData = await pokemonResponse.json();
        evolutions.push({
          species: current.species,
          sprite: pokemonData.sprites.front_default || "default-sprite-url",
        });

        current = current.evolves_to[0] || null;
      }

      return evolutions;
    };

    evolutionChain.value = await extractEvolutions(data.chain);
  } catch (error) {
  }
};

const navigateToDetail = () => {
  router.push(`/team/${props.pokemon.id}`);
};

// Watcher para actualizar el componente cuando cambie el prop de Pokémon
watch(
  () => props.pokemon,
  async (newPokemon) => {
    if (newPokemon) {
      try {
        const speciesResponse = await fetch(
          newPokemon.species?.url || newPokemon.response.species.url
        );
        const speciesData = await speciesResponse.json();
        await loadEvolutionChain(speciesData.evolution_chain.url);
        pokemonSound.value = `https://pokemoncries.com/cries/${newPokemon.id}.mp3`;
      } catch (error) {
      }
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.pokemon-detail-container {
  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.pokemon-detail-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}
.full-pokemon-detail-view {
  cursor: pointer;
}
.full-pokemon-detail-view:hover {
  background-color: #e6e6e6;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.full-pokemon-detail-view:hover .pokemon-name {
  color: #42b983;
}

.full-pokemon-detail-view:hover .pokemon-sprite {
  filter: brightness(1.2);
}

.pokemon-name {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  text-transform: capitalize;
}

.pokemon-sprite {
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin-bottom: 20px;
}

.pokemon-detail {
  font-size: 16px;
  margin: 15px 0;
}

.pokemon-section-title {
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 10px;
  text-align: left;
}

.pokemon-types,
.pokemon-abilities,
.pokemon-evolution-chain {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  list-style: none;
  padding: 0;
}

.pokemon-type,
.pokemon-ability,
.pokemon-evolution {
  background-color: #e0e0e0;
  padding: 10px 15px;
  border-radius: 16px;
  font-size: 14px;
  text-transform: capitalize;
  font-weight: 500;
}

.pokemon-evolution {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pokemon-evolution-sprite {
  width: 100px;
  height: 100px;
  margin-bottom: 5px;
}

.pokemon-evolution-name {
  font-size: 14px;
}

.pokemon-sound {
  margin-top: 20px;
  width: 100%;
}

.remove-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.remove-button:hover {
  background-color: #ff5252;
}

.loading-container {
  text-align: center;
  font-size: 18px;
  margin-top: 20px;
}

@media (min-width: 600px) and (max-width: 1035px) {
  .pokemon-evolution {
    max-width: 70px;
    padding: 5px 15px;
  }
}
</style>
