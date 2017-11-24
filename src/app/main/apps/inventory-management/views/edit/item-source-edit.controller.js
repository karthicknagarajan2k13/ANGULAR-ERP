(function ()
{
    'use strict';

    angular
        .module('app.inventory-management')
        .controller('editItemSourceController', editItemSourceController);

    /** @ngInject */
    function editItemSourceController($mdToast,imApi, $scope, $document, $state,$window)
    {

      $scope.isOpen = false;
        $scope.demo = {
        isOpen: false,
        count: 0,
        selectedDirection: 'left'
        };
        var vm = this;



        vm.source = $state.params.obj.data;
        vm.source.profit_share_percent  = parseFloat(vm.source.profit_share_percent);
        vm.source_item_id = vm.source.id;
       
        var last = {
          bottom: false,
          top: true,
          left: false,
          right: true
        };

        var session = $window.JSON.parse($window.localStorage.getItem('userInfo'));
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
     

        vm.updateItemSource = function(){

            var create_item_source_data = {
                "item_source[name]": vm.source.name,
                "item_source[short_name]": vm.source.short_name,
                "item_source[profit_share_percent]": vm.source.profit_share_percent,
                "user_id": session.id,
                "item_source_id":vm.source_item_id
            }
            var dataPromise = imApi.edit_item_source(create_item_source_data);
            dataPromise.then(function(result){ 
                   $scope.data = result; 
                    if( typeof($scope.data.message) !== "undefined"){
                        var pinTo = $scope.getToastPosition();
                        $mdToast.show(
                          $mdToast.simple()
                            .textContent($scope.data.message)
                            .position(pinTo )
                            .hideDelay(3000)
                        );
                         $state.go('app.inventory-management.item-source'); 
                    }
            }); 
        }

        /*vm.deleteItem = function(data){
           var dataPromise = imApi.delete_item_source({"item_source_id":data,user_id:session.id});
            dataPromise.then(function(result) { 
                $state.go('app.inventory-management.item-source'); 
            });    
        }*/

        vm.newItemPage = function(){
            $state.go('app.inventory-management.item-source-new'); 
        }
        vm.deleteItem = function(data){
           var dataPromise = imApi.delete_item_source({"item_source_id":data,user_id:session.id});
            dataPromise.then(function(result) { 
                $state.go('app.inventory-management.item-source'); 
            }); 
        }

        vm.itemDataClear = function(){
            vm.item_source = {}
        }
        vm.ItemSourcePage = function(){
             $state.go('app.inventory-management.item-source'); 
        }
    }
})();