let currentPlayer = 'X'; // игрок X ходит первым
let gameBoard = ['', '', '', '', '', '', '', '', '']; // 3x3 матрица игрового поля
let gameActive = true;
const currentPlayerDisplay = document.getElementById('currentPlayerDisplay'); // поле для отображения "Ход игрока N"

// Переключение ходом между игроками

function handlePlayerTurn(clickedCellIndex) {
    if (gameBoard[clickedCellIndex] !== '' || !gameActive) { // проверяет, что ячейка свободна и игра активна
        return;
    }
    gameBoard[clickedCellIndex] = currentPlayer; // закрепляет ячейку за текущим игроком
    checkForWinOrDraw(); // после каждого хода проверяет поле на условия победы
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // переключает на второго игрока
}

// Базовая игровая логика

const cells = document.querySelectorAll('.cell');

cells.forEach(cell => { // отслеживание кликов по всем клеткам
    cell.addEventListener('click', cellClicked, false);
});

function cellClicked(clickedCellEvent) { // логика при клике на клетку
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.id.replace('cell-', '')) - 1; // индекс нажатой ячейки

    if (gameBoard[clickedCellIndex] !== '' || !gameActive) { // проверяет, что ячейка свободна и игра активна
        return;
    }

    handlePlayerTurn(clickedCellIndex); // закрепляет ячейку за текущим игроком и переключает ход на второго игрока
    updateUI(); // обновляет интерфейс после клика
}

// Обновление интерфейса

function updateUI() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = gameBoard[i]; // отрисовывает игровое поле в соответствии с матрицей ячеек
    }
    if (gameActive) {
        if (currentPlayer === 'X') {
            currentPlayerDisplay.innerText = `Сейчас ходит ${displayedPlayerNameX}`;
        } else if (currentPlayer === 'O') {
            currentPlayerDisplay.innerText = `Сейчас ходит ${displayedPlayerNameO}`;
        }
    } else {
        currentPlayerDisplay.innerText = '';
    }
}

// Условия победы

const winConditions = [
    [0, 1, 2], // Верхняя строка
    [3, 4, 5], // Средняя строка
    [6, 7, 8], // Нижняя строка
    [0, 3, 6], // Левая колонка
    [1, 4, 7], // Средняя колонка
    [2, 5, 8], // Правая колонка
    [0, 4, 8], // Диагональ слева-направо
    [2, 4, 6]  // Диагональ справа-налево
];

function checkForWinOrDraw() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) { // циклом сверяем игровое поле со всеми условиями победы
        const [a, b, c] = winConditions[i];
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        announceWinner(currentPlayer); // текущий игрок победил
        updateScoreTable(currentPlayer); // обновление счета
        updateScoreTableUI(); // обновление отображения счета
        gameActive = false;
        return;
    }

    let roundDraw = !gameBoard.includes(''); // если поле заполнено, а условие победы не достигнуто
    if (roundDraw) {
        announceDraw(); // ничья
        gameActive = false;
        return;
    }
}

// Объявление победителя или ничьи

function announceWinner(player) {
    const messageElement = document.getElementById('gameMessage');
    if (player === 'X') {
        messageElement.innerText = `${displayedPlayerNameX} победил(а)!`;
    } else if (player === 'O') {
        messageElement.innerText = `${displayedPlayerNameO} победил(а)!`;
    }

}

function announceDraw() {
    const messageElement = document.getElementById('gameMessage');
    messageElement.innerText = 'Ничья!';
}

// Перезапуск игры

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', '']; // Очищает матрицу игрового поля
    gameActive = true; // Делает игру активной
    currentPlayer = 'X'; // Первым ходит игрок X
    // Очищает ячейки в интерфейсе
    cells.forEach(cell => {
        cell.innerText = '';
    });
    document.getElementById('gameMessage').innerText = '';
    updateUI();
}

const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', resetGame, false);

// Выпадающее меню

const dropDown = document.getElementById('dropDown');
const dropDownMenu = document.getElementsByClassName('drop-down__menu-box');

dropDown.addEventListener('click', (e) => {
    dropDownMenuToggle();
})

function dropDownMenuToggle() {
    dropDownMenu[0].classList.toggle('drop-down--active');
}

// Настраиваемые имена игроков

let displayedPlayerNameX = 'Игрок X';
let displayedPlayerNameO = 'Игрок O';

const renameButtonX = document.getElementById('playerNameX');
const renameButtonO = document.getElementById('playerNameO');

renameButtonX.addEventListener('click', (e) => {
    displayedPlayerNameX = prompt('Введите ваше имя:');
    if (displayedPlayerNameX === null) {
        displayedPlayerNameX = 'Игрок X'; // если пользователь отменит ввод имени, возвращает на по-умолчанию
    }
    updateUI(); // чтобы обновить поле "Ход игрока N"
    dropDownMenuToggle(); // чтобы закрыть выплывающее меню
})

renameButtonO.addEventListener('click', (e) => {
    displayedPlayerNameO = prompt('Введите ваше имя:');
    if (displayedPlayerNameO === null) {
        displayedPlayerNameO = 'Игрок O';
    }
    updateUI();
    dropDownMenuToggle();
})

// Таблица счета побед

let scoreTable = [0, 0]
const scoreButton = document.getElementById('score');
const scoreBoard = document.getElementById('scoreBoard');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');

function updateScoreTable(currentPlayer) {
    if (currentPlayer === 'X') {
        scoreTable[0] = scoreTable[0] + 1;
    } else if (currentPlayer === 'O') {
        scoreTable[1] = scoreTable[1] + 1;
    }
}

function updateScoreTableUI() {
    scoreX.innerText = `${scoreTable[0]}`;
    scoreO.innerText = `${scoreTable[1]}`;
}

function showScoreTable() {
    scoreButton.classList.toggle('shown');
    scoreBoard.classList.toggle('shown');
    if (scoreButton.classList.contains('shown')) {
        scoreButton.innerText = 'Скрыть счет';
    } else {
        scoreButton.innerText = 'Показать счет';
    }
    dropDownMenuToggle(); // чтобы закрыть выплывающее меню
}

scoreButton.addEventListener('click', (e) => {
    showScoreTable();
})