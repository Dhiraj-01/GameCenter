const player1 = 'X';
const player2 = 'O';
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

var current_mode = 0;
/*
    0 - player vs player
    1 - player vs computer
*/

function clearBoard() {
    var cells = document.querySelectorAll(".cell");
    for(let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = "dhriaj";
    }
}


function changeMode() {
    if (current_mode == 0) {
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
    current_mode = 1 - current_mode;
}


// date and time
function checkTime(i) {
    return (i < 10) ? "0" + i : i;
}

function startTime()
{
    var today = new Date();
    var date = today.getDate() + '/' + today.getMonth() + '/' + today.getFullYear();
    var h = today.getHours();
    if(h > 12) h -= 12;
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('time').innerHTML = date + " " + h + ":" + m + ":" + s;
    setTimeout(startTime, 500);
}