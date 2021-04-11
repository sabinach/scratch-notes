/*
Adapted between: 
- https://observablehq.com/@d3/variable-color-line
- https://medium.com/@louisemoxy/create-an-accurate-tooltip-for-a-d3-area-chart-bf59783f8a2d
*/

const width = 1000
const height = 500
const margin = ({top: 20, right: 20, bottom: 30, left: 40})
const x = d3.scaleUtc().range([margin.left, width - margin.right])
const y = d3.scaleLinear().range([height - margin.bottom, margin.top])
const parseDate = d3.utcParse("%Y-%m-%d %H:%M");

const svg = d3.select("#gradient-viz")
	.append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(0, 0)');

const line = d3.line()
    .x(d => x(d.date))
    .y(d => y(d.value))

const area = d3.area()
	.x(d => x(d.date))
	.y0(y(0))
	.y1(d => y(d.value))


d3.csv("FCM.csv", function(error, data) {
	if (error) throw error;

	// format the data
	data = data.filter(d => d.tmpf!=="M")
		.map(function(d) {
			return {
				date: parseDate(d.valid),
				value: +d.tmpf,
				condition: d.skyc1
			}
		});
	console.log(data)

	x.domain(d3.extent(data, d => d.date)) 
	y.domain(d3.extent(data, d => d.value))

	const xAxis = g => g
	    .attr("transform", `translate(0,${height - margin.bottom})`)
	    .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
	    .call(g => g.select(".domain").remove())

	const yAxis = g => g
	    .attr("transform", `translate(${margin.left},0)`)
	    .call(d3.axisLeft(y))
	    .call(g => g.select(".domain").remove())
	    .call(g => g.select(".tick:last-of-type text").append("tspan").text(data.y))


	const grid = g => g
	    .attr("stroke", "currentColor")
	    .attr("stroke-opacity", 0.1)
	    .call(g => g.append("g")
	      .selectAll("line")
	      .data(x.ticks())
	      .append("line")
	        .attr("x1", d => 0.5 + x(d))
	        .attr("x2", d => 0.5 + x(d))
	        .attr("y1", margin.top)
	        .attr("y2", height - margin.bottom))
	    .call(g => g.append("g")
	      .selectAll("line")
	      .data(y.ticks())
	      .append("line")
	        .attr("y1", d => 0.5 + y(d))
	        .attr("y2", d => 0.5 + y(d))
	        .attr("x1", margin.left)
	        .attr("x2", width - margin.right));

	svg.append("g")
	  .call(xAxis);

	svg.append("g")
	  .call(yAxis);

	svg.append("g")
	  .call(grid);


	/* ---------------------------------------- */

	// https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
	function shadeColor(color, percent) {

	    var R = parseInt(color.substring(1,3),16);
	    var G = parseInt(color.substring(3,5),16);
	    var B = parseInt(color.substring(5,7),16);

	    R = parseInt(R * (100 + percent) / 100);
	    G = parseInt(G * (100 + percent) / 100);
	    B = parseInt(B * (100 + percent) / 100);

	    R = (R<255)?R:255;  
	    G = (G<255)?G:255;  
	    B = (B<255)?B:255;  

	    var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
	    var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
	    var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

	    return "#"+RR+GG+BB;
	}

	//const colors = d3.schemeCategory10.slice(0,6)
	const getColor = (condition) => colors[conditions.indexOf(condition)];
	const getDarkColor = (condition) => darkenedColors[conditions.indexOf(condition)];

	const conditions = ["CLR", "FEW", "SCT", "BKN", "OVC", "VV "]
	const colors = ["#3957ff", "#d3fe14", "#c9080a", "#fec7f8", "#0b7b3e", "#0bf0e9"]
	const darkenedColors = colors.map(color => shadeColor(color, -20)) //+lighten, -darken

	console.log("colors: ", colors)
	console.log("darkenedColors: ", darkenedColors)

	var defs = svg.append("defs");

	var gradient = defs.append("linearGradient")
	    .attr("id", "gradient")
	    .attr("gradientUnits", "userSpaceOnUse")
	    .attr("x1", "0%")
	    .attr("x2", "100%");

	const gradientResetPercentage = "50%";

	data.forEach((d, i) => {
		// general area graph
		if (i===0){
			const startConditionPercent = data[0].condition //+ "-0"
			const endConditionPercent = data[0].condition //+ "-" + Math.floor((x(data[i].date) / width)*100)
			gradient.append("stop")
				.attr("class", startConditionPercent)
			    .attr("offset", "0%") // 0.00
			    .attr("stop-color", getColor(data[0].condition));

			gradient.append("stop")
				.attr("class", endConditionPercent)
			    .attr("offset", (x(data[i].date) / width)*100 + "%") // 0.04
			    .attr("stop-color", getColor(data[0].condition));
		}
		else if (i!==0){
			const startConditionPercent = data[i-1].condition //+ "-" + Math.floor((x(data[i-1].date) / width)*100)
			const endConditionPercent = data[i-1].condition //+ "-" + Math.floor((x(data[i].date) / width)*100)
			gradient.append("stop")
				.attr("class", startConditionPercent)
			    .attr("offset", (x(data[i-1].date) / width)*100 + "%")
			    .attr("stop-color", getColor(data[i-1].condition));

			gradient.append("stop")
				.attr("class", endConditionPercent)
			    .attr("offset", (x(data[i].date) / width)*100 + "%")
			    .attr("stop-color", getColor(data[i-1].condition));
		}

		/*
		gradient
		  .append("stop")
		  .attr("class", "start")
		  .attr("offset", (x(data[i].date) / width)*100 + "%")
		  .attr("stop-color", getColor(data[i-1].condition));
		gradient
		  .append("stop")
		  .attr("class", "start")
		  .attr("offset", (x(data[i].date) / width)*100 + "%")
		  .attr("stop-color", "red");
		gradient
		  .append("stop")
		  .attr("class", "end")
		  .attr("offset", (x(data[i].date) / width)*100 + "%")
		  .attr("stop-color", "red")
		  .attr("stop-opacity", 1);
		gradient
		  .append("stop")
		  .attr("class", "end")
		  .attr("offset", (x(data[i].date) / width)*100 + "%")
		  .attr("stop-color", getColor(data[i].condition));
		*/
	})
		

	svg.append('path')
	    .datum(data)
	    .style("stroke", "url(#gradient)")
	  	.attr("stroke-width", 2)
	  	//.attr("fill", "none")
	    //.attr('d', line)
	    .attr("fill", "url(#gradient)")
	    .attr('d', area)
	    .on("mousemove", handleMouseMove)
	    .on("mouseout", handleMouseOut)




	const bisectDate = d3.bisector(d => d.date).left;

	function handleMouseMove(data){
		console.log("mouseMove");

		// Get the x value of the current X position
		const currentXPosition = d3.mouse(this)[0];
		const xValue = x.invert(currentXPosition);

		// Get the index of the xValue relative to the dataSet
		const dataIndex = bisectDate(data, xValue, 1);
		const leftData = data[dataIndex - 1];
		//const rightData = data[dataIndex];

		var rightData;
		for (i = dataIndex - 1; i < data.length; i++) {
			if(data[i].condition!==data[dataIndex - 1].condition){
				rightData = data[i]
				break;
			}
		}




		if (leftData && rightData){
			// Update gradient
			const x1Percentage = (x(leftData.date) / width) * 100;
			const x2Percentage = (x(rightData.date) / width) * 100;

			console.log(x1Percentage)
			console.log(x2Percentage)

			/*
			gradient.selectAll("." + data[dataIndex - 1].condition + "-" + Math.floor(x1Percentage))
			    .attr("offset", x1Percentage + "%")
			    .attr("stop-color", getDarkColor(data[i-1].condition));

			gradient.selectAll("." + data[dataIndex - 1].condition + "-" + Math.floor(x2Percentage))
			    .attr("offset", x2Percentage + "%")
			    .attr("stop-color", getDarkColor(data[i-1].condition));
			*/

			
			d3.selectAll("."+data[dataIndex - 1].condition)
				.attr("stop-color", darkenedColors[conditions.indexOf(data[dataIndex - 1].condition)]);
			
		}
	}

	function handleMouseOut() {
		console.log("mouseOut");

		d3.selectAll(".start").attr("offset", gradientResetPercentage);
		d3.selectAll(".end").attr("offset", gradientResetPercentage);
	}




})