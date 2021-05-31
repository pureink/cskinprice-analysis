import React from "react";
import { Box, Button } from "@chakra-ui/react";
import {
  VictoryChart,
  VictoryZoomContainer,
  VictoryLine,
  VictoryBrushContainer,
  VictoryAxis,
  VictoryTooltip,
} from "victory";
import { useState } from "react";
function rand(num){
return (0.92+Math.random()*0.16)*num
}
function Chart({ data1 }) {
  const handleClick = (value) => () => {
    fetchData(value);
  };
  var today = new Date();
  today.setDate(today.getDate() + 60)
  const [zoomDomain, setDomain] = useState({
    x: [new Date(data1[0][0]), new Date(today)],
  });
  const [predict, setpredict] = useState();
  const fetchData = async (price_json) => {
    const req = await fetch("https://cors.1310010428.workers.dev/?https://cskin-py.herokuapp.com/predict", {
      method: "POST",
      body: JSON.stringify(price_json),
    });
    const data = await req.json();
    var output = [];
    var today = new Date();
    for (let i = 0; i < data.length; i++) {
      output.push({
        date: today,
        price: rand(data[i]),
      });
      today = today.setDate(today.getDate() + 1);
      today = new Date(today);
    }
    setpredict(output);
  };
  const arr = data1;
  let o = [];
  for (let i = 0; i < arr.length; i++) {
    o.push({
      date: new Date(arr[i][0]),
      price: arr[i][1],
    });
  }
  const predictArr = arr.slice(arr.length - 100, arr.length - 1);
  const predictObj = [];
  for (let i = 0; i < predictArr.length; i++) {
    predictObj.push({
      date: new Date(predictArr[i][0]),
      price: parseInt(predictArr[i][1]),
    });
  }
  let result = {};
  let finalResult = [];
  for (let i = 0; i < predictObj.length; i++) {
    result[predictObj[i].date] = predictObj[i];
  }
  for (let i in result) {
    finalResult.push(result[i]);
  }
  return (
    <>
      <Button m="2" className="pattern-checks-md"onClick={handleClick(finalResult)}>
        predict
      </Button>
      <Box className="chart" w="80%" maxW="480px" mx="auto">
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
          {predict ? (
            <VictoryLine
              name="steam"
              style={{
                data: { stroke: "green" },
              }}
              data={predict}
              x="date"
              y="price"
            />
          ) : null}
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
          {predict ? (
            <VictoryLine
              style={{
                data: { stroke: "green" },
              }}
              data={predict}
              x="date"
              y="price"
            />
          ) : null}
        </VictoryChart>
      </Box>
    </>
  );
}

export default Chart;
