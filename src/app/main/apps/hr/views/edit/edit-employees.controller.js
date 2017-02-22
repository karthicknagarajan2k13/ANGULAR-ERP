(function ()
{
    'use strict';

    angular
        .module('app.hr')
        .controller('editEmployeesController', editEmployeesController);	
		
    /** @ngInject */
    function editEmployeesController(hrApi, $scope, $document, $state, Product)
    {

        $scope.isOpen = false;
		$scope.demo = {
			isOpen: false,
			count: 0,
			selectedDirection: 'left'
		};
		
		
		var vm = this;
		
		vm.ssName = "s"
	    vm.orders = Product.data;

        var dataPromise = hrApi.editEmployee({id:$state.params.obj.id});
        dataPromise.then(function(result) { 
            $scope.employee = result;
            $scope.employee.employee_attributes.date_of_birth = new Date($scope.employee.employee_attributes.date_of_birth);


        });

        $scope.updateEmployee = function(){
           var dataPromise = hrApi.updateEmployee($scope.employee.id,$scope.employee);
            dataPromise.then(function(result) { 
                $scope.data = result; 
                if( typeof($scope.data.message) !== "undefined"){
                    console.log("response",$scope.data.message)
                }else{
                    if( typeof($scope.data.employee_id) !== "undefined"){
                        $state.go('app.hr.employees-view', {obj:{id: $scope.data.employee_id}}); 
                    }
                }
            }); 
        }
        $scope.viewEmployeePage =function(id){
            $state.go('app.hr.employees-view', {obj:{id: id}}); 
        }
        vm.newEmployeePage = function(){
            $state.go('app.hr.employees-new'); 
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