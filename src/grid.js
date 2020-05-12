let chart = echarts.init(document.getElementsByClassName('chart1')[0]);
chart.title = '标题001';
let option = {
    title: {
        text: chart.title,
        left: 'center',
        textStyle: {
            color: 'white',
            fontSize: 14
        }
    },
    backgroundColor: '#091C3D',
    // 缩放时间轴
    dataZoom: [{
        type: 'inside',
        start: 0,
        height: 16,
        end: 30,
        bottom: 4
    }, {
        bottom: 4,
        start: 0,
        height: 16,
        end: 30,
        handleSize: '80%',
        color: 'white',
        textStyle: {
            color: 'white'
        },
        handleStyle: {
            color: 'white',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 200, 0.9)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
        },
        fillerColor:"#69CBF2",
        borderColor: "#69CBF2",
    }],
    tooltip: { //提示框组件
        trigger: 'axis',
        formatter: '{b}<br />{a0}: {c0}',
        axisPointer: {
            type: 'shadow',
            label: {
                backgroundColor: '#6a7985'
            }
        },
        textStyle: {
            color: '#fff',
            fontStyle: 'normal',
            fontFamily: '微软雅黑',
            fontSize: 12,
        }
    },
    grid: {
        left: '5%',
        right: '15%',
        bottom: '20%',
        top:'25%',
    //	padding:'0 0 10 0',
        containLabel: true,
    },
    xAxis: [
        {
            type: 'category',
        //	boundaryGap: true,//坐标轴两边留白
            data: ['2020-01-01', '2020-01-02', '2020-01-03','2020-01-04','2020-01-05','2020-01-06','2020-01-07', '2020-01-08', '2020-01-09', '2020-01-10'],
            axisLabel: { //坐标轴刻度标签的相关设置。
        	interval: 0,//设置为 1，表示『隔一个标签显示一个标签』
            //	margin:15,
                textStyle: {
                    color: '#078ceb',
                    fontStyle: 'normal',
                    fontFamily: '微软雅黑',
                    fontSize: 10,
                },
                rotate:-10,
            },
            axisTick:{//坐标轴刻度相关设置。
                show: false,
            },
            axisLine:{//坐标轴轴线相关设置
                lineStyle:{
                    color:'#fff',
                    opacity:0.2
                }
            },
            splitLine: { //坐标轴在 grid 区域中的分隔线。
                show: false,
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            splitNumber: 5,
            axisLabel: {
                textStyle: {
                    color: '#a8aab0',
                    fontStyle: 'normal',
                    fontFamily: '微软雅黑',
                    fontSize: 12,
                }
            },
            axisLine:{
                show: false
            },
            axisTick:{
                show: false
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: ['#fff'],
                    opacity:0.06
                }
            }

        }
    ],
    series : [
        {
            name:'可用度',
            type:'bar',
            data:[8,5, 25, 30, 35, 55, 62, 45, 56, 67],
            barWidth: 10,
            barGap:0,//柱间距离
            itemStyle: {
                normal: {
                    show: true,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#69CBF2'
                    }, {
                        offset: 1,
                        color: '#69CBF2'
                    }]),
                    barBorderRadius: 50,
                    borderWidth: 0,
                }
            },
        }
    ]
};
chart.setOption(option);
chart.on('click', function(res){
    console.log(res.name);
    console.log(res.value);
    console.log(chart.title);
    // 显示弹框
    document.getElementsByClassName('alert-box')[0].style.visibility = 'visible';
})
// 点击其他区域隐藏弹框
document.getElementsByClassName('close')[0].onclick = function(){
    document.getElementsByClassName('alert-box')[0].style.visibility = 'hidden';
}
// 弹框
let alertChart = echarts.init(document.getElementsByClassName('alert')[0]);
alertChart.title = '弹窗';
let alertOption = {
    title: {
        text: alertChart.title,
        left: 'center',
        textStyle: {
            color: 'white',
            fontSize: 14
        }
    },
    backgroundColor: '#091C3D',
    tooltip: { //提示框组件
        trigger: 'axis',
        formatter: '{b}<br />{a0}: {c0}',
        axisPointer: {
            type: 'shadow',
            label: {
                backgroundColor: '#6a7985'
            }
        },
        textStyle: {
            color: '#fff',
            fontStyle: 'normal',
            fontFamily: '微软雅黑',
            fontSize: 12,
        }
    },
    grid: {
        left: '5%',
        right: '15%',
        bottom: '10%',
        top:'25%',
    //	padding:'0 0 10 0',
        containLabel: true,
    },
    xAxis: [
        {
            type: 'category',
        //	boundaryGap: true,//坐标轴两边留白
            data: ['2020-01-01', '2020-01-02', '2020-01-03','2020-01-04','2020-01-05','2020-01-06','2020-01-07'],
            axisLabel: { //坐标轴刻度标签的相关设置。
        	interval: 0,//设置为 1，表示『隔一个标签显示一个标签』
            //	margin:15,
                textStyle: {
                    color: '#078ceb',
                    fontStyle: 'normal',
                    fontFamily: '微软雅黑',
                    fontSize: 10,
                },
                rotate:-20,
            },
            axisTick:{//坐标轴刻度相关设置。
                show: false,
            },
            axisLine:{//坐标轴轴线相关设置
                lineStyle:{
                    color:'#fff',
                    opacity:0.2
                }
            },
            splitLine: { //坐标轴在 grid 区域中的分隔线。
                show: false,
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            splitNumber: 5,
            axisLabel: {
                textStyle: {
                    color: '#a8aab0',
                    fontStyle: 'normal',
                    fontFamily: '微软雅黑',
                    fontSize: 12,
                }
            },
            axisLine:{
                show: false
            },
            axisTick:{
                show: false
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: ['#fff'],
                    opacity:0.06
                }
            }

        }
    ],
    series : [
        {
            name:'可用度',
            type:'bar',
            data:[8,5, 25, 30, 35, 55, 62],
            barWidth: 10,
            barGap:0,//柱间距离
            itemStyle: {
                normal: {
                    show: true,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#69CBF2'
                    }, {
                        offset: 1,
                        color: '#69CBF2'
                    }]),
                    barBorderRadius: 50,
                    borderWidth: 0,
                }
            },
        }
    ]
};
alertChart.setOption(alertOption);