const form = document.querySelector('form');
form.addEventListener('submit', event => {
  event.preventDefault();
  const text = event.target.querySelector('#name').value;
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

      const listCountries = temp({ ...array[0] });
      container.insertAdjacentHTML('afterbegin', listCountries);
    } else if (res.data.length > 1 && res.data.length < 11) {
      const countries = res.data.map(country => country.name);
      const listCountries = temp({ countries, show: 'unseen' });
      container.insertAdjacentHTML('afterbegin', listCountries);
    } else error({
      text: 'Too many matches found, enter more specific query',
      delay: 1000,
    });
    

  });
});