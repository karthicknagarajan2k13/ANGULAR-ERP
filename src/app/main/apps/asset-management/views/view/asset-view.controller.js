(function ()
{
    'use strict';

    angular
        .module('app.asset-management')
        .controller('viewAssetController', viewAssetController);

    /** @ngInject */
    function viewAssetController(kbApi, $scope, $document, $state, amApi)
    {

        $scope.isOpen = false;
        $scope.demo = {
        isOpen: false,
        count: 0,
        selectedDirection: 'left'
        };
        var vm = this;
        vm.ssName = "s"

        //Api Call
        var dataPromise = amApi.viewAsset($state.params.obj.id);
        dataPromise.then(function(result) { 
            $scope.asset_data = result;
            console.log("$scope.asset_data",$scope.asset_data)
        }); 

        vm.editAssetPage = function(asset){ 
             $state.go('app.asset-management.asset-edit', {obj:{asset: asset}});
        }
        vm.deleteAllAsset = function(id){
            var delete_ids = JSON.stringify([id])
            amApi.deleteAllAsset({ids: delete_ids})
            $state.go('app.asset-management.asset');    
        }
        vm.newAssetPage = function(){
            $state.go('app.asset-management.asset-new'); 
        }


        vm.newMaintanancePage = function(){
            $state.go('app.asset-management.maintanance-new'); 
        }
        vm.viewMaintanancePage = function(id){
            $state.go('app.asset-management.maintanance-view', {obj:{id: id}}); 
        }
        vm.deleteAllMaintanance = function () {
            var delete_ids = [];
            angular.forEach($scope.asset_data.maintanance_schedules, function (checked) {
                if (checked.checked) {
                    delete_ids.push(checked.id);
                }
            });
            if (delete_ids.length >= 1){
                delete_ids = JSON.stringify(delete_ids)
                var dataPromise = amApi.deleteAllMaintanance({ids: delete_ids})
                dataPromise.then(function(result) { 
                    var dataPromise = amApi.viewAsset($state.params.obj.id);
                    dataPromise.then(function(result) { 
                        $scope.asset_data = result; 
                    }); 
                });
            }
        };
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

        vm.dtInstance = {};
        vm.dtOptions = {
            bLengthChange  : false,
            paging: false,
            searching: false,
            bInfo: false,
        };
        
    }
})();