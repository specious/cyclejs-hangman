import xs from 'xstream';
import {div, h1} from '@cycle/dom';

import words from './dictionary';

import Keyboard from './keyboard';
import LetterSlots from './letter_slots';
import Artwork from './artwork';
import NewGameButton from './new_game_button';

function randomWord() {
  return words[Math.floor(Math.random()*words.length)];
}

function view(sources) {
  let newGameButton = NewGameButton(sources);

  let word$ = newGameButton.newGame$
    .startWith(true)
    .map(randomWord)
    .remember()
    .debug(w => console.log('word:', w));

  let keyboard = Keyboard({...sources, word$});
  let {guesses$, strikes$, isGameOver$} = keyboard;
  let artwork = Artwork(strikes$);
  let letterSlots = LetterSlots({word$, guesses$, isGameOver$});

  return xs.combine(
    artwork.DOM,
    letterSlots.DOM,
    keyboard.DOM,
    newGameButton.DOM
  ).map(
    ([
      artworkView,
      letterSlotsView,
      keyboardView,
      newGameButtonView
    ]) => div([
      h1('Hang Man'),
      artworkView,
      letterSlotsView,
      keyboardView,
      newGameButtonView
    ])
  );
}

function hangman(sources) {
  return {
    DOM: view(sources)
  };
}

export default hangman;
