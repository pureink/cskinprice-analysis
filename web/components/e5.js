import { Box, Flex, Text, Progress } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Image,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import ReactEcharts from "echarts-for-react";
import { VictoryChart, VictoryLine } from "victory";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/react";
function iswintext(num) {
  if (num == 1) return "胜";
  if (num == 0) return "负";
  else return "平";
}
function iswincolor(num) {
  if (num == 1) return "green";
  if (num == 0) return "red";
  else return "gray";
}
function scorechange(str) {
  let num = parseInt(str);
  if (num > 0) {
    return (
      <StatHelpText>
        <StatArrow type="increase" />
        {num}
      </StatHelpText>
    );
  } else if (num < 0) {
    return (
      <StatHelpText>
        <StatArrow type="decrease" />
        {-1 * num}
      </StatHelpText>
    );
  } else return null;
}
function timetrans(date) {
  var date = new Date(date * 1000);
  var Y = date.getFullYear() + "-";
  var M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
  var h =
    (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
  var m =
    (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
    ":";
  var s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return Y + M + D + h + m + s;
}
export default function E5({ data }) {
  const matches = data.matches;
  let mcs = [];
  let trends = [];
  const trend = data.trend.data;
  for (let i = 0; i < trend.length; i++) {
    trends.push({
      y: trend[i].values[0].value,
    });
  }
  const option1 = {
    legend: {
      data: ["rating", "elo"],
      selected: {
        elo: false,
        rws: false,
      },
      selectedMode: "single",
    },
    grid: {
      left: "8%",
      right: "8%",
      bottom: "5%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: ["", "", "", "", "", "", ""],
        show: false,
      },
    ],
    yAxis: [
      {
        boundaryGap: [0, "50%"],
        axisLine: {
          lineStyle: {
            color: "#9bbb59",
          },
        },
        splitLine: {
          show: true,
        },
        type: "value",
        // name: 'rating',
        position: "left",
      },
      {
        boundaryGap: [0, "50%"],
        axisLine: {
          lineStyle: {
            color: "#9bbb59",
          },
        },
        splitLine: {
          show: true,
        },
        type: "value",
        // name: 'elo',
        position: "left",
      },
      {
        boundaryGap: [0, "50%"],
        axisLine: {
          lineStyle: {
            color: "#9bbb59",
          },
        },
        splitLine: {
          show: true,
        },
        type: "value",
        // name: 'rws',
        position: "left",
        axisLabel: {
          formatter: function (value, index) {
            return value;
          },
        },
      },
    ],
    series: [
      {
        name: "rating",
        type: "line",
        stack: "总量",
        areaStyle: { normal: {} },
        data: [
          trend[0].values[0].value,
          trend[1].values[0].value,
          trend[2].values[0].value,
          trend[3].values[0].value,
          trend[4].values[0].value,
          trend[5].values[0].value,
        ],
        yAxisIndex: 0,
      },
      {
        name: "elo",
        type: "line",
        stack: "总量",
        areaStyle: { normal: {} },
        data: [
          trend[0].values[1].value,
          trend[1].values[1].value,
          trend[2].values[1].value,
          trend[3].values[1].value,
          trend[4].values[1].value,
          trend[5].values[1].value,
        ],
        yAxisIndex: 1,
      },
    ],
  };

  console.log(trends);
  for (let i = 0; i < matches.length; i++) {
    const url = JSON.parse(matches[i].detail_url.substring(9));
    mcs.push(
      <Tr key={i}>
        <Td>
          <Box
            borderLeftColor={iswincolor(matches[i].win)}
            borderLeftWidth="4px"
          >
            {iswintext(matches[i].win)}
          </Box>
        </Td>
        <Td>{matches[i].score}</Td>
        <Td>
          <Text>{matches[i].map_name}</Text>
        </Td>
        <Td>
          <Text color={matches[i].rating > 1 ? "black" : "gray"}>
            {matches[i].rating}
          </Text>
          <Text color="gray">
            {matches[i].kill}/{matches[i].assist}/{matches[i].death}
          </Text>
        </Td>
        <Td>
          <Text>{matches[i].elo}</Text>
          {scorechange(matches[i].elo_change)}
        </Td>
        <Td fontWeight="bold" fontSize="20px">
          <a href={url.webview.url}>
            <ExternalLinkIcon />
          </a>
        </Td>
      </Tr>
    );
  }
  return (
    <Box w="100%" h="100vh" minH="600px" bg="rgb(235,63,71)" p="100px">
      <Image src="/5e.png"></Image>
      <Flex direction="row" justify="space-between">
        {" "}
        <Table variant="simple" w="560px" bg="white" borderRadius="10px">
          <Thead>
            <Tr>
              <Th>比赛结果</Th>
              <Th>比分</Th>
              <Th>模式</Th>
              <Th>
                <p>rating</p>
                <br />
                <p>K/A/D</p>
              </Th>
              <Th>elo</Th>
              <Th>更多信息</Th>
            </Tr>
          </Thead>
          <Tbody>{mcs}</Tbody>
        </Table>
        <Box
          mx="auto"
          my="auto"
          w="300px"
          bg="white"
          h="250px"
          borderRadius="5px"
        >
          {" "}
          {/* <VictoryChart>
            <VictoryLine
              style={{
                data: { stroke: "tomato" },
              }}
              data={trends}
            />
          </VictoryChart> */}
          <Box borderRadius="5px" bg="white" w="560px" h="360px">
            {" "}
            <ReactEcharts
              option={option1}
              style={{ width: "100%", height: "100%" }}
            />
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
