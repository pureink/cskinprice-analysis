import ReactEcharts from "echarts-for-react";
export default function Reactvis() {
  const option4 = {
    series: [
      {
        name: "",
        type: "pie",
        radius: [80, 200],
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
          { value: 33, name: "荒漠迷城" },
          { value: 28, name: "炙热沙城" },
          { value: 22, name: "核子危机" },
          { value: 20, name: "列车停放站" },
          { value: 15, name: "殒命大厦" },
          { value: 12, name: "死亡游乐园" },
          { value: 10, name: "死城之谜" },
        ],
      },
    ],
  };

  return (
    <ReactEcharts
      option={option4}
      style={{ width: "400px", height: "400px" }}
    />
  );
}
