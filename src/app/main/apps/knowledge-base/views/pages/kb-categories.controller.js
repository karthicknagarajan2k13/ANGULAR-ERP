(function ()
{
    'use strict';

    angular
        .module('app.knowledge-base')
        .controller('KbCategoriesController', KbCategoriesController);

    /** @ngInject */
    function KbCategoriesController($window, kbApi, $scope, $state)
    {

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
        var dataPromise = kbApi.getKbCategories({});
        dataPromise.then(function(result) { 
            $scope.kb_categories_data = result;
            $scope.show_table2 = true
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
        }); 

        var dataPromise = kbApi.getUsers({});
        dataPromise.then(function(result) { 
            $scope.get_users = result;
        }); 




        function initComplete(){
            $scope.show_table1 = true
        }
        

        vm.newKbCategoryPage = function(){
            $state.go('app.knowledge-base.kb-categories-new'); 
        }
        vm.viewKbCategoryPage = function(id){
            $state.go('app.knowledge-base.kb-categories-view', {obj:{id: id}}); 
        }
        vm.deleteAllKbCategory = function () {
            var delete_ids = [];
            angular.forEach($scope.kb_categories_data, function (checked) {
                if (checked.checked) {
                    delete_ids.push(checked.id);
                }
            });
            if (delete_ids.length >= 1){
                delete_ids = JSON.stringify(delete_ids)
                var dataPromise = kbApi.deleteAllKbCategory({ids: delete_ids})
                dataPromise.then(function(result) { 
                    var dataPromise = kbApi.getKbCategories({});
                    dataPromise.then(function(result) { 
                        $scope.kb_categories_data = result;
                    }); 
                });
            }
        };
        vm.searchKbCategoryData = function(id){
            var dataPromise = kbApi.getKbCategories(vm.search_data);
            dataPromise.then(function(result) { 
                $scope.kb_categories_data = result; 
            }); 
        }
        vm.searchKbCategoryDataClear = function(id){
            vm.search_data = {}
        }
	
    }
})();