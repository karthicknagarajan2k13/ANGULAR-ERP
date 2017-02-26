(function ()
{
    'use strict';

    angular
        .module('app.knowledge-base')
        .controller('editKbCategoriesController', editKbCategoriesController);

    /** @ngInject */
    function editKbCategoriesController(kbApi, $scope, $document, $state)
    {

        $scope.isOpen = false;
        $scope.demo = {
        isOpen: false,
        count: 0,
        selectedDirection: 'left'
        };
        var vm = this;
		vm.kb_category = $state.params.obj

        
		vm.ssName = "s"

        vm.updateKbCategory = function(){
           var dataPromise = kbApi.updateKbCategory(vm.kb_category.kb_category.id,vm.kb_category);
            dataPromise.then(function(result) { 
                $scope.data = result; 
                if( typeof($scope.data.message) !== "undefined"){
                    console.log("response",$scope.data.message)
                }else{
                    if( typeof($scope.data.kb_category_id) !== "undefined"){
                        $state.go('app.knowledge-base.kb-categories-view', {obj:{id: $scope.data.kb_category_id}}); 
                    }
                }
            }); 
        }
        vm.viewKbCategoryPage =function(id){
            $state.go('app.knowledge-base.kb-categories-view', {obj:{id: id}}); 
        }
        vm.newKbCategoryPage = function(){
            $state.go('app.knowledge-base.kb-categories-new'); 
        }
        vm.KbCategoriesPage = function(){
            $state.go('app.knowledge-base.kb-categories'); 
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