// Code from: http://bl.ocks.org/romsson/f205420d21ced66810058d4cdf25c6dd

// Margin setup
var margin = {top: 20, right: 30, bottom: 20, left: 100},
    width = 760 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

// Basic SVG canvas
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// http://bl.ocks.org/zanarmstrong/raw/05c1e95bf7aa16c4768e/
var parseDate = d3.timeParse("%Y-%m");
var displayDate = d3.timeFormat("%b %y");
var displayValue = d3.format(",.0f");
      
// Temporal scale
var x = d3.scaleTime()
    .range([0, width]);

// Linear scale
var y = d3.scaleLinear()
    .range([height, height - 200]);

var line = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.value); });

var g = svg.append("g")
  .attr("transform", "translate(10, 0)");

d3.json("dataset.json", function(data) {

  // Pre-processing
  // {"id" : 1, "name": "A", "value": 10, "date": "2016-01"}
  data.forEach(function(d) {
    d.value = +d.value;
    d["date"] = parseDate(d["date"]);
  });
  
  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.value; })]);

  svg.selectAll("text").data(data).enter()
    .append("text")
    .attr("y", 420)
    .attr("x", function(d) { return x(d.date); })
    .attr("id", "")
    .style("font-size", 10)
    .style("font-family", "monospace")
    .text(function(d, i) { return d.date; });

  g.selectAll(".value").data([data[data.length -1]]).enter()
    .append("text")
    .attr("class", "value")
    .attr("y", function(d) { return y(d.value); })
    .attr("x", width - 20)
    .style("font-size", 20)
    .style("font-family", "monospace")
    .text(function(d, i) { return d.value; });

  g.selectAll("circle").data(data).enter()
    .append("circle")
    .attr("cx", function(d) { return x(d.date); })
    .attr("cy", function(d) { return y(d.value); })
    .attr("r", function(d, i) { return 5; })
    .attr("id", function(d) { return d.id; })
    .style("fill", "#fcb0b5")
    .on("mouseover", function(d){

      d3.select(this).transition().duration(200).style("fill", "#d30715");

      g.selectAll("#tooltip").data([d]).enter().append("text")
        .attr("id", "tooltip")
        .text(function(d, i) { return d.value; })
        .attr("y", function(d) {return y(d.value) - 12})
        .attr("x", function(d) { return x(d.date); })

      g.selectAll("#tooltip_path").data([d]).enter().append("line")
        .attr("id", "tooltip_path")
        .attr("class", "line")
        .attr("d", line)
        .attr("x1", function(d) {return x(d.date)})
        .attr("x2", function(d) {return x(d.date)})
        .attr("y1", height)
        .attr("y2", function(d) {return y(d.value)})
        .attr("stroke", "black")
        .style("stroke-dasharray", ("3, 3"));
    })
    .on("mouseout", function(d) {
      d3.select(this).transition().duration(500).style("fill", "#fcb0b5");

      g.selectAll("#tooltip").remove();
      g.selectAll("#tooltip_path").remove();
    });

  g.selectAll("path").data([data]).enter().append("path")
    .attr("class", "line")
    .attr("d", line);

  svg.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));
  

});