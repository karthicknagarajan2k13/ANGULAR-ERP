(function ()
{
    'use strict';

    angular
        .module('app.crm')
        .controller('contactsController', contactsController);

    /** @ngInject */
    function contactsController(User, $rootScope, $window, ContactDeleteAll, $state, Statuses, Orders, Contacts, Contact)
    {
		
        var vm = this;

        // Data
        vm.contacts_data = Contacts.query();
        vm.search_data = {};
        vm.orders = Orders.data;
        vm.statuses = Statuses.data;

        var session = $window.JSON.parse($window.localStorage.getItem('current_user'))
        vm.get_customers = User.get_customers({token:session.email});

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
            initComplete: function ()
            {
                var api = this.api(),
                    searchBox = angular.element('body').find('#e-commerce-products-search');

                // Bind an external input as a table wide search box
                if ( searchBox.length > 0 )
                {
                    searchBox.on('keyup', function (event)
                    {
                        api.search(event.target.value).draw();
                    });
                }
            },
            pagingType  : 'simple',
            lengthMenu  : [10, 20, 30, 50, 100],
            pageLength  : 20,
            scrollY     : 'auto',
            responsive  : true
        };

		
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
            vm.contacts_data = Contacts.query(vm.search_data);
        }   
        vm.searchContactDataClear = function(){
            vm.search_data = {}
        }
        vm.deleteContact = function(id){
            Contact.delete({id:id});
            $window.location.reload();
        }
        vm.deleteAllCustomer = function () {
            var delete_ids = [];
            angular.forEach(vm.contacts_data, function (checked) {
                if (checked.checked) {
                    delete_ids.push(checked.id);
                }
            });
            if (delete_ids.length >= 1){
                delete_ids = JSON.stringify(delete_ids)
                ContactDeleteAll.delete_all({ids: delete_ids})
                $window.location.reload();
            }
        };	
    }
})();