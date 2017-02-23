(function ()
{
    'use strict';

    angular
        .module('app.manufacturing')
        .controller('viewMaterialController', viewMaterialController);

    /** @ngInject */
    function viewMaterialController(mfgApi, $scope, $document, $state)
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
        var dataPromise = mfgApi.viewMaterial($state.params.obj.id);
        dataPromise.then(function(result) { 
            $scope.material_data = result; 
        }); 

        vm.editMaterialPage = function(material){
             $state.go('app.manufacturing.materials-edit', {obj:{material: material}});
        }
        vm.deleteMaterial = function(id){
            var delete_ids = JSON.stringify([id])
            mfgApi.deleteAllMaterial({ids: delete_ids})
            $state.go('app.manufacturing.materials'); 
        }
        vm.newMaterialPage = function(){
            $state.go('app.manufacturing.materials-new'); 
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