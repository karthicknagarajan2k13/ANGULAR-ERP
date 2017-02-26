(function ()
{
    'use strict';

    angular
        .module('app.manufacturing')
        .controller('viewManufacturingController', viewManufacturingController);

    /** @ngInject */
    function viewManufacturingController(mfgApi, $scope, $document, $state)
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
        var dataPromise = mfgApi.viewManufacturing($state.params.obj.id);
        dataPromise.then(function(result) { 
            $scope.manufacturing_data = result; 
        }); 

        vm.editManufacturingPage = function(manufacturing){
             $state.go('app.manufacturing.manufacturing-edit', {obj:{manufacturing: manufacturing}});
        }
        vm.deleteManufacturing = function(id){
            var delete_ids = JSON.stringify([id])
            mfgApi.deleteAllManufacturing({ids: delete_ids})
            $state.go('app.manufacturing.manufacturing'); 
        }
        vm.newManufacturingPage = function(){
            $state.go('app.manufacturing.manufacturing-new'); 
        }


        vm.newMaterialPage = function(){
            $state.go('app.manufacturing.materials-new'); 
        }
        vm.viewMaterialPage = function(id){
            $state.go('app.manufacturing.materials-view', {obj:{id: id}}); 
        }
        vm.deleteAllMaterial = function () {
            var delete_ids = [];
            angular.forEach($scope.manufacturing_data.materials, function (checked) {
                if (checked.checked) {
                    delete_ids.push(checked.id);
                }
            });
            if (delete_ids.length >= 1){
                delete_ids = JSON.stringify(delete_ids)
                var dataPromise = mfgApi.deleteAllMaterial({ids: delete_ids})
                dataPromise.then(function(result) { 
                    var dataPromise = mfgApi.viewManufacturing($state.params.obj.id);
                    dataPromise.then(function(result) { 
                        $scope.manufacturing_data = result; 
                    });  
                });
            }
        };
        vm.ManufacturingsPage = function(){
            $state.go('app.manufacturing.manufacturing'); 
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