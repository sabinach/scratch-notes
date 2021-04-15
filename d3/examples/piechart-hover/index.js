// Adapted from: https://www.d3-graph-gallery.com/graph/pie_annotation.html

// set the dimensions and margins of the graph
var width = 450
    height = 450
    margin = 40

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width, height) / 2 - margin

// append the svg object to the div called 'my_dataviz'
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// Create dummy data
var data = {"12 AM":1, "1 AM":1, "2 AM":1, "3 AM":1, "4 AM":1, "5 AM":1, "6 AM":1, "7 AM":1, "8 AM":1, "9 AM":1, "10 AM":1, "11 AM":1, "12 PM":1, "1 PM":1, "2 PM":1, "3 PM":1, "4 PM":1, "5 PM":1, "6 PM":1, "7 PM":1, "8 PM":1, "9 PM":1, "10 PM":1, "11 PM":1}

/*
// set the color scale
var color = d3.scaleOrdinal()
  .domain(data)
  .range(d3.schemeSet2);
*/

const colorTimeHour = ["#793ba9", "#571189", "#4a2bae", "#105ca3", "#0594cc", "#17c3ea", "#00d3ec", "#71eead", "#eeeebe", "#fdea8a", "#e6ffa9", "#f9ef93", "#ffe677", "#ffda35", "#ffcf79", "#e3ab44", "#e09a19", "#ffb8a5", "#f15293", "#872ba3", "#7821a0", "#6a27a2", "#4d157b", "#43106f"] 
const timeHourToText = ["12 AM","1 AM","2 AM","3 AM","4 AM","5 AM","6 AM","7 AM","8 AM","9 AM","10 AM","11 AM","12 PM","1 PM","2 PM","3 PM","4 PM","5 PM","6 PM","7 PM","8 PM","9 PM","10 PM","11 PM"]

const currentMode = "byTime"
const lowOpacity = 0.1
const highOpacity = 0.7
      
// What to do when one group is hovered
const mouseover_piechart = function(d){
  if (currentMode==="byTime"){
    console.log(d)
    svg.selectAll(".pieSlice").style("opacity", lowOpacity)
    svg.selectAll(".pieText").style("opacity", lowOpacity)
    // expect the one that is hovered
    svg.selectAll(".pieSlice-" + d.index).style("opacity", highOpacity)
    svg.selectAll(".pieText-" + d.index).style("opacity", highOpacity)
  }
}

const mouseleave_piechart = function(d){
  if (currentMode==="byTime"){
    svg.selectAll(".pieSlice").style("opacity", highOpacity)
    svg.selectAll(".pieText").style("opacity", highOpacity)
  }
}

// Compute the position of each group on the pie:
var pie = d3.pie()
  .value(d => d.value)
var data_ready = pie(d3.entries(data))
// Now I know that group A goes from 0 degrees to x degrees and so on.

// shape helper to build arcs:
var arcGenerator = d3.arc()
  .innerRadius(0)
  .outerRadius(radius)

// shape helper to build arcs:
var arcLabel = d3.arc()
  .innerRadius(0)
  .outerRadius(radius*1.65)

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
svg
  .selectAll('pieSlice')
  .data(data_ready)
  .enter()
  .append('path')
    .attr("class", d => "pieSlice pieSlice-" + d.index)
    .attr('d', arcGenerator)
    .attr('fill', d => colorTimeHour[timeHourToText.indexOf(d.data.key)])
    .attr("stroke", "black")
    .style("stroke-width", "2px")
    .style("opacity", 0.7)
    .on("mouseover", mouseover_piechart)
    .on("mouseleave", mouseleave_piechart)

// Now add the annotation. Use the centroid method to get the best coordinates
svg
  .selectAll('pieText')
  .data(data_ready)
  .enter()
  .append('text')
    .attr("class", d => "pieText pieText-" + d.index)
    .text(d => d.data.key.replace(/\s/g, ''))
    .attr("transform", d => "translate(" + arcLabel.centroid(d) + ")")
    .style("text-anchor", "middle")
    .style("font-size", 10)
