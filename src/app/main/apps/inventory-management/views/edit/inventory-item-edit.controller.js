(function ()
{
    'use strict';

    angular
        .module('app.inventory-management')
        .controller('editInventoryItemController', editInventoryItemController);

    /** @ngInject */
    function editInventoryItemController($mdToast,imApi, $scope, $document, $state,$window)
    {

      $scope.isOpen = false;
        $scope.demo = {
        isOpen: false,
        count: 0,
        selectedDirection: 'left'
        };
        var vm = this;
        vm.inventory = $state.params.obj.data;

        vm.inventory.acquisition_cost = parseFloat(vm.inventory.acquisition_cost);
        vm.inventory.cached_profit_share_percent = parseFloat(vm.inventory.cached_profit_share_percent);
       
        var last = {
          bottom: false,
          top: true,
          left: false,
          right: true
        };

        var session = $window.JSON.parse($window.localStorage.getItem('userInfo'))

        var dataPromise = imApi.get_listing({user_id:session.id});
        dataPromise.then(function(result) { 
            $scope.get_listing = result.listings;
        });  


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
     

        vm.updateInventoryItems = function(){
              var create_inventory_item_data = {
                 "inventory_item[icc]":vm.inventory.icc,
                 "inventory_item[make]": vm.inventory.make,
                 "inventory_item[model]": vm.inventory.model,
                 "inventory_item[serial]": vm.inventory.serial,
                 "inventory_item[status]": vm.inventory.status,
                 "inventory_item[location]": vm.inventory.location,
                 "inventory_item[notes]": vm.inventory.notes,
                 "inventory_item[acquisition_cost]": vm.inventory.acquisition_cost,
                 "inventory_item[cached_profit_share_percent]":vm.inventory.cached_profit_share_percent,
                 "inventory_item[details]": vm.inventory.details,
                 "inventory_item[archived]": vm.inventory.archived,
                 "inventory_item[check_value]": vm.inventory.check_value,
                 "inventory_item[item_category_name]": vm.inventory.item_category_name,
                 "inventory_item[listing_id]": vm.inventory.listing_id,
                  "user_id": session.id,inventory_item_id:vm.inventory.id};

             var dataPromise = imApi.edit_inventory_item(create_inventory_item_data);
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
                          $state.go('app.inventory-management.inventory-item', {obj:{id: $scope.data.item_id}}); 
                    }
              });
        }

        /*vm.deleteItem = function(data){
                var dataPromise = imApi.deleteInventoryItem({"inventory_item_id":data,user_id:session.id});
                dataPromise.then(function(result) { 
                   $state.go('app.inventory-management.inventory-item'); 
                }); 
        }*/

        vm.itemDataClear = function(){
            vm.inventory = {}
        }  
    }
})();