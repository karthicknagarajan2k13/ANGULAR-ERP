(function ()
{
    'use strict';

    angular
        .module('app.inventory-management')
        .controller('newInventoryItemController', newInventoryItemController)  
        .directive('allowDecimalNumbers', function () {  
            return {  
                restrict: 'A',  
                link: function (scope, elm, attrs, ctrl) {  
                    elm.on('keydown', function (event) {  
                        var $input = $(this);  
                        var value = $input.val();  
                        value = value.replace(/[^0-9\.]/g, '')  
                        var findsDot = new RegExp(/\./g)  
                        var containsDot = value.match(findsDot)  
                        if (containsDot != null && ([46, 110, 190].indexOf(event.which) > -1)) {  
                            event.preventDefault();  
                            return false;  
                        }  
                        $input.val(value);  
                        if (event.which == 64 || event.which == 16) {  
                            // numbers  
                            return false;  
                        } if ([8, 13, 27, 37, 38, 39, 40, 110].indexOf(event.which) > -1) {  
                            // backspace, enter, escape, arrows  
                            return true;  
                        } else if (event.which >= 48 && event.which <= 57) {  
                            // numbers  
                            return true;  
                        } else if (event.which >= 96 && event.which <= 105) {  
                            // numpad number  
                            return true;  
                        } else if ([46, 110, 190].indexOf(event.which) > -1) {  
                            // dot and numpad dot  
                            return true;  
                        } else {  
                            event.preventDefault();  
                            return false;  
                        }  
                    });  
                }  
            }  
        });



    /** @ngInject */
    function newInventoryItemController($mdToast,imApi, $scope, $document, $state, $window)
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
		
		var vm = this;
        vm.inventory = {};


         /*vm.item = {}
        vm.item.category_id = $state.params.category_id;

        var dataPromise = imApi.get_categories({});
        dataPromise.then(function(result) { 
            $scope.get_categories = result;
        }); 
        var dataPromise = imApi.get_suppliers({});
        dataPromise.then(function(result) { 
            $scope.get_suppliers = result;
        });*/  



        var dataPromise = imApi.get_listing({user_id:session.id});
        dataPromise.then(function(result) { 
            $scope.get_listing = result.listings;
        }); 

        vm.saveItem = function(){
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
                  "user_id": session.id};

             var dataPromise = imApi.create_inventory_item(create_inventory_item_data);
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
                        $state.go('app.inventory-management.inventory-item', {obj:{id: $scope.data.inventory_item_id}}); 
                   /* }else{
                        if( typeof($scope.data.inventory_item_id) !== "undefined"){
                            $state.go('app.inventory-management.inventory-item-view', {obj:{id: $scope.data.inventory_item_id}}); 
                        }*/
                    }
              });
        }
        vm.itemDataClear = function(){
            vm.inventory = {}
        }
        vm.newItemPage = function(){
            $state.go('app.inventory-management.items-new'); 
        }
        vm.ItemsPage = function(){
            $state.go('app.inventory-management.items'); 
        }
    }
})();