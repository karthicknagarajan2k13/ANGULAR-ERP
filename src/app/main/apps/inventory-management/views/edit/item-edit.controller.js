(function ()
{
    'use strict';

    angular
        .module('app.inventory-management')
        .controller('editItemController', editItemController);

    /** @ngInject */
    function editItemController(imApi, $scope, $document, $state, Product)
    {

        var vm = this;
		vm.item = $state.params.obj
        console.log("vm.item",vm.item)

		vm.ssName = "s"
	    vm.orders = Product.data;
        
        var dataPromise = imApi.get_categories({});
        dataPromise.then(function(result) { 
            $scope.get_categories = result;
        }); 
        var dataPromise = imApi.get_suppliers({});
        dataPromise.then(function(result) { 
            $scope.get_suppliers = result;
        });

        vm.updateItem = function(){
           var dataPromise = imApi.updateItem(vm.item.item.id,vm.item);
            dataPromise.then(function(result) { 
                $scope.data = result; 
                if( typeof($scope.data.message) !== "undefined"){
                    console.log("response",$scope.data.message)
                }else{
                    if( typeof($scope.data.item_id) !== "undefined"){
                        $state.go('app.inventory-management.items-view', {obj:{id: $scope.data.item_id}}); 
                    }
                }
            }); 
        }

        vm.viewItemPage =function(id){
            $state.go('app.inventory-management.items-view', {obj:{id: id}}); 
        }
        vm.newItemPage = function(){
            $state.go('app.inventory-management.items-new'); 
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