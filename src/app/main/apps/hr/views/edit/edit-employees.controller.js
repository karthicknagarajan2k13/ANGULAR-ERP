(function ()
{
    'use strict';

    angular
        .module('app.hr')
        .controller('editEmployeesController', editEmployeesController);	
		
    /** @ngInject */
    function editEmployeesController($mdToast,hrApi, $scope, $document, $state)
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
        $scope.viewEmployeePage =function(id){
            $state.go('app.hr.employees-view', {obj:{id: id}}); 
        }
        vm.newEmployeePage = function(){
            $state.go('app.hr.employees-new'); 
        }
        vm.EmployeesPage = function(){
            $state.go('app.hr.employees'); 
        }		
    }
	
	
})();