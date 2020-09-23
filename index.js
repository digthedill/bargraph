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

    //setup both scales:

    const padding = 30;

    const xScale = d3
      .scaleTime()
      .domain([minYear, maxYear])
      .range([padding + 8, w - padding]);

    const yScale = d3
      .scaleLinear()
      .domain([minGDP, maxGDP])
      .range([h - padding, padding]);

    //axis defintions

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    const svg = d3
      .select("body")
      .append("svg")
      .attr("class", "bar-box")
      .attr("width", w)
      .attr("height", h);
    svg
      .append("g")
      .attr("transform", "translate(0, " + (h - padding) + ")")
      .call(xAxis);
    svg
      .append("g")
      .attr("transform", "translate(" + (padding + 10) + ",0)")
      .call(yAxis);
    //   svg
    //     .selectAll("rect")
    //     .data(fullDataList)
    //     .enter()
    //     .append("rect")
    //     .attr("x", (d) => d[0])
    //     .attr("y", (d) => d[1])
    //     .attr("width", 25)
    //     .attr("height", d[1]);
  });
