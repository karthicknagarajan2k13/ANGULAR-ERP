(function ()
{
    'use strict';

    angular
        .module('app.hr')
        .controller('EmployeesController', EmployeesController);

    /** @ngInject */
    function EmployeesController($window, hrApi, $scope, $state, Statuses, Orders)
    {

        var vm = this;

        // Data
        vm.search_data = {}
        var dataPromise = hrApi.getEmployees({});
        dataPromise.then(function(result) { 
            $scope.employees_data = result;
            console.log("$scope.employees_data",$scope.employees_data)
        }); 
        var dataPromise = hrApi.getUsers({});
        dataPromise.then(function(result) { 
            $scope.get_users = result;
        });
        
        vm.newEmployeePage = function(){
            $state.go('app.hr.employees-new'); 
        }
        vm.editEmployeePage = function(id){
             $state.go('app.hr.employees-edit', {obj:{id: id}});
        }
        vm.viewEmployeePage = function(id){
            $state.go('app.hr.employees-view', {obj:{id: id}}); 
        }
        vm.deleteAllEmployee = function () {
            var delete_ids = [];
            angular.forEach($scope.employees_data, function (checked) {
                if (checked.checked) {
                    delete_ids.push(checked.id);
                }
            });
            if (delete_ids.length >= 1){
                delete_ids = JSON.stringify(delete_ids)
                hrApi.deleteAllEmployee({ids: delete_ids})
                $window.location.reload();
            }
        };
        vm.deleteEmployee = function (id) {
            var delete_ids = JSON.stringify([id])
            hrApi.deleteAllEmployee({ids: delete_ids})
            $window.location.reload();
        };
        vm.searchEmployeeData = function(id){
            console.log("vm.search_data",vm.search_data)
            var dataPromise = hrApi.getEmployees(vm.search_data);
            dataPromise.then(function(result) { 
                $scope.employees_data = result; 
            }); 
        }
        vm.searchEmployeeDataClear = function(id){
            vm.search_data = {}
        }

        // Data
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

		
		
        vm.timeceditpage = function(id){
			 $state.go('app.hr.timeclock-edit', {id: id}); 
		}
	    vm.timecviewpage = function(id){
			 $state.go('app.hr.timeclock-view', {id: id}); 
		}
		
		vm.expeeditpage = function(id){
			 $state.go('app.hr.expenses-edit', {id: id}); 
		}
	    vm.expeviewpage = function(id){
			 $state.go('app.hr.expenses-view', {id: id}); 
		}
		
		vm.payrolleditpage = function(id){
			 $state.go('app.hr.payroll-edit', {id: id}); 
		}
	    vm.payrollviewpage = function(id){
			 $state.go('app.hr.payroll-view', {id: id}); 
		}
		
        //////////
    }
})();