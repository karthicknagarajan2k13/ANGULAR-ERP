(function ()
{
    'use strict';

    angular
        .module('app.hr')
        .controller('newEmployeesController', newEmployeesController);	
		
    /** @ngInject */
    function newEmployeesController($mdToast,hrApi, $scope, $document, $state, Product)
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
		
		vm.ssName = "s"
	    vm.orders = Product.data;

        vm.employee = {}
        
        vm.saveEmployee = function(){
            console.log("vm.employee",vm.employee)
            var dataPromise = hrApi.createEmployee({employee:vm.employee});
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
                    if( typeof($scope.data.employee_id) !== "undefined"){
                        $state.go('app.hr.employees-view', {obj:{id: $scope.data.employee_id}}); 
                    }
                }
            }); 
        }
        vm.newEmployeePage = function(){
            $state.go('app.hr.employees-new'); 
        }
        vm.uploadEmployeePhoto = function(){
            var dataPromise = hrApi.uploadEmployeePhoto(vm.employee,vm.employee.employee_attributes.photo);
            dataPromise.then(function(result) { 
                $scope.data = result;
                console.log("uplad image",$scope.data)
            }); 
        }

        vm.employeeDataClear = function(){
            vm.employee = {}
        }
        vm.EmployeesPage = function(){
            $state.go('app.hr.employees'); 
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