var data = [100, 400, 300, 900, 850, 1000]

var width = 500,
    barHeight = 20,
    margin = 1;

var scale = d3.scaleLinear()
             .domain([d3.min(data), d3.max(data)])
             .range([50, 500]);

var svg = d3.select("body")
              .append("svg")
              .attr("width", width)
              .attr("height", barHeight * data.length);

var g = svg.selectAll("g")
              .data(data)
              .enter()
              .append("g")
              .attr("transform", function (d, i) {
                  return "translate(0," + i * barHeight + ")";
              });

g.append("rect")
   .attr("width", function (d) {
       return scale(d);
   })
   .attr("height", barHeight - margin)

g.append("text")
   .attr("x", function (d) { return (scale(d)); })
   .attr("y", barHeight / 2)
   .attr("dy", ".35em")
   .text(function (d) { return d; });