import './style.css';

const refreshBtn = document.querySelector('.refresh--btn');
let gameId = '';
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
