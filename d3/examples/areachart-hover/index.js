// Code from: https://medium.com/@louisemoxy/create-an-accurate-tooltip-for-a-d3-area-chart-bf59783f8a2d

// Fake data
const data = [
  {
    year: 2000,
    popularity: 50
  },
  {
    year: 2001,
    popularity: 150
  },
  {
    year: 2002,
    popularity: 200
  },
  {
    year: 2003,
    popularity: 130
  },
  {
    year: 2004,
    popularity: 240
  },
  {
    year: 2005,
    popularity: 380
  },
  {
    year: 2006,
    popularity: 420
  }
];

// Create SVG and padding for the chart
const svg = d3
  .select("#chart")
  .append("svg")
  .attr("height", 300)
  .attr("width", 600);
const strokeWidth = 1.5;
const margin = { top: 0, bottom: 20, left: 30, right: 20 };
const chart = svg.append("g").attr("transform", `translate(${margin.left},0)`);
const width = +svg.attr("width") - margin.left - margin.right - strokeWidth * 2;
const height = +svg.attr("height") - margin.top - margin.bottom;
const grp = chart
  .append("g")
  .attr("transform", `translate(-${margin.left - strokeWidth},-${margin.top})`);

// Create scales
const yScale = d3
  .scaleLinear()
  .range([height, 0])
  .domain([0, d3.max(data, dataPoint => dataPoint.popularity)]);
const xScale = d3
  .scaleLinear()
  .range([0, width])
  .domain(d3.extent(data, dataPoint => dataPoint.year));

const area = d3
  .area()
  .x(dataPoint => xScale(dataPoint.year))
  .y0(height)
  .y1(dataPoint => yScale(dataPoint.popularity));

// Add area
grp
  .append("path")
  .attr("transform", `translate(${margin.left},0)`)
  .datum(data)
  .style("fill", "url(#svgGradient)")
  .attr("stroke", "steelblue")
  .attr("stroke-linejoin", "round")
  .attr("stroke-linecap", "round")
  .attr("stroke-width", strokeWidth)
  .attr("d", area)
  .on("mousemove", handleMouseMove)
  .on('mouseout', handleMouseOut);

// Add the X Axis
chart
  .append("g")
  .attr("transform", `translate(0,${height})`)
  .call(
    d3
      .axisBottom(xScale)
      .ticks(data.length)
      .tickFormat(d3.format(""))
  );

// Add the Y Axis
chart
  .append("g")
  .attr("transform", `translate(0, 0)`)
  .call(d3.axisLeft(yScale));

// Add total value to the tooltip
const totalSum = data.reduce((total, dp) => +total + +dp.popularity, 0);
d3.select('.tooltip .totalValue').text(totalSum);

// Add gradient defs to svg
const defs = svg.append("defs");

const gradient = defs.append("linearGradient").attr("id", "svgGradient");
const gradientResetPercentage = "50%";

gradient
  .append("stop")
  .attr("class", "start")
  .attr("offset", gradientResetPercentage)
  .attr("stop-color", "lightblue");

gradient
  .append("stop")
  .attr("class", "start")
  .attr("offset", gradientResetPercentage)
  .attr("stop-color", "darkblue");

gradient
  .append("stop")
  .attr("class", "end")
  .attr("offset", gradientResetPercentage)
  .attr("stop-color", "darkblue")
  .attr("stop-opacity", 1);

gradient
  .append("stop")
  .attr("class", "end")
  .attr("offset", gradientResetPercentage)
  .attr("stop-color", "lightblue");

const bisectDate = d3.bisector(dataPoint => dataPoint.year).left;

function handleMouseMove(data) {
  const currentXPosition = d3.mouse(this)[0];
  // Get the x value of the current X position
  const xValue = xScale.invert(currentXPosition);

  // Get the index of the xValue relative to the dataSet
  const dataIndex = bisectDate(data, xValue, 1);
  const leftData = data[dataIndex - 1];
  const rightData = data[dataIndex];
  d3.select('.year1').text(`${leftData.year} : ${leftData.popularity}`)
  d3.select('.year2').text(`${rightData.year} : ${rightData.popularity}`)
  // Update gradient
  const x1Percentage = xScale(leftData.year) / width * 100;
  const x2Percentage = xScale(rightData.year) / width * 100;
  d3.selectAll(".start").attr("offset", `${x1Percentage}%`);
  d3.selectAll(".end").attr("offset", `${x2Percentage}%`);
}

function handleMouseOut() {
  d3.selectAll(".start").attr("offset", gradientResetPercentage);
  d3.selectAll(".end").attr("offset", gradientResetPercentage);
  d3.select('.year1').text('');
  d3.select('.year2').text('')
}