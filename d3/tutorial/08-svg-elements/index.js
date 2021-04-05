/*
var width = 500;
var height = 500;

//Create SVG element
var svg = d3.select("body")
.append("svg")
.attr("width", width)
.attr("height", height);

//Create and append line
svg.append("line")
        .attr("x1", 100)
        .attr("x2", 500)
        .attr("y1", 50)
        .attr("y2", 250)
        .attr("stroke", "black")
*/

/*
var width = 500;
var height = 500;

//Create SVG element
var svg = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

//Create and append rectangle element
svg.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 200)
        .attr("height", 100)
*/

/*
var width = 500;
var height = 500;

//Create SVG element
var svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

//Append circle 
svg.append("circle")
   .attr("cx", 250)
   .attr("cy", 50)
   .attr("r", 50)
*/


/*
var width = 500;
var height = 500;

var svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

svg.append("ellipse")
   .attr("cx", 250)
   .attr("cy", 50)
   .attr("rx", 150)
   .attr("ry", 50)
*/

/*
var width = 500;
var height = 500;

//Create SVG element
var svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

//Create group element
var g = svg.append("g")
           .attr("transform", function(d, i) {
                    return "translate(0,0)";
           });

//Create and append ellipse element into group
var ellipse = g.append("ellipse")
               .attr("cx", 250)
               .attr("cy", 50)
               .attr("rx", 150)
               .attr("ry", 50)
               .append("text")

//Create and append text element into group
g.append("text")
 .attr("x", 150)
 .attr("y", 50)
 .attr("stroke", "#fff")
 .text("This is an ellipse!");
*/

var width = 500;
var height = 500;

var svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

var g = svg.append("g")
            .attr("transform", function(d, i) {
                    return "translate(0,0)";
            });

var ellipse = g.append("ellipse")
                .attr("cx", 250)
                .attr("cy", 50)
                .attr("rx", 150)
                .attr("ry", 50)
                .attr("fill", "green")
                .attr("opacity", 0.5)

g.append("text")
 .attr("x", 140)
 .attr("y", 50)
 .attr("stroke", "steelblue")
 .attr("font-family", "sans-serif")
 .attr("font-size", "24px")
 .text("I am a pretty ellipse!");