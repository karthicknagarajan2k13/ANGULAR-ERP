(function ()
{
    'use strict';

    angular
        .module('app.crm')
        .controller('notesController', notesController)
          .factory('storageService', ['$rootScope', function($rootScope) {
            return {
                get: function(key) {
                    return sessionStorage.getItem(key);
                },
                save: function(key, data) {
                    sessionStorage.setItem(key, data);
                },
                getModel: function(key) {
                    return sessionStorage.getItem(key);
                },
                setModel: function(key, data) {
                    sessionStorage.setItem(key, data);
                }
                };
        }]);

    /** @ngInject */
    function notesController(storageService,$cookies,$timeout,$scope, crmApi, $window, $state, Note, User, Contact_User)
    {

        if(storageService.get('key')=== undefined){
             storageService.save('key', "new");
        }


		$scope.isOpen = false;
		$scope.demo = {
			isOpen: false,
			count: 0,
			selectedDirection: 'left'
		};
        $scope.show_table1 = false;
        $scope.show_table2 = false;

        var vm = this;


        // Data
        if( storageService.get('key') === null || storageService.get('key')  === "new"){
            var dataPromise = crmApi.getNotes({});
            dataPromise.then(function(result) { 
                vm.notes_data = result;
              
            });
        }else{
            storageService.save('key', "new");
            var data = $cookies.getObject('noteSearch');
            var dataPromise = crmApi.getNotes(data);
            dataPromise.then(function(result) { 
                vm.notes_data = result;
                vm.search_data  = data;
            });
        }

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
        $timeout(function(){
            $scope.show_table2 = true
        }, 2000);           

         
        vm.refreshData = function(){
            storageService.save('key', "new");
            $cookies.putObject("noteSearch",'');
            $state.reload();
        }


        vm.search_data = {};

        vm.search_data = data;
        var session = $window.JSON.parse($window.localStorage.getItem('current_user'))

        vm.get_customers = User.get_customers({token:session.email});
        vm.get_contacts = Contact_User.get_contacts({token:session.email});


        function initComplete(){
            $scope.show_table1 = true
        }

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


            $cookies.putObject("noteSearch",vm.search_data);
            storageService.save('key', "search");
           
            $state.reload();
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
            console.log('--'+JSON.stringify(delete_ids));
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