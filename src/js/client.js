import Velocity from "./Velocity.js";
import Acceleration from "./Acceleration.js";
import Position from "./Position.js";

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
    prevY = 0,
    total_distance = 0,
    time_window = 30000;

window.data = [];

//
// Create graphs
//

var position_graph = new Position({
    margin,
    time_window,
    "svg_id": "position",
    "max_y" : window.innerHeight,
    "min_y" : 0
});
var velocity_graph = new Velocity({
    margin,
    time_window,
    "svg_id"       : "velocity",
    "max_y" : max_distance,
    "min_y" : 0
});

var acceleration_graph = new Acceleration({
    margin,
    time_window,
    tick_interval,
    "svg_id"       : "acceleration",
    "max_y" : max_distance/tick_interval,
    "min_y" : -(max_distance/tick_interval)
});


//
// tick funcion renders every "frame" of the graphs and updates global (window) data array
//

function tick(){
    var distance_delta = cursorY - prevY;
        // = Math.sqrt(Math.pow(prevX - cursorX, 2) +
        //                      Math.pow(prevY - cursorY, 2));

    total_distance += distance_delta;

    window.data.push({
        "y"        : cursorY,
        "distance" : distance_delta,
        "total_distance" : total_distance,
        "time"     : Date.now(),
    });

    position_graph.render();
    // velocity_graph.render();
    // acceleration_graph.render();

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
