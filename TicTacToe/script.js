function d(p) {
    console.log(p);
}

const cross = '✕';
const zero = '○';

const player1 = cross;
const player2 = zero;
var cur_player = null;

var game_mode = 0;
/*
    0 - player vs player
    1 - player vs computer
*/

const winning_combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
]

function gameOver() {
    for(let i = 0; i < winning_combinations.length; i++) {
        let cell1 = winning_combinations[i][0];
        let cell2 = winning_combinations[i][1];
        let cell3 = winning_combinations[i][2];

        if (board[cell1] == null || board[cell2] == null || board[cell3] == null) {
            continue;
        }
        if (board[cell1] == board[cell2] && board[cell2] == board[cell3] && board[cell3] == board[cell1]) {
            return true;
        }
    }
    return false; 
}

var board = [null, null, null, null, null, null, null, null, null];

function isEmpty(cell) {
    return board[cell] == null;
}

function clearBoard() {
    cur_player = player1;
    var cells = document.querySelectorAll(".cell");
    for(let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = null;
    }
    for(let i = 0; i < board.length; i++) {
        board[i] = null;
    }
}

function changePlayer() {
    if(cur_player == player1) {
        cur_player = player2;
    }
    else {
        cur_player = player1;
    }
}

function press(e) {
    let cell = e.target.id;
    if(isEmpty(cell))
    {
        board[cell] = cur_player;
        document.getElementById(cell).innerHTML = cur_player;
        if(gameOver()) {
            clearBoard();
        }
        else changePlayer();
    }
}

function changeMode() {
    if (game_mode == 0) {
        document.getElementById("mode").innerHTML = "Player vs Computer";
        document.getElementById("player1").innerHTML = "Player(X)";
        document.getElementById("player2").innerHTML = "Computer(O)";
    }
    else {
        document.getElementById("mode").innerHTML = "Player1 vs Player2";
        document.getElementById("player1").innerHTML = "Player1(X)";
        document.getElementById("player2").innerHTML = "Player2(O)";
    }
    clearBoard();
    game_mode ^= 1;
}


// date and time
function checkTime(i) {
    return (i < 10) ? "0" + i : i;
}

function startTime() {
    var today = new Date();
    var date = today.getDate() + '/' + today.getMonth() + '/' + today.getFullYear();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('time').innerHTML = date + " " + h + ":" + m + ":" + s;
    setTimeout(startTime, 500);
}