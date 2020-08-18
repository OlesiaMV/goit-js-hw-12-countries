import fetchCountries from './fetchCountries.js';
import { error } from '../node_modules/@pnotify/core/dist/PNotify.js';
import debounce from '../node_modules/lodash/debounce.js';

import temp from './country.hbs';

const container = document.querySelector('.container');
const input = document.querySelector('#name');

let listCountries=null;

const debouncedFunction = debounce(event => {
  const text = event.target.value;
  fetchCountries(text).then(res => {
    if (res.data.length === 1) {
      const array = res.data.map(el => {
        const name = el.name;
        const capital = el.capital;
        const population = el.population;
        const languages = el.languages;
        const flag = el.flag;

        return { name, capital, population, languages, flag };
      });

      listCountries = temp({ ...array[0] });
      
    } else if (res.data.length > 1 && res.data.length < 11) {
      const countries = res.data.map(country => country.name);
      listCountries = temp({ countries, show: 'unseen' });
    } else
      error({
        text: 'Too many matches found, enter more specific query',
        delay: 3000,
      });
      container.innerHTML = '';
      container.insertAdjacentHTML('afterbegin', listCountries);
  }).catch(er=>error({
    text: 'Server Error',
    delay: 3000,
  }));
}, 500);


input.addEventListener('input', debouncedFunction);
