import {run} from '@cycle/xstream-run';
import fromEvent from 'xstream/extra/fromEvent';
import {makeDOMDriver} from '@cycle/dom';

import main from './hangman';

let drivers = {
  DOM: makeDOMDriver('#app'),
  keydown: () => fromEvent(document.body, 'keydown')
};

run(main, drivers);
