function clearBoard() {

}

var cur_mode = 0;
function changeMode() {
    var mode = document.getElementById("mode");
    if (cur_mode == 0) {
        mode.innerHTML = "Player vs Computer";
        document.getElementById("player1").innerHTML = "Player";
        document.getElementById("player2").innerHTML = "Computer";
    }
    else {
        mode.innerHTML = "Player1 vs Player2";
        document.getElementById("player1").innerHTML = "Player1";
        document.getElementById("player2").innerHTML = "Player2";
    }
    clearBoard();
    cur_mode = 1 - cur_mode;
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
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('time').innerHTML = date + " " + h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}