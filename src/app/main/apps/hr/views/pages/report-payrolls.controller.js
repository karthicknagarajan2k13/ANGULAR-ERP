(function ()
{
    'use strict';

    angular
        .module('app.hr')
        .controller('ReportPayrollsController', ReportPayrollsController)
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
    function ReportPayrollsController(storageService,$cookies,$window, hrApi, $scope, $state)
    {

        var vm = this;
        if(storageService.get('key')=== undefined){
             storageService.save('key', "new");
        }
        
        // Data
        vm.search_data = {}


    if( storageService.get('key') === null || storageService.get('key')  === "new"){
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
    }else{
          storageService.save('key', "new");
            var data = $cookies.getObject('search');
            var dataPromise = hrApi.getReportPayrolls(data);
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
}
    var dataPromise = hrApi.get_employees({});
    dataPromise.then(function(result) { 
        $scope.get_employees = result;
        console.log($scope.get_employees)
    });

        vm.pdfPayrollData = function(){
            var docDefinition = {
              pageOrientation: 'landscape',
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
            $cookies.putObject("search",vm.search_data);
            storageService.save('key', "search");
           
            $state.reload();
        }
        vm.searchPayrollDataClear = function(id){
            vm.search_data = {}
        }
	
    }
})();