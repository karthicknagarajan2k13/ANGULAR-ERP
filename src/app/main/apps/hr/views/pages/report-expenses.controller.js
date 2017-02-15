(function ()
{
    'use strict';

    angular
        .module('app.hr')
        .controller('ReportExpensesController', ReportExpensesController);

    /** @ngInject */
    function ReportExpensesController($window, hrApi, $scope, $state, Statuses, Orders)
    {

        var vm = this;

        // Data
        vm.search_data = {}
        var dataPromise = hrApi.getReportExpenses({});
        dataPromise.then(function(result) { 
            $scope.expenses_data = result;
            $scope.table_data = [[ 'EXP-ID', 'Subject', 'Employee', 'Amount', 'Status', 'Date Created', 'Created By']]
            angular.forEach($scope.expenses_data, function(value, key) {
                $scope.table_data.push([
                    value.code,
                    value.subject,
                    value.employee,
                    value.amount,
                    value.status,
                    value.created_at,
                    value.created_by,
                ]);
            });
        });
        var dataPromise = hrApi.get_employees({});
        dataPromise.then(function(result) { 
            $scope.get_employees = result;
            console.log($scope.get_employees)
        });  

        vm.pdfExpenseData = function(){
            var docDefinition = {
              content: [
                {
                  table: {
                    headerRows: 1,
                    widths: [ 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto' ],
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

        vm.searchExpenseData = function(id){
            var dataPromise = hrApi.getReportExpenses(vm.search_data);
            dataPromise.then(function(result) { 
                $scope.expenses_data = result; 
            }); 
        }
        vm.searchExpenseDataClear = function(id){
            vm.search_data = {}
        }
	
    }
})();