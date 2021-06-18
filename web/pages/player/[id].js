import { useRouter } from "next/router";
import React from "react";
import { Box, Text, Image, Flex, SimpleGrid, GridItem } from "@chakra-ui/react";
const fetcher = (url) => fetch(url).then((res) => res.json());
import useSWR from "swr";
import B5 from "../../components/b5";
import E5 from "../../components/e5";
import Weapons from "../../components/weapons";
import ReactECharts from "echarts-for-react";
import { Fade } from "react-awesome-reveal";
export default function player() {
  const router = useRouter();
  const id = router.asPath.substring(8);
  const { data } = useSWR(
    id.length > 4
      ? "https://service-65yn2jc1-1257876674.bj.apigw.tencentcs.com/release/chinasoft?steamid=" +
          id
      : null,
    fetcher
  );
  if (data && !data.statusCode) {
    //雷达图
    const option2 = {
      title: {
        text: "",
      },
      tooltip: {},
      legend: {
        data: ["我的数据"],
      },
      radar: {
        indicator: [
          { name: "枪法", max: 100 },
          { name: "道具", max: 100 },
          { name: "狙杀", max: 100 },
          { name: "突破", max: 100 },
          { name: "致胜", max: 100 },
        ],
        splitArea: {
          areaStyle: {
            color: ["#101935", "#14224a", "#1B2e55", "#2f4d85"],
            shadowColor: "rgba(0, 0, 0, 0.2)",
            shadowBlur: 10,
          },
        },
      },
      series: [
        {
          type: "radar",
          data: [
            {
              value: [
                Math.round(data.datawm.shot * 10),
                Math.round(data.datawm.prop * 10),
                Math.round(data.datawm.snipe * 10),
                Math.round(data.datawm.breach * 10),
                Math.round(data.datawm.victory * 10),
              ],
              itemStyle: {
                color: "#e4f0fe",
              },
              areaStyle: {
                color: "#5690e3",
              },
              name: "我的数据",
            },
          ],
        },
      ],
    };
    const option4 = {
      series: [
        {
          name: "",
          type: "pie",
          radius: [60, 150],
          center: ["25%", "50%"],
          roseType: "radius",
          left: "center",
          itemStyle: {
            borderRadius: 5,
          },
          label: {
            position: "inner",
            fontSize: 12,
          },
          emphasis: {
            label: {
              show: true,
            },
          },
          data: [
            {
              value: data.datawm.hotMaps[0].totalMatch,
              name: data.datawm.hotMaps[0].mapName,
            },
            {
              value: data.datawm.hotMaps[1].totalMatch,
              name: data.datawm.hotMaps[1].mapName,
            },
            {
              value: data.datawm.hotMaps[2].totalMatch,
              name: data.datawm.hotMaps[2].mapName,
            },
          ],
        },
      ],
    };
    return (
      <>
        {/* <Text fontSize="20px" fontWeight="bold" m="4">
          CSkin
        </Text> */}
        <Box w="1440px" h="100vh" mx="auto" position="absolute" z-index="-999">
          <video autoPlay loop muted width="100%">
            <source src="/csgo.mp4" type="video/mp4"></source>
          </video>
        </Box>
        <Box
          mx="auto"
          borderRadius="5px"
          pt="40px"
          w="100%"
          maxW="540px"
          mx="auto"
        >
          <Flex mb="50px" position="relative" justify="space-between" mx="30px">
            <Flex direction="column">
              <Flex direction="column">
                <Text fontSize="18px" color="white">
                  {data.datawm.cnt}
                </Text>
                <Text fontSize="12px" color="gray">
                  赛事场次
                </Text>
              </Flex>
              <Flex direction="column">
                <Text fontSize="18px" color="white">
                  {data.datawm.winRate}
                </Text>
                <Text fontSize="12px" color="gray">
                  胜率
                </Text>
              </Flex>
              <Flex direction="column">
                <Text fontSize="18px" color="white">
                  {data.datawm.elo}
                </Text>
                <Text fontSize="12px" color="gray">
                  ELO
                </Text>
              </Flex>
            </Flex>
            <Box>
              <Image
                w="80px"
                position="relative"
                mx="auto"
                src={data.datasteam.avatar.medium}
                borderRadius="full"
              ></Image>
              <Text
                position="relative"
                color="white"
                fontSize="18px"
                fontWeight="bold"
              >
                {data.datasteam.nickname}
              </Text>
            </Box>
            <Flex direction="column">
              <Flex direction="column">
                <Text fontSize="18px" color="white">
                  {data.datawm.pwRating}
                </Text>
                <Text fontSize="12px" color="gray">
                  rating pro
                </Text>
              </Flex>
              <Flex direction="column">
                <Text fontSize="18px" color="white">
                  {data.datawm.rws}
                </Text>
                <Text fontSize="12px" color="gray">
                  RWS
                </Text>
              </Flex>
              <Flex direction="column">
                <Text fontSize="18px" color="white">
                  {data.datawm.adr}
                </Text>
                <Text fontSize="12px" color="gray">
                  ADR
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex>
            <ReactECharts
              option={option2}
              style={{ width: "480px", height: "200px" }}
            />
            <SimpleGrid
              zIndex="10"
              color="white"
              autoColumns
              w="100%"
              templateRows="repeat(4, 1fr)"
              templateColumns="repeat(3, 1fr)"
              fontWeight="bold"
            >
              <Flex direction="column">
                <Text fontWeight="bold" fontSize="18px">
                  0.98
                </Text>
                <Text color="gray" fontSize="12px">
                  K/D
                </Text>
              </Flex>
              <Flex direction="column">
                <Text fontWeight="bold" fontSize="18px">
                  {data.datawm.avgWe}
                </Text>
                <Text color="gray" fontSize="12px">
                  WE
                </Text>
              </Flex>{" "}
              <Flex direction="column">
                <Text fontWeight="bold" fontSize="18px">
                  {data.datawm.pvpRank}
                </Text>
                <Text color="gray" fontSize="12px">
                  名次
                </Text>
              </Flex>{" "}
              <Flex direction="column">
                <Text fontWeight="bold" fontSize="18px">
                  {Math.round(data.datawm.kills / data.datawm.cnt)}
                </Text>
                <Text color="gray" fontSize="12px">
                  场均击杀
                </Text>
              </Flex>{" "}
              <Flex direction="column">
                <Text fontWeight="bold" fontSize="18px">
                  {Math.round(data.datawm.assists / data.datawm.cnt)}
                </Text>
                <Text color="gray" fontSize="12px">
                  场均助攻
                </Text>
              </Flex>{" "}
              <Flex direction="column">
                <Text fontWeight="bold" fontSize="18px">
                  {Math.round(data.datawm.deaths / data.datawm.cnt)}
                </Text>
                <Text color="gray" fontSize="12px">
                  场均死亡
                </Text>
              </Flex>{" "}
              <Flex direction="column">
                <Text fontWeight="bold" fontSize="18px">
                  {data.datawm.entryKillRatio * 100}%
                </Text>
                <Text color="gray" fontSize="12px">
                  首杀率
                </Text>
              </Flex>{" "}
              <Flex direction="column">
                <Text fontWeight="bold" fontSize="18px">
                  {data.datawm.headShotRatio * 100}%
                </Text>
                <Text color="gray" fontSize="12px">
                  爆头率
                </Text>
              </Flex>{" "}
              <Flex direction="column">
                <Text fontWeight="bold" fontSize="18px">
                  {data.datawm.vs1}
                </Text>
                <Text color="gray" fontSize="12px">
                  1v1
                </Text>
              </Flex>{" "}
              <Flex direction="column">
                <Text fontWeight="bold" fontSize="18px">
                  {data.datawm.k3}/{data.datawm.vs3}
                </Text>
                <Text color="gray" fontSize="12px">
                  3k/1v3
                </Text>
              </Flex>{" "}
              <Flex direction="column">
                <Text fontWeight="bold" fontSize="18px">
                  {data.datawm.k4}/{data.datawm.vs4}
                </Text>
                <Text color="gray" fontSize="12px">
                  4k/1v4
                </Text>
              </Flex>{" "}
              <Flex direction="column">
                <Text fontWeight="bold" fontSize="18px">
                  {data.datawm.k5}/{data.datawm.vs5}
                </Text>
                <Text color="gray" fontSize="12px">
                  5k/1v5
                </Text>
              </Flex>
            </SimpleGrid>
          </Flex>
          <Text
            position="relative"
            my="15px"
            zIndex="1"
            fontSize="18px"
            color="white"
          >
            你的评价是{data.datawm.summary}
          </Text>
          <Text
            position="relative"
            my="15px"
            zIndex="1"
            fontSize="18px"
            color="white"
          >
            你适合的位置是{"补枪位"}
          </Text>
        </Box>
        <Box mt="130px" h="100vh" minH="600px" bg="rgb(52, 51, 57)" p="40px">
          <Flex justify="space-between">
            <Flex direction="column">
              <Image mb="20px" w="280px" h="60px" src="/images/wm.png"></Image>
              <Fade>
                <Box w="500px" boxShadow="2xl" bg="white" borderRadius="5px">
                  <Weapons data={data.datawm.hotWeapons} />
                </Box>
              </Fade>
            </Flex>
            <Box mx="20px" my="auto">
              {" "}
              <ReactECharts
                option={option4}
                style={{ width: "400px", height: "300px" }}
              />
            </Box>

            <Image src="/images/oldk.png" w="150px" h="150px"></Image>
            <Box>
              <Image
                mt="200px"
                mr="80px"
                w="400px"
                transform="rotate(45deg)"
                src="/ak47-火神.png"
              ></Image>
            </Box>
          </Flex>
        </Box>
        {data.datab5 ? <B5 data={data.datab5} /> : null}
        {data.data5e ? <E5 data={data.data5e} /> : null}
      </>
    );
  } else {
    return null;
  }
}
// export async function getServerSideProps(context) {
//   const id = context.query.id;
//   const res = await fetch("https://cors.1nk.workers.dev/?https://cskin-py.herokuapp.com/classify", {
//     method: "POST",
//     body: { steamid: id },
//   });
//   const posi = await res.json()
//   return {
//     props: { pos: ["推荐位置"] }, // will be passed to the page component as props
//   };
// }
