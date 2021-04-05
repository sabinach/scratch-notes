/*
var data = [5, 10, 12];
var width = 200,
    scaleFactor = 10,
    barHeight = 20; //static height

var graph = d3.select("body")
          .append("svg")
          .attr("width", width)
          .attr("height", barHeight * data.length);

var bar = graph.selectAll("g")
          .data(data)
          .enter()
          .append("g")
          .attr("transform", function(d, i) {
                return "translate(0," + i * barHeight + ")";
          });

bar.append("rect")
   .attr("width", function(d) {
            return d * scaleFactor;
   })
   .attr("height", barHeight - 1);

bar.append("text")
   .attr("x", function(d) { return (d*scaleFactor); })
   .attr("y", barHeight / 2)
   .attr("dy", ".35em")
   .text(function(d) { return d; });
*/

var width = 500;
var height = 500;

var data = [10, 15, 20, 25, 30];
var colors = ['#ffffcc','#c2e699','#78c679','#31a354','#006837'];

var svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

var g = svg.selectAll("g")
            .data(data)
            .enter()
            .append("g")
            .attr("transform", function(d, i) {
                return "translate(0,0)";
            })

g.append("circle")
  .attr("cx", function(d, i) {
        return i*100 + 50;
  })
  .attr("cy", function(d, i) {
        return 100;
  })
  .attr("r", function(d) {
        return d*1.5;
  })
  .attr("fill", function(d, i){
        return colors[i];
  })

g.append("text")
 .attr("x", function(d, i) {
        return i * 100 + 40;
 })
 .attr("y", 105)
 .attr("stroke", "teal")
 .attr("font-size", "12px")
 .attr("font-family", "sans-serif")
 .text(function(d) {
        return d;
 });