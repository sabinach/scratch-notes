// Draw a circle
var myCircle = d3.select("#dataviz_brushing")
  .append("svg")
  .append("circle")
    .attr("cx", 200)
    .attr("cy", 200)
    .attr("r", 40)
    .attr("fill", "#69a3b2")

// Add brushing
d3.select("#dataviz_brushing")
      .call( d3.brush()                     // Add the brush feature using the d3.brush function
        .extent( [ [0,0], [400,400] ] )       // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
      )