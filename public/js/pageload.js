var before = new Date().getTime();
window.onload = Pageloadtime;

function Pageloadtime() {
    var after = new Date().getTime();
    var res = (after - before) / 1000;
    document.querySelector('#pageTime').innerText = `Время загрузки сайта: ${after - before} ms (client), {{time}} ms (server)`;
    console.log("Page load time: " + (after - before) / 1000 + " sec");
}