(function ()
{
    'use strict';

    angular
        .module('app.crm')
        .controller('CustomerController', CustomerController);

    /** @ngInject */
    function CustomerController(crmApi, Contact, $window, $document, $state, Product, Customer)
    {
        var vm = this;
		
		vm.ssName = "s"

        var dataPromise = crmApi.viewCustomer($state.params.obj.id);
        dataPromise.then(function(result) { 
            vm.customer_data = result;
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

        vm.editCustomerPage = function(customer){
             $state.go('app.crm.customer-detail-edit', {obj:{customer: customer}});
        }
        vm.deleteCustomer = function(id){
            var response = Customer.delete({id:id})
            $state.go('app.crm.customers');
        }
        vm.newContactPage = function(){
            $state.go('app.crm.contact-detail-new'); 
        }
        vm.deleteAllContact = function () {
            var delete_ids = [];
            angular.forEach(vm.customer_data.contacts, function (checked) {
                if (checked.checked) {
                    delete_ids.push(checked.id);
                }
            });
            if (delete_ids.length >= 1){
                delete_ids = JSON.stringify(delete_ids)
                var dataPromise = crmApi.deleteAllContact({ids: delete_ids})
                dataPromise.then(function(result) { 
                    var dataPromise = crmApi.viewCustomer($state.params.obj.id);
                    dataPromise.then(function(result) { 
                        vm.customer_data = result
                    }); 
                });
            }
        };  

        vm.viewContactPage = function(id){
            $state.go('app.crm.contact-detail-view', {obj:{id: id}}); 
        }
        vm.deleteContact = function(id){
            Contact.delete({id:id});
            $window.location.reload();
        }
        vm.editContactPage = function(contact){
             $state.go('app.crm.contact-detail-edit', {obj:{contact: contact}});
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
            angular.forEach(vm.customer_data.notes, function (checked) {
                if (checked.checked) {
                    delete_ids.push(checked.id);
                }
            });
            if (delete_ids.length >= 1){
                delete_ids = JSON.stringify(delete_ids)
                var dataPromise = crmApi.deleteAllNote({ids: delete_ids})
                dataPromise.then(function(result) { 
                    var dataPromise = crmApi.viewCustomer($state.params.obj.id);
                    dataPromise.then(function(result) { 
                        vm.customer_data = result
                    }); 
                });
            }
        }; 
        vm.newCustomerPage = function(){
            $state.go('app.crm.customer-detail-new'); 
        }


    }
})();