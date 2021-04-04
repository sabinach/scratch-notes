d3.select("p").style("color", "green"); 	// FIRST item match
d3.select("#p2").style("color", "red"); 	// by id
d3.selectAll("p").style("color", "blue"); 	// all items w/ tag name
d3.selectAll(".myclass ").style('color','orange');	// by class
d3.select("tr").selectAll("td").style('background-color','yellow'); // nested items
