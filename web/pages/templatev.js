import { VictoryChart, VictoryBoxPlot } from "victory";
export default function Templ() {
  return (
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
  );
}
