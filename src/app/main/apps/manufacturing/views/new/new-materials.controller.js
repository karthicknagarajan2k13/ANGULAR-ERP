(function ()
{
    'use strict';

    angular
        .module('app.manufacturing')
        .controller('newMaterialController', newMaterialController);

    /** @ngInject */
    function newMaterialController($mdToast,mfgApi, $scope, $document, $state)
    {

        $scope.isOpen = false;
        $scope.demo = {
        isOpen: false,
        count: 0,
        selectedDirection: 'left'
        };
        var vm = this;
        vm.material = {}
		vm.ssName = "s"

        var dataPromise = mfgApi.get_manufacturings({});
        dataPromise.then(function(result) { 
            $scope.get_manufacturings = result;
        }); 
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

        vm.saveMaterial = function(){
            console.log("material",vm.material)
            var dataPromise = mfgApi.createMaterial({material:vm.material});
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
                    if( typeof($scope.data.material_id) !== "undefined"){
                        $state.go('app.manufacturing.materials-view', {obj:{id: $scope.data.material_id}}); 
                    }
                }
            }); 
        }
        vm.materialDataClear = function(){
            vm.material = {}
        }
        vm.newMaterialPage = function(){
            $state.go('app.manufacturing.materials-new'); 
        }
        vm.MaterialsPage = function(){
            $state.go('app.manufacturing.materials'); 
        }
    }
})();