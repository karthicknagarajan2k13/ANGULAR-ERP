(function ()
{
    'use strict';

    angular
        .module('app.crm')
        .controller('CustomerController', CustomerController);

    /** @ngInject */
    function CustomerController($scope, crmApi, Contact, $window, $document, $state, Customer)
    {
        
		
		$scope.isOpen = false;
		$scope.demo = {
			isOpen: false,
			count: 0,
			selectedDirection: 'left'
		};
		
		var vm = this;
		
		vm.ssName = "s"

        var dataPromise = crmApi.viewCustomer($state.params.obj.id);
        dataPromise.then(function(result) { 
            vm.customer_data = result;
        }); 

        vm.editCustomerPage = function(customer){
             $state.go('app.crm.customer-detail-edit', {obj:{customer: customer}});
        }
        vm.deleteCustomer = function(id){
            var response = Customer.delete({id:id})
            $state.go('app.crm.customers');
        }
        vm.newContactPage = function(){
            $state.go('app.crm.contact-detail-new',{customer_id: vm.customer_data.id}); 
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
            console.log("vm.customer_data",vm.customer_data)
            $state.go('app.crm.note-detail-new', {customer_id: vm.customer_data.id}); 
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
        vm.CustomersPage = function(){
            $state.go('app.crm.customers'); 
        }
        vm.dtInstance = {};
        vm.dtOptions = {
            bLengthChange  : false,
            paging: false,
            searching: false,
            bInfo: false,
        };
    }
})();