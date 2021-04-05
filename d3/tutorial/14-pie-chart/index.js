/*
var color = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c']);
console.log(color(0))
console.log(color(1))
console.log(color(2))
console.log(color(3))
console.log(color(4))
console.log(color(5))
*/

/*
var data = [2, 4, 8, 10];
var pie = d3.pie()
console.log(pie(data))
*/

/*
var data = [2, 4, 8, 10];

var svg = d3.select("svg"),
    width = svg.attr("width"),
    height = svg.attr("height"),
    radius = Math.min(width, height) / 2,
    g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var color = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c']);

// Generate the pie
var pie = d3.pie();

// Generate the arcs
var arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius);

//Generate groups
var arcs = g.selectAll("arc")
            .data(pie(data))
            .enter()
            .append("g")
            .attr("class", "arc")

//Draw arc paths
arcs.append("path")
    .attr("fill", function(d, i) {
        return color(i);
    })
    .attr("d", arc);
*/

var svg = d3.select("svg"),
    width = svg.attr("width"),
    height = svg.attr("height"),
    margin = 50,
    radius = (Math.min(width, height) - margin) / 2;

var g = svg.append("g")
           .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var color = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c']);

var pie = d3.pie().value(function(d) { 
        return d.percent; 
    });

var path = d3.arc()
             .outerRadius(radius - 10)
             .innerRadius(0); // 0: pie chart, innerRadius>0: donut chart

var label = d3.arc()
              .outerRadius(radius)
              .innerRadius(radius - 80);

d3.csv("browseruse.csv", function(error, data) {
    if (error) {
        throw error;
    }
    var arc = g.selectAll(".arc")
               .data(pie(data))
               .enter().append("g")
               .attr("class", "arc");

    arc.append("path")
       .attr("d", path)
       .attr("fill", function(d) { return color(d.data.browser); });

    console.log(arc)

    arc.append("text")
       .attr("transform", function(d) { 
                return "translate(" + label.centroid(d) + ")"; 
        })
       .text(function(d) { return d.data.browser; });
    });

    svg.append("g")
       .attr("transform", "translate(" + (width / 2 - 120) + "," + 20 + ")")
       .append("text")
       .text("Browser use statistics - Jan 2017")
       .attr("class", "title")