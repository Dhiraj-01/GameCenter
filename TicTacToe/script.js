// debug function
function d() {
    for(var i = 0; i < arguments.length; i++) {
        console.log(arguments[i]);
    }
    console.log('\n');
}

const cross = '✕';
const zero = '◯';

const player1 = cross;
const player2 = zero;
var cur_player = null;

var pvsp = "Player1 vs Player2";
var pvsc = "Player vs Computer";
var game_mode = null;

var board = [null, null, null, null, null, null, null, null, null];
var cells = document.querySelectorAll(".cell");

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

// function checkWin() {
//     let wc = winning_combinations;
//     for(let i = 0; i < wc.length; i++)
//     {
//         let cell1 = wc[i][0];
//         let cell2 = wc[i][1];
//         let cell3 = wc[i][2];

//         if (board[cell1] == null || board[cell2] == null || board[cell3] == null) {
//             continue;
//         }
//         if (board[cell1] == board[cell2] && board[cell2] == board[cell3] && board[cell3] == board[cell1]) {
//             return true;
//         }
//     }
//     return false;
// }

// function checkTie() {
//     for(let i = 0; i < board.length; i++) {
//         if(board[i] == null) {
//             return false;
//         }
//     }
//     return true;
// }

// function isEmpty(cell) {
//     return (board[cell] == null);
// }

// function clearBoard() {
//     for(let i = 0; i < cells.length; i++) {
//         cells[i].innerHTML = null;
//         board[i] = null;
//     }
//     cur_player = player1;
// }

// function changePlayer() {
//     cur_player = (cur_player == player1) ? player2 : player1;
// }

// function press(e) {
//     let cell = e.target.id;
//     if(gameOver() || tie()) {
//         clearBoard();
//         return;
//     }

//     if(isEmpty(cell))
//     {
//         let sound = document.getElementById("sound");
//         sound.play();

//         board[cell] = cur_player;
//         document.getElementById(cell).innerHTML = cur_player;
//         if(gameOver()) {
//             // clearBoard();
//         }
//         else changePlayer();
//     }
// }

// function changeMode() {
//     if (game_mode == 0) {
//         document.getElementById("mode").innerHTML = "Player vs Computer";
//         document.getElementById("player1").innerHTML = "Player(X)";
//         document.getElementById("player2").innerHTML = "Computer(O)";
//     }
//     else {
//         document.getElementById("mode").innerHTML = "Player1 vs Player2";
//         document.getElementById("player1").innerHTML = "Player1(X)";
//         document.getElementById("player2").innerHTML = "Player2(O)";
//     }
//     clearBoard();
//     game_mode ^= 1;
// }
