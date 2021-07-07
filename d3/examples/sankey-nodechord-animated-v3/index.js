// Code from: http://bl.ocks.org/nitaku/1adb4033d7078f7d005e

(function() {
  var MAX_WIDTH, circular, circular_layout, compute_degree, graph_data, height, labels, link_thickness, links, links_layer, list_links, max, nodes, nodes_layer, objectify, radius, sankey, svg, tension, width;

  graph_data = {
    nodes: [
      {
        id: 'A',
        size: 14
      }, {
        id: 'B',
        size: 56
      }, {
        id: 'C',
        size: 26
      }, {
        id: 'D',
        size: 16
      }, {
        id: 'E',
        size: 32
      }, {
        id: 'F',
        size: 16
      }, {
        id: 'G',
        size: 12
      }
    ],
    links: [
      {
        source: 'A',
        target: 'B',
        weight: 12
      }, {
        source: 'A',
        target: 'C',
        weight: 8
      }, {
        source: 'A',
        target: 'D',
        weight: 33
      }, {
        source: 'A',
        target: 'F',
        weight: 5
      }, {
        source: 'A',
        target: 'G',
        weight: 24
      }, {
        source: 'B',
        target: 'A',
        weight: 16
      }, {
        source: 'B',
        target: 'D',
        weight: 10
      }, {
        source: 'B',
        target: 'E',
        weight: 10
      }, {
        source: 'B',
        target: 'F',
        weight: 8
      }, {
        source: 'B',
        target: 'G',
        weight: 16
      }, {
        source: 'C',
        target: 'A',
        weight: 13
      }, {
        source: 'C',
        target: 'D',
        weight: 29
      }, {
        source: 'C',
        target: 'E',
        weight: 11
      }, {
        source: 'D',
        target: 'E',
        weight: 4
      }, {
        source: 'D',
        target: 'F',
        weight: 12
      }, {
        source: 'E',
        target: 'F',
        weight: 19
      }, {
        source: 'F',
        target: 'E',
        weight: 11
      }
    ]
  };

  objectify = function(graph) {
    return graph.links.forEach(function(l) {
      return graph.nodes.forEach(function(n) {
        if (l.source === n.id) {
          l.source = n;
        }
        if (l.target === n.id) {
          return l.target = n;
        }
      });
    });
  };

  objectify(graph_data);

  list_links = function(graph) {
    return graph.nodes.forEach(function(n) {
      return n.links = graph.links.filter(function(link) {
        return link.source === n || link.target === n;
      });
    });
  };

  list_links(graph_data);
  
  sankey = function(graph) {
    return graph.nodes.forEach(function(n) {
      var acc;

      acc = 0;
      return n.links.forEach(function(link) {
        if (link.source === n) {
          return link.sankey_source = {
            start: acc,
            middle: acc + link.weight / 2,
            end: acc += link.weight
          };
        } else if (link.target === n) {
          return link.sankey_target = {
            start: acc,
            middle: acc + link.weight / 2,
            end: acc += link.weight
          };
        }
      });
    });
  };

  sankey(graph_data);

  console.log(graph_data)

  compute_degree = function(graph) {
    return graph.nodes.forEach(function(n) {
      return n.degree = d3.sum(n.links, function(link) {
        return link.weight;
      });
    });
  };

  compute_degree(graph_data);

  svg = d3.select('svg');

  width = svg.node().getBoundingClientRect().width;

  height = svg.node().getBoundingClientRect().height;

  svg.attr({
    viewBox: "" + (-width / 2) + " " + (-height / 2) + " " + width + " " + height
  });

  circular_layout = function() {
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

  circular = circular_layout().rho(160);

  circular(graph_data.nodes);

  MAX_WIDTH = 60;

  links_layer = svg.append('g');

  nodes_layer = svg.append('g');

  radius = d3.scale.sqrt().domain([
    0, d3.min(graph_data.nodes, function(n) {
      return n.size;
    })
  ]).range([0, MAX_WIDTH / 2]);

  nodes = nodes_layer.selectAll('.node').data(graph_data.nodes);

  nodes.enter().append('circle').attr({
    "class": 'node',
    r: function(node) {
      return radius(node.size);
    },
    cx: function(node) {
      return node.x + (4 + radius(node.size)) * Math.cos(node.theta);
    },
    cy: function(node) {
      return node.y + (4 + radius(node.size)) * Math.sin(node.theta);
    }
  });

  labels = nodes_layer.selectAll('.label').data(graph_data.nodes);

  labels.enter().append('text').text(function(node) {
    return node.id;
  }).attr({
    "class": 'label',
    dy: '0.35em',
    x: function(node) {
      return node.x + (4 + radius(node.size)) * Math.cos(node.theta);
    },
    y: function(node) {
      return node.y + (4 + radius(node.size)) * Math.sin(node.theta);
    }
  });

  max = d3.max(graph_data.nodes, function(n) {
    return n.degree;
  });

  link_thickness = d3.scale.linear().domain([0, max]).range([0, MAX_WIDTH * 0.8]);

  links = links_layer.selectAll('.link').data(graph_data.links);

  tension = 0.5;

  links.enter().append('path').attr({
    "class": 'link flowline',
    'stroke-width': function(link) {
      return link_thickness(link.weight);
    }
  });

  links.attr({
    d: function(link) {
      var cxs, cxt, cys, cyt, sankey_ds, sankey_dt, sankey_dxs, sankey_dxt, sankey_dys, sankey_dyt, xs, xsi, xt, xti, ys, ysi, yt, yti;

      sankey_ds = link_thickness(link.source.degree) / 2 - link_thickness(link.sankey_source.middle);
      sankey_dt = link_thickness(link.target.degree) / 2 - link_thickness(link.sankey_target.middle);
      sankey_dxs = sankey_ds * Math.cos(link.source.theta + Math.PI / 2);
      sankey_dys = sankey_ds * Math.sin(link.source.theta + Math.PI / 2);
      sankey_dxt = sankey_dt * Math.cos(link.target.theta + Math.PI / 2);
      sankey_dyt = sankey_dt * Math.sin(link.target.theta + Math.PI / 2);
      xs = link.source.x + sankey_dxs;
      ys = link.source.y + sankey_dys;
      xt = link.target.x + sankey_dxt;
      yt = link.target.y + sankey_dyt;
      xsi = xs + (4 + radius(link.source.size)) * Math.cos(link.source.theta);
      ysi = ys + (4 + radius(link.source.size)) * Math.sin(link.source.theta);
      xti = xt + (4 + radius(link.target.size)) * Math.cos(link.target.theta);
      yti = yt + (4 + radius(link.target.size)) * Math.sin(link.target.theta);
      cxs = xs - link.source.x * tension;
      cys = ys - link.source.y * tension;
      cxt = xt - link.target.x * tension;
      cyt = yt - link.target.y * tension;
      return "M" + xsi + " " + ysi + " L" + xs + " " + ys + " C" + cxs + " " + cys + " " + cxt + " " + cyt + " " + xt + " " + yt + " L" + xti + " " + yti;
    }
  });

  nodes.on('mouseover', function(n) {
    var over_links;

    over_links = svg.selectAll('.link').filter(function(link) {
      return link.source !== n && link.target !== n;
    });
    return over_links.classed('blurred', true);
  });

  nodes.on('mouseout', function() {
    return svg.selectAll('.link').classed('blurred', false);
  });

}).call(this);