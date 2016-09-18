var d3 = require("d3");

export default class LiveGraph{
    constructor(args){
        this.data = [];
        this.svg_id = args.svg_id;
        this.time_window = args.time_window;

        this.svg = d3.select("#"+this.svg_id);
        var  width = +this.svg.attr("width") - args.margin.left - args.margin.right,
            height = +this.svg.attr("height") - args.margin.top - args.margin.bottom,
            g = this.svg.append("g").attr("transform", "translate(" + args.margin.left + "," + args.margin.top + ")");

        var x = d3.scaleLinear()
            .domain([0, this.time_window])
            .range([0, width]);

        var y = d3.scaleLinear()
            .domain([0, args.max_distance])
            .range([height, 0]);

        this.line = d3.line()
            .x(function(d, i) { return x((Date.now() - d.time)); })
            .y(function(d, i) { return y(d.distance); });

        g.append("defs").append("clipPath")
            .attr("id", "clip")
            .append("rect")
            .attr("width", width)
            .attr("height", height);

        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + y(0) + ")")
            .call(d3.axisBottom(x));

        g.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y));

        g.append("g")
            .attr("clip-path", "url(#clip)")
            .append("path")
            .datum(this.data)
            .attr("class", this.svg_id+"_line")
            .transition()
            .duration(500)
            .ease(d3.easeLinear);
    }

    render(args){
        var distance = Math.sqrt(Math.pow(args.prevX - args.cursorX, 2) +
                                 Math.pow(args.prevY - args.cursorY, 2));

        this.data.push({
            "distance" : distance,
            "time"     : Date.now(),
            "velocity" : distance/args.tick_interval
        });

        d3.select("."+this.svg_id+"_line")
            .attr("d", this.line)
            .attr("transform", null);

    }

    filter(){
        this.data = this.data.filter(this.filter_helper, this);
    }

    filter_helper(d,i,data){
        if((Date.now() - d.time) < this.time_window){
            return true;
        }else{
            return false;
        }
    }
}

