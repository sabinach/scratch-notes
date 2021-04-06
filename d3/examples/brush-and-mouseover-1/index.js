// Code from: https://bl.ocks.org/mthh/99dc420cd7e276ecafe4ef4bf12c6927

const _tooltip = function _tooltip(selection){
  selection.on('mouseover.tooltip', function (d) {
    const tooltip = svg.select('.tooltip');
    const tooltip_title = tooltip
      .select("tspan#tooltip_title")
      .text(`${d.id}`);
    tooltip.select('tspan#tooltip_l1')
      .text(`${pretty_name1} (rang) : ${Math.round(d[rank_variable1] * 10) / 10}/100`);
    tooltip.select('tspan#tooltip_l2')
      .text(`${pretty_name1} (valeur) : ${Math.round(d[variable1] * 10) / 10}`);
    tooltip.select('tspan#tooltip_l3')
      .text(`${pretty_name2} (rang) : ${Math.round(d[rank_variable2] * 10) / 10}/100`);
    tooltip.select('tspan#tooltip_l4')
    .text(`${pretty_name1} (valeur) : ${Math.round(d[variable2] * 10) / 10}`);
    tooltip
      .attr('transform', `translate(${[d3.mouse(this)[0] - 5, d3.mouse(this)[1] - 35]})`);

  })
  .on('mousemove.tooltip', function (d) {
    svg.select('.tooltip').style('display', null);
    const new_rect_size = svg.select('.tooltip').select('text').node().getBoundingClientRect().width + 20;
    svg.select('.tooltip').select('rect')
      .attr('width', new_rect_size);

  })
  .on('mouseout.tooltip', function () {
    svg.select('.tooltip').style('display', 'none');
  });
};

const color = d3.schemeCategory10;
const margin = { top: 50, right: 20, bottom: 60, left: 60 };
const width = 480 - margin.left - margin.right;
const height = 480 - margin.top - margin.bottom;

const x = d3.scaleLinear()
  .range([0, width])
  .nice();

const y = d3.scaleLinear()
  .range([height, 0]);

const xAxis = d3.axisBottom(x).ticks(12),
  yAxis = d3.axisLeft(y).ticks(12 * height / width);

const xAxis2 = d3.axisBottom(x).ticks(12),
  yAxis2 = d3.axisLeft(y).ticks(12 * height / width);

const svg = d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom);

const plot = svg.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

const clip = plot.append("defs").append("svg:clipPath")
  .attr("id", "clip")
  .append("svg:rect")
  .attrs({ width: width, height: height, x: 0, y:0 });

const my_region = 'FRE';
const variable1 = 'DENS_2016';
const variable2 = 'TX_EMP_2014';
const rank_variable1 = `pr_${variable1}`;
const rank_variable2 = `pr_${variable2}`;
const pretty_name1 = 'Densité';
const pretty_name2 = 'Taux d\'emploi';
let nbFt;
let mean_variable1;
let mean_variable2;
let brush;
let last_selection = null;

