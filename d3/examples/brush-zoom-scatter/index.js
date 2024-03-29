// Code from: https://bl.ocks.org/mbostock/f48fcdb929a620ed97877e4678ab15e6

var random = d3.randomNormal(0, 0.2),
    sqrt3 = Math.sqrt(3),
    points0 = d3.range(300).map(function() { return [random() + sqrt3, random() + 1, 0]; }),
    points1 = d3.range(300).map(function() { return [random() - sqrt3, random() + 1, 1]; }),
    points2 = d3.range(300).map(function() { return [random(), random() - 1, 2]; }),
    points = d3.merge([points0, points1, points2]);

var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var k = height / width,
    x0 = [-4.5, 4.5],
    y0 = [-4.5 * k, 4.5 * k],
    x = d3.scaleLinear().domain(x0).range([0, width]),
    y = d3.scaleLinear().domain(y0).range([height, 0]),
    z = d3.scaleOrdinal(d3.schemeCategory10);

var xAxis = d3.axisTop(x).ticks(12),
    yAxis = d3.axisRight(y).ticks(12 * height / width);

var brush = d3.brush().on("end", brushended),
    idleTimeout,
    idleDelay = 350;

svg.selectAll("circle")
  .data(points)
  .enter().append("circle")
    .attr("cx", function(d) { return x(d[0]); })
    .attr("cy", function(d) { return y(d[1]); })
    .attr("r", 2.5)
    .attr("fill", function(d) { return z(d[2]); });

svg.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + (height - 10) + ")")
    .call(xAxis);

svg.append("g")
    .attr("class", "axis axis--y")
    .attr("transform", "translate(10,0)")
    .call(yAxis);

svg.selectAll(".domain")
    .style("display", "none");

svg.append("g")
    .attr("class", "brush")
    .call(brush);

function brushended() {
  var s = d3.event.selection;
  if (!s) {
    if (!idleTimeout) return idleTimeout = setTimeout(idled, idleDelay);
    x.domain(x0);
    y.domain(y0);
  } else {
    x.domain([s[0][0], s[1][0]].map(x.invert, x));
    y.domain([s[1][1], s[0][1]].map(y.invert, y));
    svg.select(".brush").call(brush.move, null);
  }
  zoom();
}

function idled() {
  idleTimeout = null;
}

function zoom() {
  var t = svg.transition().duration(750);
  svg.select(".axis--x").transition(t).call(xAxis);
  svg.select(".axis--y").transition(t).call(yAxis);
  svg.selectAll("circle").transition(t)
      .attr("cx", function(d) { return x(d[0]); })
      .attr("cy", function(d) { return y(d[1]); });
}