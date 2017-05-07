(function ()
{
    'use strict';

    angular
        .module('app.hr')
        .controller('viewExpensesController', viewExpensesController);

    /** @ngInject */
    function viewExpensesController(hrApi, $scope, $document, $state, Product)
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
	    vm.orders = Product.data;

       
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
                    // Normally you would update the media item
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