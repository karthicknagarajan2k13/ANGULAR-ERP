(function ()
{
    'use strict';

    angular
        .module('app.knowledge-base')
        .controller('KnowledgeBasesController', KnowledgeBasesController)
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
    function KnowledgeBasesController($cookies,storageService,$timeout,$window, kbApi, $scope, $state)
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
        var vm = this;
        $scope.show_table1 = false
        $scope.show_table2 = false
        // Data
        vm.search_data = {}
        if( storageService.get('key') === null || storageService.get('key')  === "new"){
            var dataPromise = kbApi.getKnowledgeBases({});
            dataPromise.then(function(result) { 
                $scope.knowledge_bases_data = result;
                
            }); 
        }else{
            storageService.save('key', "new");
            var data = $cookies.getObject('search');
            var dataPromise = kbApi.getKnowledgeBases(data);
            dataPromise.then(function(result) { 
                $scope.knowledge_bases_data = result; 
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
                    width  : '10px'
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

        var dataPromise = kbApi.getUsers({});
        dataPromise.then(function(result) { 
            $scope.get_users = result;
        }); 

        var dataPromise = kbApi.get_kb_categories({});
        dataPromise.then(function(result) { 
            $scope.get_kb_categories = result;
        });



        function initComplete(){
            $scope.show_table1 = true
        }

        vm.refreshData = function(){
            storageService.save('key', "new");
            $cookies.putObject("search",'');
            $state.reload();
        }
        
        vm.newKnowledgeBasePage = function(){
            $state.go('app.knowledge-base.knowledge-base-new'); 
        }
        vm.viewKnowledgeBasePage = function(id){
            $state.go('app.knowledge-base.knowledge-base-view', {obj:{id: id}}); 
        }
        vm.deleteAllKnowledgeBase = function () {
            var delete_ids = [];
            angular.forEach($scope.knowledge_bases_data, function (checked) {
                if (checked.checked) {
                    delete_ids.push(checked.id);
                }
            });
            if (delete_ids.length >= 1){
                delete_ids = JSON.stringify(delete_ids)
                var dataPromise = kbApi.deleteAllKnowledgeBase({ids: delete_ids})
                dataPromise.then(function(result) { 
                    var dataPromise = kbApi.getKnowledgeBases({});
                    dataPromise.then(function(result) { 
                        $scope.knowledge_bases_data = result;
                    }); 
                });
            }
        };
        vm.searchKnowledgeBaseData = function(id){
            /*var dataPromise = kbApi.getKnowledgeBases(vm.search_data);
            dataPromise.then(function(result) { 
                $scope.knowledge_bases_data = result; 
            }); */

            $cookies.putObject("search",vm.search_data);
            storageService.save('key', "search");
            $state.reload();
        }
        vm.searchKnowledgeBaseDataClear = function(id){
            vm.search_data = {}
        }

		
    }
})();