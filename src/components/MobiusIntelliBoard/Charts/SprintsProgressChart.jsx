import React, { useContext, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { SrdpContext } from '../Context/SrdpContext';
import { useNavigate } from 'react-router-dom';
import { MainContext } from '../../../MainContext/MainContext';

const SprintsProgressChart = ({ id }) => {
    const { setSelectedSprintFromSummary, setSelectedSprint, filterSprintBarChart, searchValue } = useContext(SrdpContext);
    const { darkMode, sprintBarChart, selectedBoardSprint } = useContext(MainContext)

    const navigate = useNavigate();
    const intervalRef = useRef(null);

    let filteredData = sprintBarChart.filter((sprint) =>
        sprint.sprintName.toLowerCase().includes(searchValue.toLowerCase())
    ).filter((item) => (
        item.workDone >= filterSprintBarChart.greaterThan && item.workDone <= filterSprintBarChart.lessThan
    ));

    useEffect(() => {
        const chartDom = document.getElementById(id);
        if (!chartDom) {
            console.error(`DOM element with id '${id}' not found.`);
            return;
        }

        const myChart = echarts.init(chartDom);

        const option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                },
            },
            grid: {
                top: 10,
                bottom: 20,
                left: 140,
                right: 20,
            },
            xAxis: {
                max: 100,
                axisLabel: {
                    formatter: '{value}%',
                },
                splitLine: {
                    show: false,
                },
            },
            yAxis: {
                type: 'category',
                axisLabel: {
                    show: true,
                    fontSize: 9,
                    position: 'left',
                    color: `${darkMode ? "white" : "#0F1A28"}`,
                    formatter: function (value) {
                        const maxCharactersPerLine = 15;
                        if (value.length > maxCharactersPerLine) {
                            return value.substring(0, maxCharactersPerLine) + '...';
                        } else {
                            return value;
                        }
                    },
                },
                animationDuration: 300,
                animationDurationUpdate: 300,
                data: filteredData.map((item) => item.sprintName),
            },
            series: [
                {
                    name: 'Percentage of Work Done',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true,
                        position: 'insideLeft',
                        formatter: '{c}%',
                        fontSize: 8,
                    },
                    emphasis: {
                        focus: 'series',
                    },
                    data: filteredData.map(item => ({
                        value: item.percentageOfWork,
                        name: item.sprintName,
                        itemStyle: {
                            color: (item.workDone >= 0 && item.workDone <= 20) ? `${darkMode ? "#28801a" : "#64ff27"}` : (item.workDone >= 21 && item.workDone <= 30) ? `${darkMode ? '#bea130' : "#ffd52c"}` : (item.workDone >= 31) ? `${darkMode ? '#630606' : "#e23b3b"}` : `${darkMode ? '#bb86fc' : "#ce79ff"}`,
                        },
                    })),
                },
                {
                    name: 'Percentage of Work In Progress',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true,
                        position: 'insideRight',
                        formatter: '{c}%',
                        fontSize: 8,
                    },
                    emphasis: {
                        focus: 'series',
                    },
                    data: filteredData.map(item => ({
                        value: item.percentageOfWork_in_progress,
                        name: item.sprintName,
                        itemStyle: {
                            color: `${darkMode ? '#4291ff' : "#6ec3ff"}`,
                        },
                    })),
                },
                {
                    name: 'Percentage of Time Elapsed',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true,
                        position: 'insideRight',
                        formatter: '{c}%',
                        fontSize: 8,
                    },
                    emphasis: {
                        focus: 'series',
                    },
                    data: filteredData.map(item => ({
                        value: item.percentageOfTimeElapsed,
                        name: item.sprintName,
                        itemStyle: {
                            color: `${darkMode ? '#515151' : "#c3c3c3"}`,
                        },
                    })),
                },
            ],
            barGap: '200%',
            barCategoryGap: '20%',
            animationDuration: 0,
        };

        myChart.setOption(option);

        if (selectedBoardSprint) {
            // console.log(selectedBoardSprint, "selectedBoardSprint from chart");
            const index = filteredData.findIndex(item => item.sprintName === selectedBoardSprint);
            // console.log(index, "index of selectedBoardSprint");

            if (index !== -1) {
                // Reorder the data to place the selected item at the top
                const selectedItem = filteredData.splice(index, 1)[0];
                filteredData = [...filteredData, selectedItem];
                const newIndex = filteredData.findIndex(item => item.sprintName === selectedBoardSprint);
                if (index) {
                    myChart.dispatchAction({
                        type: 'downplay',
                        seriesIndex: 0,
                        dataIndex: newIndex - 1,
                    });
                    myChart.dispatchAction({
                        type: 'highlight',
                        seriesIndex: 0,
                        dataIndex: newIndex,
                    });
                    myChart.dispatchAction({
                        type: 'showTip',
                        seriesIndex: 0,
                        dataIndex: newIndex,
                    });
                }

                myChart.setOption({
                    yAxis: {
                        data: filteredData.map(item => item.sprintName),
                    },
                    series: [
                        {
                            data: filteredData.map(item => ({
                                value: item.percentageOfWork,
                                name: item.sprintName,
                                itemStyle: {
                                    color: (item.workDone >= 0 && item.workDone <= 20) ? `${darkMode ? "#28801a" : "#64ff27"}` : (item.workDone >= 21 && item.workDone <= 30) ? `${darkMode ? '#bea130' : "#ffd52c"}` : (item.workDone >= 31) ? `${darkMode ? '#630606' : "#e23b3b"}` : `${darkMode ? '#bb86fc' : "#ce79ff"}`,
                                },
                            })),
                        },
                        {
                            data: filteredData.map(item => ({
                                value: item.percentageOfWork_in_progress,
                                name: item.sprintName,
                                itemStyle: {
                                    color: `${darkMode ? '#4291ff' : "#6ec3ff"}`,
                                },
                            })),
                        },
                        {
                            data: filteredData.map(item => ({
                                value: item.percentageOfTimeElapsed,
                                name: item.sprintName,
                                itemStyle: {
                                    color: `${darkMode ? '#515151' : "#c3c3c3"}`,
                                },
                            })),
                        },
                    ],
                });
            } else {
                console.error(`Sprint "${selectedBoardSprint}" not found in filteredData.`);
            }
        }

        myChart.on('click', (params) => {
            if (params.seriesType === 'bar') {
                const selectedItem = filteredData[params.dataIndex];
                const boardId = selectedItem.boardId;
                const boardName = selectedItem.boardName;
                const sprintName = selectedItem.sprintName.split('-')[0].trim();
                const sprintId = selectedItem.sprintId;

                if (boardId && boardName) {
                    setSelectedSprintFromSummary(sprintId);
                    setSelectedSprint(sprintName);
                    navigate(`/mobiusIntelliBoard/BoardSummary/${boardId}/${boardName}`);
                } else {
                    console.error('boardId or boardName is undefined.');
                }
            }
        });

        return () => {
            clearInterval(intervalRef.current);
            myChart.dispose();
        };
    }, [id, sprintBarChart, filterSprintBarChart, searchValue, darkMode, selectedBoardSprint]);

    return (
        <div id={id} style={{
            width: "100%",
            height: `${filteredData.length === 1 ? "10vh" :
                filteredData.length === 2 ? "20vh" :
                    filteredData.length === 3 ? "25vh" :
                        filteredData.length === 4 ? "35vh" :
                            (filteredData.length > 4 && filteredData.length < 6) ? "40vh" :
                                (filteredData.length > 6 && filteredData.length < 8) ? "55vh" :
                                    (filteredData.length > 8 && filteredData.length < 10) ? "65vh" :
                                        (filteredData.length > 10 && filteredData.length < 13) ? "75vh" :
                                            (filteredData.length > 12 && filteredData.length < 15) ? "85vh" :
                                                (filteredData.length > 14 && filteredData.length < 18) ? "95vh" :
                                                    (filteredData.length > 17 && filteredData.length < 21) ? "105vh" :
                                                        (filteredData.length > 20 && filteredData.length < 23) ? "115vh" :
                                                            (filteredData.length > 22 && filteredData.length < 26) ? "125vh" :
                                                                (filteredData.length > 25 && filteredData.length < 29) ? "135vh" :
                                                                    (filteredData.length > 28 && filteredData.length < 35) ? "150vh" : "400vh"}`
        }}></div>
    );
};

export default SprintsProgressChart;
