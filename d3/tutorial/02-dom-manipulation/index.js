d3.select("p").text("This is a paragraph.") // first matching element (inside div)
d3.select("body").append("p").text("3rd paragraph."); // add new <p> inside <body> with specified text
d3.select("div").insert("p").text("Second paragraph."); // insert <p> text inside <div>
//d3.select("p").remove(); // delete selected element
d3.select("p").html("<span>This is new inner html.</span>");

d3.select("p").attr("class","error"); // applies attributes to selected element
d3.select("input").property("checked",true); // use property() for elements that can't be set by attr()
d3.select("p").style("color", "red") // add style to selected element
d3.select("p").classed('error', true); // apply or remove class styles to selected elements


