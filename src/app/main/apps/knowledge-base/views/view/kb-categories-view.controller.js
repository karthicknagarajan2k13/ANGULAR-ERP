(function ()
{
    'use strict';

    angular
        .module('app.knowledge-base')
        .controller('viewKbCategoriesController', viewKbCategoriesController);

    /** @ngInject */
    function viewKbCategoriesController(kbApi, $scope, $document, $state)
    {
        var vm = this;
        $scope.isOpen = false;
        $scope.demo = {
            isOpen: false,
            count: 0,
            selectedDirection: 'left'
        };
        vm.dtInstance = {};
        vm.dtOptions = {
            bLengthChange  : false,
            paging: false,
            searching: false,
            bInfo: false,
        };
        
        vm.ssName = "s"

        //Api Call
        var dataPromise = kbApi.viewKbCategory($state.params.obj.id);
        dataPromise.then(function(result) { 
            $scope.kb_category_data = result; 
        }); 

        vm.editKbCategoryPage = function(kb_category){
             $state.go('app.knowledge-base.kb-categories-edit', {obj:{kb_category: kb_category}});
        }
        vm.deleteKbCategory = function(id){
            var delete_ids = JSON.stringify([id])
            kbApi.deleteAllKbCategory({ids: delete_ids})
            $state.go('app.knowledge-base.kb-categories'); 
        }
        vm.newKbCategoryPage = function(){
            $state.go('app.knowledge-base.kb-categories-new'); 
        }


        vm.newKnowledgeBasePage = function(){
            $state.go('app.knowledge-base.knowledge-base-new',{kb_category_id: $scope.kb_category_data.id}); 
        }
        vm.viewKnowledgeBasePage = function(id){
            $state.go('app.knowledge-base.knowledge-base-view', {obj:{id: id}}); 
        }
        vm.deleteAllKnowledgeBase = function () {
            var delete_ids = [];
            angular.forEach($scope.kb_category_data.knowledge_bases, function (checked) {
                if (checked.checked) {
                    delete_ids.push(checked.id);
                }
            });
            if (delete_ids.length >= 1){
                delete_ids = JSON.stringify(delete_ids)
                var dataPromise = kbApi.deleteAllKnowledgeBase({ids: delete_ids})
                dataPromise.then(function(result) { 
                    var dataPromise = kbApi.viewKbCategory($state.params.obj.id);
                    dataPromise.then(function(result) { 
                        $scope.kb_category_data = result; 
                    }); 
                });
            }
        };
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