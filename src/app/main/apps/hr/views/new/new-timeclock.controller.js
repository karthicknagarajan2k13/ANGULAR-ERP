

(function ()
{
    'use strict';

    angular
        .module('app.hr')
        .controller('newTimeclocksController', newTimeclocksController);

   /** @ngInject */
    function newTimeclocksController($mdToast,hrApi, $scope, $document, $state)
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
        vm.timeclock = {}
        vm.timeclock.employee_id = $state.params.employee_id

		vm.ssName = "s"

        var dataPromise = hrApi.get_employees({});
        dataPromise.then(function(result) { 
            $scope.get_employees = result;
        }); 
 
        vm.saveTimeclock = function(){
            var dataPromise = hrApi.createTimeclock({timeclock:vm.timeclock});
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
                    if( typeof($scope.data.timeclock_id) !== "undefined"){
                        $state.go('app.hr.timeclock-view', {obj:{id: $scope.data.timeclock_id}}); 
                    }
                }
            }); 
        }
        vm.timeclockDataClear = function(){
            vm.timeclock = {}
        }
        vm.newTimeclockPage = function(){
            $state.go('app.hr.timeclock-new'); 
        }
        vm.TimeclocksPage = function(){
            $state.go('app.hr.timeclock'); 
        }	
    }
})();