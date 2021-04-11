// Code from: https://stackoverflow.com/questions/43635757/drawing-a-line-with-two-different-colors-using-d3

var width = 400;
var height = 40;
var x = d3.scale.linear().range([0, width - 2]);
var y = d3.scale.linear().range([height - 4, 0]);
var parseDate = d3.time.format("%b %d, %Y").parse;
var line = d3.svg.line()
  .interpolate("linear") // use basis for rounded
  .x(function(d) {
    return x(d.date);
  })
  .y(function(d) {
    return y(d.close);
  });

function sparkline(elemId, data, lo, hi, targetPoint) {

  var point = targetPoint;

  targetPoint = data1.length - targetPoint;

  data.forEach(function(d) {
    d.date = parseDate(d.Date);
    d.close = +d.Close;
  });

  x.domain(d3.extent(data, function(d) {
    return d.date;
  }));
  y.domain(d3.extent(data, function(d) {
    return d.close;
  }));

  var svg = d3.select(elemId)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(0, 2)');

  var defs = svg.append("defs");

  var gradient = defs.append("linearGradient")
    .attr("id", "gradient")
    .attr("x1", "0%")
    .attr("x2", "100%");

  gradient.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "red");

  gradient.append("stop")
    .attr("offset", (point * 10) + "%")
    .attr("stop-color", "red");

  gradient.append("stop")
    .attr("offset",  (point * 10) + "%")
    .attr("stop-color", "green");

  svg.append('path')
    .datum(data)
    .attr('class', 'sparkline')
    .attr('d', line)
    .style("stroke", "url(#gradient)");

  svg.append('circle')
    .attr('class', 'sparkcircle')
    .attr('cx', x(data[data.length - targetPoint].date))
    .attr('cy', y(data[data.length - targetPoint].close))
    .attr('r', 2.5);

}

var data1 = [{
  "Date": "Feb 1, 2014",
  "Close": "26"
}, {
  "Date": "Feb 2, 2014",
  "Close": "27"
}, {
  "Date": "Feb 3, 2014",
  "Close": "29"
}, {
  "Date": "Feb 4, 2014",
  "Close": "23"
}, {
  "Date": "Feb 5, 2014",
  "Close": "22"
}, {
  "Date": "Feb 5, 2014",
  "Close": "22"
}, {
  "Date": "Feb 8, 2014",
  "Close": "24"
}, {
  "Date": "Feb 9, 2014",
  "Close": "29"
}, {
  "Date": "Feb 10, 2014",
  "Close": "26"
}, {
  "Date": "Feb 11, 2014",
  "Close": "25"
}];

var targetPoint = 3;
sparkline('#spark1', data1, 24.3, 25.6, targetPoint);