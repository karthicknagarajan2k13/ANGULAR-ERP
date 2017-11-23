(function ()
{
    'use strict';

    angular
        .module('app.knowledge-base')
        .controller('editKbCategoriesController', editKbCategoriesController);

    /** @ngInject */
    function editKbCategoriesController($mdToast,kbApi, $scope, $document, $state)
    {

        $scope.isOpen = false;
        $scope.demo = {
        isOpen: false,
        count: 0,
        selectedDirection: 'left'
        };
        var vm = this;
		vm.kb_category = $state.params.obj
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
        
		vm.ssName = "s"

        vm.updateKbCategory = function(){
           var dataPromise = kbApi.updateKbCategory(vm.kb_category.kb_category.id,vm.kb_category);
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
        vm.viewKbCategoryPage =function(id){
            $state.go('app.knowledge-base.kb-categories-view', {obj:{id: id}}); 
        }
        vm.newKbCategoryPage = function(){
            $state.go('app.knowledge-base.kb-categories-new'); 
        }
        vm.KbCategoriesPage = function(){
            $state.go('app.knowledge-base.kb-categories'); 
        }	
    }
})();