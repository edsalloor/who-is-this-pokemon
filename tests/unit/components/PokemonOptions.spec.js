import { fireEvent, render, screen } from '@testing-library/vue';
import PokemonOptions from '@/components/PokemonOptions';

describe('pokemonOptions component', () => {
  const pokemons = [
    { id: 25, name: 'pikachu' },
    { id: 26, name: 'raichu' }
  ];
  let emitted;

  beforeEach(() => {
    const wrapper = render(PokemonOptions, { props: {
      pokemons
    }});
    emitted = wrapper.emitted;
  });

  it('should render pokemon options', () => {
    const liTags = screen.getAllByRole('listitem');
        
    liTags.forEach((liTag, index) => {
      expect(liTag.textContent).toBe(pokemons[index].name);
    });
  });

  it('should emit "pokemonSelection" event on click', () => {
    const liTags = screen.getAllByRole('listitem');

    liTags.forEach((liTag, index) => {
      fireEvent.click(liTag);

      expect(emitted().pokemonSelection.length).toBe(index + 1);
      expect(emitted().pokemonSelection[index]).toStrictEqual([ pokemons[index].id ]);
    });
  });
});
