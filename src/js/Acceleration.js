import LiveGraph from "./LiveGraph.js";
var d3 = require("d3");

export default class Acceleration extends LiveGraph{
    constructor(args){
        super(args);

        var now = Date.now();
        this.line = d3.line()
            .x((d,i,data) => this.x(now - d.time))
            .y((d,i,data) => this.y(d.distance/args.tick_interval));
    }
}
