(function ()
{
    'use strict';

    angular
        .module('app.knowledge-base')
        .controller('newKbCategoriesController', newKbCategoriesController);

    /** @ngInject */
    function newKbCategoriesController($mdToast,kbApi, $scope, $document, $state)
    {

        $scope.isOpen = false;
        $scope.demo = {
        isOpen: false,
        count: 0,
        selectedDirection: 'left'
        };

        var vm = this;
        vm.kb_category = {}
		vm.ssName = "s"

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
        vm.saveKbCategory = function(){
            console.log("kb_category",vm.kb_category)
            var dataPromise = kbApi.createKbCategory({kb_category:vm.kb_category});
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
                    if( typeof($scope.data.kb_category_id) !== "undefined"){
                        $state.go('app.knowledge-base.kb-categories-view', {obj:{id: $scope.data.kb_category_id}}); 
                    }
                }
            }); 
        }
        vm.kb_categoryDataClear = function(){
            vm.kb_category = {}
        }
        vm.newKbCategoryPage = function(){
            $state.go('app.knowledge-base.kb-categories-new'); 
        }
        vm.KbCategoriesPage = function(){
            $state.go('app.knowledge-base.kb-categories'); 
        }
    }
})();