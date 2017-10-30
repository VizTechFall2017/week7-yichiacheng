var svg = d3.select("svg"),
    margin = {top: 80, right: 20, bottom: 80, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height, 0]);

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var nestedData = [];

d3.csv("./brent201716.csv", function(dataIn) {
    nestedData = d3.nest()
    .key(function(d){return d.year})
    .entries(dataIn);

    var loadData = nestedData.filter(function(d){return d.key == '2017'})[0].values;

    x.domain(loadData.map(function(d) { return d.neighborhood; }));
    y.domain([0, d3.max(loadData, function(d) { return d.rent; })]);


    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", function(d) {
            return "rotate(-45)"
        });


    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(10))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("rent");

    g.selectAll(".bar")
        .data(loadData)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.neighborhood); })
        .attr("y", function(d) { return y(d.rent); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.rent); })


});
