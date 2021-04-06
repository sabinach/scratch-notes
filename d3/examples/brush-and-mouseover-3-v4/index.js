// Code from: https://stackoverflow.com/questions/38670322/d3-brushing-and-mouse-move-coexist

// Set the dimensions of the canvas / graph
var margin = {
    top: 30,
    right: 20,
    bottom: 30,
    left: 50
  },
  width = 600 - margin.left - margin.right,
  height = 270 - margin.top - margin.bottom;

// Parse the date / time
var parseDate = d3.timeParse("%d-%b-%y"),
  formatDate = d3.timeFormat("%d-%b"),
  bisectDate = d3.bisector(function(d) {
    return d.date;
  }).left;

// Set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// Define the axes
var xAxis = d3.axisBottom(x).ticks(5);
var yAxis = d3.axisLeft(y).ticks(5);

// Define the line
var valueline = d3.line()
  .x(function(d) {
    return x(d.date);
  })
  .y(function(d) {
    return y(d.close);
  });
  
var area = d3.area()
  .x(function(d) {
      return x(d.date);
    })
  .y0(height)
  .y1(function(d) {
    return y(d.close);
  });

// Adds the svg canvas
var svg = d3.select("body")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

var defs = svg.append("defs");

var areaClip = defs.append("clipPath")
  .attr("id", "areaClip")
  .append("rect")
  .attr("x", width)
  .attr("y", 0)
  .attr("width", width)
  .attr("height", height);

var lineSvg = svg.append("g");

var focus = svg.append("g")
  .style("display", "none");
  
var brush = d3.brushX()
  .extent( [ [0,0], [width, height] ] )
  .on("brush", function() {
    var brushBounds = d3.event.selection;
    if (brushBounds) {
      var x1 = x(brushBounds[0]);
      var x2 = x(brushBounds[1]);
      areaClip.attr('x', x1);
      areaClip.attr('width', x2 - x1);
    }
  })

var csv = `date,close
26-Mar-12,606.98
27-Mar-12,614.48
28-Mar-12,617.62
29-Mar-12,609.86
30-Mar-12,599.55
2-Apr-12,618.63
3-Apr-12,629.32
4-Apr-12,624.31
5-Apr-12,633.68
9-Apr-12,636.23
10-Apr-12,628.44
11-Apr-12,626.20
12-Apr-12,622.77
13-Apr-12,605.23
16-Apr-12,580.13
17-Apr-12,543.70
18-Apr-12,443.34
19-Apr-12,345.44
20-Apr-12,234.98
23-Apr-12,166.70
24-Apr-12,130.28
25-Apr-12,99.00
26-Apr-12,89.70
27-Apr-12,67.00
30-Apr-12,53.98
1-May-12,58.13`;

var data = d3.csvParse(csv);

data.forEach(function(d) {
  d.date = parseDate(d.date);
  d.close = +d.close;
});

// Scale the range of the data
x.domain(d3.extent(data, function(d) {
  return d.date;
}));
y.domain([0, d3.max(data, function(d) {
  return d.close+20;
})]);

// Add the valueline path.
lineSvg.append("path")
  .attr("class", "line")
  .attr("d", valueline(data));
  
lineSvg.append("path")
  .attr("d", area(data))
  .style("fill", "steelblue")
  .style("stroke", "none")
  .style("opacity", "0.5")
  .attr("clip-path", "url(#areaClip)")

// Add the X Axis
svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis);

// Add the Y Axis
svg.append("g")
  .attr("class", "y axis")
  .call(yAxis);

// append the circle at the intersection
focus.append("circle")
  .attr("class", "y")
  .style("fill", "none")
  .style("stroke", "blue")
  .attr("r", 4);

// append the rectangle to capture mouse
var context  = svg.append("g");

context.call(brush);

context.select(".background")
  .attr("height", height)
  .on("mouseover.tooltip", function() {
    focus.style("display", null);
  })
  .on("mouseout.tooltip", function() {
    focus.style("display", "none");
  })
  .on("mousemove.tooltip", mousemove);

function mousemove() {
  var x0 = x.invert(d3.mouse(this)[0]),
    i = bisectDate(data, x0, 1),
    d0 = data[i - 1],
    d1 = data[i],
    d = x0 - d0.date > d1.date - x0 ? d1 : d0;

  console.log(x0);

  focus.select("circle.y")
    .attr("transform",
      "translate(" + x(d.date) + "," +
      y(d.close) + ")");

}