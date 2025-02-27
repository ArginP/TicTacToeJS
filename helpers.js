const SCORE_KEY = 'scoreTable';

export const setLocalStorage = (scoreTable) => { // записывает массив текущего счета в LocalStorage
    localStorage.setItem(SCORE_KEY, JSON.stringify(scoreTable));
}

export const getLocalStorage = () => { // вынимает массив текущего счета из LocalStorage
    return JSON.parse(localStorage.getItem(SCORE_KEY)) || [0, 0];
}