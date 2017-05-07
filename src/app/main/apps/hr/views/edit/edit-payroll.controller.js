(function ()
{
    'use strict';

    angular
        .module('app.hr')
        .controller('editPayrollsController', editPayrollsController);

    /** @ngInject */
    function editPayrollsController(hrApi, $scope, $document, $state, Product)
    {

        
		$scope.isOpen = false;
		$scope.demo = {
			isOpen: false,
			count: 0,
			selectedDirection: 'left'
		};
		
		
		var vm = this;
		vm.payroll = $state.params.obj
        console.log("vm.payroll",vm.payroll)

		vm.ssName = "s"
	    vm.orders = Product.data;
        
        var dataPromise = hrApi.get_employees({});
        dataPromise.then(function(result) { 
            $scope.get_employees = result;
        }); 

        vm.updatePayroll = function(){
           var dataPromise = hrApi.updatePayroll(vm.payroll.payroll.id,vm.payroll);
            dataPromise.then(function(result) { 
                $scope.data = result; 
                if( typeof($scope.data.message) !== "undefined"){
                    console.log("response",$scope.data.message)
                }else{
                    if( typeof($scope.data.payroll_id) !== "undefined"){
                        $state.go('app.hr.payroll-view', {obj:{id: $scope.data.payroll_id}}); 
                    }
                }
            }); 
        }
        vm.total_calculation = function(){
            if(vm.payroll.payroll.base_pay && vm.payroll.payroll.allowances && vm.payroll.payroll.deductions && vm.payroll.payroll.expenses && vm.payroll.payroll.tax){
                vm.payroll.payroll.total =  parseInt(vm.payroll.payroll.base_pay, 10) + parseInt(vm.payroll.payroll.allowances, 10) + parseInt(vm.payroll.payroll.expenses, 10) - parseInt(vm.payroll.payroll.deductions, 10) - parseInt(vm.payroll.payroll.tax, 10)
            }
        }
        vm.viewPayrollPage =function(id){
            $state.go('app.hr.payroll-view', {obj:{id: id}}); 
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
        
        /**
         * File upload success callback
         * Triggers when single upload completed
         *
         * @param file
         * @param message
         */
        function fileSuccess(file, message)  {
            // Iterate through the media list, find the one we
            // are added as a temp and replace its data
            // Normally you would parse the message and extract
            // the uploaded file data from it
            angular.forEach(vm.product.images, function (media, index)
            {
                if ( media.id === file.uniqueIdentifier )
                {
                    // Normally you would update the media payroll
                    // from database but we are cheating here!
                    var fileReader = new FileReader();
                    fileReader.readAsDataURL(media.file.file);
                    fileReader.onload = function (event)
                    {
                        media.url = event.target.result;
                    };

                    // Update the image type so the overlay can go away
                    media.type = 'image';
                }
            });
        }
		
    }
})();