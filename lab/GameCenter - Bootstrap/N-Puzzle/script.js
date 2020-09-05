const minN = 3;
const maxN = 8;

function decreseN() {
    let n = (Number)(document.getElementById("n").innerHTML);
    if(n > minN) {
        document.getElementById("n").innerHTML = n - 1;
    }
}

function incerseN() {
    let n = (Number)(document.getElementById("n").innerHTML);
    if (n < maxN) {
        document.getElementById("n").innerHTML = n + 1;
    }
}