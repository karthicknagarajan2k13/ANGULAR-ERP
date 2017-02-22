(function ()
{
    'use strict';

    angular
        .module('app.crm')
        .controller('ViewNoteController', ViewNoteController);

    /** @ngInject */
    function ViewNoteController($scope, $document, $state, Product, Note)
    {
        
		
		$scope.isOpen = false;
		$scope.demo = {
			isOpen: false,
			count: 0,
			selectedDirection: 'left'
		};
		
		var vm = this;
		
		vm.ssName = "s"
	    vm.note_data = Note.get({id:$state.params.obj.id});
        console.log(vm.note_data)

       
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
        vm.editNotePage = function(note){
             $state.go('app.crm.note-detail-edit', {obj:{note: note}});
        }
        vm.deleteNote = function(id){
            var response = Note.delete({id:id})
            $state.go('app.crm.notes');
        }
        vm.newNotePage = function(){
            $state.go('app.crm.note-detail-new'); 
        }

    }
})();