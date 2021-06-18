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
import { Fade } from "react-awesome-reveal";
import { ExternalLinkIcon } from "@chakra-ui/icons";
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
export default function B5({ data }) {
  const matches = data.matches;
  const weapons = data.weapons;
  let mcs = [];
  let b5weapons = [];
  for (let i = 0; i < weapons.length; i++) {
    b5weapons.push(
      <Tr key={i}>
        <Td>
          <Image w="80px" h="50px" src={weapons[i].img}></Image>
        </Td>
        <Td>
          <Flex direction="row" justify="space-between">
            <Text>{weapons[i].weapon_name}</Text>
            <Text>{weapons[i].avg_kills}</Text>
          </Flex>
          <Progress value={weapons[i].percent} size="xs" colorScheme="purple" />
        </Td>
        <Td>{weapons[i].hd_rate}</Td>
        <Td>{weapons[i].kills}</Td>
      </Tr>
    );
  }
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
          <Text bg={matches[i].map_color}>{matches[i].map_name}</Text>
          <Text>{matches[i].class_name}</Text>
        </Td>
        <Td>
          <Text>{matches[i].rating}</Text>
          <Text color="gray.500">
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
    <Box
      w="100%"
      h="100vh"
      minH="600px"
      bg="rgb(19,20,36)"
      px="100px"
      pt="40px"
    >
      <Image src="/b5.png" w="210px" h="60px" mx="auto" mb="40px" />
      <Flex direction="row" justify="space-between">
        {" "}
          {" "}
          <Fade direction="left">
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
          </Fade>
          <Fade direction="right"><Table
          variant="simple"
          w="560px"
          bg="white"
          borderRadius="10px"
        >
          <Thead>
            <Tr>
              <Th>武器</Th>
              <Th>场均击杀</Th>
              <Th>爆头率</Th>
              <Th>击杀</Th>
            </Tr>
          </Thead>
          <Tbody>{b5weapons}</Tbody>
        </Table></Fade>
        
      </Flex>
    </Box>
  );
}
