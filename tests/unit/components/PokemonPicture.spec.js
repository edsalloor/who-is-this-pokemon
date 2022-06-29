import { render, screen } from '@testing-library/vue';
import PokemonPicture from '@/components/PokemonPicture';

describe('PokemonPicture component', () => {
  const pokemonId = 25;
  const expectedURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`;

  it('should render hidden pokemon', () => {
    render(PokemonPicture, { props: {
      pokemonId,
      showPokemon: false
    }});

    const imgTag = screen.getByRole('img');

    expect(imgTag.classList).toContain('hidden-pokemon');
    expect(imgTag.getAttribute('src')).toBe(expectedURL);
  });

  it('should render not hidden pokemon', () => {
    render(PokemonPicture, { props: {
      pokemonId,
      showPokemon: true
    } });

    const imgTag = screen.getByRole('img');

    expect(imgTag.classList).not.toContain('hidden-pokemon');
    expect(imgTag.getAttribute('src')).toBe(expectedURL);
  });
});