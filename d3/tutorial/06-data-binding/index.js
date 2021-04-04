/*
var myData = ["Hello World!", "Hello D3"];
     
var p = d3.select("body")
    .selectAll("p")
    .data(myData) // requires an array! (ie. 100 will not work)
    .text(function (d) {
        return d;
    });
*/

/*
var data = [4, 1, 6, 2, 8, 9];
var body = d3.select("body")
            .selectAll("span")
            .data(data) // requires an array! (ie. 100 will not work)
            .enter()	// create reference placeholders for variable # of elements
            .append("span")	// append above created <span> to <body>
            .text(function(d) { return d + " "; });
*/

/*
var data = [4, 1, 6, 2, 8, 9];
var body = d3.select("body")
             .selectAll("span")
             .data(data)
             .enter().append("span")
             .style('color', function(d) {
                 if (d % 2 === 0) {
                     return "green";
                 } else {
                     return "red";
                 }
             })
             .text(function(d) { return d + " "; });
*/

var matrix = [
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 12],
                [13, 14, 15, 16]
            ];

var tr = d3.select("body")
    .append("table")  // adds <table>
    .selectAll("tr")  // selects all <tr>
    .data(matrix)     // joins matrix array 
    .enter()          // create placeholders for each row in the array
    .append("tr");	  // create <tr> in each placeholder

var td = tr.selectAll("td")
    .data(function (d) {    // joins inner array of each row
        console.log(d);
        return d;
    })
    .enter()      // create placeholders for each element in an inner array
    .append("td") // creates <td> in each placeholder
    .text(function (d) {
        console.log(d);
        return d; // add value of each inner array as a text in <td>
    });

/* ------------------------------------------- */

var myData = ["Hello World!"];

var p = d3.select("body")
            .selectAll("p")
            .data(myData)
            .text(function (d, i) {
                return d;
            })
            .exit()
            .remove();

/* ------------------------------------------- */

d3.select("body")
        .select("p")
        .datum(100)
        .text(function (d, i) {
            return d;
        });
