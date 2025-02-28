const DATA_KEY = 'data';

export const setLocalStorage = (data) => { // записывает массив текущего счета в LocalStorage
    localStorage.setItem(DATA_KEY, JSON.stringify(data));
}

export const getLocalStorage = () => { // вынимает массив текущего счета из LocalStorage
    return JSON.parse(localStorage.getItem(DATA_KEY)) || [ 0, 0, "Игрок X", "Игрок O" ];
}