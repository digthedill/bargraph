const url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

const w = 500;
const h = 500;

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    const fullDataList = data.data;
    //two entries 1) date 2) gdp number
    // 1) x axis 2) y axis

    //info for the x axis:
    const yearData = [];
    const parse = () => {
      return fullDataList.forEach((val) => {
        let arrayDate = val[0].split("-");
        let myDate = new Date(arrayDate[0], arrayDate[1], arrayDate[2]);
        yearData.push(myDate);
      });
    };

    parse();

    //grab the min and maxes
    const maxYear = d3.max(yearData, (d) => d);
    const minYear = d3.min(yearData, (d) => d);

    const maxGDP = d3.max(fullDataList.map((val) => val[1]));
    const minGDP = d3.min(fullDataList.map((val) => val[1]));

    const GDP = fullDataList.map((item) => item[1]);
    //setup both scales:

    const padding = 30;
    const barWidth = w / 275;

    const xScale = d3
      .scaleTime()
      .domain([minYear, maxYear])
      .range([padding + 9, w - padding]);

    const yScale = d3
      .scaleLinear()
      .domain([minGDP, maxGDP])
      .range([h - padding, padding]);

    //axis defintions

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    const linearScale = d3.scaleLinear().domain([0, maxGDP]).range([0, h]);

    const scaledGDP = GDP.map((item) => {
      return linearScale(item);
    });
    const svg = d3
      .select("body")
      .append("svg")
      .attr("class", "bar-box")
      .attr("width", w)
      .attr("height", h + 60);

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -200)
      .attr("y", 60)
      .text("Gross Domestic Product");

    svg
      .append("g")
      .attr("transform", "translate(0, " + (h - padding) + ")")
      .attr("id", "x-axis")
      .call(xAxis);
    svg
      .append("g")
      .attr("transform", "translate(" + (padding + 10) + ",0)")
      .attr("id", "y-axis")
      .call(yAxis);
    console.log(scaledGDP);
    svg
      .selectAll("rect")
      .data(scaledGDP)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("data-date", (d, i) => d[0])
      //   .attr("data-gdp", (d, i) => )
      .attr("x", (d, i) => {
        return xScale(yearData[i]);
      })
      .attr("y", (d, i) => {
        return h - padding - d;
      })
      .attr("width", barWidth)
      .attr("height", (d) => d);

    //tool tip for hovering over bargraph
  });
