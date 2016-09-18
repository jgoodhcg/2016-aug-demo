import LiveGraph from "./LiveGraph.js";

var tick_interval = 5, //milliseconds
    max_distance = Math.sqrt(
        Math.pow(window.innerWidth, 2) + Math.pow(window.innerHeight, 2)
    ),
    margin = {top: 20, right: 20, bottom: 20, left: 40},
    cursorX = 0,
    cursorY = 0,
    prevX = 0,
    prevY = 0;

var delta_distance = new LiveGraph({
    "margin"       : margin,
    "svg_id"       : "delta_distance",
    "time_window"  : 30000,
    "max_distance" : max_distance
});

function tick(){
    delta_distance.render({
        tick_interval,
        cursorX,
        cursorY,
        prevX,
        prevY
    });

    delta_distance.filter();

    prevX = cursorX;
    prevY = cursorY;
}

window.setInterval(tick, tick_interval);
document.onmousemove = function(e){
    cursorX = e.pageX;
    cursorY = e.pageY;
}
