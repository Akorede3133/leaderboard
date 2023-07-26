import './style.css';
let gameId = '';
const createGame = async (obj) => {
  const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';
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
const obj = { name: 'akgame' };
createGame(obj).then((res) => {
  gameId = res.result;
  const indexOfColon = gameId.indexOf(':');
  const indexOfAdded = gameId.indexOf('added');
  gameId = `${gameId.slice(indexOfColon + 1, indexOfAdded).trim()}`;
});