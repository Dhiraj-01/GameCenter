function d() {
    for (var i = 0; i < arguments.length; i++) {
        console.log(arguments[i]);
    }
    console.log('\n');
}

const minN = 2;
const maxN = 10;
var step = 0;

const music = [
    // "../sounds/boom.wav",
    "../sounds/clap.wav",
    // "../sounds/hihat.wav",
    // "../sounds/kick.wav",
    // "../sounds/openhat.wav",
    // "../sounds/ride.wav",
    // "../sounds/snare.wav",    
    // "../sounds/tom.wav",
    "../sounds/tink.wav",    
];

var N = document.getElementById("n");
var Board = document.getElementById("board");
var sound = document.getElementById("sound");

function rnd(l, r) {
    return Math.floor(Math.random() * (r - l + 1)) + l;
}
function getN() {
    if(N != null) {
        return (Number)(N.innerHTML);
    }
}

function findIJ(val) {
    // val = i * n + j
    let n = getN();
    let i = Math.floor(val / n);
    let j = val - i * n;
    return [i, j];
}

function findVal(i, j) {
    return i * getN() + j;
}

function findEmpty() {
    let id = 0, n = getN();
    for(let i = 0; i < n * n; i++) {
        if($("#" + i).text() == "") {
            id = i;
            break;
        }
    }
    console.log("id = " + id);
    return id;
}

function Clear() {
    step = 0;
    $("#board").empty();
    $("#msg").empty();
}

function gameOver() {
    let n = getN();
    for(let i = 0; i < n * n - 1; i++) {
        let val = $("#" + i).text();
        if(val != i + 1) {
            return false;
        }
    }
    return true;
}

document.body.addEventListener('keydown', function (event) {
    const key = event.key;

    sound.setAttribute('src', music[rnd(0, music.length - 1)]);
    sound.load();
    sound.play();

    let A = findIJ(findEmpty());
    let B = A.slice();

    switch (key) {
        case "ArrowLeft":
            console.log("Left");
            B[1]--;
            break;
        case "ArrowRight":
            console.log("Right");
            B[1]++;
            break;
        case "ArrowUp":
            console.log("Up");
            B[0]--;
            break;
        case "ArrowDown":
            console.log("Down");
            B[0]++;
            break;
        default:
            return;
    }

    let n = getN();
    if(A[0] < 0 || A[1] < 0 || B[0] < 0 || B[1] < 0 || A[0] >= n || A[1] >= n || B[0] >= n || B[1] >= n) {
        return;
    }
    
    step++;
    let id1 = "#" + findVal(A[0], A[1]);
    let id2 = "#" + findVal(B[0], B[1]);

    let X = $(id1).text();
    let Y = $(id2).text();

    $(id1).text(Y);
    $(id2).text(X);

    if(gameOver()) {
        $("#board").empty();
        $("#msg").append("Congratulation Game Over. <br> Total Step : " + step);
    }
}); 

function shuffle(array) {
    var id = array.length, temp, rid;
    while (0 !== id) {
        rid = Math.floor(Math.random() * id);
        id -= 1;
        temp = array[id];
        array[id] = array[rid];
        array[rid] = temp;
    }
    return array;
}

function generateMatrix()
{
    Clear();
    let n = getN();
    var arr = new Array(n);
    for(let i = 0; i < n; i++) {
        arr[i] = new Array(n);
    }

    let r = new Array(n * n);
    for(let i = 0; i < n * n; i++) {
        r[i] = i;
    }

    while(1)
    {
        shuffle(r);
        let pos = -1;
        for (let i = 0; i < n * n; i++) {
            if(r[i] == 0) {
                pos = findIJ(i);
                break;
            }
        }
        let sum = (pos[0] + pos[1]) % 2;
        for (let i = 0; i < n * n; i++) {
            for (let j = i + 1; j < n * n; j++) {
                if(r[j] == 0) continue;
                else if(r[i] == 0) sum++;
                else sum += (r[j] < r[i]);
            }
        }
        if(sum % 2 == 0) {
            break;
        }
    }

    let id = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            arr[i][j] = r[id++];
        }
    }

    for(let i = 0; i < n; i++) {
        let row = "<tr>";
        for(let j = 0; j < n; j++) {
            if(arr[i][j] == 0) {
                arr[i][j] = "";
            }
            row += "<td id=" + findVal(i, j) + ">" + arr[i][j] + "</td>";
        }
        row += "</tr>"
        $("#board").append(row);
    }
}

function decreseN() {
    let n = getN();
    if(n > minN) {
        N.innerHTML = n - 1;
    }
    generateMatrix();
}

function incerseN() {
    let n = getN();
    if (n < maxN) {
        N.innerHTML = n + 1;
    }
    generateMatrix();
}
