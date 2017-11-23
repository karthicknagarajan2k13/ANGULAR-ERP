(function ()
{
    'use strict';

    angular
        .module('app.manufacturing')
        .controller('editManufacturingController', editManufacturingController);

    /** @ngInject */
    function editManufacturingController($mdToast,mfgApi, $scope, $document, $state)
    {

        $scope.isOpen = false;
        $scope.demo = {
        isOpen: false,
        count: 0,
        selectedDirection: 'left'
        };
        var vm = this;
		vm.manufacturing = $state.params.obj
        vm.manufacturing.manufacturing.start_date = new Date(vm.manufacturing.manufacturing.start_date);
        vm.manufacturing.manufacturing.expected_completion_date = new Date(vm.manufacturing.manufacturing.expected_completion_date);
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

        var dataPromise = mfgApi.get_items({});
        dataPromise.then(function(result) { 
            $scope.get_items = result;
        }); 
        var dataPromise = mfgApi.get_SalesOrders({});
        dataPromise.then(function(result) { 
            $scope.get_sales_orders = result;
        }); 
        
		vm.ssName = "s"
        vm.qa_check_data = {}

        vm.updateManufacturing = function(){
            vm.manufacturing.manufacturing.qa_check_list = JSON.stringify(vm.manufacturing.manufacturing.qa_check_list);
           var dataPromise = mfgApi.updateManufacturing(vm.manufacturing.manufacturing.id,vm.manufacturing);
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
                    if( typeof($scope.data.manufacturing_id) !== "undefined"){
                        $state.go('app.manufacturing.manufacturing-view', {obj:{id: $scope.data.manufacturing_id}}); 
                    }
                }
            }); 
        }
        vm.viewManufacturingPage =function(id){
            $state.go('app.manufacturing.manufacturing-view', {obj:{id: id}}); 
        }
        vm.newManufacturingPage = function(){
            $state.go('app.manufacturing.manufacturing-new'); 
        }
        vm.qa_check_delete = function(qa_check){
            var index = vm.manufacturing.manufacturing.qa_check_list.indexOf(qa_check);
            vm.manufacturing.manufacturing.qa_check_list.splice(index, 1);  
        }
        vm.qa_check_add = function(){
            if(vm.qa_check_data.name){
                vm.manufacturing.manufacturing.qa_check_list.push(vm.qa_check_data)
                vm.qa_check_data = {}
            }
        }
        vm.ManufacturingsPage = function(){
            $state.go('app.manufacturing.manufacturing'); 
        }
    }
})();