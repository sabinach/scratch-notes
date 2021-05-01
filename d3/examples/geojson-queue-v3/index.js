// Code from: http://bl.ocks.org/mapsam/6090056
var width = 960,
	height = 500;
 
var svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height);
 
var projection = d3.geo.albersUsa()
	.scale(1000)
	.translate([width / 2, height / 2]);
 
var path = d3.geo.path()
	.projection(projection);
	
queue()
	.defer(d3.json, 'states.json')
	.defer(d3.json, 'cities.json')
	.await(makeMyMap);

function makeMyMap(error, states, cities) {
  console.log(cities)
	svg.append('path')
		.datum(topojson.feature(states, states.objects.usStates))
			.attr('d', path)
			.attr('class', 'states');
	svg.selectAll('.cities')
		.data(cities.features)
		.enter()
		.append('path')
		.attr('d', path.pointRadius(5))
		.attr('class', 'cities');
}