d3.selectAll("div")
  .on("mouseover", function(){
      d3.select(this)
        .style("background-color", "orange");

      // Get current event info
      console.log(d3.event);
      
      // Get x & y co-ordinates
      console.log(d3.mouse(this));
  })
  .on("mouseout", function(){
      d3.select(this)
        .style("background-color", "steelblue")
  });