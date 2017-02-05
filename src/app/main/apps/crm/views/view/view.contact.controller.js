(function ()
{
    'use strict';

    angular
        .module('app.crm')
        .controller('ViewContactController', ViewContactController);

    /** @ngInject */
    function ViewContactController($document, $state, Product, Contact)
    {
        var vm = this;
		
		vm.ssName = "s"
	    vm.contact_data = Contact.get({id:$state.params.obj.id});
        console.log(vm.contact_data)

       
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


    }
})();