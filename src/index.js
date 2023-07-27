import './style.css';

const refreshBtn = document.querySelector('.refresh--btn');
const form = document.querySelector('form');
const userContainer = document.querySelector('.score--list');
const gameId = 'aJfQkEoLY170iVS5BLDy';
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
const updateScoreBoard = () => {
  fetchScore(`${baseUrl}${gameId}/scores/`).then((res) => displayUser(res?.result));
};
/* **** Eventlisteners ***** */
window.addEventListener('DOMContentLoaded', () => {
  updateScoreBoard();
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const nameInput = form.querySelector('#name');
  const scoreInput = form.querySelector('#score');
  const user = nameInput.value;
  const score = scoreInput.value;
  const userInfo = { user, score };
  try {
    const res = await createGameOrPostScore(`${baseUrl}${gameId}/scores/`, userInfo);
    if (res?.result === 'Leaderboard score created correctly.') {
      updateScoreBoard();
      nameInput.value = '';
      scoreInput.value = '';
    }
  } catch (error) {
    return error;
  }
  return userInfo;
});

refreshBtn.addEventListener('click', () => {
  updateScoreBoard();
});
