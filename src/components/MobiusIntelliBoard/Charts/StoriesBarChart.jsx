import React, { useContext, useEffect } from 'react';
import * as echarts from 'echarts';
import { MainContext } from '../../../MainContext/MainContext';

const StoriesBarChart = ({ id, storiesBarChart }) => {
    // console.log(storiesBarChart, "storiesBarChart")
    const { darkMode } = useContext(MainContext)
    useEffect(() => {
        const chartDom = document.getElementById(id);
        if (!chartDom) {
            console.error(`DOM element with id '${id}' not found.`);
            return;
        }
        const myChart = echarts.init(chartDom);
        const grid = {
            left: 70,
            right: 10,
            top: 10,
            bottom: 10
        };

        const option = {
            tooltip: {
                trigger: 'item',
                textStyle: {
                    color: ` ${darkMode ? "white" : "black"}`
                },
                backgroundColor: ` ${darkMode ? "#000000" : "#fafafa"}`, // Set background color to black with opacity
                extraCssText: `box-shadow:2px 4px 10px 5px ${darkMode ? "#000000" : "d6d6d6"}`, // Add box shadow
                // position: [0, 150],
                formatter: (params) => {
                    const colorDot = `<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;background-color:${params.color};"></span>`;
                    return `${colorDot}${params.name} : ${params.value} % `;
                }
            },
            yAxis: {
                type: 'category',
                data: ['Work Done', 'Time Taken',], // Categories on Y-axis
                axisLabel: {
                    color: `${darkMode ? "white" : "black"}`, // Change the color of the yAxis label here
                    fontSize: 8
                }
            },
            xAxis: {
                type: 'value',
                show: false
            },
            grid,
            series: [

                {
                    name: 'Time Taken',
                    type: 'bar',
                    top: 0,
                    barWidth: '65%',
                    data: [null, storiesBarChart?.timeTaken], // Data for 'Time Taken' bar
                    itemStyle: {
                        color: ` ${darkMode ? "#4291ff" : "#6ec3ff"}`,
                        // shadowBlur: 15,
                        // shadowColor: `${darkMode ? '#0c0c0c' : "#d6d6d6"}`,
                        // shadowOffsetX: 5,
                        // shadowOffsetY: 8
                    },
                    label: {
                        show: true,
                        formatter: '{c} %', // Customize label to display days,
                        fontSize: 8
                    }
                },
                {
                    name: 'Work Done',
                    type: 'bar',
                    barWidth: '65%', // Adjust bar width as needed
                    data: [storiesBarChart?.workDone, null], // Data for 'Work Done' bar
                    itemStyle: {
                        color: `${(storiesBarChart?.differenceBetweenWork_Time >= 0 && storiesBarChart?.differenceBetweenWork_Time <= 20)
                            ? (darkMode ? "#28801a" : "#64ff27")
                            : (storiesBarChart?.differenceBetweenWork_Time > 20 && storiesBarChart?.differenceBetweenWork_Time <= 30)
                                ? (darkMode ? '#bea130' : '#ffd52c')
                                : (storiesBarChart?.differenceBetweenWork_Time > 30)
                                    ? (darkMode ? '#630606' : '#e23b3b')
                                    : (darkMode ? '#bb86fc' : '#ce79ff')
                            }`,
                        // shadowBlur: 15,
                        // shadowColor: `${darkMode ? '#0c0c0c' : "#d6d6d6"}`,
                        // shadowOffsetX: 5,
                        // shadowOffsetY: 8
                    },
                    label: {
                        show: true,
                        formatter: '{c} %', // Customize label to display percentage
                        fontSize: 8
                    }
                },


            ],
            barGap: '-100%',
            barCategoryGap: '50%'
        };



        option && myChart.setOption(option);

        return () => {
            myChart.dispose();
        };
    }, [id, storiesBarChart, darkMode]);

    return <div id={id} style={{ width: '100%', height: '75%' }}></div>;
};

export default StoriesBarChart;
