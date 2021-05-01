// Adapted from: http://bl.ocks.org/nitaku/a161bdb59b9dcec9a32e
import { polar_layout } from './polar_layout.js'

// create node graph
function createViz(error, nodesJson, linksJson){
  
  // instantiate variables
  var DIAMETER, circular, circular_layout, height, labels, link_thickness, links, links_layer, nodes, nodes_layer, svg, width;
  
  console.log("nodesJson: ", nodesJson)
  console.log("linksJson: ", linksJson)

  linksJson.forEach( (l) => {
    return nodesJson.forEach( (n) => {
      if (l.source === n.id) {
        l.source = n;
      }
      if (l.target === n.id) {
        return l.target = n;
      }
    });
  });

  svg = d3.select('#viz');
  width = svg.node().getBoundingClientRect().width;
  height = svg.node().getBoundingClientRect().height;

  svg
    .attr({
      viewBox: "" + (-width / 2) + " " + (-height / 2) + " " + width + " " + height
    });

  circular = polar_layout().rho(160); // graph diameter

  circular(nodesJson);

  DIAMETER = 40; // node diameter

  links_layer = svg.append('g');

  nodes_layer = svg.append('g');

  nodes = nodes_layer.selectAll('.node').data(nodesJson);

  nodes.enter().append('circle').attr({
    "class": 'node',
    r: DIAMETER / 2,
    cx: function(node) {
      return node.x;
    },
    cy: function(node) {
      return node.y;
    }
  });

  labels = nodes_layer.selectAll('.label').data(nodesJson);

  labels.enter().append('text').text(function(node) {
    return node.id;
  }).attr({
    "class": 'label',
    dy: '0.35em',
    x: function(node) {
      return node.x;
    },
    y: function(node) {
      return node.y;
    }
  });

  link_thickness = d3.scale.linear().domain([
    0, d3.max(linksJson, function(link) {
      return link.weight;
    })
  ]).range([0, DIAMETER * 0.8]);

  links = links_layer.selectAll('.link').data(linksJson);

  links.enter().append('path').attr({
    "class": 'link',
    d: function(link) {
      return "M" + link.source.x + " " + link.source.y + " L" + link.target.x + " " + link.target.y;
    },
    'stroke-width': function(link) {
      return link_thickness(link.weight);
    }
  });

}

// read json files
queue()
  .defer(d3.json, "nodes.json")
  .defer(d3.json, "links.json")
  .await(createViz)
