(function ()
{
    'use strict';

    angular
        .module('app.accounting')
        .controller('InvoiceController', InvoiceController);

    /** @ngInject */
    function InvoiceController($scope, Invoice)
    {
        var vm = this;

        // Data
        vm.invoice = Invoice.data;
		
		

        // Methods

		// bar chart
        vm.barChart = {
            data             : {
                labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
                series: [
                    [5, 4, 3, 7, 5, 6, 3, 4, 2, 1, 6, 0],
					[2, 4, 3, 1, 0, 7, 3, 5, 6, 2, 2, 6],
                    [3, 2, 1, 5, 4, 6, 4, 6, 7, 3, 7, 4]
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
		
        //////////
    }
})();
