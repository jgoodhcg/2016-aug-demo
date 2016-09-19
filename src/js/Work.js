import LiveGraph from "./LiveGraph.js";
var d3 = require("d3");

export default class Work extends LiveGraph{
    constructor(args){
        super(args);

        this.line = d3.line()
            .x((d,i,data) => this.x(Date.now() - d.time))
            .y((d,i,data) => this.y(d.work));
    }
}
