import { Box, Flex, Image } from "@chakra-ui/react";
import { Input, Text } from "@chakra-ui/react";
import Fuse from "fuse.js";
import useSWR from "swr";
import { useState } from "react";
//主页提供搜索功能，在mongodb中搜索，在列表中展示搜索到的物品id
//在连接到服务器时获取所有的物品列表，使用fuse.JS进行搜索
export default function Home(props) {
  const items_origin = props.items_origin;
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
      <Text textAlign="center" my="4">
        没想到吧，这里可以搜索奥🔍
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

                        <Text lineHeight="1" fontSize="2">
                          {item.item.igxe.num}件
                        </Text>
                      </Flex>
                    ) : null}
                    {item.item.c5game ? (
                      <Flex direction="column" w="42px">
                        <Text lineHeight="1" fontSize="8">
                          c5
                        </Text>
                        <a href={"https://www.c5game.com" + item.item.c5game.href}>
                          <Image
                            my="1"
                            w="5"
                            src="/c5.jpg"
                            mx="auto"
                            borderRadius="5"
                          />
                        </a>
                        <Text lineHeight="1" fontSize="2">
                          {item.item.c5game.num}件
                        </Text>
                      </Flex>
                    ) : null}
                    {item.item.steam ? (
                      <Flex direction="column" w="40px">
                        <Text lineHeight="1" fontSize="8">
                          steam
                        </Text>
                        <a href={ item.item.steam.href.substring(6)}>
                          <Image
                            my="1"
                            w="5"
                            src="/steam.png"
                            mx="auto"
                            borderRadius="5"
                          />
                        </a>
                        <Text lineHeight="1" fontSize="2">
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
