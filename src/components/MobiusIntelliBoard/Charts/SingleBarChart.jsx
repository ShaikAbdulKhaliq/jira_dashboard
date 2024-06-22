import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const SingleBarChart = ({ id, data, colors, filter }) => {
    useEffect(() => {
        const chartDom = document.getElementById(id);
        if (!chartDom) {
            console.error(`DOM element with id '${id}' not found.`);
            return;
        }

        const myChart = echarts.init(chartDom);
        var option;

        const grid = {
            left: 75,
            right: 10,
            top: 40,
            bottom: 20
        };

        const series = data.map(({ name, value }, index) => ({
            name,
            type: 'bar',
            stack: 'total',
            barWidth: '40%',
            label: {
                show: true,
                formatter: (params) => Math.round(params.value * 10) / 10,
                fontSize: 8
            },
            itemStyle: {
                color: colors[index],
                shadowBlur: 15,
                shadowColor: '#0c0c0c',
                shadowOffsetX: 5,
                shadowOffsetY: 8

            },
            data: [value],
            color: "white" // Wrap value in an array
        }));

        option = {
            legend: {
                top: 10,
                left: 10,
                selectedMode: true,
                itemGap: 25,
                textStyle: {
                    color: "white",
                    fontSize: 9 // Adjust the font size of the legend text
                },
                icon: 'circle',
                itemWidth: 10, // Adjust the width of the legend item
                itemHeight: 10, // Adjust the height of the legend item
            },
            tooltip: {
                trigger: 'item',
                textStyle: {
                    color: "white"
                },
                backgroundColor: '#1e1e1e', // Set background color to black with opacity
                extraCssText: 'box-shadow:2px 4px 10px 10px #171616', // Add box shadow
                // position: [0, 150],
                formatter: (params) => {
                    const colorDot = `<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;background-color:${params.color};"></span>`;
                    return `${colorDot}${params.name} : ${params.value} `;
                }
            },

            grid,
            xAxis: {
                type: 'value',
                show: false
            },
            yAxis: {
                type: 'category',
                data: ['Story Points'],
                axisLabel: {
                    color: 'white', // Change the color of the yAxis label here
                    fontSize: 8// Other axis label properties can also be set here
                }
            },
            series
        };

        option && myChart.setOption(option);
        // console.log('Colors:', colors);
        // console.log('Series:', series);
        return () => {
            myChart.dispose();
        };
    }, [id, data]);

    return (
        <div id={id} style={{ width: "100%", height: "80%" }}></div>
    );
};

export default SingleBarChart;
