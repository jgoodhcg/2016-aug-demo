
import TotalEnergy from "./TotalEnergy.js";
import Work from "./Work.js";
import Acceleration from "./Acceleration.js";
import Velocity from "./Velocity.js";
import Position from "./Position.js";

// require("../scss/app.scss");

//
// Set up some global state and variables
//

var body = document.body,
    html = document.documentElement,
    margin = {top: 20, right: 20, bottom: 20, left: 70},

    tick_interval = 10, //milliseconds
    time_window = 30000,
    tick_num = time_window / tick_interval,

    cursorX = 0,
    cursorY = 0,
    prevX = 0,
    prevY = 0,
    mouse_mass = 1,

    total_distance = 0,
    distance_delta = 0,
    velocity = 0,
    prev_velocity = 0,
    start_time = Date.now(),
    total_energy = 0;

    window.data = []; // global object all graphs subscribe to

window.onload = function(){
    // max distance the mouse can move has to be determined on load
    var doc_height = Math.max( body.scrollHeight, body.offsetHeight,
                           html.clientHeight, html.scrollHeight, html.offsetHeight ),
        max_position = doc_height,
        min_position = 0,
        max_velocity = doc_height/tick_interval,
        min_velocity = - max_velocity,
        max_acceleration = doc_height/Math.pow(tick_interval, 2),
        min_acceleration = - max_acceleration,
        max_work = mouse_mass * max_acceleration * doc_height,
        min_work = - max_work,
        max_total_energy = max_work * tick_interval,
        min_total_energy = 0;

    //
    // Create graphs
    //

    var
    position_graph = new Position({
        margin,
        time_window,
        "svg_id": "position",
        "max_y" : max_position,
        "min_y" : min_position,
        "label" : "vertical pixel position"
    }),
    velocity_graph = new Velocity({
        margin,
        time_window,
        "svg_id": "velocity",
        "max_y" : max_velocity,
        "min_y" : min_velocity,
        "label" : "pixels / "+tick_interval+" milliseconds"
    }),
    acceleration_graph = new Acceleration({
        margin,
        time_window,
        "svg_id": "acceleration",
        "max_y" : max_acceleration,
        "min_y" : min_acceleration,
        "label" : "pixels per "+tick_interval+" milliseconds squared"
    }),
    work_graph = new Work({
        margin,
        time_window,
        "svg_id": "work",
        "max_y" : max_work,
        "min_y" : min_work,
        "label" : "g * pixels squared / "+tick_interval+" milliseconds squared"
    }),
    total_energy_graph = new TotalEnergy({
        margin,
        time_window,
        "svg_id": "total_energy",
        "max_y" : max_total_energy,
        "min_y" : min_total_energy,
        "label" : "g * pixels squared / "+tick_interval+" milliseconds squared (accumulated)"
    });

    //
    // set up the tick rate and capture mouse movement
    //

    var interval_id = window.setInterval(tick, tick_interval);
    document.body.onkeydown = function(e){
        if(e.keyCode == 32){
            if(interval_id === null){
                interval_id = window.setInterval(tick, tick_interval);
            }else{
                window.clearInterval(interval_id)
                interval_id = null;
            }
        }
        // prevents the scrolling
        if(e.keyCode == 32 && e.target == document.body) {
            e.preventDefault();
            return false;
        }
    }
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

        var acceleration = (prev_velocity - velocity ) / tick_interval,
            force = mouse_mass * acceleration,
            work = force * distance_delta;

        total_energy += Math.abs(work);

        window.data.push({
            "y"        : cursorY,
            "velocity" : distance_delta/tick_interval,
            acceleration,
            work,
            total_energy,
            "time"     : Date.now(),
        });

        position_graph.render();
        velocity_graph.render();
        acceleration_graph.render();
        work_graph.render();
        total_energy_graph.render();

        prevX = cursorX;
        prevY = cursorY;
    }
}




