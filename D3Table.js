let xhr = new XMLHttpRequest();
xhr.open(
	"GET",
	"https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json",
	false
);
xhr.send();
const us = JSON.parse(xhr.responseText);

xhr.open(
	"GET",
	"https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json",
	false
);
xhr.send();
const dataset = JSON.parse(xhr.responseText);

console.log(us, dataset);

const SVGwidth = 1000;
const SVGheight = 650;
const leftPadding = 75;
const rightPadding = 40;
const topPadding = 0;
const bottomPadding = 20;

const legendHeight = 50;
const legendWidth = 300;

const color = d3.scaleThreshold([5, 10, 20, 30, 40, 50], d3.schemeReds[7]);

let tooltip = d3
	.select("body")
	.append("div")
	.attr("id", "tooltip")
	.style("opacity", 0);

const path = d3.geoPath();

const svg = d3
	.select(".container")
	.append("svg")
	.attr("width", SVGwidth)
	.attr("height", SVGheight);

svg.append("g")
	.attr("transform", "translate(" + leftPadding + ",0)")
	.selectAll("path")
	.data(topojson.feature(us, us.objects.counties).features)
	.join("path")
	.attr("fill", function(d) {
		let data = dataset.find(el => el.fips === d.id);
		return color(data.bachelorsOrHigher);
	})
	.attr("d", path)
	.attr("class", "county")
	.attr("data-fips", d => d.id)
	.attr(
		"data-education",
		d => dataset.find(el => el.fips === d.id).bachelorsOrHigher
	)
	.on("mouseover", d => {
		tooltip
			.transition()
			.duration(200)
			.style("opacity", 0.9);
		tooltip
			.html(
				(data = dataset.find(el => el.fips === d.id)) =>
					data.area_name +
					", " +
					data.state +
					", education level: " +
					data.bachelorsOrHigher
			)
			.style("left", d3.event.pageX + 10 + "px")
			.style("top", d3.event.pageY - 25 + "px");
		tooltip.attr(
			"data-education",
			dataset.find(el => el.fips === d.id).bachelorsOrHigher
		);
	})
	.on("mouseout", () => tooltip.style("opacity", 0));

svg.append("path")
	.attr("transform", "translate(" + leftPadding + ",0)")
	.datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
	.attr("fill", "none")
	.attr("stroke", "white")
	.attr("stroke-linejoin", "round")
	.attr("d", path);

svg.append("g")
	.attr("transform", "translate(670,20)")
	.append(() => legend({ color, width: 260, title: "Education level in %", tickFormat:(item=>`${item}%`)}))
	.attr("id", "legend");

/*
const yScaleAxe = d3
	.scaleBand()
	.domain(months)
	.range([0, SVGheight - (topPadding + bottomPadding)]);
const xScaleAxe = d3
	.scaleTime()
	.domain([minYear, maxYear])
	.range([0, SVGwidth - (leftPadding + rightPadding)]);
const xAxis = d3
	.axisBottom(xScaleAxe)
	.tickFormat(d3.format("d"))
	.tickSizeOuter(-6);
const yAxis = d3
	.axisLeft(yScaleAxe)
	.tickValues(months)
	.tickSizeOuter(-6);

function tooltipInfo(data) {
	let tooltip = "";
	dataArray = [...Object.entries(data)];
	dataArray.forEach(item => {
		if (item[0] !== "month") {
			tooltip +=
				"<p class='tooltipText'>" + item[0] + ": " + item[1] + "</p>";
		} else {
			tooltip +=
				"<p class='tooltipText'>" +
				item[0] +
				": " +
				months[item[1] - 1] +
				"</p>";
		}
	});
	tooltip +=
		"<p>Temperature: " +
		Math.round((baseTemperature + dataArray[2][1]) * 10) / 10 +
		"℃ </p>";
	return tooltip;
}
function tempArrFuller() {
	let arr = [];
	arr.push(minTemp);
	for (let i = 1; i < colors.length; i++) {
		arr.push(
			Math.round(
				(minTemp +
					((d3.max(dataset, d => d.variance) -
						d3.min(dataset, d => d.variance)) /
						colors.length) *
						i) *
					10
			) / 10
		);
		console.log(
			minTemp +
				((d3.max(dataset, d => d.variance) -
					d3.min(dataset, d => d.variance)) /
					colors.length) *
					i
		);
	}
	arr.push(maxTemp);
	return arr;
}
function colorChooser(data) {
	let color = "";
	colors.forEach((item, i) => {
		if (data.variance + baseTemperature > tempArr[i]) {
			color = colors[i];
		} else if (data.variance + baseTemperature <= tempArr[0]) {
			color = colors[0];
		}
	});
	return color;
} */

/*
svg.append("g")
	.attr("transform", "translate(610,20)")
	.append(() => legend({color, title: data.title, width: 260}));
*/

/*
	
	*/
/*
const legendScale = d3
	.scaleLinear()
	.domain([minTemp, maxTemp])
	.range([0, legendWidth]);
const legendAxis = d3
	.axisBottom(legendScale)
	.tickValues(tempArr)
	.tickFormat(d3.format(".2f"));
console.log(legendAxis);
svg2 = d3
	.select(".container")
	.append("svg")
	.attr("width", legendWidth + legendPadding * 2)
	.attr("height", legendHeight + legendPadding * 2)
	.attr("id", "legend");
svg2.selectAll("rect")
	.data(colors)
	.enter()
	.append("rect")
	.attr("x", (d, i) => i * legendBarWidth + legendPadding)
	.attr("y", legendPadding)
	.attr("width", legendBarWidth)
	.attr("height", legendHeight)
	.attr("fill", d => d);
svg2.append("g")
	.attr(
		"transform",
		"translate(" +
			legendPadding +
			"," +
			(legendHeight + legendPadding) +
			")"
	)
	.attr("id", "legend-axis")
	.call(legendAxis);

	*/
