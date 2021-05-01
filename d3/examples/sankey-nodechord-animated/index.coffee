# Code from: http://bl.ocks.org/nitaku/1adb4033d7078f7d005e

# data
graph_data = {
  nodes: [
    {id: 'A', size: 14},
    {id: 'B', size: 56},
    {id: 'C', size: 26},
    {id: 'D', size: 16},
    {id: 'E', size: 32},
    {id: 'F', size: 16},
    {id: 'G', size: 12}
  ],
  links: [
    {source: 'A', target: 'B', weight: 12},
    {source: 'A', target: 'C', weight:  8},
    {source: 'A', target: 'D', weight: 33},
    {source: 'A', target: 'F', weight:  5},
    {source: 'A', target: 'G', weight: 24},
    {source: 'B', target: 'A', weight: 16},
    {source: 'B', target: 'D', weight: 10},
    {source: 'B', target: 'E', weight: 10},
    {source: 'B', target: 'F', weight:  8},
    {source: 'B', target: 'G', weight: 16},
    {source: 'C', target: 'A', weight: 13},
    {source: 'C', target: 'D', weight: 29},
    {source: 'C', target: 'E', weight: 11},
    {source: 'D', target: 'E', weight:  4},
    {source: 'D', target: 'F', weight: 12},
    {source: 'E', target: 'F', weight: 19},
    {source: 'F', target: 'E', weight: 11}
  ]
}

# objectify the graph
# resolve node IDs (not optimized at all!)
objectify = (graph) ->
  graph.links.forEach (l) ->
    graph.nodes.forEach (n) ->
      if l.source is n.id
        l.source = n
      
      if l.target is n.id
        l.target = n
      
objectify(graph_data)

# create link arrays for each node
list_links = (graph) ->
  graph.nodes.forEach (n) ->
    n.links = graph.links.filter (link) -> link.source is n or link.target is n
    
list_links(graph_data)

# sankeify the graph
sankey = (graph) ->
  graph.nodes.forEach (n) ->
    acc = 0
    n.links.forEach (link) ->
      if link.source is n
        link.sankey_source = {
          start: acc,
          middle: acc + link.weight/2,
          end: acc += link.weight
        }
      else if link.target is n
        link.sankey_target = {
          start: acc,
          middle: acc + link.weight/2,
          end: acc += link.weight
        }
  
sankey(graph_data)

# compute node weighted degrees (sankey totals)
compute_degree = (graph) ->
  graph.nodes.forEach (n) ->
    n.degree = d3.sum n.links, (link) -> link.weight

compute_degree(graph_data)
    
svg = d3.select('svg')
width = svg.node().getBoundingClientRect().width
height = svg.node().getBoundingClientRect().height

# translate the viewBox to have (0,0) at the center of the vis
svg
  .attr
    viewBox: "#{-width/2} #{-height/2} #{width} #{height}"
    
    
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

MAX_WIDTH = 60

# draw nodes above links
links_layer = svg.append('g')
nodes_layer = svg.append('g')

radius = d3.scale.sqrt()
  .domain([0, d3.min graph_data.nodes, (n) -> n.size])
  .range([0, MAX_WIDTH/2])

nodes = nodes_layer.selectAll('.node')
  .data(graph_data.nodes)
  
nodes.enter().append('circle')
  .attr
    class: 'node'
    r: (node) -> radius(node.size)
    cx: (node) -> node.x + (4+radius(node.size))*Math.cos(node.theta)
    cy: (node) -> node.y + (4+radius(node.size))*Math.sin(node.theta)
    
# draw node labels
labels = nodes_layer.selectAll('.label')
  .data(graph_data.nodes)
  
labels.enter().append('text')
  .text((node) -> node.id)
  .attr
    class: 'label'
    dy: '0.35em'
    x: (node) -> node.x + (4+radius(node.size))*Math.cos(node.theta)
    y: (node) -> node.y + (4+radius(node.size))*Math.sin(node.theta)
    
    
max = d3.max graph_data.nodes, (n) -> n.degree
link_thickness = d3.scale.linear()
  .domain([0, max])
  .range([0, MAX_WIDTH*0.8])
  
links = links_layer.selectAll('.link')
  .data(graph_data.links)
  
tension = 0.5

links.enter().append('path')
  .attr
    class: 'link flowline'
    'stroke-width': (link) -> link_thickness(link.weight)
    
links
  .attr
    d: (link) ->
      sankey_ds = link_thickness(link.source.degree)/2 - link_thickness(link.sankey_source.middle)
      sankey_dt = link_thickness(link.target.degree)/2 - link_thickness(link.sankey_target.middle)
      
      sankey_dxs = sankey_ds*Math.cos(link.source.theta+Math.PI/2)
      sankey_dys = sankey_ds*Math.sin(link.source.theta+Math.PI/2)
      sankey_dxt = sankey_dt*Math.cos(link.target.theta+Math.PI/2)
      sankey_dyt = sankey_dt*Math.sin(link.target.theta+Math.PI/2)
      
      xs = link.source.x + sankey_dxs
      ys = link.source.y + sankey_dys
      xt = link.target.x + sankey_dxt
      yt = link.target.y + sankey_dyt
      
      xsi = xs + (4+radius(link.source.size))*Math.cos(link.source.theta)
      ysi = ys + (4+radius(link.source.size))*Math.sin(link.source.theta)
      xti = xt + (4+radius(link.target.size))*Math.cos(link.target.theta)
      yti = yt + (4+radius(link.target.size))*Math.sin(link.target.theta)
      
      cxs = xs-link.source.x*tension
      cys = ys-link.source.y*tension
      cxt = xt-link.target.x*tension
      cyt = yt-link.target.y*tension
      return "M#{xsi} #{ysi} L#{xs} #{ys} C#{cxs} #{cys} #{cxt} #{cyt} #{xt} #{yt} L#{xti} #{yti}"
      
# node hover
nodes.on 'mouseover', (n) ->
  over_links = svg.selectAll('.link').filter (link) -> link.source isnt n and link.target isnt n
  over_links.classed('blurred', true)
  
nodes.on 'mouseout', () ->
  svg.selectAll('.link').classed('blurred', false)
  