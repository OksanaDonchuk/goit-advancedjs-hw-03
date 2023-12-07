import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_zeWygeVI9PjMBSUVH2oTp5elf4OEc1mdPIxnepILG4pvMCSXZXx1Q9oBRUMsYtTz';

export function fetchBreeds() {
  return axios.get('https://api.thecatapi.com/v1/breeds').then(res => {
    return res.data.map(elem => {
      return {
        name: elem.name,
        id: elem.id,
      };
    });
  });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(res => {
      if (!res.data.length) {
        throw new Error('Oops! Something went wrong!');
      }
      const { url, breeds } = res.data[0];
      return {
        url,
        description: breeds[0].description,
        name: breeds[0].name,
        temperament: breeds[0].temperament,
      };
    });
}
