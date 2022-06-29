<template>
  <div class="options-container">
    <ul>
      <li
        v-for="pokemon in pokemons"
        :key="pokemon.id"
        :class="{
          'disabled': !!selectedPokemonId,
          'is-incorrect': selectedPokemonId === pokemon.id && !isCorrectAnswer,
          'is-correct': selectedPokemonId === pokemon.id && isCorrectAnswer
        }"
        @click="$emit('pokemonSelection', pokemon.id)"
      >
        {{ pokemon.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    isCorrectAnswer: {
      default: null,
      required: false,
      type: Boolean
    },
    pokemons: {
      required: true,
      type: Array
    },
    selectedPokemonId: {
      default: null,
      required: false,
      type: Number
    }
  }
};
</script>

<style scoped>
/* Pokemon Options */
ul {
    list-style-type: none;
    padding-inline-start: 0px;
}
li {
    background-color: white;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    cursor: pointer;
    margin-bottom: 10px;
    width: 250px;
}

li:hover {
    background-color: rgba(0, 0, 0, 0.05);
}

.disabled {
  pointer-events: none;
}

.is-correct {
  background-color: greenyellow;
}

.is-incorrect {
  background-color: red;
}

.options-container {
    display: flex;
    justify-content: center;
}
</style>
