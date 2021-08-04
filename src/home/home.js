import {
  getPokemons,
  getLikes,
  getDataLikes,
  setDataLikes,
  saveLike,
} from './api';
import pokemonCard from './components/pokemonCard';

const addLike = (e) => {
  console.log('data likes', getDataLikes());
  console.log(e.target.getAttribute('data-pokemon'));
  const pokemonLike = e.target.getAttribute('data-pokemon');
  const result = saveLike(pokemonLike);
  result.then((response) => console.log('saved like'));
};

const initializeHome = () => {
  const pokemonContainer = document.getElementById('pokemon-container');
  const likes = getLikes();

  likes
    .then((response) => response.json())
    .then((likes) => {
      const result = getPokemons();
      result
        .then((response) => response.json())
        .then(({ results }) => {
          setDataLikes(likes);
          results.forEach((pokemon, index) => {
            const pokemonLike = likes.find(
              (element) => element.item_id === pokemon.name
            );
            pokemon.id = index + 1;
            pokemon.likes = pokemonLike ? pokemonLike.likes : '';
            pokemonContainer.insertAdjacentHTML(
              'beforeend',
              pokemonCard(pokemon)
            );
            const likeBtn = document.querySelectorAll('#btnLike');
            likeBtn.forEach((btn) => {
              btn.addEventListener('click', addLike);
            });
          });
        });
    });
};

export default initializeHome;
