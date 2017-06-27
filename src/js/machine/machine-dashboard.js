
(function () {
    'use strict';
    angular.module('app').controller('MachinedashboardCtrl', MachinedashboardCtrl);
    MachinedashboardCtrl.$inject = ['$rootScope', '$scope', 'MachineService'];
    function MachinedashboardCtrl($rootScope, $scope, machineService) {
        $scope.machine = {
            name: "机台管理",
        }
        machineService.machineList()
            .then(function (data) {
                $scope.data = data;
                $.each($scope.data, function (key, value) {
                    //data.machine[key].machineNumber;
                    console.log(value.machineNumber);
                    createCharts("machine-" + value.machineNumber, key, value.machineNumber, value)
                })
            })
            .finally(function () {
                $rootScope.loading = false;
            })
            ;

        setInterval(function () {
            //调用ajax获取开机率
            machineService.machineList()
                .then(function (data) {
                    $scope.data = data;
                })
                .finally(function () {
                    $rootScope.loading = false;
                });
        }, 10000);

        function createCharts(id, key, machineNumber, machineInfo) {
            var all = $("#all");
            var col_md = $("<div class='col-md-3'></div>");
            var chartDiv = $("<div style='width:400px;height:300px'></div>");
            chartDiv.attr('id', id);
            all.append(col_md);
            col_md.append(chartDiv);
            var machineNumberDiv = $("<div class='machineNumber'>" + machineNumber + "</div>");
            col_md.append(machineNumberDiv);
            var myChart = echarts.init(document.getElementById(id));
            var option = {
                tooltip: {
                    formatter: "{a} <br/>{b} : {c}%"
                },
                toolbox: {
                    feature: {
                        restore: {
                            show: false
                        },
                        saveAsImage: {
                            show: false
                        }
                    }
                },
                series: [
                    {
                        name: '机器运行指标',
                        type: 'gauge',
                        z: 3,
                        min: 0,
                        max: 100,
                        splitNumber: 10,
                        radius: '75%',
                        axisLine: {            // 坐标轴线
                            lineStyle: {       // 属性lineStyle控制线条样式
                                width: 10,
                                color:[[0.3, '#da0d08'], [0.7, '#e08d0c'], [1, '#01a058']]
                            }
                        },
                        axisTick: {            // 坐标轴小标记
                            length: 15,        // 属性length控制线长
                            lineStyle: {       // 属性lineStyle控制线条样式
                                color: 'auto'
                            }
                        },
                        splitLine: {           // 分隔线
                            length: 20,         // 属性length控制线长
                            lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                                color: 'auto'
                            }
                        },
                        title: {
                            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                fontWeight: 'bolder',
                                fontSize: 20
                            }
                        },
                        detail: {
                            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                fontWeight: 'bolder'
                            },
                            formatter: '{value}%'
                        },

                        data: [{ value: 50, name: '开机率' }]

                    }
                ]
            };
            setInterval(function () {
                //console.log($scope.data.machine[key].efficiency);
                var value = $scope.data[key].efficiency;
                option.series[0].data[0].value = value;
                myChart.setOption(option, true);
            }, 2000);
            return myChart;
        }
    }

})();
