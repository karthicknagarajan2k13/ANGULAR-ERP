(function ()
{
    'use strict';

    angular
        .module('app.knowledge-base')
        .controller('KnowledgeBasesController', KnowledgeBasesController);

    /** @ngInject */
    function KnowledgeBasesController($window, kbApi, $scope, $state)
    {

        $scope.isOpen = false;
        $scope.demo = {
            isOpen: false,
            count: 0,
            selectedDirection: 'left'
        };
        var vm = this;

        // Data
        vm.search_data = {}
        var dataPromise = kbApi.getKnowledgeBases({});
        dataPromise.then(function(result) { 
            $scope.knowledge_bases_data = result;
            console.log("$scope.knowledge_bases_data",$scope.knowledge_bases_data)
        }); 

        var dataPromise = kbApi.getUsers({});
        dataPromise.then(function(result) { 
            $scope.get_users = result;
        }); 

        var dataPromise = kbApi.get_kb_categories({});
        dataPromise.then(function(result) { 
            $scope.get_kb_categories = result;
        });

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
            var dataPromise = kbApi.getKnowledgeBases(vm.search_data);
            dataPromise.then(function(result) { 
                $scope.knowledge_bases_data = result; 
            }); 
        }
        vm.searchKnowledgeBaseDataClear = function(id){
            vm.search_data = {}
        }

		
    }
})();