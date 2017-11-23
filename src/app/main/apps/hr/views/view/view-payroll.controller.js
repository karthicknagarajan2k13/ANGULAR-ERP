(function ()
{
    'use strict';

    angular
        .module('app.hr')
        .controller('viewPayrollsController', viewPayrollsController);

    /** @ngInject */
    function viewPayrollsController(hrApi, $scope, $document, $state)
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
        var dataPromise = hrApi.viewPayroll($state.params.obj.id);
        dataPromise.then(function(result) { 
            $scope.payroll_data = result; 
        }); 

        vm.editPayrollPage = function(payroll){
             $state.go('app.hr.payroll-edit', {obj:{payroll: payroll}});
        }
        vm.deletePayroll = function(id){
            var delete_ids = JSON.stringify([id])
            hrApi.deleteAllPayroll({ids: delete_ids})
            $state.go('app.hr.payrolls'); 
        }
        vm.newPayrollPage = function(){
            $state.go('app.hr.payroll-new'); 
        }
        vm.PayrollsPage = function(){
            $state.go('app.hr.payrolls'); 
        }
        vm.PayrollReportsPage = function(){
            $state.go('app.hr.payroll-report'); 
        }
		vm.ssName = "s"
    }
})();