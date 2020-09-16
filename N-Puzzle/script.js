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
