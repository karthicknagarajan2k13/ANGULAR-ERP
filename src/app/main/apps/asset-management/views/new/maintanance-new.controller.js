(function ()
{
    'use strict';   

    angular
        .module('app.asset-management')
        .controller('newMaintananceController', newMaintananceController);

    /** @ngInject */
    function newMaintananceController(kbApi, $scope, $document, $state, amApi)
    {

        $scope.isOpen = false;
        $scope.demo = {
        isOpen: false,
        count: 0,
        selectedDirection: 'left'
        };

        var vm = this;
        vm.maintanance = {}
        vm.maintanance.asset_id = $state.params.asset_id
        vm.ssName = "s"

        var dataPromise = amApi.get_assets({});
        dataPromise.then(function(result) { 
            $scope.get_assets = result;
        }); 

        vm.saveMaintanance = function(){
            console.log("maintanance",vm.maintanance)
            var dataPromise = amApi.createMaintanance({maintanance:vm.maintanance});
            dataPromise.then(function(result) { 
                $scope.data = result; 
                if( typeof($scope.data.message) !== "undefined"){
                    console.log("response",$scope.data.message)
                }else{
                    if( typeof($scope.data.maintanance_schedule_id) !== "undefined"){
                        $state.go('app.asset-management.maintanance-view', {obj:{id: $scope.data.maintanance_schedule_id}}); 
                    }
                }
            }); 
        }
        vm.maintananceDataClear = function(){
            vm.maintanance = {}
        }
        vm.newMaintanancePage = function(){ 
            $state.go('app.asset-management.maintanance-new'); 
        }
        vm.MaintanancePage = function(){
            $state.go('app.asset-management.maintanance'); 
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