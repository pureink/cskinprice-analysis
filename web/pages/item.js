import Chart from "../components/chart";
const fetcherj = (url) => fetch(url).then((res) => res.json());
import { useRouter } from "next/router";
import { Box, Text, Image, Flex } from "@chakra-ui/react";
import useSWR from "swr";
import moment from "moment";
import Steam from "./steam";
import Loading from "../components/loading";
import {
  VictoryChart,
  VictoryBar,
  VictoryPie,
  VictoryTheme,
  VictoryLabel,
  VictoryTooltip,
  VictoryGroup,
  VictoryArea,
} from "victory";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@chakra-ui/react";

function randomcolor() {
  return (
    "#" +
    Math.floor(Math.random() * 2 ** 24)
      .toString(16)
      .padStart(0, 6)
  );
}
export default function Item() {
  const router = useRouter();
  const path = router.query.id;
  const { data } = useSWR(path?"/api/item?id=" + path:null, fetcherj);

  if (!data) {
    return <Loading />;
  }
  const info = data.knifes[0];
  let piedata = [];
  let c5_price = "unknown";
  let ig_price = "unknown";
  let steam_price = "unknown";
  let igchart = null;
  let c5chart = null;
  let steamchart = null;
  if (info.igxe) {
    piedata.push({ x: "igxe", y: parseInt(info.igxe.num) });
    ig_price = info.igxe.current_price;
    let igdata = [];
    for (let i = 0; i < info.igxe.prices.length; i++) {
      igdata.push({
        x: new Date(info.igxe.prices[i].date.replace(", ", "T")),
        y: parseInt(info.igxe.prices[i].price.substring(1)),
      });
    }
    igchart = (
      <VictoryArea
        style={{
          data: { fill: "rgb(29,74,138)", stroke: "rgb(29,74,138)" },
        }}
        data={igdata}
      />
    );
  }
  if (info.c5game) {
    piedata.push({ x: "c5", y: parseInt(info.c5game.num) });
    c5_price = info.c5game.current_price;
    let c5data = [];
    for (let i = 0; i < info.c5game.prices.length; i++) {
      c5data.push({
        x: new Date(info.c5game.prices[i].date.replace(", ", "T")),
        y: parseInt(info.c5game.prices[i].price.substring(1)),
      });
    }
    c5chart = (
      <VictoryArea
        style={{
          data: { fill: "rgb(14,43,94)", stroke: "rgb(14,43,94)" },
        }}
        data={c5data}
      />
    );
  }
  if (info.steam) {
    piedata.push({ x: "steam", y: parseInt(info.steam.num) });
    steam_price = info.steam.current_price;
    let steamdata = [];
    for (let i = 0; i < info.steam.prices.length; i++) {
      steamdata.push({
        x: new Date(info.steam.prices[i].date.replace(", ", "T")),
        y: 0.85 * 6.43 * parseInt(info.steam.prices[i].price.substring(1)),
      });
    }
    steamchart = (
      <VictoryArea
        style={{
          data: { fill: "rgb(45,105,194)", stroke: "rgb(45,105,194)" },
        }}
        data={steamdata}
      />
    );
  }
  return (
    <>
      <Breadcrumb mx="10" mt="10">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">{data.knifes[0]._id}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Box mx="auto" w="500px" maxW="100%" my="10">
        <Text
          bgGradient={`linear(to-l, ${randomcolor()},${randomcolor()})`}
          bgClip="text"
          fontSize="2xl"
          fontWeight="bold"
        >
          {info._id}
        </Text>
        <Image mx="auto" w="150px" src={"https://" + info.igxe.img} />
        <Flex direction="column" my="10">
          <Flex justify="center">
            <Image borderRadius="5" w="25px" src="/igxe.png" m="2" />
            igxe价格：{ig_price}
          </Flex>
          <Flex justify="center">
            <Image borderRadius="5" w="25px" src="/c5.jpg" m="2" />
            c5game价格：{c5_price}
          </Flex>
          <Flex justify="center">
            <Image borderRadius="5" w="25px" src="/steam.png" m="2" />
            steam价格：{steam_price}
          </Flex>
        </Flex>
      </Box>

      <Box w="300px" mx="auto">
        <svg viewBox="0 0 400 400">
          <VictoryPie
            standalone={false}
            colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
            style={{ labels: { fill: "white" } }}
            innerRadius={70}
            labelRadius={95}
            labels={({ datum }) => `${datum.x}\n 在售${datum.y}`}
            data={piedata}
          />
          <VictoryLabel
            textAnchor="middle"
            style={{ fontSize: 20 }}
            x={200}
            y={200}
            text="sale!"
          />
        </svg>
      </Box>
      <Box w="360px" mx="auto">
        <VictoryChart
          domain={{
            y: [
              parseInt(data.knifes[0].igxe.current_price.substring(1)) * 0.9,
              parseInt(data.knifes[0].igxe.current_price.substring(1)) * 1.4,
            ],
          }}
          width={500}
          height={480}
        >
          <VictoryGroup
            style={{
              data: { strokeWidth: 1.5, fillOpacity: 0.45 },
            }}
          >
            {igchart}
            {steamchart}
            {c5chart}
          </VictoryGroup>
        </VictoryChart>
      </Box>
      {data.knifes[0].steam ? (
        <Steam
          url={
            "https://api.scraperapi.com/?api_key=bd34bcd86583b46c76dc5c9c24c5af26&url=" +
            data.knifes[0].steam.href.substring(6)
          }
        />
      ) : null}
    </>
  );
}
