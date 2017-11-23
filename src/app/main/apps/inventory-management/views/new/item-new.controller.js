(function ()
{
    'use strict';

    angular
        .module('app.inventory-management')
        .controller('newItemController', newItemController)
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
    function newItemController($mdToast,imApi, $scope, $document, $state)
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
        vm.item = {}
        vm.item.category_id = $state.params.category_id
        
        vm.ssName = "s"

        var dataPromise = imApi.get_categories({});
        dataPromise.then(function(result) { 
            $scope.get_categories = result;
        }); 
        var dataPromise = imApi.get_suppliers({});
        dataPromise.then(function(result) { 
            $scope.get_suppliers = result;
        });  
        vm.saveItem = function(){
            var dataPromise = imApi.createItem({item:vm.item});
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
                    if( typeof($scope.data.item_id) !== "undefined"){
                        $state.go('app.inventory-management.items-view', {obj:{id: $scope.data.item_id}}); 
                    }
                }
            }); 
        }
        vm.itemDataClear = function(){
            vm.item = {}
        }
        vm.newItemPage = function(){
            $state.go('app.inventory-management.items-new'); 
        }
        vm.ItemsPage = function(){
            $state.go('app.inventory-management.items'); 
        }
    }
})();