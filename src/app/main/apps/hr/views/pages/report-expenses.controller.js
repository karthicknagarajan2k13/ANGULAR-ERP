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
            console.log("$scope.expenses_data",$scope.expenses_data)
        });
        var dataPromise = hrApi.get_employees({});
        dataPromise.then(function(result) { 
            $scope.get_employees = result;
            console.log($scope.get_employees)
        });  

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