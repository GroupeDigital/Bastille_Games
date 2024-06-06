import React, { useRef, useEffect, useState, useMemo } from "react";
import * as d3 from "d3";
import "./SpinToWin.scss";

const SpinWheel = () => {
  const ref = useRef();

  const [width, setWidth] = useState(900);
  const [height, setHeight] = useState(900);

  const data = useMemo(
    () => [
      { label: "3D tlačené produkty", value: 10 },
      { label: "Stellantis produkty", value: 10 },
      { label: "Skúsiť znova", value: 25 },
      { label: "Škoda! žiadna výhra", value: 25 },
      { label: "Balón", value: 30 }
    ],
    []
  );

  const [previousAngle, setPreviousAngle] = useState(0);

  const rotateHandle = () => {
    const svg = d3.select(ref.current);
    const g = svg.select("g");

    if (!g.attr("transform")) {
      g.attr("transform", `translate(${width / 2}, ${height / 2}) rotate(0)`);
    }

    // Získajte aktuálny uhol transformácie
    const currentTransform = g.node().getCTM();
    const currentAngle =
      Math.atan2(currentTransform.b, currentTransform.a) * (180 / Math.PI);
    console.log("Current angle:", currentAngle);

    // Nový uhol je približne 900-1000 stupňov väčší ako predošlý
    const newAngle = previousAngle + Math.floor(Math.random() * 1080 + 720);
    console.log("New angle:", newAngle);

    setPreviousAngle(newAngle);

    // Vytvorenie vlastnej funkcie pre interpoláciu uhlov
    const angleInterpolator = (t) => {
      return `translate(${width / 2}, ${height / 2}) rotate(${
        (1 - t) * currentAngle + t * newAngle
      })`;
    };

    g.transition()
      .duration(5000)
      .ease(d3.easeCubicOut)
      .attrTween("transform", () => angleInterpolator);
  };

  useEffect(() => {
    const svg = d3.select(ref.current);

    // Tento riadok odstráni všetky skupiny v SVG
    svg.selectAll("g").remove();

    const width = +svg.attr("width");
    const height = +svg.attr("height");
    const radius = Math.min(width, height) / 2;
    const color = d3.scaleOrdinal(d3.schemeCategory10);
    const pie = d3.pie().value((d) => d.value);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const g = svg
      .append("g")
      // Inicializujeme transformačný atribút aj s rotáciou
      .attr("transform", `translate(${width / 2}, ${height / 2}) rotate(0)`);

    const arcs = g
      .selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");

    arcs
      .append("path")
      .attr("fill", (d, i) => color(i))
      .attr("d", arc);

    arcs
      .append("text")
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .text((d) => d.data.label)
      .attr("transform", function (d) {
        const _d = arc.centroid(d);
        _d[0] *= 1.5; //multiply by a constant factor
        _d[1] *= 1.5; //multiply by a constant factor
        return (
          "translate(" +
          _d +
          ") rotate(" +
          (((d.startAngle + d.endAngle) / 2) * (180 / Math.PI) - 90) +
          ")"
        );
      });

    // Pridajte kruh na stred kolieska
    const startButton = g
      .append("g")
      .attr("id", "startButton")
      .on("click", rotateHandle);

    startButton
      .append("circle")
      .attr("r", 50)
      .attr("fill", "white")
      .attr("stroke", "#222222")

      .attr("stroke-width", 2);

    startButton
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .text("Štart")
      .attr("font-size", "20px")
      .attr("font-weight", "bold")
      .attr("pointer-events", "none");

    // Pridajte ukazovateľ na okraji kolieska
    // const pointer = svg
    //   .append("line")
    //   .attr("x1", width)
    //   .attr("y1", height / 2)
    //   .attr("x2", width - 50)
    //   .attr("y2", height / 2)
    //   .attr("stroke", "black")
    //   .attr("stroke-width", 2);

    // Pridajte text k ukazovateľu
    svg
      .append("text")
      .attr("x", width - 4)
      .attr("y", height / 2)
      .text("◄") //◄►
      .attr("fill", "#222222")
      .attr("font-size", "32px")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle");
  }, [data]);

  return (
    <div>
      <svg
        ref={ref}
        width="900"
        height="900"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)"
        }}
      ></svg>
    </div>
  );
};

export default SpinWheel;
