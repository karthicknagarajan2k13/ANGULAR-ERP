(function ()
{
    'use strict';

    angular
        .module('app.knowledge-base')
        .controller('viewKnowledgeBasesController', viewKnowledgeBasesController);

    /** @ngInject */
    function viewKnowledgeBasesController(kbApi, $scope, $document, $state)
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
        var dataPromise = kbApi.viewKnowledgeBase($state.params.obj.id);
        dataPromise.then(function(result) { 
            $scope.knowledge_base_data = result; 
        }); 

        vm.editKnowledgeBasePage = function(knowledge_base){
             $state.go('app.knowledge-base.knowledge-base-edit', {obj:{knowledge_base: knowledge_base}});
        }
        vm.deleteKnowledgeBase = function(id){
            var delete_ids = JSON.stringify([id])
            kbApi.deleteAllKnowledgeBase({ids: delete_ids})
            $state.go('app.knowledge-base.knowledge-base'); 
        }
        vm.newKnowledgeBasePage = function(){
            $state.go('app.knowledge-base.knowledge-base-new'); 
        }
        vm.KnowledgeBasePage = function(){
            $state.go('app.knowledge-base.knowledge-base'); 
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