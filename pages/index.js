import { Box, Flex, Image } from "@chakra-ui/react";
import { Input, Text } from "@chakra-ui/react";
import Fuse from "fuse.js";
import { useState } from "react";
import {
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryTooltip,
} from "victory";

//主页提供搜索功能，在mongodb中搜索，在列表中展示搜索到的物品id
//在连接到服务器时获取所有的物品列表，使用fuse.JS进行搜索
function parse_price(str) {
  if (str != undefined) return parseInt(str.substring(1), 10);
  return 0;
}
function gd(o) {
  return (
    (5.466 * parse_price(o.steam.current_price)) /
    parse_price(o.igxe.current_price)
  );
}
export default function Home(props) {
  const items_origin = props.items_origin;
  const sortitem = items_origin.knifes
    .filter(
      (a) =>
        a.steam != undefined &&
        a.igxe != undefined &&
        parse_price(a.igxe.current_price) != 0
    )
    .sort((a, b) => gd(b) - gd(a))
    .slice(0, 5);
  let sortobj = [];
  for (let i = 0; i < sortitem.length; i++) {
    sortobj.push({
      y: gd(sortitem[i]),
      top: `no.${i+1}`,
      name: sortitem[i].type + "|" + sortitem[i].color,
      skin: sortitem[i].mosun,
    });
  }
  let DUPLICATE = 0;
  const [searchValue, setSearchValue] = useState("");
  const options = {
    isCaseSensitive: false,
    findAllMatches: false,
    threshold: 0.8,
    keys: [
      { name: "type", weight: 1 },
      { name: "color", weight: 1 },
      { name: "mosun", weight: 1 },
    ],
  };
  const fuse = new Fuse(items_origin.knifes, options);
  const pattern = searchValue;
  const items = fuse.search(pattern);
  return (
    <>
      <Text textAlign="center" my="10" fontSize="20px">
        挂刀排行榜
      </Text>
      <Box w="360px" mx="auto">
        <VictoryChart theme={VictoryTheme.material} domainPadding={10}>
          <VictoryBar
            labels={({ datum }) =>
              `${datum.name} \n${datum.skin} \n rate:${datum.y.toPrecision(4)}`
            }
            x="top"
            y="y"
            labelComponent={<VictoryTooltip theme={VictoryTheme.material} />}
            style={{ data: { fill: "rgb(116,89,155)" } }}
            data={sortobj}
          />
        </VictoryChart>
      </Box>
      <Text textAlign="center" my="4">
        搜索🔍
      </Text>
      <Box maxW="960px" mx="auto" w="80%">
        <Input
          size="lg"
          aria-label="Search"
          type="text"
          placeholder="搜索物品"
          onChange={(e) => {
            DUPLICATE++;
            setSearchValue(e.target.value);
          }}
        />
        <div>
          <Flex align="center" justify="space-around" wrap="wrap">
            {searchValue &&
              items.slice(0, 15).map((item) => (
                <Box
                  key={item.item._id + DUPLICATE}
                  border="1px"
                  borderColor="gray.200"
                  p="5"
                  minW="100px"
                  w="250px"
                  h="250px"
                  m="2"
                  borderRadius="5"
                >
                  <Image
                    mx="auto"
                    width="100"
                    height="100"
                    src={"https://" + item.item.igxe.img}
                  />
                  <a href={`/item?id=${item.item._id}`}>{item.item._id}</a>
                  <Text>{item.item.igxe.current_price}</Text>
                  <Flex justify="space-around">
                    {item.item.igxe ? (
                      <Flex direction="column" w="40px">
                        <Text lineHeight="1" fontSize="8">
                          igxe
                        </Text>
                        <a href={"https://www.igxe.cn" + item.item.igxe.href}>
                          <Image
                            my="1"
                            w="5"
                            src="/igxe.png"
                            mx="auto"
                            borderRadius="5"
                          />
                        </a>

                        <Text lineHeight="1" fontSize="8">
                          {item.item.igxe.num}件
                        </Text>
                      </Flex>
                    ) : null}
                    {item.item.c5game ? (
                      <Flex direction="column" w="42px">
                        <Text lineHeight="1" fontSize="8">
                          c5
                        </Text>
                        <a
                          href={
                            "https://www.c5game.com" + item.item.c5game.href
                          }
                        >
                          <Image
                            my="1"
                            w="5"
                            src="/c5.jpg"
                            mx="auto"
                            borderRadius="5"
                          />
                        </a>
                        <Text lineHeight="1" fontSize="8">
                          {item.item.c5game.num}件
                        </Text>
                      </Flex>
                    ) : null}
                    {item.item.steam ? (
                      <Flex direction="column" w="40px">
                        <Text lineHeight="1" fontSize="8">
                          steam
                        </Text>
                        <a href={item.item.steam.href.substring(6)}>
                          <Image
                            my="1"
                            w="5"
                            src="/steam.png"
                            mx="auto"
                            borderRadius="5"
                          />
                        </a>
                        <Text lineHeight="1" fontSize="8">
                          {item.item.steam.num}件
                        </Text>
                      </Flex>
                    ) : null}
                  </Flex>
                </Box>
              ))}
          </Flex>
        </div>
      </Box>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.siteurl}/api/items`);
  const data = await res.json();

  return {
    props: { items_origin: data }, // will be passed to the page component as props
  };
}
