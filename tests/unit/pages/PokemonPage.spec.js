import { fireEvent, render, screen, waitFor } from '@testing-library/vue';

import PokemonPage from '@/pages/PokemonPage';
import getPokemonOptions from '@/helpers/getPokemonOptions';

const pokemonArrayMock = [
  { id: 1, name: 'bulbasaur' },
  { id: 4, name: 'charmander' },
  { id: 7, name: 'squirtle' },
  { id: 25, name: 'pikachu' }
];
jest.mock('@/helpers/getPokemonOptions');
getPokemonOptions.mockReturnValue(Promise.resolve(pokemonArrayMock));

const PokemonPictureText = 'Pokemon Picture';
const PokemonPictureStub = {
  template: `<div>${PokemonPictureText}</div>`,
};

const PokemonOptionsText = 'Pokemon Options';
const PokemonOptionsStub = {
  template: `<div>${PokemonOptionsText}</div>`,
};

describe('PokemonPage component', () => {
  it('should render child components after loading element', async () => {
    render(PokemonPage, {
      global: { stubs: {
        PokemonPicture: PokemonPictureStub,
        PokemonOptions: PokemonOptionsStub
      }}
    });

    // Verifies loading test is rendered
    screen.getByText('Loading...');
    screen.getByText('Who is this Pokemon?');

    // Waits for load to finish
    await waitFor(() => expect(screen.queryByText('Loading...')).toBe(null));

    // Verifies child components are rendered
    const PokemonPictureComponent = screen.getByText(PokemonPictureText);
    const PokemonOptionsComponent = screen.getByText(PokemonOptionsText);
    screen.getByText('Who is this Pokemon?');

    // Verifies child components have arguments
    expect(PokemonPictureComponent.getAttribute('show-pokemon')).toBe('false');
    expect(
      typeof PokemonPictureComponent.getAttribute('pokemon-id')
    ).toBe('string');
    expect(
      typeof PokemonOptionsComponent.getAttribute('pokemons')
    ).toBe('string');
  });

  it('should render hidden pokemon', async () => {
    const pokemon = pokemonArrayMock[0];
    render(PokemonPage, {
      data() {
        return {
          pokemon,
          pokemonArray: pokemonArrayMock,
          showAnswer: false,
          message: ''
        };
      },
      global: { stubs: {
        PokemonPicture: PokemonPictureStub,
        PokemonOptions: PokemonOptionsStub
      }}
    });

    const PokemonPictureComponent = screen.getByText(PokemonPictureText);

    expect(PokemonPictureComponent.getAttribute('show-pokemon')).toBe('false');
    expect(
      PokemonPictureComponent.getAttribute('pokemon-id')
    ).toBe(pokemon.id.toString());
  });

  it('should render not hidden pokemon', async () => {
    const pokemon = pokemonArrayMock[1];
    const message = 'Test Message!!';
    render(PokemonPage, {
      data() {
        return {
          pokemon,
          pokemonArray: pokemonArrayMock,
          showAnswer: true,
          message
        };
      },
      global: { stubs: {
        PokemonPicture: PokemonPictureStub,
        PokemonOptions: PokemonOptionsStub
      }}
    });

    screen.getByText(message);  // Verifies message is displayed
    const PokemonPictureComponent = screen.getByText(PokemonPictureText);

    expect(
      PokemonPictureComponent.getAttribute('show-pokemon')
    ).toBe('true');
    expect(
      PokemonPictureComponent.getAttribute('pokemon-id')
    ).toBe(pokemon.id.toString());
  });

  it('should restart game', async () => {
    const pokemon = pokemonArrayMock[2];
    const message = 'Test Message!!';
    render(PokemonPage, {
      data() {
        return {
          pokemon,
          pokemonArray: pokemonArrayMock,
          showAnswer: true,
          message
        };
      },
      global: { stubs: {
        PokemonPicture: PokemonPictureStub,
        PokemonOptions: PokemonOptionsStub
      }}
    });

    // Clicks restart button
    const playAgainBtn = screen.getByText('Play Again');
    await fireEvent.click(playAgainBtn);

    expect(screen.queryByText('Play Again')).toBe(null);
    expect(screen.queryByText(message)).toBe(null);

    const PokemonPictureComponent = screen.getByText(PokemonPictureText);
    expect(
      PokemonPictureComponent.getAttribute('show-pokemon')
    ).toBe('false');
    expect(
      typeof PokemonPictureComponent.getAttribute('pokemon-id')
    ).toBe('string');
  });
});
