(function ()
{
    'use strict';

    angular
        .module('app.hr')
        .controller('newExpensesController', newExpensesController);

    /** @ngInject */
    function newExpensesController($mdToast,hrApi, $scope, $document, $state, Product)
    {

        $scope.isOpen = false;
		$scope.demo = {
			isOpen: false,
			count: 0,
			selectedDirection: 'left'
		};
        var last = {
          bottom: false,
          top: true,
          left: false,
          right: true
        };
        function sanitizePosition() {
            var current = $scope.toastPosition;
            if ( current.bottom && last.top ) current.top = false;
            if ( current.top && last.bottom ) current.bottom = false;
            if ( current.right && last.left ) current.left = false;
            if ( current.left && last.right ) current.right = false;
            last = angular.extend({},current);
        }
        $scope.toastPosition = angular.extend({},last);
        $scope.getToastPosition = function() {
        sanitizePosition();
        return Object.keys($scope.toastPosition)
          .filter(function(pos) { return $scope.toastPosition[pos]; })
          .join(' ');
        };

		
		var vm = this;
        vm.expense = {}
        vm.expense.employee_id = $state.params.employee_id

		vm.ssName = "s"
	    vm.orders = Product.data;

        var dataPromise = hrApi.get_employees({});
        dataPromise.then(function(result) { 
            $scope.get_employees = result;
        }); 
 
        vm.saveExpense = function(){
            var dataPromise = hrApi.createExpense({expense:vm.expense});
            dataPromise.then(function(result) { 
                $scope.data = result; 
                if( typeof($scope.data.message) !== "undefined"){
                    var pinTo = $scope.getToastPosition();
                    $mdToast.show(
                      $mdToast.simple()
                        .textContent($scope.data.message)
                        .position(pinTo )
                        .hideDelay(3000)
                    );
                }else{
                    if( typeof($scope.data.expense_id) !== "undefined"){
                        $state.go('app.hr.expenses-view', {obj:{id: $scope.data.expense_id}}); 
                    }
                }
            }); 
        }
        vm.expenseDataClear = function(){
            vm.expense = {}
        }
        vm.newExpensePage = function(){
            $state.go('app.hr.expenses-new'); 
        }
        vm.ExpensesPage = function(){
            $state.go('app.hr.expenses'); 
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