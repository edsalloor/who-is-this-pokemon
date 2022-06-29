import pokemonApi from '@/api/pokemonApi';
import getPokemonOptions, { getPokemons, getPokemonsById } from '@/helpers/getPokemonOptions';

jest.mock('@/api/pokemonApi');
const pokemonMock = { name: 'pikachu', id: 25 };
pokemonApi.get = jest.fn(() => 
  Promise.resolve({ data: pokemonMock })
);

describe('getPokemonOptions helpers', () => {
  it('should return an array of numbers', () => {
    const pokemons = getPokemons();

    expect(pokemons.length).toBe(649);
    pokemons.forEach((value, index) => {
      expect(value).toBe(index + 1);
    });
  });

  it('should return an array of pokemons', async () => {
    const expectedPokemons = [
      pokemonMock,
      pokemonMock
    ];

    const pokemons = await getPokemonsById([ 1, 4 ]);

    expect(pokemons).toStrictEqual(expectedPokemons);
  });

  it('should return ', async () => {
    const expectedPokemons = [
      pokemonMock,
      pokemonMock,
      pokemonMock
    ];

    const pokemonOptions = await getPokemonOptions(3);

    expect(pokemonOptions).toStrictEqual(expectedPokemons);
  });
});