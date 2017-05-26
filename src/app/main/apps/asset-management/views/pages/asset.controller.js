(function ()
{      
    'use strict';  

    angular
        .module('app.asset-management')
        .controller('AssetController', AssetController);

    /** @ngInject */
    function AssetController($window, kbApi, $scope, $state, amApi)
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
        var dataPromise = amApi.getAssets({});
        dataPromise.then(function(result) { 
            $scope.assets_data = result;
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
        
        vm.newAssetPage = function(){ 
            $state.go('app.asset-management.asset-new'); 
        }
        vm.viewAssetPage = function(id){
            $state.go('app.asset-management.asset-view', {obj:{id: id}}); 
        }
        vm.deleteAllAsset = function () {
            var delete_ids = [];
            angular.forEach($scope.assets_data, function (checked) {
                if (checked.checked) {
                    delete_ids.push(checked.id);
                }
            });
            if (delete_ids.length >= 1){
                delete_ids = JSON.stringify(delete_ids)
                var dataPromise = amApi.deleteAllAsset({ids: delete_ids})
                dataPromise.then(function(result) { 
                    var dataPromise = amApi.getAssets({});
                    dataPromise.then(function(result) { 
                        $scope.assets_data = result;
                    }); 
                });
            }
        };
        vm.searchAssetData = function(id){
            var dataPromise = amApi.getAssets(vm.search_data);
            dataPromise.then(function(result) { 
                $scope.assets_data = result;    
            }); 
        }
        vm.searchAssetDataClear = function(id){
            vm.assets_data = {}
        }
	
    }
})();