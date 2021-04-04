d3.select("#container")
  .transition()
  .duration(1000)
  .style("background-color", "red");

/* same as above (store transition as a variable)
var t = d3.transition()
    .duration(500)

d3.select("#container")
  .transition(t)
  .style("background-color", "red");
*/ 

// create svg in body
var svg = d3.select("body")
	        .append("svg")
	        .attr("width", 500)
	        .attr("height", 500);

// added two bars to svg
var bar1 = svg.append("rect")
			.attr("fill", "blue")
			.attr("x", 100)
			.attr("y", 20)
			.attr("height", 20)
			.attr("width", 10)

var bar2 = svg.append("rect")
		    .attr("fill", "blue")
		    .attr("x", 120)
		    .attr("y", 20)
		    .attr("height", 20)
		    .attr("width", 10)

update();

function update() {
    bar1.transition()
        .ease(d3.easeLinear)
        .duration(2000)
        .attr("height",100)

    bar2.transition()
        .ease(d3.easeLinear)
        .duration(2000)
        .delay(2000)
        .attr("height",100)
}