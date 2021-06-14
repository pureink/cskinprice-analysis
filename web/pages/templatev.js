import { VictoryChart, VictoryBoxPlot } from "victory";
import { Box, Flex,Text } from "@chakra-ui/react";
import { QuestionIcon } from "@chakra-ui/icons";
export default function Templ() {
  return (
    <>
      {/* <Box
        w="100%"
        borderRadius="5"
        borderWidth="1px"
        h="60px"
        position="fixed"
        bg="white"
        zIndex="10"
        bg="white"
        fontSize="20px"
      >
        csgo data analysis
      </Box> */}
      <Flex justify="space-around">
        <Box
          w="18%"
          borderRadius="5"
          borderWidth="1px"
          // mt="70px"
          bg="white"
          p="10px"
          color="black"
        >
          <Box>
            <Text fontSize="20px">csgo data analysis</Text>
            <Box
            p="10px"
              _hover={{
                background: "gray.200",
                color: "black",
              }}
            >
              <QuestionIcon mx="10px"/>
              <a href="/templatev">templatev</a>
            </Box>
            <Box
            p="10px"
              _hover={{
                background: "gray.200",
                color: "black",
              }}
            >
              <QuestionIcon mx="10px"/>
              <a href="/templatev">templatev</a>
            </Box>
            <Box
            p="10px"
              _hover={{
                background: "gray.200",
                color: "black",
              }}
            >
              <QuestionIcon mx="10px"/>
              <a href="/templatev">templatev</a>
            </Box>
          </Box>
        </Box>
        <Box
          w="78%"
          borderRadius="5"
          borderWidth="1px"
          h="100vh"
          // mt="70px"
          bg="white"
          overflow="auto"
        >
          <Flex wrap="wrap" justify="space-around">
            <Box
              w="40%"
              bg="white"
              m="2"
              boxShadow="lg"
              borderRadius="5"
              borderWidth="1px"
              
            >
              <VictoryChart domainPadding={20}>
                <VictoryBoxPlot
                  boxWidth={20}
                  data={[
                    { x: 1, y: [1, 2, 3, 5] },
                    { x: 2, y: [3, 2, 8, 10] },
                    { x: 3, y: [2, 8, 6, 5] },
                    { x: 4, y: [1, 3, 2, 9] },
                  ]}
                />
              </VictoryChart>
            </Box>{" "}
            <Box
              w="40%"
              bg="white"
              m="2"
              boxShadow="lg"
              borderRadius="5"
              borderWidth="1px"
            >
              <VictoryChart domainPadding={20}>
                <VictoryBoxPlot
                  boxWidth={20}
                  data={[
                    { x: 1, y: [1, 2, 3, 5] },
                    { x: 2, y: [3, 2, 8, 10] },
                    { x: 3, y: [2, 8, 6, 5] },
                    { x: 4, y: [1, 3, 2, 9] },
                  ]}
                />
              </VictoryChart>
            </Box>{" "}
            <Box
              w="40%"
              bg="white"
              m="2"
              boxShadow="lg"
              borderRadius="5"
              borderWidth="1px"
            >
              <VictoryChart domainPadding={20}>
                <VictoryBoxPlot
                  boxWidth={20}
                  data={[
                    { x: 1, y: [1, 2, 3, 5] },
                    { x: 2, y: [3, 2, 8, 10] },
                    { x: 3, y: [2, 8, 6, 5] },
                    { x: 4, y: [1, 3, 2, 9] },
                  ]}
                />
              </VictoryChart>
            </Box>{" "}
            <Box
              w="40%"
              bg="white"
              m="2"
              boxShadow="lg"
              borderRadius="5"
              borderWidth="1px"
            >
              <VictoryChart domainPadding={20}>
                <VictoryBoxPlot
                  boxWidth={20}
                  data={[
                    { x: 1, y: [1, 2, 3, 5] },
                    { x: 2, y: [3, 2, 8, 10] },
                    { x: 3, y: [2, 8, 6, 5] },
                    { x: 4, y: [1, 3, 2, 9] },
                  ]}
                />
              </VictoryChart>
            </Box>
            <Box
              w="40%"
              bg="white"
              m="2"
              boxShadow="lg"
              borderRadius="5"
              borderWidth="1px"
            >
              <VictoryChart domainPadding={20}>
                <VictoryBoxPlot
                  boxWidth={20}
                  data={[
                    { x: 1, y: [1, 2, 3, 5] },
                    { x: 2, y: [3, 2, 8, 10] },
                    { x: 3, y: [2, 8, 6, 5] },
                    { x: 4, y: [1, 3, 2, 9] },
                  ]}
                />
              </VictoryChart>
            </Box>{" "}
            <Box
              w="40%"
              bg="white"
              m="2"
              boxShadow="lg"
              borderRadius="5"
              borderWidth="1px"
            >
              <VictoryChart domainPadding={20}>
                <VictoryBoxPlot
                  boxWidth={20}
                  data={[
                    { x: 1, y: [1, 2, 3, 5] },
                    { x: 2, y: [3, 2, 8, 10] },
                    { x: 3, y: [2, 8, 6, 5] },
                    { x: 4, y: [1, 3, 2, 9] },
                  ]}
                />
              </VictoryChart>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </>
  );
}
