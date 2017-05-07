(function ()
{
    'use strict';

    angular
        .module('app.asset-management')
        .controller('viewMaintananceController', viewMaintananceController);

    /** @ngInject */
    function viewMaintananceController(kbApi, $scope, $document, $state, amApi)
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
        var dataPromise = amApi.viewMaintanance($state.params.obj.id);
        dataPromise.then(function(result) { 
            $scope.maintanance_data = result;
            console.log("$scope.maintanance_data",$scope.maintanance_data)
        }); 

        vm.editMaintanancePage = function(maintanance){
             $state.go('app.asset-management.maintanance-edit', {obj:{maintanance: maintanance}});
        }
        vm.deleteAllMaintanance = function(id){
            var delete_ids = JSON.stringify([id])
            amApi.deleteAllMaintanance({ids: delete_ids})
            $state.go('app.asset-management.maintanance'); 
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