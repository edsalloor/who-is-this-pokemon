<template>
  <div>
      <h1>Who is this Pokemon?</h1>
      <h2 v-if="!pokemon">Loading...</h2>
      <div v-else>
        <PokemonPicture
          :pokemon-id="pokemon.id"
          :show-pokemon="showAnswer"
        />
        <PokemonOptions
          :is-correct-answer="isCorrectAnswer"
          :selected-pokemon-id="selectedPokemonId"
          :pokemons="pokemonArray"
          @pokemon-selection="checkAnswer"
        />

        <template v-if="showAnswer">
          <h2>{{ message }}</h2>
          <button @click="newGame">
            Play Again
          </button>
        </template>
      </div>
  </div>
</template>

<script>
import PokemonPicture from '@/components/PokemonPicture.vue';
import PokemonOptions from '@/components/PokemonOptions.vue';

import getPokemonOptions from '@/helpers/getPokemonOptions';

export default {
  components: { PokemonPicture, PokemonOptions },
  data() {
    return {
      isCorrectAnswer: null,
      pokemon: null,
      pokemonArray: [],
      selectedPokemonId: null,
      showAnswer: false,
      message: ''
    };
  },
  methods: {
    async mixPokemonArray() {
      const optionsNumber = 4;
      this.pokemonArray = await getPokemonOptions(optionsNumber);

      // Random number between 0 and (optionsNumber - 1)
      const randInt = Math.floor(Math.random() * optionsNumber);
      this.pokemon = this.pokemonArray[randInt];
    },
    checkAnswer(pokemonId) {
      if (this.showAnswer) {
        // Disable selection if pokemon is already shown
        return;
      }

      this.selectedPokemonId = pokemonId;
      this.showAnswer = true;

      this.isCorrectAnswer = pokemonId === this.pokemon.id;
      if (this.isCorrectAnswer) {
        this.message = 'Correct!';
      } else {
        this.message = 'Oops...';
      }
      this.message += ` It's ${this.pokemon.name}.`;
    },
    newGame() {
      this.isCorrectAnswer = null;
      this.selectedPokemonId = null;
      this.showAnswer = false;
      this.pokemon = null;
      this.pokemonArray = [];
      this.mixPokemonArray();
    }
  },
  mounted() {
    this.mixPokemonArray();
  }
};
</script>
