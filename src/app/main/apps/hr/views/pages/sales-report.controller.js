(function ()
{
    'use strict';

    angular
        .module('app.hr')
        .controller('SalesReportcontroller', SalesReportcontroller);

    /** @ngInject */
    function SalesReportcontroller(hrApi, $scope)
    {
        var vm = this;

        // Data
        vm.search_data = {}
        $scope.sales_data = {}
        vm.search_data.group = 'Day'

        vm.get_data = function(){
            var dataPromise = hrApi.getReportSales(vm.search_data);
            dataPromise.then(function(result) { 
                $scope.sales_data = result;
                console.log("$scope.sales_data",$scope.sales_data)
                $scope.myConfig = {
                    "background-color": "#f5f7ea",
                    "graphset": [
                        {
                            "type": "null",
                            "x": "2%",
                            "y": "3%",
                            "height": "25%",
                            "width": "31%",
                            "border-width": "1px",
                            "border-color": "#00bcff",
                            "border-radius": 4,
                            "background-color": "#fbfcf7",
                            "title": {
                                "text": "COUNT",
                                "background-color": "none",
                                "font-color": "#00bcff",
                                "font-size": "12px",
                                "text-align": "center",
                                "height": "70px"
                            },
                            "subtitle": {
                                "text": $scope.sales_data.count_heading,
                                "font-color": "#00bcff",
                                "font-size": "24px",
                                "bold": true,
                                "text-align": "center",
                                "height": "40px",
                                "padding-top": "25%"
                            }
                        },
                        {
                            "type": "null",
                            "x": "34.6%",
                            "y": "3%",
                            "height": "25%",
                            "width": "31%",
                            "border-width": "1px",
                            "border-color": "#0c1224",
                            "border-radius": 4,
                            "background-color": "#fbfcf7",
                            "title": {
                                "text": "REVENUE",
                                "background-color": "none",
                                "font-color": "#0c1224",
                                "font-size": "12px",
                                "text-align": "center",
                                "height": "70px"
                            },
                            "subtitle": {
                                "text": '$' + $scope.sales_data.revenue_heading.toFixed(2),
                                "font-color": "#0c1224",
                                "font-size": "24px",
                                "bold": true,
                                "text-align": "center",
                                "height": "40px",
                                "padding-top": "25%"
                            }
                        },
                        {
                            "type": "null",
                            "x": "67%",
                            "y": "3%",
                            "height": "25%",
                            "width": "31%",
                            "border-width": "1px",
                            "border-color": "#037ca7",
                            "border-radius": 4,
                            "background-color": "#fbfcf7",
                            "title": {
                                "text": "NET",
                                "font-color": "#037ca7",
                                "font-size": "12px",
                                "background-color": "none",
                                "text-align": "center",
                                "height": "70px"
                            },
                            "subtitle": {
                                "text": '$' + $scope.sales_data.revenue_heading.toFixed(2),
                                "font-color": "#037ca7",
                                "font-size": "24px",
                                "bold": true,
                                "text-align": "center",
                                "height": "40px",
                                "padding-top": "25%"
                            }
                        },
                        {
                            "type": "bar",
                            "x": "2%",
                            "y": "30%",
                            "height": "68%",
                            "width": "96%",
                            "border-width": "1px",
                            "border-color": "#037ca7",
                            "border-radius": 4,
                            "background-color": "#fbfcf7",
                            "legend": {
                                "margin":"auto auto 10% auto",
                                "toggle-action": "remove",
                                "shadow": false,
                                "border-radius": 4,
                                "background-color": "#FFFFFF",
                                "border-color": "#FFFFFF",
                                "layout": "float"
                            },
                            "plotarea": {
                                "margin": "45 40 90 60"
                            },
                            "scale-x": {
                                "values": $scope.sales_data.title,
                                "line-color": "#b0aaab",
                                "line-width": 1,
                                "guide": {
                                    "visible": false
                                },
                                "item": {
                                    "font-color": "#037ca7"
                                },
                                "tick": {
                                    "visible": false
                                }
                            },
                            "scale-y": {
                                "line-color": "#FFFFFF",
                                "line-width": 1,
                                "guide": {
                                    "visible": true,
                                    "line-style": "solid"
                                },
                                "item": {
                                    "padding-right": "5%",
                                    "font-color": "#037ca7"
                                },
                                "tick": {
                                    "visible": false
                                }
                            },
                            "series": [
                                {
                                    "values": $scope.sales_data.count,
                                    "background-color": "#00bcff",
                                    "text": "Count",
                                    "legend-marker": {
                                        "border-color": "#00bcff"
                                    }
                                },
                                {
                                    "values": $scope.sales_data.revenue,
                                    "background-color": "#0c1224",
                                    "text": "Revenue",
                                    "legend-marker": {
                                        "border-color": "#0c1224"
                                    }
                                },
                                {
                                    "values": $scope.sales_data.revenue,
                                    "background-color": "#037ca7",
                                    "text": "Net",
                                    "legend-marker": {
                                        "border-color": "#037ca7"
                                    }
                                }
                            ],
                            "tooltip": {
                                "text": "%v %k in %t",
                                "shadow": false,
                                "border-radius": 4
                            }
                        }
                    ]
                };
            });
        }
        vm.get_data();
        vm.changedFiltersValue =function(){
            vm.get_data();
        }
        vm.changedGroupValue =function(group){
            vm.search_data.group = group
            vm.get_data();
        }
        vm.changedDateValue = function(){
            if (vm.search_data.start_date && vm.search_data.end_date){
                vm.get_data();
            }
            
        }
    }
})();