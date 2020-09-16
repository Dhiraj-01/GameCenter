const minN = 3;
const maxN = 8;

var N = document.getElementById("n");
var Board = document.getElementById("board");

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

document.body.addEventListener('keydown', function (event) {
    const key = event.key;

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
    
    let X = $("#" + findVal(A[0], A[1])).text();
    let Y = $("#" + findVal(B[0], B[1])).text();

    $("#" + findVal(A[0], A[1])).text(Y);
    $("#" + findVal(B[0], B[1])).text(X);

    // console.log("#" + findVal(A[0], A[1]));
    // console.log("#" + findVal(B[0], B[1]));
    // console.log("A : ", A);
    // console.log("B : ", B);
    // console.log("X : ", X);
    // console.log("Y : ", Y);
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
    let n = getN();
    var arr = [];
    for(let i = 0; i < n * n; i++) {
        arr[i] = i;
    }
    shuffle(arr);
    console.log(arr);

    $("#board").empty();
    for(let i = 0; i < n; i++) {
        let row = "<tr>";
        for(let j = 0; j < n; j++) {
            if(arr[i * n + j] == 0) {
                arr[i * n + j] = "";
            }
            row += "<td id=" + findVal(i, j) + ">" + arr[findVal(i, j)] + "</td>";
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
