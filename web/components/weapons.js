import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Image
} from "@chakra-ui/react";
export default function Weapons({data}) {
  var ths = [];
  for (var i = 0; i < data.length; i++) {
    ths.push(
      <Tr key={i}>
        <Td>{i+1}</Td>
        <Td><Image h="30px" w="100px" src={data[i].weaponImage}/></Td>
        <Td>{data[i].weaponName}</Td>
        <Td>{data[i].weaponKill}</Td>
        <Td>{Math.round(100*data[i].weaponHeadShot/data[i].weaponKill)}%</Td>
      </Tr>
    );
  }
  return (
    <Table borderRadius="5px" variant="simple" color="black" fontWeight="bold" >
      <TableCaption>常用武器</TableCaption>
      <Thead>
        <Tr color="white">
          <Th>Top</Th>
          <Th>武器</Th>
          <Th>名称</Th>
          <Th>杀敌数</Th>
          <Th>爆头率</Th>
        </Tr>
      </Thead>
      <Tbody>
        {ths}
      </Tbody>
    </Table>
  );
}
