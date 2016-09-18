import DistanceDelta from "./DistanceDelta.js";

//
// Set up some global state
//

var tick_interval = 100, //milliseconds
    max_distance = Math.sqrt(
        Math.pow(window.innerWidth, 2) + Math.pow(window.innerHeight, 2)
    ),
    margin = {top: 20, right: 20, bottom: 20, left: 40},
    cursorX = 0,
    cursorY = 0,
    prevX = 0,
    prevY = 0;

window.data = [];

//
// Create graphs
//

var distance_delta_graph = new DistanceDelta({
    "margin"       : margin,
    "svg_id"       : "delta_distance",
    "time_window"  : 30000,
    "max_distance" : max_distance
});

//
// tick funcion renders every "frame" of the graphs and updates global (window) data array
//

function tick(){
    var distance_delta = Math.sqrt(Math.pow(prevX - cursorX, 2) +
                             Math.pow(prevY - cursorY, 2));

    window.data.push({
        "distance" : distance_delta,
        "time"     : Date.now(),
        "velocity" : distance_delta/tick_interval
    });

    distance_delta_graph.render();

    prevX = cursorX;
    prevY = cursorY;
}

//
// set up the tick rate and capture mouse movement
//

var interval_id = window.setInterval(tick, tick_interval);
window.setTimeout(
    function(){window.clearInterval(interval_id);},
    tick_interval*200);

document.onmousemove = function(e){
    cursorX = e.pageX;
    cursorY = e.pageY;
}
