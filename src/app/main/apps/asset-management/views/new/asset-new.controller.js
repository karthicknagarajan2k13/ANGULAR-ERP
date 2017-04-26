(function ()
{
    'use strict';

    angular
        .module('app.asset-management')
        .controller('newAssetController', newAssetController);

    /** @ngInject */
    function newAssetController(kbApi, $scope, $document, $state, amApi)
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


        vm.saveAsset = function(){
            console.log("asset",vm.asset)
            var dataPromise = amApi.createAsset({asset:vm.asset});
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
        vm.AssetDataClear = function(){
            vm.asset = {}
        }
        vm.newAssetPage = function(){ 
            $state.go('app.asset-management.asset-new'); 
        }
        vm.AssetPage = function(){
            $state.go('app.asset-management.asset'); 
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