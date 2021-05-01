# Code from: Code from: http://bl.ocks.org/nitaku/a50ccec1c202731fa8f1

# data
graph_data = {
  nodes: [
    {id: 'A'},
    {id: 'B'},
    {id: 'C'},
    {id: 'D'},
    {id: 'E'},
    {id: 'F'},
    {id: 'G'}
  ],
  links: [
    {source: 'A', target: 'B', weight: 12},
    {source: 'A', target: 'C', weight:  2},
    {source: 'A', target: 'D', weight: 33},
    {source: 'A', target: 'F', weight:  5},
    {source: 'A', target: 'G', weight: 24},
    {source: 'B', target: 'D', weight: 10},
    {source: 'B', target: 'E', weight: 10},
    {source: 'B', target: 'F', weight:  8},
    {source: 'B', target: 'G', weight: 16},
    {source: 'C', target: 'D', weight: 29},
    {source: 'C', target: 'E', weight: 11},
    {source: 'D', target: 'E', weight:  4},
    {source: 'D', target: 'F', weight: 12},
    {source: 'E', target: 'F', weight: 19}
  ]
}

# objectify the graph
# resolve node IDs (not optimized at all!)
graph_data.links.forEach (l) ->
  graph_data.nodes.forEach (n) ->
    if l.source is n.id
      l.source = n
    
    if l.target is n.id
      l.target = n

svg = d3.select('svg')
width = svg.node().getBoundingClientRect().width
height = svg.node().getBoundingClientRect().height

# translate the viewBox to have (0,0) at the center of the vis
svg
  .attr
    viewBox: "#{-width/2} #{-height/2-30} #{width} #{height}"
    
    
# layout
circular_layout = () ->
  rho = (d, i, data) -> 100
  theta_0 = (d, i, data) -> -Math.PI/2 # start from the angle pointing north
  delta_theta = (d, i, data) -> 2*Math.PI/data.length
  theta = (d, i , data) -> theta_0(d, i, data) + i*delta_theta(d, i, data)
  
  self = (data) ->
    data.forEach (d, i) ->
      d.rho = rho(d, i, data)
      d.theta = theta(d, i, data)
      d.x = d.rho * Math.cos(d.theta)
      d.y = d.rho * Math.sin(d.theta)
      
    return data
    
  self.rho = (x) ->
    if x?
      if typeof(x) is 'function'
        rho = x
      else
        rho = () -> x
        
      return self
    
    # else
    return rho
    
  self.theta_0 = (x) ->
    if x?
      if typeof(x) is 'function'
        theta_0 = x
      else
        theta_0 = () -> x
      
      return self
    
    # else
    return theta_0
  
  self.delta_theta = (x) ->
    if x?
      if typeof(x) is 'function'
        delta_theta = x
      else
        delta_theta = () -> x
      
      return self
    
    # else
    return delta_theta
  
  self.theta = (x) ->
    if x?
      if typeof(x) is 'function'
        theta = x
      else
        theta = () -> x
      
      return self
    
    # else
    return theta
  
  return self

# apply the layout
circular = circular_layout()
  .rho(160)
  
circular(graph_data.nodes)

DIAMETER = 40

# draw nodes above links
links_layer = svg.append('g')
nodes_layer = svg.append('g')

nodes = nodes_layer.selectAll('.node')
  .data(graph_data.nodes)
  
nodes.enter().append('circle')
  .attr
    class: 'node'
    r: DIAMETER/2
    cx: (node) -> node.x
    cy: (node) -> node.y
    
# draw node labels
labels = nodes_layer.selectAll('.label')
  .data(graph_data.nodes)
  
labels.enter().append('text')
  .text((node) -> node.id)
  .attr
    class: 'label'
    dy: '0.35em'
    x: (node) -> node.x
    y: (node) -> node.y
    
link_thickness = d3.scale.linear()
  .domain([0, d3.max(graph_data.links, (link) -> link.weight)])
  .range([0, DIAMETER*0.8]) # links are never larger than the 80% of a node's diameter

links = links_layer.selectAll('.link')
  .data(graph_data.links)
  
tension = 0

links.enter().append('path')
  .attr
    class: 'link'
    'stroke-width': (link) -> link_thickness(link.weight)
    
redraw = () ->
  links
    .attr
      d: (link) ->
        cxs = link.source.x-link.source.x*tension
        cys = link.source.y-link.source.y*tension
        cxt = link.target.x-link.target.x*tension
        cyt = link.target.y-link.target.y*tension
        return "M#{link.source.x} #{link.source.y} C#{cxs} #{cys} #{cxt} #{cyt} #{link.target.x} #{link.target.y}"
        
  
# draw the controls
tension_scale = d3.scale.linear()
  .domain([0, 1])
  .range([-width/2+50, width/2-50])
  .clamp(true)

tension_brush = d3.svg.brush()
    .x(tension_scale)
    .extent([0, 0])
    
TENSION_SLIDER_Y = -240

svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', "translate(0,#{TENSION_SLIDER_Y})")
    .call(d3.svg.axis()
      .scale(tension_scale)
      .orient('bottom')
      .tickFormat((d) -> d)
      .tickSize(0)
      .tickPadding(12))
  .select('.domain')
  .select(() -> this.parentNode.appendChild(this.cloneNode(true)) )
    .attr('class', 'halo')

slider = svg.append('g')
    .attr('class', 'slider')
    .call(tension_brush)

slider.selectAll('.extent,.resize')
    .remove()

slider.select('.background')
    .attr('transform', "translate(0,#{TENSION_SLIDER_Y-11})")
    .attr('height', 22)

handle = slider.append('circle')
    .attr('class', 'handle')
    .attr('transform', "translate(0,#{TENSION_SLIDER_Y})")
    .attr('r', 9)
    
# initial animation
slider
    .call(tension_brush.event)
  .transition()
    .duration(1800)
    .call(tension_brush.extent([0.3, 0.3]))
    .call(tension_brush.event)
    
brushed = () ->
  tension = tension_brush.extent()[0]

  if d3.event.sourceEvent # not a programmatic event
    tension = tension_scale.invert(d3.mouse(this)[0])
    tension_brush.extent([tension, tension])

  handle.attr('cx', tension_scale(tension))
  
  # redraw the links
  redraw()
  
tension_brush
  .on('brush', brushed)