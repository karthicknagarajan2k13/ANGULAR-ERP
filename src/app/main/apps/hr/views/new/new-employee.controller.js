(function ()
{
    'use strict';

    angular
        .module('app.hr')
        .controller('newEmployeesController', newEmployeesController)
        .directive('fileSelect', function() {
              var template = '<input type="file" name="files"/>';
              return function( scope, elem, attrs ) {
                var selector = $( template );
                elem.append(selector);
                selector.bind('change', function( event ) {
                  scope.$apply(function() {
                    scope[ attrs.fileSelect ] = event.originalEvent.target.files;
                  });
                });
                scope.$watch(attrs.fileSelect, function(file) {
                  selector.val(file);
                });
              };
        });	
		
    /** @ngInject */
    function newEmployeesController($mdToast,hrApi, $scope, $document, $state)
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

        vm.employee = {}
        
        vm.saveEmployee = function(){
            if(vm.employee.password !== vm.employee.password_confirmation){
                        var pinTo = $scope.getToastPosition();
                        $mdToast.show(
                          $mdToast.simple()
                            .textContent("Password and Confirm Password doesn't match")
                            .position(pinTo )
                            .hideDelay(3000)
                        );
            }else{

             /*   console.log("--->"+JSON.stringify(vm.employee));*/
                var dataPromise = hrApi.createEmployee({employee:vm.employee});
                dataPromise.then(function(result) { 
                    console.log("-->"+JSON.stringify(result));
                    $scope.data = result; 
                    if($scope.data.id !== "undefined"){
                        var pinTo = $scope.getToastPosition();
                        $mdToast.show(
                          $mdToast.simple()
                            .textContent("New Employee created.")
                            .position(pinTo )
                            .hideDelay(3000)
                        );
                         $state.go('app.hr.employees-view', {obj:{id: $scope.data.employee_id}}); 
                    }/*else{
                        if( typeof($scope.data.employee_id) !== "undefined"){
                            $state.go('app.hr.employees-view', {obj:{id: $scope.data.employee_id}}); 
                        }
                    }*/
                }); 
            }
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
            angular.element("input[type='file']").val(null);
        }
        vm.EmployeesPage = function(){
            $state.go('app.hr.employees'); 
        }	
    }
	
	
})();