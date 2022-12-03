import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(resp => {
      console.log(resp);
      if (!resp.ok) {
        throw new Error(
          Notiflix.Notify.failure('Oops, there is no country with that name')
        );
      }
      return resp.json();
    })
    .catch(err => console.error(err));
}