d3.json("nuts1_data.geojson", function(error, geojson_data) {
  if (error) throw error;
  const getQDENS = (v) => {
    if (v.indexOf('q1') > -1) return 1;
    else if (v.indexOf('q2') > -1) return 2;
    else if (v.indexOf('q3') > -1) return 3;
    else return 4;
  };
  const brushed = () => {
    const selected_region = [];
    if (!d3.event || !d3.event.selection) {
      scatter.selectAll(".dot")
        .style("fill", d => color[d.TypoDENS_2016]);
      last_selection = null;
    } else {
      last_selection = d3.event.selection;
      const range_x = [
        x.invert(last_selection[0][0]),
        x.invert(last_selection[1][0])
      ];
      const range_y = [
        y.invert(last_selection[1][1]),
        y.invert(last_selection[0][1]),
      ];
      scatter.selectAll('.dot')
        .style('fill', function (d) {
          const _x = d[rank_variable1];
          const _y = d[rank_variable2];
          if (this.style.display !== 'none'
              && _x > range_x[0] && _x < range_x[1] && _y > range_y[0] && _y < range_y[1]) {
            selected_region.push(d.id);
            return 'aliceblue';
          }
          return color[d.TypoDENS_2016];
        });
    }
    d3.select('#selected_regions').html(selected_region.join(', '));
  };
  ref_data = geojson_data.features.map(ft => ({
    id: ft.properties.NUTS1_2016,
    EMP_2014: +ft.properties.EMP_2014,
    Y20_60_2014: +ft.properties['Y20.64_2014'] / 1000,
    TX_EMP_2014: (+ft.properties.EMP_2014 / +ft.properties['Y20.64_2014']) * 100000,
    DENS_2016: +ft.properties.DENS_2016,
    TypoDENS_2016: getQDENS(ft.properties.TypoDENS_2016)
  })).filter(ft => ft[variable1] && ft[variable2]);

  computePercentileRank(ref_data, variable1, rank_variable1);
  computePercentileRank(ref_data, variable2, rank_variable2);

  data = [].concat(ref_data);
  nbFt = data.length;

  x.domain(d3.extent(data, d => d[rank_variable1])).nice();
  y.domain(d3.extent(data, d => d[rank_variable2])).nice();

  const scatter = plot.append("g")
    .attrs({ id: 'scatterplot', 'clip-path': 'url(#clip)' })
    .append('g');

  brush = d3.brush()
    .extent([[0, 0], [width, height]])
    .on("brush end", brushed);

  scatter.append('g')
    .attr('class', 'brush')
    .call(brush);

  const dots = scatter.selectAll(".dot")
    .data(data)
    .enter()
    .append("circle")
    .attrs(d => ({
      class: 'dot',
      r: 3 + Math.random() * 4,
      cx: x(d[rank_variable1]),
      cy: y(d[rank_variable2]),
      opacity: 0.8,
    }))
    .style("fill", d => color[d.TypoDENS_2016])
    .style('stroke', 'darkgray')
    .style('stroke-width', 0.75)
    .call(_tooltip);

  dots
    .on('mousedown', function(e){
      const brush_elm = svg.select('.brush > .overlay').node();
      const brush_selection = svg.select('.brush > .selection').node();
      const bbox = brush_selection.getBoundingClientRect();
      if (brush_selection.style.display !== 'none'
          && d3.event.pageX > bbox.left
          && d3.event.pageX < (bbox.left + bbox.width)
          && d3.event.pageY > bbox.top
          && d3.event.pageY < (bbox.top + bbox.height)) {
        // Click happened on a dot, inside the current brush selection, so, don't do anything
        console.log('inside');
        return;
      }
      // Click happened on a dot, with no rectangle selection or outside the rectangle selection
      // so let's start a new selection :
      const new_click_event = new MouseEvent('mousedown', {
        pageX: d3.event.pageX,
        pageY: d3.event.pageY,
        clientX: d3.event.clientX,
        clientY: d3.event.clientY,
        layerX: d3.event.layerX,
        layerY: d3.event.layerY,
        bubbles: true,
        cancelable: true,
        view: window });
      brush_elm.dispatchEvent(new_click_event);
    });

  makeGrid();

  plot.append("g")
    .attr("class", "x axis")
    .attr('id', "axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  plot.append("g")
    .attr("class", "y axis")
    .attr('id', "axis--y")
    .call(yAxis);

  svg.append("text")
    .attr('id', 'title-axis-x')
    .attr("x", margin.left + width / 2)
    .attr("y", margin.top + height + margin.bottom / 2 + 5)
    .styles({ 'font-family': 'sans-serif', 'font-size': '12px', 'text-anchor': 'middle' })
    .text(variable1);

  let isXinverted = false;
  let isYinverted = false;
  svg.append('image')
    .attrs({
      x: margin.left + width / 2 - 20 - svg.select('#title-axis-x').node().getBoundingClientRect().width / 2,
      y: margin.top + height + margin.bottom / 2 - 7.5,
      width: 15,
      height: 15,
      'xlink:href': 'reverse_blue.png',
      id: 'img_reverse_x'
    })
    .on('click', function () {
      for (let i = 0; i < nbFt; i++) {
        data[i][rank_variable1] = 100 - data[i][rank_variable1];
      }
      svg.select('.brush').call(brush.move, last_selection = null);
      scatter.selectAll('circle')
        .transition()
        .attr('cx', d => x(d[rank_variable1]));
    });

  svg.append("text")
      .attr('id', 'title-axis-y')
      .attr("x", margin.left / 2)
      .attr("y", margin.top + (height / 2))
      .attr("transform", `rotate(-90, ${margin.left / 2}, ${margin.top + (height / 2)})`)
      .style("text-anchor", "middle")
      .styles({ 'font-family': 'sans-serif', 'font-size': '12px' })
      .text(variable2);

  svg.append('image')
    .attrs({
      x: margin.left / 2 - 15,
      y: margin.top + (height / 2) + svg.select('#title-axis-y').node().getBoundingClientRect().height / 2 + 7.5,
      width: 15,
      height: 15,
      'xlink:href': 'reverse_blue.png',
      id: 'img_reverse_y'
    })
    .on('click', function () {
      for (let i = 0; i < nbFt; i++) {
        data[i][rank_variable2] = 100 - data[i][rank_variable2];
      }
      svg.select('.brush').call(brush.move, last_selection = null);
      scatter.selectAll('circle')
        .transition()
        .attr('cy', d => y(d[rank_variable2]));
    });

  prepareTooltip();
  makeSelectedSection();
});

function makeGrid() {
  plot.insert("g", '#scatterplot')
    .attr("class", "grid grid-x")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis2
      .tickSize(-height)
      .tickFormat(''));

  plot.insert("g", '#scatterplot')
    .attr("class", "grid grid-y")
    .call(yAxis2
      .tickSize(-width)
      .tickFormat(''));

  plot.selectAll('.grid')
    .selectAll('line')
    .attr('stroke', 'lightgray');
}

