(function ()
{
    'use strict';

    angular
        .module('app.asset-management')
        .controller('editMaintananceController', editMaintananceController);

    /** @ngInject */ 
    function editMaintananceController(kbApi, $scope, $document, $state, amApi)
    {

        $scope.isOpen = false;
        $scope.demo = {
        isOpen: false,
        count: 0,
        selectedDirection: 'left'
        };
        var vm = this;
        vm.maintanance_schedule = $state.params.obj
        console.log("vm.maintanance_schedule",vm.maintanance_schedule)

        
        vm.ssName = "s"  

        var dataPromise = amApi.get_assets({});
        dataPromise.then(function(result) { 
            $scope.get_assets = result;
        }); 

        vm.updateMaintanance = function(){
           var dataPromise = amApi.updateMaintanance(vm.maintanance_schedule.maintanance.id,vm.maintanance_schedule);
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
        vm.viewMaintanancePage =function(id){
            $state.go('app.asset-management.maintanance-view', {obj:{id: id}}); 
        }
        vm.newMaintanancePage = function(){
            $state.go('app.asset-management.maintanance-new'); 
        }
        vm.MaintanancePage = function(){
            $state.go('app.asset-management.Maintanance'); 
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