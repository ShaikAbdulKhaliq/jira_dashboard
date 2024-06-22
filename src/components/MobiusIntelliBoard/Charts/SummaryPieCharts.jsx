import React, { useContext, useEffect } from 'react';
import * as echarts from 'echarts';
import { MainContext } from '../../../MainContext/MainContext';


const SummaryPieCharts = ({ id, sprintData, color, subTaskData, selectedBoardSprint }) => {
  // console.log(subTaskData, "data")
  const { darkMode } = useContext(MainContext)
  const transformDataForECharts = (sprintData) => {
    return sprintData?.map((item) => {
      const [name, value] = Object.entries(item)[0]; // Extract the key-value pair from each object
      return { name, value }; // Return the transformed data point
    });
  };


  const transformedData = transformDataForECharts(sprintData);// Pass your data array here
  // console.log(sprintData);
  // console.log(transformedData, "transformDataForECharts");
  useEffect(() => {
    const chartDom = document.getElementById(id);
    if (!chartDom) {
      console.error(`DOM element with id '${id}' not found.`);
      return;
    }

    const myChart = echarts.init(chartDom);
    var option;

    const colors = color ? color : ["#4285F4",
      "#FBBC05",
      "#34A853",
      "#EA4335",
      "#DA0C81"];
    const grid = {
      left: 0,
      right: 40,
      top: 100, // Adjust the top value to create a gap between the legend and the pie chart
      bottom: 10
    };
    option = {
      grid,
      tooltip: {
        trigger: 'item',
        textStyle: {
          color: "#000",
        },
        position: [30, 150],
        formatter: (params) => {
          const colorDot = `<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;background-color:${params.color};"></span>`;
          return `${colorDot}${params.name}<br/>Subtask Count: ${params.value} `;
        }
      },
      // legend: {
      //   top: '3%',
      //   left: '0%',
      //   position:"b",
      //   selectedMode: true,
      //   itemGap: 17,
      //   textStyle: {
      //     color: "white",
      //     fontSize: 10
      //   },
      //   icon: 'circle',
      //   itemWidth: 10, // Adjust the width of the legend item
      //   itemHeight: 10, // Adjust the height of the legend item
      // },
      series: [
        {
          top: '0%',
          name: '',
          type: 'pie',
          radius: ['30%', '60%'],
          center: ['50%', '50%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          labelLine: {
            show: true
          },
          data: subTaskData ? subTaskData : transformedData,
          label: {
            formatter: function (params) {
              return `{a|${params.name}}`;
              // 
            },
            rich: {
              a: {
                backgroundColor: `${!darkMode ? "#4291ff" : "#34ecf61d"}`,
                color: `${!darkMode ? "white" : "#4291ff"}`,
                fontSize: 8,
                padding: [4, 4, 3, 8], // Adjust padding values as needed
                textAlign: 'center', // Center text horizontally
                lineHeight: 20, // Adjust line height to vertically center text
                borderRadius: 4, // Add border radius for rounded corners
                width: '135%',

              }
            }
          },
          labelLine: {
            lineStyle: {
              color: '#84b8ff',
            },
            smooth: 0.2,
            length: 10,
            length2: 5,
            align: 'left', // Align the label line with the left edge of the label text
          },
          color: colors,
          itemStyle: {
            shadowBlur: 15,
            shadowColor: `${!darkMode ? "transparent" : "#0c0c0c"}`,
            shadowOffsetX: 5,
            shadowOffsetY: 8
          }
        }
      ]
    };

    option && myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, [id, darkMode, selectedBoardSprint]);

  return (
    <div id={id} style={{
      width: "100%", height: "100%", backgroundColor: `${!darkMode ? "#f1f6ff" : ""}`
      // border: ".1rem solid  #bb86fc1f", borderRadius: ".4rem", backgroundColor: "#141313 "
    }}>
    </div>
  );
};

export default SummaryPieCharts;
