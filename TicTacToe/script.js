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