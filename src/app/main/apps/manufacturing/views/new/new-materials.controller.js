(function ()
{
    'use strict';

    angular
        .module('app.manufacturing')
        .controller('newMaterialController', newMaterialController);

    /** @ngInject */
    function newMaterialController(mfgApi, $scope, $document, $state)
    {

        $scope.isOpen = false;
        $scope.demo = {
        isOpen: false,
        count: 0,
        selectedDirection: 'left'
        };
        var vm = this;
        vm.material = {}
		vm.ssName = "s"

        var dataPromise = mfgApi.get_manufacturings({});
        dataPromise.then(function(result) { 
            $scope.get_manufacturings = result;
        }); 


        vm.saveMaterial = function(){
            console.log("material",vm.material)
            var dataPromise = mfgApi.createMaterial({material:vm.material});
            dataPromise.then(function(result) { 
                $scope.data = result; 
                if( typeof($scope.data.message) !== "undefined"){
                    console.log("response",$scope.data.message)
                }else{
                    if( typeof($scope.data.material_id) !== "undefined"){
                        $state.go('app.manufacturing.materials-view', {obj:{id: $scope.data.material_id}}); 
                    }
                }
            }); 
        }
        vm.materialDataClear = function(){
            vm.material = {}
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