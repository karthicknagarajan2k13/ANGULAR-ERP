(function ()
{
    'use strict';

    angular
        .module('app.hr')
        .controller('ReportPayrollsController', ReportPayrollsController);

    /** @ngInject */
    function ReportPayrollsController($window, hrApi, $scope, $state, Statuses, Orders)
    {

        var vm = this;

        // Data
        vm.search_data = {}
        var dataPromise = hrApi.getReportPayrolls({});
        dataPromise.then(function(result) { 
            $scope.payrolls_data = result;
            $scope.table_data = [[ 'ID', 'Subject', 'Employee', 'Base Pay', 'Allowances', 'Deductions', 'Expenses', 'Tax', 'Total', 'Date' ]]
            angular.forEach($scope.payrolls_data, function(value, key) {
                $scope.table_data.push([
                    value.code,
                    value.subject,
                    value.employee,
                    value.base_pay,
                    value.allowances,
                    value.deductions,
                    value.expenses,
                    value.tax,
                    value.total,
                    value.created_at,
                ]);
            });
        });
        var dataPromise = hrApi.get_employees({});
        dataPromise.then(function(result) { 
            $scope.get_employees = result;
            console.log($scope.get_employees)
        });

        vm.pdfPayrollData = function(){
            var docDefinition = {
              content: [
                {
                  table: {
                    headerRows: 1,
                    widths: [ 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto' ],
                    body: $scope.table_data
                  }
                }
              ]
            };            
            pdfMake.createPdf(docDefinition).open();
        }

        vm.orders = Orders.data;
        vm.statuses = Statuses.data;
        vm.dtInstance = {};
        vm.dtOptions = {
            dom         : 'rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
            columnDefs  : [
                {
                    // Target the id column
                    targets: 0,
                    width  : '10px'
                }
            ],
            initComplete: function ()
            {
                var api = this.api(),
                    searchBox = angular.element('body').find('#e-commerce-products-search');

                // Bind an external input as a table wide search box
                if ( searchBox.length > 0 )
                {
                    searchBox.on('keyup', function (event)
                    {
                        api.search(event.target.value).draw();
                    });
                }
            },
            pagingType  : 'simple',
            lengthMenu  : [10, 20, 30, 50, 100],
            pageLength  : 20,
            scrollY     : 'auto',
            responsive  : true
        };

        vm.searchPayrollData = function(id){
            var dataPromise = hrApi.getReportPayrolls(vm.search_data);
            dataPromise.then(function(result) { 
                $scope.payrolls_data = result; 
            }); 
        }
        vm.searchPayrollDataClear = function(id){
            vm.search_data = {}
        }
	
    }
})();