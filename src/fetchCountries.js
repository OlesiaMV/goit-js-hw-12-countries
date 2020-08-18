'use strict';
import axios from 'axios';

const fetchCountries = searchQuery => {
  return axios.get(`https://restcountries.eu/rest/v2/name/${searchQuery}`);
};

export default fetchCountries;
