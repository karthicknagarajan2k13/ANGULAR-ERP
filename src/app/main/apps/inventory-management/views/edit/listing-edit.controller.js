(function ()
{
    'use strict';

    angular
        .module('app.inventory-management')
        .controller('editListing', editListing);

    /** @ngInject */
    function editListing($mdToast,imApi, $scope, $document, $state,$window)
    {

      $scope.isOpen = false;
        $scope.demo = {
        isOpen: false,
        count: 0,
        selectedDirection: 'left'
        };
        var vm = this;



        vm.listing = $state.params.obj.data;
        vm.listing.cost = parseFloat(vm.listing.cost);
        vm.listing.publish_on = new Date(vm.listing.publish_on);
        vm.list_id = vm.listing.id;
       
        var last = {
          bottom: false,
          top: true,
          left: false,
          right: true
        };

        var session = $window.JSON.parse($window.localStorage.getItem('userInfo'))


        var dataPromise = imApi.get_item_category({user_id:session.id});
        dataPromise.then(function(result) { 
            $scope.get_item_category = result.item_categories;
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
     

        vm.updateListing = function(){
            var  create_listing_data=  {
                "listing[item_category_id]": vm.listing.item_category_id,
                "listing[title]": vm.listing.title,
                "listing[make]": vm.listing.make,
                "listing[model]": vm.listing.model,
                "listing[description]": vm.listing.description,
                "listing[shipping_preset_id]": null,
                "listing[cost]": vm.listing.cost,
                "listing[publish_on]": vm.listing.publish_on,
                "user_id": session.id,
                "listing_id":vm.list_id
            };


             var dataPromise = imApi.edit_listing(create_listing_data);
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
                         $state.go('app.inventory-management.listing', {obj:{id: $scope.data.item_id}}); 
                    }
              });
        }

     /*   vm.deleteListing = function(data){
           console.log("Delete Lsiting ---"+data)
           var dataPromise = imApi.delete_listing({"listing_id":data,user_id:session.id});
            dataPromise.then(function(result) { 
                    $state.go('app.inventory-management.listing'); 
          }); 
        }*/

        vm.itemDataClear = function(){
            vm.listing = {}
        }

        
        vm.newItemPage = function(){
            $state.go('app.inventory-management.listing-new'); 
        }

  
    }
})();