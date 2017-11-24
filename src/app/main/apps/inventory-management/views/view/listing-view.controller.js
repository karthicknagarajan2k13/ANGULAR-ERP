
(function ()
{
    'use strict';

    angular
        .module('app.order-management')
        .controller('viewListingController', viewListingController);

    /** @ngInject */
    function viewListingController(imApi, $scope, $mdDialog, $document, $state,$window)
    {
        /*$window.localStorage.setItem('current_user',JSON.stringify($scope.user));*/
        
		var vm = this;
		$scope.isOpen = false;
		$scope.demo = {
			isOpen: false,
			count: 0,
			selectedDirection: 'left'
		};
        vm.dtInstance = {};
        vm.dtOptions = {
            bLengthChange  : false,
            paging: false,
            searching: false,
            bInfo: false,
        };



        var session = $window.JSON.parse($window.localStorage.getItem('userInfo'))
        
     


        var dataPromise =  imApi.show_listing({"listing_id":$state.params.obj.id,user_id:session.id});
        dataPromise.then(function(result) { 
            $scope.data = result.listing;
             var dataPromise = imApi.get_item_category({user_id:session.id});
                dataPromise.then(function(result) { 
                    $scope.get_item_category = result.item_categories;
                     for (var k = 0 ; k<$scope.get_item_category.length;k++){
                         if($scope.data.item_category_id == $scope.get_item_category[k].id){
                            $scope.categoryName = $scope.get_item_category[k].title;
                         }
                     }
                }); 
        }); 

        vm.newItemPage = function(){
            $state.go('app.inventory-management.listing-new'); 
        }
        

        vm.editListingPage = function(data){
            $state.go('app.inventory-management.listing-edit', {obj:{data: data}}); 
        }
        vm.deleteListing = function(data){
                var dataPromise = imApi.delete_listing({"listing_id":data,user_id:session.id});
                	dataPromise.then(function(result) { 
                          $state.go('app.inventory-management.listing'); 
             		}); 
        }
        vm.ListingPage = function(){
            $state.go('app.inventory-management.listing'); 
        }


    }
})();