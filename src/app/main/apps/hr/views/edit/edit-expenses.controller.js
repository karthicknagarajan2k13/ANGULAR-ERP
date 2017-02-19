(function ()
{
    'use strict';

    angular
        .module('app.hr')
        .controller('editExpensesController', editExpensesController);

    /** @ngInject */
    function editExpensesController(hrApi, $scope, $document, $state, Product)
    {

        var vm = this;
		vm.expense = $state.params.obj
        console.log("vm.expense",vm.expense)

		vm.ssName = "s"
	    vm.orders = Product.data;
        
        var dataPromise = hrApi.get_employees({});
        dataPromise.then(function(result) { 
            $scope.get_employees = result;
        }); 

        vm.updateExpense = function(){
           var dataPromise = hrApi.updateExpense(vm.expense.expense.id,vm.expense);
            dataPromise.then(function(result) { 
                $scope.data = result; 
                if( typeof($scope.data.message) !== "undefined"){
                    console.log("response",$scope.data.message)
                }else{
                    if( typeof($scope.data.expense_id) !== "undefined"){
                        $state.go('app.hr.expenses-view', {obj:{id: $scope.data.expense_id}}); 
                    }
                }
            }); 
        }

        vm.viewExpensePage =function(id){
            $state.go('app.hr.expenses-view', {obj:{id: id}}); 
        }
        vm.newExpensePage = function(){
            $state.go('app.hr.expenses-new'); 
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
                    // Normally you would update the media expense
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