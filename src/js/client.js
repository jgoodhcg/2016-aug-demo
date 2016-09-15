var d3 = require("d3");

var data = [],
    cursorX = 0, cursorY= 0,
    prevX = 0, prevY = 0,
    n = 40;

var svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 20, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleLinear()
    .domain([0, n - 1])
    .range([0, width]);

var y = d3.scaleLinear()
    .domain([0, 20])
    .range([height, 0]);

var line = d3.line()
    .x(function(d, i) { return x(i); })
    .y(function(d, i) { return y(d); });

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
    .datum(data)
    .attr("class", "line")
  .transition()
    .duration(500)
    .ease(d3.easeLinear);

function tick() {
    var d = Math.sqrt(Math.pow(prevX - cursorX, 2) +
                      Math.pow(prevY - cursorY, 2));

    prevX = cursorX;
    prevY = cursorY;

    console.log(d);
    data.push(d);

    d3.select(".line")
        .attr("d", line)
        .attr("transform", null);

    // Pop the old data point off the front.
    if(data.length > n){
        data.shift();
    }

}

window.setInterval(tick, 5);
document.onmousemove = function(e){
    cursorX = e.pageX;
    cursorY = e.pageY;
}
