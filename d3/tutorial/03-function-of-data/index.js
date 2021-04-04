var data = [100, 200, 300];
var paragraph = d3.select("body")
        .selectAll("p")
        .data(data)
        .text(function (d, i) {
            console.log("d: " + d);
            console.log("i: " + i);
            console.log("this: " + this);

            return d;
        });

d3.selectAll("p").style("color", function(d, i) {
        var text = this.innerText;
    
        if (text.indexOf("Error") >= 0) {
            return "red";
        } else if (text.indexOf("Warning") >= 0) {
            return "yellow";
        }
});