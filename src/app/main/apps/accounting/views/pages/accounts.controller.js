(function ()
{
    'use strict';

    angular
        .module('app.accounting')
        .controller('AccountController', AccountController);

    /** @ngInject */
    function AccountController($window, accApi, $scope, $state)
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
        vm.search_data.acc_type1 = []

        var dataPromise = accApi.getAccounts({});
        dataPromise.then(function(result) { 
            $scope.accounts_data = result;
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
            vm.search_data.acc_type =  JSON.stringify(vm.search_data.acc_type1)
            var dataPromise = accApi.getAccounts(vm.search_data);
            dataPromise.then(function(result) { 
                $scope.accounts_data = result;
                vm.search_data.acc_type = ""
            }); 
        }
        vm.searchAccountDataClear = function(id){
            vm.search_data = {}
        }

		
    }
})();