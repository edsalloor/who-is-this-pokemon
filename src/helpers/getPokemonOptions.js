import pokemonApi from '@/api/pokemonApi';

export const getPokemons = () => {
  const pokemonArr = Array.from(Array(649));
  return pokemonArr.map((_, index) => index + 1);
};

export const getPokemonsById = async (pokemonIds = []) => {
  const requests = [];

  pokemonIds.forEach(id => {
    requests.push(pokemonApi.get(`/${id}`));
  });
  const responses = await Promise.all(requests);

  return responses.map(response => ({
    name: response.data.name,
    id: response.data.id
  }));
};

const getPokemonOptions = async (number=4) => {
  const mixedPokemons = getPokemons().sort(() => Math.random() - 0.5);
  return getPokemonsById(mixedPokemons.splice(0, number));
};

export default getPokemonOptions;
