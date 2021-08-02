/**
 *
 * Project_name: a-datav
 * Company: aleiye
 * Author: yulucui
 * Date: Created in 2020/9/28.
 * Description:
 * Modified By:
 */
const themes = {
    default: {
        name: '默认',
        bgColor: '#fff',
        value: () => {
            return {
                "color": ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3']
            }
        },
        antv: () => {
            let components = getAntvComponents('#000')
            return {
                "colors10": ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
                components
            }
        }
    },
    dark: {
        name: '黑夜',
        bgColor: '#000',
        value: () => {
            var contrastColor = '#eee';
            var axisCommon = function () {
                return {
                    axisLine: {
                        lineStyle: {
                            color: contrastColor
                        }
                    },
                    axisTick: {
                        lineStyle: {
                            color: contrastColor
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: contrastColor
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            type: 'dashed',
                            color: '#aaa'
                        }
                    },
                    splitArea: {
                        areaStyle: {
                            color: contrastColor
                        }
                    }
                };
            };

            var colorPalette = ['#dd6b66','#759aa0','#e69d87','#8dc1a9','#ea7e53','#eedd78','#73a373','#73b9bc','#7289ab', '#91ca8c','#f49f42'];
            var theme = {
                color: colorPalette,
                // backgroundColor: '#333',
                label: {
                    color: contrastColor
                },
                tooltip: {
                    axisPointer: {
                        lineStyle: {
                            color: contrastColor
                        },
                        crossStyle: {
                            color: contrastColor
                        }
                    }
                },
                legend: {
                    textStyle: {
                        color: contrastColor
                    }
                },
                textStyle: {
                    color: contrastColor
                },
                title: {
                    textStyle: {
                        color: contrastColor
                    }
                },
                toolbox: {
                    iconStyle: {
                        normal: {
                            borderColor: contrastColor
                        }
                    }
                },
                dataZoom: {
                    textStyle: {
                        color: contrastColor
                    }
                },
                timeline: {
                    lineStyle: {
                        color: contrastColor
                    },
                    itemStyle: {
                        normal: {
                            color: colorPalette[1]
                        }
                    },
                    label: {
                        normal: {
                            textStyle: {
                                color: contrastColor
                            }
                        }
                    },
                    controlStyle: {
                        normal: {
                            color: contrastColor,
                            borderColor: contrastColor
                        }
                    }
                },
                timeAxis: axisCommon(),
                logAxis: axisCommon(),
                valueAxis: axisCommon(),
                categoryAxis: axisCommon(),

                line: {
                    symbol: 'circle'
                },
                graph: {
                    color: colorPalette
                },
                gauge: {
                    title: {
                        textStyle: {
                            color: contrastColor
                        }
                    }
                },
                candlestick: {
                    itemStyle: {
                        normal: {
                            color: '#FD1050',
                            color0: '#0CF49B',
                            borderColor: '#FD1050',
                            borderColor0: '#0CF49B'
                        }
                    }
                }
            };
            theme.categoryAxis.splitLine.show = false;
            return theme
        },
        antv: () => {
            let components = getAntvComponents('#fff')
            return {
                "colors10": ['#dd6b66','#759aa0','#e69d87','#8dc1a9','#ea7e53','#eedd78','#73a373','#73b9bc','#7289ab', '#91ca8c','#f49f42'],
                components
            }
        }
    },
    vintage:{
        name: '复古',
        bgColor: '#fef8ef',
        value: () => {
            var colorPalette = ['#d87c7c','#919e8b', '#d7ab82',  '#6e7074','#61a0a8','#efa18d', '#787464', '#cc7e63', '#724e58', '#4b565b'];
            var theme = {
                color: colorPalette,
                // backgroundColor: '#fef8ef',
                graph: {
                    color: colorPalette
                }
            }
            return theme
        },
        antv: () => {
            let components = getAntvComponents('#000')
            return {
                "colors10": ['#d87c7c','#919e8b', '#d7ab82',  '#6e7074','#61a0a8','#efa18d', '#787464', '#cc7e63', '#724e58', '#4b565b'],
                components
            }
        }
    },
    infographic:{
        name: '信息图',
        // bgColor: '',
        value: () => {
            var colorPalette = [
                '#C1232B','#27727B','#FCCE10','#E87C25','#B5C334',
                '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD'
            ];

            var theme = {

                color: colorPalette,

                title: {
                    textStyle: {
                        fontWeight: 'normal',
                        color: '#27727B'
                    }
                },

                visualMap: {
                    color:['#C1232B','#FCCE10']
                },

                toolbox: {
                    iconStyle: {
                        normal: {
                            borderColor: colorPalette[0]
                        }
                    }
                },

                tooltip: {
                    backgroundColor: 'rgba(50,50,50,0.5)',
                    axisPointer : {
                        type : 'line',
                        lineStyle : {
                            color: '#27727B',
                            type: 'dashed'
                        },
                        crossStyle: {
                            color: '#27727B'
                        },
                        shadowStyle : {
                            color: 'rgba(200,200,200,0.3)'
                        }
                    }
                },

                dataZoom: {
                    dataBackgroundColor: 'rgba(181,195,52,0.3)',
                    fillerColor: 'rgba(181,195,52,0.2)',
                    handleColor: '#27727B'
                },

                categoryAxis: {
                    axisLine: {
                        lineStyle: {
                            color: '#27727B'
                        }
                    },
                    splitLine: {
                        show: false
                    }
                },

                valueAxis: {
                    axisLine: {
                        show: false
                    },
                    splitArea : {
                        show: false
                    },
                    splitLine: {
                        lineStyle: {
                            color: ['#ccc'],
                            type: 'dashed'
                        }
                    }
                },

                timeline: {
                    lineStyle: {
                        color: '#27727B'
                    },
                    controlStyle: {
                        normal: {
                            color: '#27727B',
                            borderColor: '#27727B'
                        }
                    },
                    symbol: 'emptyCircle',
                    symbolSize: 3
                },

                line: {
                    itemStyle: {
                        normal: {
                            borderWidth:2,
                            borderColor:'#fff',
                            lineStyle: {
                                width: 3
                            }
                        },
                        emphasis: {
                            borderWidth:0
                        }
                    },
                    symbol: 'circle',
                    symbolSize: 3.5
                },

                candlestick: {
                    itemStyle: {
                        normal: {
                            color: '#C1232B',
                            color0: '#B5C334',
                            lineStyle: {
                                width: 1,
                                color: '#C1232B',
                                color0: '#B5C334'
                            }
                        }
                    }
                },

                graph: {
                    color: colorPalette
                },

                map: {
                    label: {
                        normal: {
                            textStyle: {
                                color: '#C1232B'
                            }
                        },
                        emphasis: {
                            textStyle: {
                                color: 'rgb(100,0,0)'
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            areaColor: '#ddd',
                            borderColor: '#eee'
                        },
                        emphasis: {
                            areaColor: '#fe994e'
                        }
                    }
                },

                gauge: {
                    axisLine: {
                        lineStyle: {
                            color: [[0.2, '#B5C334'],[0.8, '#27727B'],[1, '#C1232B']]
                        }
                    },
                    axisTick: {
                        splitNumber: 2,
                        length: 5,
                        lineStyle: {
                            color: '#fff'
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    splitLine: {
                        length: '5%',
                        lineStyle: {
                            color: '#fff'
                        }
                    },
                    title : {
                        offsetCenter: [0, -20]
                    }
                }
            };
            return theme
        },
        antv: () => {
            let components = getAntvComponents('#fff')
            return {
                "colors10": ['#C1232B','#27727B','#FCCE10','#E87C25','#B5C334', '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD'],
                components
            }
        }
    },
    roma:{
        name: '罗马',
        value: () => {
            var colorPalette = ['#E01F54','#001852','#f5e8c8','#b8d2c7','#c6b38e',
                '#a4d8c2','#f3d999','#d3758f','#dcc392','#2e4783',
                '#82b6e9','#ff6347','#a092f1','#0a915d'
            ];

            var theme = {
                color: colorPalette,

                visualMap: {
                    color:['#e01f54','#e7dbc3'],
                    textStyle: {
                        color: '#333'
                    }
                },

                candlestick: {
                    itemStyle: {
                        normal: {
                            color: '#e01f54',
                            color0: '#001852',
                            lineStyle: {
                                width: 1,
                                color: '#f5e8c8',
                                color0: '#b8d2c7'
                            }
                        }
                    }
                },

                graph: {
                    color: colorPalette
                },

                gauge : {
                    axisLine: {
                        lineStyle: {
                            color: [[0.2, '#E01F54'],[0.8, '#b8d2c7'],[1, '#001852']],
                            width: 8
                        }
                    }
                }
            };
            return theme
        },
        antv: () => {
            let axis = {label: {style: {fill: '#000'}}}
            return {
                "colors10": ['#E01F54','#001852','#f5e8c8','#b8d2c7','#c6b38e', '#a4d8c2','#f3d999','#d3758f','#dcc392','#2e4783'],
                components: {axis: {top: axis,bottom: axis,left: axis,right: axis,}}
            }
        }
    },
    macarons:{
        name: '马卡龙',
        value: () => {
            var colorPalette = [
                '#2ec7c9','#b6a2de','#5ab1ef','#ffb980','#d87a80',
                '#8d98b3','#e5cf0d','#97b552','#95706d','#dc69aa',
                '#07a2a4','#9a7fd1','#588dd5','#f5994e'
            ];


            var theme = {
                color: colorPalette,

                title: {
                    textStyle: {
                        fontWeight: 'normal',
                        color: '#008acd'
                    }
                },

                visualMap: {
                    itemWidth: 15,
                    color: ['#5ab1ef','#e0ffff']
                },

                toolbox: {
                    iconStyle: {
                        normal: {
                            borderColor: colorPalette[0]
                        }
                    }
                },

                tooltip: {
                    backgroundColor: 'rgba(50,50,50,0.5)',
                    axisPointer : {
                        type : 'line',
                        lineStyle : {
                            color: '#008acd'
                        },
                        crossStyle: {
                            color: '#008acd'
                        },
                        shadowStyle : {
                            color: 'rgba(200,200,200,0.2)'
                        }
                    }
                },

                dataZoom: {
                    dataBackgroundColor: '#efefff',
                    fillerColor: 'rgba(182,162,222,0.2)',
                    handleColor: '#008acd'
                },

                grid: {
                    borderColor: '#eee'
                },

                categoryAxis: {
                    axisLine: {
                        lineStyle: {
                            color: '#008acd'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: ['#eee']
                        }
                    }
                },

                valueAxis: {
                    axisLine: {
                        lineStyle: {
                            color: '#008acd'
                        }
                    },
                    splitArea : {
                        show : true,
                        areaStyle : {
                            color: ['rgba(250,250,250,0.1)','rgba(200,200,200,0.1)']
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: ['#eee']
                        }
                    }
                },

                timeline : {
                    lineStyle : {
                        color : '#008acd'
                    },
                    controlStyle : {
                        normal : { color : '#008acd'},
                        emphasis : { color : '#008acd'}
                    },
                    symbol : 'emptyCircle',
                    symbolSize : 3
                },

                line: {
                    smooth : true,
                    symbol: 'emptyCircle',
                    symbolSize: 3
                },

                candlestick: {
                    itemStyle: {
                        normal: {
                            color: '#d87a80',
                            color0: '#2ec7c9',
                            lineStyle: {
                                color: '#d87a80',
                                color0: '#2ec7c9'
                            }
                        }
                    }
                },

                scatter: {
                    symbol: 'circle',
                    symbolSize: 4
                },

                map: {
                    label: {
                        normal: {
                            textStyle: {
                                color: '#d87a80'
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderColor: '#eee',
                            areaColor: '#ddd'
                        },
                        emphasis: {
                            areaColor: '#fe994e'
                        }
                    }
                },

                graph: {
                    color: colorPalette
                },

                gauge : {
                    axisLine: {
                        lineStyle: {
                            color: [[0.2, '#2ec7c9'],[0.8, '#5ab1ef'],[1, '#d87a80']],
                            width: 10
                        }
                    },
                    axisTick: {
                        splitNumber: 10,
                        length :15,
                        lineStyle: {
                            color: 'auto'
                        }
                    },
                    splitLine: {
                        length :22,
                        lineStyle: {
                            color: 'auto'
                        }
                    },
                    pointer : {
                        width : 5
                    }
                }
            };
            return theme
        },
        antv: () => {
            let components = getAntvComponents('#008acd')
            return {
                "colors10": ['#2ec7c9','#b6a2de','#5ab1ef','#ffb980','#d87a80', '#8d98b3','#e5cf0d','#97b552','#95706d','#dc69aa'],
                components
            }
        }
    }
}

function getAntvComponents(color) {
    let axis = {label: {style: {fill: color}}}
    let legend = {itemName: {style: {fill: color}}}
    return {
        axis: {top: axis,bottom: axis,left: axis,right: axis},
        legend: {top: legend,bottom: legend,left: legend,right: legend}
    }
}

export default themes