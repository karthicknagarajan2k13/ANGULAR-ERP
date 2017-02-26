(function ()
{
    'use strict';

    angular
        .module('app.crm')
        .controller('ViewContactController', ViewContactController);

    /** @ngInject */
    function ViewContactController($scope, crmApi, $document, $state, Product)
    {
        
		
		$scope.isOpen = false;
		$scope.demo = {
			isOpen: false,
			count: 0,
			selectedDirection: 'left'
		};
		
		var vm = this;
		
		vm.ssName = "s"
        var dataPromise = crmApi.viewContact($state.params.obj.id);
        dataPromise.then(function(result) { 
            vm.contact_data = result;
        }); 
       
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
        vm.editContactPage = function(contact){
             $state.go('app.crm.contact-detail-edit', {obj:{contact: contact}});
        }
        vm.deleteContact = function(id){
            var response = Contact.delete({id:id})
            $state.go('app.crm.contacts');
        }
        vm.editNotePage = function(note){
             $state.go('app.crm.note-detail-edit', {obj:{note: note}});
        }
        vm.viewNotePage = function(id){
            $state.go('app.crm.note-detail-view', {obj:{id: id}}); 
        }
        vm.newNotePage = function(){
            $state.go('app.crm.note-detail-new'); 
        }
        vm.deleteNote = function(id){
            Note.delete({id:id});
            $window.location.reload();
        }
        vm.deleteAllNote = function () {
            var delete_ids = [];
            angular.forEach(vm.contact_data.notes, function (checked) {
                if (checked.checked) {
                    delete_ids.push(checked.id);
                }
            });
            if (delete_ids.length >= 1){
                delete_ids = JSON.stringify(delete_ids)
                var dataPromise = crmApi.deleteAllNote({ids: delete_ids})
                dataPromise.then(function(result) { 
                    var dataPromise = crmApi.viewContact($state.params.obj.id);
                    dataPromise.then(function(result) { 
                        vm.contact_data = result;
                    }); 
                });
            }
        };
        vm.newContactPage = function(){
            console.log("===state")
            $state.go('app.crm.contact-detail-new'); 
        }
        vm.ContactsPage = function(){
            $state.go('app.crm.contacts'); 
        }
    }
})();