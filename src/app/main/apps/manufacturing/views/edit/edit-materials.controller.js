(function ()
{
    'use strict';

    angular
        .module('app.manufacturing')
        .controller('editMaterialController', editMaterialController);

    /** @ngInject */
    function editMaterialController(mfgApi, $scope, $document, $state)
    {

        $scope.isOpen = false;
        $scope.demo = {
        isOpen: false,
        count: 0,
        selectedDirection: 'left'
        };
        var vm = this;
		vm.material = $state.params.obj
        console.log("vm.material",vm.material)

        var dataPromise = mfgApi.get_manufacturings({});
        dataPromise.then(function(result) { 
            $scope.get_manufacturings = result;
        }); 
        
		vm.ssName = "s"

        vm.updateMaterial = function(){
           var dataPromise = mfgApi.updateMaterial(vm.material.material.id,vm.material);
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
        vm.viewMaterialPage =function(id){
            $state.go('app.manufacturing.materials-view', {obj:{id: id}}); 
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