import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const listCountry = document.querySelector('.country-list');
const infoCountry = document.querySelector('.country-info');

export default function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(resp => {
      console.log(resp);
      if (!resp.ok) {
        listCountry.innerHTML = '';
        infoCountry.innerHTML = '';
        throw new Error(
          Notiflix.Notify.failure('Oops, there is no country with that name')
        );
      }
      return resp.json();
    })
    .catch(err => console.error(err));
}
