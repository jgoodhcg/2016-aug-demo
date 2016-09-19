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
    time_window = 30000,
    body = document.body,
    html = document.documentElement,
    height,
    distance_delta = 0,
    velocity = 0,
    prev_velocity = 0;

window.data = [];

window.onload = function(){
    height = Math.max( body.scrollHeight, body.offsetHeight,
                       html.clientHeight, html.scrollHeight, html.offsetHeight );

    //
    // Create graphs
    //

    var position_graph = new Position({
        margin,
        time_window,
        "svg_id": "position",
        "max_y" : height,
        "min_y" : 0
    });
    var velocity_graph = new Velocity({
        margin,
        time_window,
        "svg_id": "velocity",
        "max_y" : max_distance/tick_interval,
        "min_y" : -(max_distance/tick_interval)
    });

    var acceleration_graph = new Acceleration({
        margin,
        time_window,
        "svg_id": "acceleration",
        "max_y" : max_distance/Math.pow(tick_interval, 2),
        "min_y" : -(max_distance/Math.pow(tick_interval, 2))
    });

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
    //
    // tick funcion renders every "frame" of the graphs and updates global (window) data array
    //

    function tick(){
        distance_delta = cursorY - prevY; // 1d motion
        prev_velocity = velocity;
        velocity = distance_delta/tick_interval;
        // TODO figure out vector math to have 2d motion
        // = Math.sqrt(Math.pow(prevX - cursorX, 2) +
        //                      Math.pow(prevY - cursorY, 2));

        total_distance += distance_delta;

        window.data.push({
            "y"        : cursorY,
            "velocity" : distance_delta/tick_interval,
            "acceleration": (prev_velocity - velocity ) / tick_interval,
            "total_distance" : total_distance,
            "time"     : Date.now(),
        });

        position_graph.render();
        velocity_graph.render();
        acceleration_graph.render();

        prevX = cursorX;
        prevY = cursorY;
    }
}