function prepareTooltip() {
  const tooltip = svg.append("g")
    .attr("class", "tooltip")
    .style("display", "none");

  tooltip.append("rect")
    .attr("height", 80)
    .attr("fill", "beige")
    .style("opacity", 0.65);

  let text_zone = tooltip.append("text")
    .attr("x", 10)
    .attr("dy", "0")
    .style('font-family', 'sans-serif')
    .attr("font-size", "11px")
    .style('text-anchor', 'start')
    .style('fill', 'black');

  text_zone.append("tspan")
    .attrs({
      id: 'tooltip_title',
      x: 10,
      dy: 15,
      'font-size': '12px',
      'font-weight': '800',
    });

  text_zone.append("tspan")
    .attrs({
      id: 'tooltip_l1',
      x: 10,
      dy: 14,
    });

  text_zone.append("tspan")
    .attr('id', 'tooltip_l2')
    .attr("x", 10)
    .attr("dy", "14");

  text_zone.append("tspan")
    .attr('id', 'tooltip_l3')
    .attr("x", 10)
    .attr("dy", "14");

  text_zone.append("tspan")
    .attr('id', 'tooltip_l4')
    .attr("x", 10)
    .attr("dy", "14");
}

function makeSelectedSection() {
  const section = d3.select('body')
    .append('div')
    .attrs({ id: 'selected_regions_title' })
    .styles({ width: '200px', position: 'absolute', display: 'inline', top: '350px', 'font-size': '11px' })
    .html('Régions sélectionnées :');
  section.append('p')
    .attr('id', 'selected_regions')
    .styles({ 'font-size': '8px', 'font-family': 'Monospace' });
}

function computePercentileRank(obj, field_name, result_field_name) {
  const values = obj.map(d => d[field_name]);
  const len_values = values.length;
  const getPR = (v) => {
    let count = 0;
    for (let i = 0; i < len_values; i++) {
      if (values[i] <= v) {
        count += 1;
      }
    }
    return 100 * count / len_values;
  };
  for (let ix = 0; ix < len_values; ix++) {
    obj[ix][result_field_name] = getPR(values[ix]);
  }
}

const _getPR = (v, serie) => {
  let count = 0;
  for (let i = 0; i < serie.length; i++) {
    if (serie[i] <= v) {
      count += 1;
    }
  }
  return 100 * count / serie.length;
};
