(function ()
{
    'use strict';

    angular
        .module('app.crm')
        .controller('contactsController', contactsController);

    /** @ngInject */
    function contactsController($scope, crmApi, User, $rootScope, $window, $state, Contact)
    {
		
		$scope.isOpen = false;
		$scope.demo = {
			isOpen: false,
			count: 0,
			selectedDirection: 'left'
		};
        $scope.show_table1 = false
        $scope.show_table2 = false

        var vm = this;

        // Data
        var dataPromise = crmApi.getContacts({});
        dataPromise.then(function(result) { 
            vm.contacts_data = result;
            $scope.show_table2 = true
            vm.dtInstance = {};
            vm.dtOptions = {
                dom         : 'rt<"bottom"<"left"<"length"l>><"right"<"info"i><"pagination"p>>>',
                columnDefs  : [
                    {
                        // Target the id column
                        targets: 0,
                        width  : '72px'
                    }
                ],
                initComplete: initComplete,
                pagingType  : 'simple',
                lengthMenu  : [10, 20, 30, 50, 100],
                pageLength  : 20,
                scrollY     : 'auto',
                responsive  : true
            };

            
        });
		
		
		
		

        vm.search_data = {};

        var session = $window.JSON.parse($window.localStorage.getItem('current_user'))
        vm.get_customers = User.get_customers({token:session.email});


        function initComplete(){
            $scope.show_table1 = true
        }
		
        // Methods
        vm.editContactPage = function(contact){
             $state.go('app.crm.contact-detail-edit', {obj:{contact: contact}});
        }
        vm.viewContactPage = function(id){
            $rootScope.contact_view_id = id
            $state.go('app.crm.contact-detail-view', {obj:{id: id}}); 
        }
        vm.newContactPage = function(){
            console.log("===state")
            $state.go('app.crm.contact-detail-new'); 
        }
        vm.searchContactData = function(){
            var dataPromise = crmApi.getContacts(vm.search_data);
            dataPromise.then(function(result) { 
                vm.contacts_data = result;
            });
        }   
        vm.searchContactDataClear = function(){
            vm.search_data = {}
        }
        vm.deleteContact = function(id){
            Contact.delete({id:id});
            $window.location.reload();
        }
        vm.deleteAllContact = function () {
            var delete_ids = [];
            angular.forEach(vm.contacts_data, function (checked) {
                if (checked.checked) {
                    delete_ids.push(checked.id);
                }
            });
            if (delete_ids.length >= 1){
                delete_ids = JSON.stringify(delete_ids)
                var dataPromise = crmApi.deleteAllContact({ids: delete_ids})
                dataPromise.then(function(result) { 
                    var dataPromise = crmApi.getContacts({});
                    dataPromise.then(function(result) { 
                        vm.contacts_data = result;
                    }); 
                });
            }
        };	
    }
})();