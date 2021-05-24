import Chart from "../components/chart";
const fetcher = (url) => fetch(url).then((res) => res.json());
import { useRouter } from "next/router";
import { Box, Text, Image } from "@chakra-ui/react";
import useSWR from "swr";
import Loading from "../components/loading";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import {
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryTooltip,
} from "victory";
function getdata(arr, time) {
  let i = arr.length - 1;
  const now = new Date();
  now.setDate(now.getDate() - time);
  while (new Date(arr[i][0]) > now) {
    i--;
  }
  const array = arr.slice(i, arr.length - 1);
  let o = [];
  for (let i = 0; i < array.length - 1; i++) {
    o.push({
      x: new Date(array[i][0]),
      y: array[i][2],
    });
  }
  return o;
}
function steamchart(data) {
  if (data.price != undefined) {
    var price;
    if (data.price.length > 365) {
      price = data.price.slice(data.price.length - 365);
    } else {
      price = data.price;
    }
    return (
      <>
        <Text fontSize="20px">近期交易次数</Text>
        <Tabs my="4" mx="auto" defaultIndex={1} align="end" width="500px">
          <TabPanels>
            <TabPanel>
              <VictoryChart
                width={400}
                height={200}
                domainPadding={10}
                theme={VictoryTheme.material}
              >
                <VictoryBar
                  style={{ data: { fill: "#c43a31" } }}
                  data={getdata(data.price, 7)}
                  labels={({ datum }) =>
                    `${new Date(datum.x).toDateString()}有${datum.y}个订单`
                  }
                  labelComponent={
                    <VictoryTooltip
                      center={{ x: 225, y: 30 }}
                      pointerOrientation="bottom"
                      flyoutWidth={150}
                      flyoutHeight={50}
                      pointerWidth={150}
                      cornerRadius={0}
                    />
                  }
                />
              </VictoryChart>
            </TabPanel>
            <TabPanel>
              <VictoryChart width={400} height={200} domainPadding={10}>
                <VictoryBar
                  style={{ data: { fill: "#c43a31" } }}
                  data={getdata(data.price, 30)}
                  labels={({ datum }) =>
                    `${new Date(datum.x).toDateString()}有${datum.y}个订单`
                  }
                  labelComponent={
                    <VictoryTooltip
                      flyoutWidth={150}
                      flyoutHeight={50}
                      pointerWidth={150}
                      cornerRadius={5}
                    />
                  }
                />
              </VictoryChart>
            </TabPanel>
          </TabPanels>
          <TabList>
            <Tab>周</Tab>
            <Tab>月</Tab>
          </TabList>
        </Tabs>
        <Text m="4" fontSize="20px">
          steam历史价格总览
        </Text>
        <Box className="chart" w="480px" mx="auto">
          <Chart data1={price} data2={price} />
        </Box>
      </>
    );
  } else {
    return (
      <Box>
        <Text>暂无steam数据</Text>
      </Box>
    );
  }
}
export default function Item() {
  const router = useRouter();
  const path = router.query.id;
  const { data: data, error } = useSWR("/api/item?id=" + path);

  if (!data || !data.knifes[0]) {
    return <Loading />;
  } else {
    const info = data.knifes[0];
    return (
      <>
        <Box w="500px" mx="auto" my="10">
          <Text textAlign="center">{info._id}</Text>
          <Image mx="auto" w="150px" src={"https://" + info.igxe.img} />
        </Box>
        {steamchart(data)}
      </>
    );
  }
}
