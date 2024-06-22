import React, { useEffect } from 'react'
import * as echarts from 'echarts';

const SubtaskPieChart = React.memo(({ id, data }) => {
    useEffect(() => {
        const chartDom = document.getElementById(id);
        if (!chartDom) {
            console.error(`DOM element with id '${id}' not found.`);
            return;
        }
        const myChart = echarts.init(chartDom);
        var option;

        option = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: '5%',
                left: 'center'
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 40,
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: data
                }
            ]
        };
        option && myChart.setOption(option);

        return () => {
            myChart.dispose();
        };
    }, [id, data])

    return (
        <div id={id} style={{ width: "100%", height: "100%" }}>

        </div>
    )
});

export default SubtaskPieChart;
