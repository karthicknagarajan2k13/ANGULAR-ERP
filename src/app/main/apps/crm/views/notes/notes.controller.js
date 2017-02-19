(function ()
{
    'use strict';

    angular
        .module('app.crm')
        .controller('notesController', notesController);

    /** @ngInject */
    function notesController(crmApi, $window, $state, Statuses, Orders, Note, User, Contact_User)
    {
		
        var vm = this;

        // Data
        var dataPromise = crmApi.getNotes({});
        dataPromise.then(function(result) { 
            vm.notes_data = result;
        });

        vm.search_data = {};
        vm.orders = Orders.data;
        vm.statuses = Statuses.data;
        var session = $window.JSON.parse($window.localStorage.getItem('current_user'))

        vm.get_customers = User.get_customers({token:session.email});
        vm.get_contacts = Contact_User.get_contacts({token:session.email});
        console.log("User",vm.get_contacts)

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
        vm.editNotePage = function(note){
             $state.go('app.crm.note-detail-edit', {obj:{note: note}});
        }
        vm.viewNotePage = function(id){
            $state.go('app.crm.note-detail-view', {obj:{id: id}}); 
        }
        vm.newNotePage = function(){
            $state.go('app.crm.note-detail-new'); 
        }
        vm.searchNoteData = function(){
            var dataPromise = crmApi.getNotes(vm.search_data);
            dataPromise.then(function(result) { 
                vm.notes_data = result;
            });
        }   
        vm.searchNoteDataClear = function(){
            vm.search_data = {}
        }
        vm.deleteNote = function(id){
            Note.delete({id:id});
            $window.location.reload();
        }
        vm.deleteAllNote = function () {
            var delete_ids = [];
            angular.forEach(vm.notes_data, function (checked) {
                if (checked.checked) {
                    delete_ids.push(checked.id);
                }
            });
            if (delete_ids.length >= 1){
                delete_ids = JSON.stringify(delete_ids)
                var dataPromise = crmApi.deleteAllNote({ids: delete_ids})
                dataPromise.then(function(result) { 
                    var dataPromise = crmApi.getNotes({});
                    dataPromise.then(function(result) { 
                        vm.notes_data = result;
                    }); 
                });
            }
        };
		
    }
})();