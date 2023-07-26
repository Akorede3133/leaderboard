import './style.css';

const refreshBtn = document.querySelector('.refresh--btn');
const form = document.querySelector('form');
const userContainer = document.querySelector('.score--list');
let gameId = '';
const newGameObj = { name: 'ak_game' };
const baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';

/* **** Functions **** */
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
const displayUser = (users) => {
  userContainer.innerHTML = '';
  const userElement = users.map((user) => {
    const li = `
    <li class="score--list--item">
    <span>${user.user}:</span>
    <span>${user.score}</span>
    </li>`;
    return li;
  }).join('');
  if (users.length > 0) {
    userContainer.classList.remove('hide--score--list--border');
  } else {
    userContainer.classList.add('hide--score--list--border');
  }
  userContainer.insertAdjacentHTML('beforeend', userElement);
};

/* **** Eventlisteners ***** */
window.addEventListener('DOMContentLoaded', () => {
  createGameOrPostScore(baseUrl, newGameObj).then((res) => {
    gameId = res?.result;
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
  fetchScore(`${baseUrl}${gameId}/scores/`).then((res) => displayUser(res?.result));
});
