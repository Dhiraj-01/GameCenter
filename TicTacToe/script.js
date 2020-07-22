function startTime() {
    var today = new Date();
    var date = today.getDate() + '/' + today.getMonth() + '/' + today.getFullYear();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('time').innerHTML = "Date : " + date + " " + h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
    return i;
}

var i = 0;
function change() {
    var doc = document.getElementById("title");
    var color = [
        ["#66ff66", "#ccff33"],
        ["coral", "brown"]
    ];
    doc.style.color = color[i][0];

    var doc = document.getElementById("titlespan");
    doc.style.color = color[i][1];
    i = (i + 1) % color.length;
}
setInterval(change, 5000);