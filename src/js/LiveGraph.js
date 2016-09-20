var d3 = require("d3");

export default class LiveGraph{
    constructor(args){
        this.svg_id = args.svg_id;
        this.time_window = args.time_window;

        this.svg = d3.select("#"+this.svg_id);

        var  width = +this.svg.attr("width") - args.margin.left - args.margin.right,
            height = +this.svg.attr("height") - args.margin.top - args.margin.bottom,
            g = this.svg.append("g").attr("transform", "translate(" + args.margin.left + "," + args.margin.top + ")");

        this.x = d3.scaleLinear()
            .domain([0, this.time_window])
            .range([0, width]);

        this.y = d3.scaleLinear()
            .domain([args.min_y, args.max_y])
            .range([height, 0]);

        g.append("defs").append("clipPath")
            .attr("id", "clip")
            .append("rect")
            .attr("width", width)
            .attr("height", height);

        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + this.y(0) + ")")
            .call(
                d3.axisBottom(this.x)
                    .tickValues(d3.range(1000, 31000, 4000))
                    .tickFormat(d3.formatPrefix(",.0", 1e3))
            );

        g.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(this.y));

        g.append("g")
            .attr("class", "label_y")
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - args.margin.left)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text(args.label);

        g.append("g")
            .attr("clip-path", "url(#clip)")
            .append("path")
            .datum(window.data)
            .attr("class", "line")
            .attr("id", this.svg_id+"_line")
            .transition()
            .duration(500)
            .ease(d3.easeLinear);
    }

    render(){
        d3.select("#"+this.svg_id+"_line")
            .attr("d", this.line)
            .attr("transform", null);

    }


}

