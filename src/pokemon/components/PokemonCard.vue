<template>
  <div
    class="pokemon-card"
    @click="
      addToTeam(
        !pokemon.isAdded && team.length < 6
          ? 'showAddedMessage'
          : pokemon.isAdded && team.length < 6
          ? 'showAlreadyAddedMessage'
          : 'showLimitMessage'
      )
    "
  >
    <h3 class="pokemon-name">{{ capitalizedPokemonName }}</h3>
    <div class="images">
      <img
        :src="getSprite('front_default')"
        alt="Front Default"
        v-if="getSprite('front_default')"
      />
      <img
        :src="getSprite('back_default')"
        alt="Back Default"
        v-if="getSprite('back_default')"
      />
    </div>
    <transition name="fade">
      <div v-if="showAddedMessage" class="added-message">ADDED</div>
      <div v-else-if="showAlreadyAddedMessage" class="added-message">
        ALREADY ADDED
      </div>
      <div v-else-if="showLimitMessage" class="added-message">
        LIMIT REACHED
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

// Define props
const props = defineProps<{
  pokemon: {
    name: string;
    response: {
      sprites: {
        [key: string]: any;
        versions: {
          [versionKey: string]: {
            [gameKey: string]: {
              [type: string]: string;
            };
          };
        };
        other: {
          [otherKey: string]: {
            [type: string]: string;
          };
        };
      };
    };
  };
  team: any[];
}>();

// Define emits
const emit = defineEmits(['click']);

// Define reactive state
const showAddedMessage = ref(false);
const showAlreadyAddedMessage = ref(false);
const showLimitMessage = ref(false);

// Computed property
const capitalizedPokemonName = computed(() => {
  if (!props.pokemon.name) return '';
  return props.pokemon.name.charAt(0).toUpperCase() + props.pokemon.name.slice(1);
});

// Methods
const getSprite = (type: string): string => {
  let sprite = props.pokemon.response.sprites[type];

  if (!sprite) {
    for (const versionKey in props.pokemon.response.sprites.versions) {
      for (const gameKey in props.pokemon.response.sprites.versions[versionKey]) {
        sprite = props.pokemon.response.sprites.versions[versionKey][gameKey][type];
        if (sprite) return sprite;
      }
    }

    if (!sprite) {
      for (const otherKey in props.pokemon.response.sprites.other) {
        sprite = props.pokemon.response.sprites.other[otherKey][type];
        if (sprite) return sprite;
      }
    }
  }

  return sprite || '';
};

const addToTeam = (added: 'showAddedMessage' | 'showAlreadyAddedMessage' | 'showLimitMessage') => {
  if (props.team.length < 6) emit('click');
  showMessage(added);
};

const showMessage = (messageType: 'showAddedMessage' | 'showAlreadyAddedMessage' | 'showLimitMessage') => {
  if (messageType === 'showAddedMessage') {
    showAddedMessage.value = true;
  } else if (messageType === 'showAlreadyAddedMessage') {
    showAlreadyAddedMessage.value = true;
  } else if (messageType === 'showLimitMessage') {
    showLimitMessage.value = true;
  }
  setTimeout(() => {
    if (messageType === 'showAddedMessage') {
      showAddedMessage.value = false;
    } else if (messageType === 'showAlreadyAddedMessage') {
      showAlreadyAddedMessage.value = false;
    } else if (messageType === 'showLimitMessage') {
      showLimitMessage.value = false;
    }
  }, 3000);
};
</script>


<style scoped>
.pokemon-card {
  position: relative; /* Necesario para posicionar el mensaje */
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  margin: 10px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.5s ease-in-out, box-shadow 0.5s ease-in-out;
}

.pokemon-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.pokemon-name {
  font-size: 1.2em;
  margin-bottom: 10px;
  color: #444;
  text-decoration: underline;
}

.images {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.pokemon-card img {
  width: 80px;
  height: 80px;
  border-radius: 5px;
  transition: transform 0.5s ease-in-out;
}

.pokemon-card img:hover {
  transform: scale(1.1);
}

.added-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  text-align: center;
  font-size: 1em;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
