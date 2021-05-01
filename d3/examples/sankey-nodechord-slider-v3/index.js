// Code from: http://bl.ocks.org/nitaku/a50ccec1c202731fa8f1

(function() {
  var DIAMETER, TENSION_SLIDER_Y, brushed, circular, circular_layout, graph_data, handle, height, labels, link_thickness, links, links_layer, nodes, nodes_layer, redraw, slider, svg, tension, tension_brush, tension_scale, width;

  graph_data = {
    nodes: [
      {
        id: 'A'
      }, {
        id: 'B'
      }, {
        id: 'C'
      }, {
        id: 'D'
      }, {
        id: 'E'
      }, {
        id: 'F'
      }, {
        id: 'G'
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
        weight: 2
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
      }
    ]
  };

  graph_data.links.forEach(function(l) {
    return graph_data.nodes.forEach(function(n) {
      if (l.source === n.id) {
        l.source = n;
      }
      if (l.target === n.id) {
        return l.target = n;
      }
    });
  });

  svg = d3.select('svg');

  width = svg.node().getBoundingClientRect().width;

  height = svg.node().getBoundingClientRect().height;

  svg.attr({
    viewBox: "" + (-width / 2) + " " + (-height / 2 - 30) + " " + width + " " + height
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

  DIAMETER = 40;

  links_layer = svg.append('g');

  nodes_layer = svg.append('g');

  nodes = nodes_layer.selectAll('.node').data(graph_data.nodes);

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

  labels = nodes_layer.selectAll('.label').data(graph_data.nodes);

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
    0, d3.max(graph_data.links, function(link) {
      return link.weight;
    })
  ]).range([0, DIAMETER * 0.8]);

  links = links_layer.selectAll('.link').data(graph_data.links);

  tension = 0;

  links.enter().append('path').attr({
    "class": 'link',
    'stroke-width': function(link) {
      return link_thickness(link.weight);
    }
  });

  redraw = function() {
    return links.attr({
      d: function(link) {
        var cxs, cxt, cys, cyt;

        cxs = link.source.x - link.source.x * tension;
        cys = link.source.y - link.source.y * tension;
        cxt = link.target.x - link.target.x * tension;
        cyt = link.target.y - link.target.y * tension;
        return "M" + link.source.x + " " + link.source.y + " C" + cxs + " " + cys + " " + cxt + " " + cyt + " " + link.target.x + " " + link.target.y;
      }
    });
  };

  tension_scale = d3.scale.linear().domain([0, 1]).range([-width / 2 + 50, width / 2 - 50]).clamp(true);

  tension_brush = d3.svg.brush().x(tension_scale).extent([0, 0]);

  TENSION_SLIDER_Y = -240;

  svg.append('g').attr('class', 'x axis').attr('transform', "translate(0," + TENSION_SLIDER_Y + ")").call(d3.svg.axis().scale(tension_scale).orient('bottom').tickFormat(function(d) {
    return d;
  }).tickSize(0).tickPadding(12)).select('.domain').select(function() {
    return this.parentNode.appendChild(this.cloneNode(true));
  }).attr('class', 'halo');

  slider = svg.append('g').attr('class', 'slider').call(tension_brush);

  slider.selectAll('.extent,.resize').remove();

  slider.select('.background').attr('transform', "translate(0," + (TENSION_SLIDER_Y - 11) + ")").attr('height', 22);

  handle = slider.append('circle').attr('class', 'handle').attr('transform', "translate(0," + TENSION_SLIDER_Y + ")").attr('r', 9);

  slider.call(tension_brush.event).transition().duration(1800).call(tension_brush.extent([0.3, 0.3])).call(tension_brush.event);

  brushed = function() {
    tension = tension_brush.extent()[0];
    if (d3.event.sourceEvent) {
      tension = tension_scale.invert(d3.mouse(this)[0]);
      tension_brush.extent([tension, tension]);
    }
    handle.attr('cx', tension_scale(tension));
    return redraw();
  };

  tension_brush.on('brush', brushed);

}).call(this);