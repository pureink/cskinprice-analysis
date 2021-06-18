import { VictoryChart, VictoryBoxPlot } from "victory";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
export default function Templ() {
  return (
    <>
      <Box className="s-layout">
        <div class="s-layout__sidebar">
          <a class="s-sidebar__trigger" href="#0">
            <Text color="purple" fontSize="30"><HamburgerIcon z-index="2"/></Text>
          </a>

          <nav class="s-sidebar__nav">
            <ul>
              <li>
                <a class="s-sidebar__nav-link" href="#0">
                  <i class="fa fa-home"></i>
                  <em>Home</em>
                </a>
              </li>
              <li>
                <a class="s-sidebar__nav-link" href="#0">
                  <i class="fa fa-user"></i>
                  <em>first section</em>
                </a>
              </li>
              <li>
                <a class="s-sidebar__nav-link" href="#0">
                  <i class="fa fa-camera"></i>
                  <em>second section</em>
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <Box
          borderRadius="5"
          borderWidth="1px"
          h="100vh"
          // mt="70px"
          overflow="auto"
          className="pattern-triangles-xl s-layout__content"
          color="rgb(233,238,243)"
          bgColor="white"
          pt="50px"
        >
          <Flex wrap="wrap" justify="space-around" h ="100%">
            <Box
              color="black"
              className="pattern-diagonal-lines-sm gray-light"
              w="600px"
              my="10px"
            >
              <Box
                bg="white"
                transform="translate(20px, -10px)"
                borderWidth="1px"
                borderColor="gray.200"
                borderRadius="5px"
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
            </Box>
            <Box
              color="black"
              className="pattern-diagonal-lines-sm gray-light"
              w="600px"
              my="10px"
            >
              <Box
                bg="white"
                transform="translate(20px, -10px)"
                borderWidth="1px"
                borderColor="gray.200"
                borderRadius="5px"
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
            </Box><Box
              color="black"
              className="pattern-diagonal-lines-sm gray-light"
              w="600px"
              my="10px"
            >
              <Box
                bg="white"
                transform="translate(20px, -10px)"
                borderWidth="1px"
                borderColor="gray.200"
                borderRadius="5px"
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
            </Box><Box
              color="black"
              className="pattern-diagonal-lines-sm gray-light"
              w="600px"
              my="10px"
            >
              <Box
                bg="white"
                transform="translate(20px, -10px)"
                borderWidth="1px"
                borderColor="gray.200"
                borderRadius="5px"
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
            </Box><Box
              color="black"
              className="pattern-diagonal-lines-sm gray-light"
              w="600px"
              my="10px"
            >
              <Box
                bg="white"
                transform="translate(20px, -10px)"
                borderWidth="1px"
                borderColor="gray.200"
                borderRadius="5px"
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
            </Box><Box
              color="black"
              className="pattern-diagonal-lines-sm gray-light"
              w="600px"
              my="10px"
            >
              <Box
                bg="white"
                transform="translate(20px, -10px)"
                borderWidth="1px"
                borderColor="gray.200"
                borderRadius="5px"
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
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
}
