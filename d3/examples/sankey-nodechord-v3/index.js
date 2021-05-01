// Adapted from: http://bl.ocks.org/nitaku/a161bdb59b9dcec9a32e

// create node graph
function createViz(error, nodesJson, linksJson){
  
  // instantiate variables
  var polar_layout, DIAMETER, circular, circular_layout, height, labels, link_thickness, links, links_layer, nodes, nodes_layer, svg, width;
  
  console.log(nodesJson)
  console.log(linksJson)

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

  polar_layout = function() {
    var delta_theta, rho, self, theta, theta_0;

    rho = function(d, i, data) {
      return 100;
    };
    theta_0 = function(d, i, data) {
      return -Math.PI / 2;
    };
    delta_theta = function(d, i, data) {
      return 2 * Math.PI / data.length;
    };
    theta = function(d, i, data) {
      return theta_0(d, i, data) + i * delta_theta(d, i, data);
    };
    self = function(data) {
      data.forEach(function(d, i) {
        d.rho = rho(d, i, data);
        d.theta = theta(d, i, data);
        d.x = d.rho * Math.cos(d.theta);
        return d.y = d.rho * Math.sin(d.theta);
      });
      return data;
    };
    self.rho = function(x) {
      if (x != null) {
        if (typeof x === 'function') {
          rho = x;
        } else {
          rho = function() {
            return x;
          };
        }
        return self;
      }
      return rho;
    };
    self.theta_0 = function(x) {
      if (x != null) {
        if (typeof x === 'function') {
          theta_0 = x;
        } else {
          theta_0 = function() {
            return x;
          };
        }
        return self;
      }
      return theta_0;
    };
    self.delta_theta = function(x) {
      if (x != null) {
        if (typeof x === 'function') {
          delta_theta = x;
        } else {
          delta_theta = function() {
            return x;
          };
        }
        return self;
      }
      return delta_theta;
    };
    self.theta = function(x) {
      if (x != null) {
        if (typeof x === 'function') {
          theta = x;
        } else {
          theta = function() {
            return x;
          };
        }
        return self;
      }
      return theta;
    };
    return self;
  };

  circular = polar_layout().rho(160);

  circular(nodesJson);

  DIAMETER = 40;

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
