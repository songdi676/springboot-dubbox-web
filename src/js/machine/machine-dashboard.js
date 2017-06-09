
(function () {
    'use strict';
    angular.module('app').controller('MachinedashboardCtrl', MachinedashboardCtrl);
    MachinedashboardCtrl.$inject = ['$rootScope', '$scope', 'MachineService'];
    function MachinedashboardCtrl($rootScope, $scope, machineService) {
        $scope.machine = {
            name: "机台管理",
            number: {

            }
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
        // $.ajax({
        //     type: "GET",
        //     url: APP_CONST.PROPERTY. API_URL + "/machine/monitor",
        //     dataType: "json",
        //     success: function (data) {
        //         //console.log(data.machine);
        //         $scope.data = data;
        //         $.each(data, function (key, value) {
        //             //data.machine[key].machineNumber;
        //             console.log(value.machineNumber);
        //             createCharts("machine-" + value.machineNumber, key, value.machineNumber, value)
        //         })
        //     }
        // })
        setInterval(function () {
            //调用ajax获取开机率
           machineService.machineList()
            .then(function (data) {
                $scope.data = data;
            })
            .finally(function () {
                $rootScope.loading = false;
            });
        }, 2000);

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
                        detail: { formatter: '{value}%' },
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
