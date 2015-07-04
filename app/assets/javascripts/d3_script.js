var margin = {top:0, right:0, bottom:20, left:50},
    width  = 800,
    height = 500;

var svg = d3.select("body")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", "0 0 " + width + " " + height);

var yScale = d3.scale.linear()
    .range([height - margin.top - margin.bottom, 0]);

var xScale = d3.scale.ordinal()
    .rangeRoundBands([0, width - margin.right - margin.left], .1);


var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left")
    .tickFormat(d3.format("$,"));//...then add this line, a tickFormat for currency


d3.csv("stockowners.csv", function(error, data){
d["Median Price"] = +d["Median Price"]; 
    return d;
})


yScale.domain([0, d3.max(data, function(d){ return d["Median Price"]; })]);

//xscale is unique values in your data (Age Group, since they are all different)
xScale.domain(data.map(function(d){ return d["Age Group"]; }));


svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function(d){ return xScale(d["Age Group"]); })
    .attr("y", function(d){ return yScale(d["Median Price"]); })
    .attr("height", function(d){ return height - margin.top - margin.bottom - yScale(d["Median Price"]); })
    .attr("width", function(d){ return xScale.rangeBand(); });

 //adding y axis to the left of the chart
svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .call(yAxis);

//adding x axis to the bottom of chart
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(" + margin.left + "," + (height - margin.bottom) + ")")
    .call(xAxis);

svg.append("g")
    .attr("transform", "translate(" + (width/2) + ", 15)")
    .append("text")
    .text("Stock Wealth by Age")
    .style({"text-anchor":"middle", "font-family":"Arial", "font-weight":"800"});