import debounce from 'lodash.debounce';
import './css/styles.css';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import API from './fetchCountries'

const DEBOUNCE_DELAY = 300;

const country = document.querySelector('#search-box');
const listCountry = document.querySelector('.country-list');
const infoCountry = document.querySelector('.country-info');

country.addEventListener('input', debounce(onCountryInput, DEBOUNCE_DELAY));

function onCountryInput(evt) {
  evt.preventDefault();

    const countrySearch = evt.target.value.trim();
    
    if (!countrySearch) {

      return
  }
 
  API(countrySearch).then(data => {
    if (data.length > 10) {
      listCountry.innerHTML = '';
      infoCountry.innerHTML = '';

      Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );
    } else if (data.length >= 2) {
      infoCountry.innerHTML = '';
      createMarkupList(data);
    } else if (data.length === 1) {
      listCountry.innerHTML = '';
      createMarkupInfo(data);
    }
  });
    
}

function createMarkupList(arr) {
  const markupList = arr
    .map(
      item => `<li class="countryItem">
    <img src="${item.flags.svg}" alt="${item.name.official}" width="22" height="22">
    <p>${item.name.official}</p>
    </li>`
    )
    .join('');
  listCountry.innerHTML = markupList;
}

function createMarkupInfo(arr) {
  const markupInfo = arr
    .map(
      item => `<div class = "countryFlagTitle"><img src="${item.flags.svg}" alt="${
        item.name.official
      }" width="22" height="22">
    <h2 class="countryTitle">${item.name.official}</h2></div>
   <p><span class="accent">Capital:</span> ${item.capital}</p>
   <p><span class="accent">Population:</span> ${item.population}</p> 
   <p><span class="accent">Languages:</span> ${Object.values(item.languages)}</p>`
    )
    .join('');
  infoCountry.innerHTML = markupInfo;
}
