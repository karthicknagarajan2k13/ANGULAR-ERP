(function ()
{
    'use strict';

    angular
        .module('app.accounting')
        .controller('AccountController', AccountController)
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
    function AccountController($cookies,storageService,$timeout,$window, accApi, $scope, $state)
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
        $scope.show_table1 = false
        $scope.show_table2 = false
        var vm = this;

        // Data
        vm.search_data = {}
        vm.search_data.acc_type1 = []
         if( storageService.get('key') === null || storageService.get('key')  === "new"){

            var dataPromise = accApi.getAccounts({});
            dataPromise.then(function(result) { 
                $scope.accounts_data = result;
            }); 
        }else{
            storageService.save('key', "new");
            var data = $cookies.getObject('search');
            var dataPromise = accApi.getAccounts(data);
            dataPromise.then(function(result) { 
                $scope.accounts_data = result;
                vm.search_data  = data;
                /*vm.search_data.acc_type = ""*/
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

         vm.refreshData = function(){
            storageService.save('key', "new");
            $cookies.putObject("search",'');
            $state.reload();
        }

        function initComplete(){
            $scope.show_table1 = true
        }
        
        vm.newAccountPage = function(){
            $state.go('app.accounting.accounting-new'); 
        }
        vm.viewAccountPage = function(id){
            $state.go('app.accounting.accounting-view', {obj:{id: id}}); 
        }
        vm.deleteAllAccount = function () {
            var delete_ids = [];
            angular.forEach($scope.accounts_data, function (checked) {
                if (checked.checked) {
                    delete_ids.push(checked.id);
                }
            });
            if (delete_ids.length >= 1){
                delete_ids = JSON.stringify(delete_ids)
                var dataPromise = accApi.deleteAllAccount({ids: delete_ids})
                dataPromise.then(function(result) { 
                    var dataPromise = accApi.getAccounts({});
                    dataPromise.then(function(result) { 
                        $scope.accounts_data = result;
                    }); 
                });
            } 
        };
        vm.searchAccountData = function(id){
           /* vm.search_data.acc_type =  JSON.stringify(vm.search_data.acc_type1)
            var dataPromise = accApi.getAccounts(vm.search_data);
            dataPromise.then(function(result) { 
                $scope.accounts_data = result;
                vm.search_data.acc_type = ""
            }); */
             $cookies.putObject("search",vm.search_data);
            storageService.save('key', "search");
            $state.reload();
        }
        vm.searchAccountDataClear = function(id){
            vm.search_data = {}
        }

		
    }
})();