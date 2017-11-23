(function ()
{
    'use strict';

    angular
        .module('app.inventory-management')
        .controller('newItemCategoryController', newItemCategoryController)
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
    function newItemCategoryController($mdToast,imApi, $scope, $document, $state)
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
        vm.category = {}
		
		vm.ssName = "s"

        vm.saveCategory = function(){
            var dataPromise = imApi.createCategory({category:vm.category});
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
                    if( typeof($scope.data.category_id) !== "undefined"){
                        $state.go('app.inventory-management.items-categories-view', {obj:{id: $scope.data.category_id}}); 
                    }
                }
            }); 
        }
        vm.categoryDataClear = function(){
            vm.category = {}
        }
        vm.newItemCategoryPage = function(){
            $state.go('app.inventory-management.item-categories-new'); 
        }
        vm.CategoriesPage = function(){
            $state.go('app.inventory-management.item-categories'); 
        }
    }
})();