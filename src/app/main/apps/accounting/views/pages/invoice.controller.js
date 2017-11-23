(function ()
{
    'use strict';

    angular
        .module('app.accounting')
        .controller('InvoiceController', InvoiceController);

    /** @ngInject */
    function InvoiceController(accApi, $scope)
    {
        var vm = this;

        $scope.cash_flow_reports_data = {}

        var dataPromise = accApi.getCashFlowReports({});
        dataPromise.then(function(result) { 
            $scope.cash_flow_reports_data = result;
    		// bar chart
            vm.barChart = {
                data: {
                    labels: $scope.cash_flow_reports_data.months,
                    series: [
                        $scope.cash_flow_reports_data.flow,
    					$scope.cash_flow_reports_data.outflow
                    ]
                },
                options          : {
                    seriesBarDistance: 15
                },
                responsiveOptions: [
                    ['screen and (min-width: 641px) and (max-width: 1024px)', {
                        seriesBarDistance: 10,
                        axisX            : {
                            labelInterpolationFnc: function (value)
                            {
                                return value;
                            }
                        }
                    }],
                    ['screen and (max-width: 640px)', {
                        seriesBarDistance: 5,
                        axisX            : {
                            labelInterpolationFnc: function (value)
                            {
                                return value[0];
                            }
                        }
                    }]
                ]
            };
		
        }); 
    }
})();
