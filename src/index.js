import { fetchBreeds, fetchCatByBreed } from './cat-api';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');

breedSelect.addEventListener('input', onSelect);

fetchBreeds()
  .then(breeds => {
    breedSelect.innerHTML = breeds
      .map(breed => {
        return `<option value="${breed.id}">${breed.name}</option>`;
      })
      .join('');
    breedSelect.classList.remove('hidden');
  })
  .catch(err => {
    iziToast.show({
      message: 'Oops! Something went wrong! Try reloading the page!',
      position: 'topCenter',
      color: '#FCE8E6',
    });
  })
  .finally(() => {
    loader.classList.add('hidden');
  });

function onSelect(event) {
  const breedId = event.target.value;
  loader.classList.remove('hidden');

  fetchCatByBreed(breedId)
    .then(({ url, description, name, temperament }) => {
      catInfo.innerHTML = `
        <img src="${url}" alt="a cat of ${name} breed" width="500px" />
        <div class="div-text">
            <h2 class="title">${name}</h2>
            <p class="text">${description}</p>
            <p class="text"><span class="temp">Temperament: </span>${temperament}</p>
        </div>
      `;
      catInfo.classList.remove('hidden');
    })
    .catch(err => {
      iziToast.show({
        message: 'Oops! Something went wrong! Try reloading the page!',
        position: 'topCenter',
        color: '#FCE8E6',
      });
      catInfo.classList.add('hidden');
    })
    .finally(() => {
      loader.classList.add('hidden');
    });
}
