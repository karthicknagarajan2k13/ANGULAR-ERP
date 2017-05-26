(function ()
{
    'use strict';

    angular
        .module('app.hr')
        .controller('viewExpensesController', viewExpensesController);

    /** @ngInject */
    function viewExpensesController(hrApi, $scope, $document, $state)
    {

        var vm = this;
		$scope.isOpen = false;
		$scope.demo = {
			isOpen: false,
			count: 0,
			selectedDirection: 'left'
		};
        vm.dtInstance = {};
        vm.dtOptions = {
            bLengthChange  : false,
            paging: false,
            searching: false,
            bInfo: false,
        };		
		

        //Api Call
        var dataPromise = hrApi.viewExpense($state.params.obj.id);
        dataPromise.then(function(result) { 
            $scope.expense_data = result; 
        }); 

        vm.editExpensePage = function(expense){
             $state.go('app.hr.expenses-edit', {obj:{expense: expense}});
        }
        vm.deleteExpense = function(id){
            var delete_ids = JSON.stringify([id])
            hrApi.deleteAllExpense({ids: delete_ids})
            $state.go('app.hr.expenses'); 
        }
        vm.newExpensePage = function(){
            $state.go('app.hr.expenses-new'); 
        }
        vm.ExpensesPage = function(){
            $state.go('app.hr.expenses'); 
        }
		vm.ssName = "s"
    }
})();