(function ()
{
    'use strict';

    angular
        .module('app.order-management')
        .controller('viewItemCategoryController', viewItemCategoryController);

    /** @ngInject */
    function viewItemCategoryController(imApi, $scope, $document, $state, Product)
    {

        $scope.isOpen = false;
		$scope.demo = {
			isOpen: false,
			count: 0,
			selectedDirection: 'left'
		};
		
		
		var vm = this;

        //Api Call
        var dataPromise = imApi.viewCategory($state.params.obj.id);
        dataPromise.then(function(result) { 
            $scope.category_data = result; 
        }); 


		vm.ssName = "s"
	    vm.orders = Product.data;

        vm.editItemCategoryPage = function(category){
             $state.go('app.inventory-management.item-categories-edit', {obj:{category: category}});
        }
        vm.deleteItemCategory = function(id){
            var delete_ids = JSON.stringify([id])
            imApi.deleteAllCategory({ids: delete_ids})
            $state.go('app.inventory-management.item-categories'); 
        }
        vm.newItemPage = function(){
            $state.go('app.inventory-management.items-new',{category_id: $scope.category_data.id}); 
        }
        vm.editItemPage = function(category){
             $state.go('app.inventory-management.items-edit', {obj:{item: category}});
        }
        vm.viewItemPage = function(id){
            $state.go('app.inventory-management.items-view', {obj:{id: id}}); 
        }
        vm.deleteAllItem = function () {
            var delete_ids = [];
            angular.forEach($scope.category_data.items, function (checked) {
                if (checked.checked) {
                    delete_ids.push(checked.id);
                }
            });
            if (delete_ids.length >= 1){
                delete_ids = JSON.stringify(delete_ids)
                var dataPromise = imApi.deleteAllItem({ids: delete_ids})
                dataPromise.then(function(result) { 
                    var dataPromise = imApi.viewCategory($state.params.obj.id);
                    dataPromise.then(function(result) { 
                        $scope.category_data = result; 
                    }); 
                });
            }
        };
        vm.deleteItem = function (id) {
            var delete_ids = JSON.stringify([id])
            imApi.deleteAllItem({ids: delete_ids})
            $window.location.reload();
        };
        vm.newItemCategoryPage = function(){
            $state.go('app.inventory-management.item-categories-new'); 
        }
        vm.CategoriesPage = function(){
            $state.go('app.inventory-management.item-categories'); 
        }
        
        /**
         * File upload success callback
         * Triggers when single upload completed
         *
         * @param file
         * @param message
         */
        function fileSuccess(file, message)  {
            // Iterate through the media list, find the one we
            // are added as a temp and replace its data
            // Normally you would parse the message and extract
            // the uploaded file data from it
            angular.forEach(vm.product.images, function (media, index)
            {
                if ( media.id === file.uniqueIdentifier )
                {
                    // Normally you would update the media item
                    // from database but we are cheating here!
                    var fileReader = new FileReader();
                    fileReader.readAsDataURL(media.file.file);
                    fileReader.onload = function (event)
                    {
                        media.url = event.target.result;
                    };

                    // Update the image type so the overlay can go away
                    media.type = 'image';
                }
            });
        }
		
    }
})();