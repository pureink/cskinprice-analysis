import React from "react";
import {
  VictoryChart,
  VictoryZoomContainer,
  VictoryLine,
  VictoryBrushContainer,
  VictoryAxis,
  VictoryTooltip,
} from "victory";
import { useState } from "react";
function Chart({ data1, data2 }) {
  const [zoomDomain, setDomain] = useState({
    x: [new Date(data1[0][0]), new Date(data1[data1.length - 1][0])],
  });

  const arr = data1;
  const arr2 = data2;
  let o = [];
  for (let i = 0; i < arr.length; i++) {
    o.push({
      date: new Date(arr[i][0]),
      price: arr[i][1],
    });
  }
  let o2 = [];
  for (let i = 0; i < arr2.length; i++) {
    o2.push({
      date: new Date(arr2[i][0]),
      price: arr2[i][1],
    });
  }
  return (
    <>
      <VictoryChart
        width={600}
        height={470}
        scale={{ x: "time" }}
        containerComponent={
          <VictoryZoomContainer
            zoomDimension="x"
            zoomDomain={zoomDomain}
            onZoomDomainChange={(e) => setDomain(e)}
          />
        }
      >
        <VictoryLine
          name="steam"
          style={{
            data: { stroke: "tomato" },
          }}
          data={o}
          x="date"
          y="price"
        />
      </VictoryChart>
      <VictoryChart
        padding={{ top: 0, left: 0, right: 0, bottom: 30 }}
        width={600}
        height={100}
        scale={{ x: "time" }}
        containerComponent={
          <VictoryBrushContainer
            brushDimension="x"
            brushDomain={zoomDomain}
            onBrushDomainChange={(e) => setDomain(e)}
          />
        }
      >
        <VictoryAxis tickFormat={(x) => new Date(x).getFullYear()} />
        <VictoryLine
          style={{
            data: { stroke: "tomato" },
          }}
          data={o}
          x="date"
          y="price"
        />
      </VictoryChart>
    </>
  );
}

export default Chart;
