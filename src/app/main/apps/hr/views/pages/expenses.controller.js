(function ()
{
    'use strict';

    angular
        .module('app.hr')
        .controller('ExpensesController', ExpensesController);

    /** @ngInject */
    function ExpensesController($timeout,$window, hrApi, $scope, $state)
    {

        
		$scope.isOpen = false;
		$scope.demo = {
			isOpen: false,
			count: 0,
			selectedDirection: 'left'
		};
        $scope.show_table1 = false
        $scope.show_table2 = false
		var vm = this;

        // Data
        vm.search_data = {}
        var dataPromise = hrApi.getExpenses({});
        dataPromise.then(function(result) { 
            $scope.expenses_data = result;
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
                initComplete: initComplete,
                pagingType  : 'simple',
                lengthMenu  : [10, 20, 30, 50, 100],
                pageLength  : 20,
                scrollY     : 'auto',
                responsive  : true
            };
            $timeout(function(){
                $scope.show_table2 = true
            }, 2000);
        });
        var dataPromise = hrApi.get_employees({});
        dataPromise.then(function(result) { 
            $scope.get_employees = result;
        });  
        var dataPromise = hrApi.getUsers({});
        dataPromise.then(function(result) { 
            $scope.get_users = result;
        });
        

        function initComplete(){
            $scope.show_table1 = true
        }
        vm.newExpensePage = function(){
            $state.go('app.hr.expenses-new'); 
        }
        vm.editExpensePage = function(expense){
             $state.go('app.hr.expenses-edit', {obj:{expense: expense}});
        }
        vm.viewExpensePage = function(id){
            $state.go('app.hr.expenses-view', {obj:{id: id}}); 
        }
        vm.deleteAllExpense = function () {
            var delete_ids = [];
            angular.forEach($scope.expenses_data, function (checked) {
                if (checked.checked) {
                    delete_ids.push(checked.id);
                }
            });
            if (delete_ids.length >= 1){
                delete_ids = JSON.stringify(delete_ids)
                var dataPromise = hrApi.deleteAllExpense({ids: delete_ids})
                dataPromise.then(function(result) { 
                    var dataPromise = hrApi.getExpenses({});
                    dataPromise.then(function(result) { 
                        $scope.expenses_data = result;
                    }); 
                });
            }
        };
        vm.deleteExpense = function (id) {
            var delete_ids = JSON.stringify([id])
            hrApi.deleteAllExpense({ids: delete_ids})
            $window.location.reload();
        };
        vm.searchExpenseData = function(id){
            var dataPromise = hrApi.getExpenses(vm.search_data);
            dataPromise.then(function(result) { 
                $scope.expenses_data = result; 
            }); 
        }
        vm.searchExpenseDataClear = function(id){
            vm.search_data = {}
        }
	
    }
})();