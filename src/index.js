import './style.css';

const refreshBtn = document.querySelector('.refresh--btn');
const form = document.querySelector('form');
let gameId = '';
const newGameObj = { name: 'ak_game' };
const baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';
const createGameOrPostScore = async (url, obj) => {
  try {
    const fecthOPtion = {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-type': 'application/json',
      },
    };
    const response = await fetch(url, fecthOPtion);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
const fetchScore = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

window.addEventListener('DOMContentLoaded', () => {
  createGameOrPostScore(baseUrl, newGameObj).then((res) => {
    gameId = res.result;
    const indexOfColon = gameId.indexOf(':');
    const indexOfAdded = gameId.indexOf('added');
    gameId = `${gameId.slice(indexOfColon + 1, indexOfAdded).trim()}`;
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nameInput = form.querySelector('#name');
  const scoreInput = form.querySelector('#score');
  const user = nameInput.value;
  const score = scoreInput.value;
  const userInfo = { user, score };
  createGameOrPostScore(`${baseUrl}${gameId}/scores/`, userInfo);
  nameInput.value = '';
  scoreInput.value = '';
});

refreshBtn.addEventListener('click', () => {
  fetchScore(`${baseUrl}${gameId}/scores/`);
});