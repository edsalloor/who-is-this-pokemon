import pokemonApi from '@/api/pokemonApi';

describe('pokemonApi', () => {
  it('should be setup with pokemon API', () => {
    const { defaults: { baseURL } } = pokemonApi;
    expect(baseURL).toBe('https://pokeapi.co/api/v2/pokemon');
  });
});
