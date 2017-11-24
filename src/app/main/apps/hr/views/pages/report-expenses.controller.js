(function ()
{
    'use strict';

    angular
        .module('app.hr')
        .controller('ReportExpensesController', ReportExpensesController)
         .factory('storageService', ['$rootScope', function($rootScope) {
                return {
                    get: function(key) {
                        return sessionStorage.getItem(key);
                    },
                    save: function(key, data) {
                        sessionStorage.setItem(key, data);
                    },
                    getModel: function(key) {
                        return sessionStorage.getItem(key);
                    },
                    setModel: function(key, data) {
                        sessionStorage.setItem(key, data);
                    }
            };
        }]);

    /** @ngInject */
    function ReportExpensesController(storageService,$cookies,$window, hrApi, $scope, $state)
    {

        var vm = this;
        if(storageService.get('key')=== undefined){
             storageService.save('key', "new");
        }

        // Data
        vm.search_data = {}
         if( storageService.get('key') === null || storageService.get('key')  === "new"){
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
    }else{
          storageService.save('key', "new");
            var data = $cookies.getObject('search');
            var dataPromise = hrApi.getReportExpenses(data);
            dataPromise.then(function(result) { 
                $scope.expenses_data = result;
                vm.search_data  = data;
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
}
        var dataPromise = hrApi.get_employees({});
        dataPromise.then(function(result) { 
            $scope.get_employees = result;
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
        vm.refreshData = function(){
            storageService.save('key', "new");
            $cookies.putObject("search",'');
            $state.reload();
        }
        vm.searchExpenseData = function(id){
          /*  var dataPromise = hrApi.getReportExpenses(vm.search_data);
            dataPromise.then(function(result) { 
                $scope.expenses_data = result; 
            }); */

            $cookies.putObject("search",vm.search_data);
            storageService.save('key', "search");
           
            $state.reload();
        }
        vm.searchExpenseDataClear = function(id){
            vm.search_data = {}
        }
	
    }
})();