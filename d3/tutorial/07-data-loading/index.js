d3.csv("/employees.csv", function(data) {
    for (var i = 0; i < data.length; i++) {
        console.log(data[i].Name);
        console.log(data[i].Age);
    }
});

d3.csv("/employees.csv")
  .row(function(d) {
        return {
            Age: d.Age,
            Name: d.Name.toUpperCase() // converting name to upper case 
        }; 
   })
  .get(function(data) {
      console.log(data);
  });

d3.json("users.json", function(data) {
    console.log(data);
});