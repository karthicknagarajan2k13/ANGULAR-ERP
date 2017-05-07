(function ()
{
    'use strict';

    angular
        .module('app.asset-management')
        .controller('editAssetController', editAssetController);

    /** @ngInject */ 
    function editAssetController(kbApi, $scope, $document, $state, amApi)
    {

        $scope.isOpen = false;
        $scope.demo = {
        isOpen: false,
        count: 0,
        selectedDirection: 'left'
        };
        var vm = this;
		vm.asset = $state.params.obj

        
		vm.ssName = "s"   

        vm.updateAsset = function(){
           var dataPromise = amApi.updateAsset(vm.asset.asset.id,vm.asset);
            dataPromise.then(function(result) { 
                $scope.data = result; 
                if( typeof($scope.data.message) !== "undefined"){
                    console.log("response",$scope.data.message)
                }else{
                    if( typeof($scope.data.asset_id) !== "undefined"){
                        $state.go('app.asset-management.asset-view', {obj:{id: $scope.data.asset_id}}); 
                    }
                }
            }); 
        }
        vm.viewAssetPage =function(id){
            $state.go('app.asset-management.asset-view', {obj:{id: id}}); 
        }
        vm.newAssetPage = function(){
            $state.go('app.asset-management.asset-new'); 
        }
        vm.AssetPage = function(){
            $state.go('app.asset-management.Asset'); 
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