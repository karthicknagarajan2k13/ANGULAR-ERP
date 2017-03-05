(function ()
{
    'use strict';

    angular
        .module('app.order-management')
        .controller('ConnectedAccountsController', ConnectedAccountsController);

    /** @ngInject */
    function ConnectedAccountsController($window, omApi, $scope, $state, Statuses, Orders)
    {

        var vm = this;
        vm.data = {}
        vm.new_data ={}

        var dataPromise = omApi.getAccounts();
        dataPromise.then(function(result) { 
            $scope.accounts = result; 
            console.log("$scope.accounts",$scope.accounts)
        });

        var dataPromise = omApi.getMarketplaces();
        dataPromise.then(function(result) { 
            $scope.marketplaces = result; 
            console.log("$scope.marketplaces",$scope.marketplaces)
        });

        vm.createMarketplace = function(){
            var dataPromise = omApi.createMarketplace(vm.new_data);
            dataPromise.then(function(result) { 
                $scope.data = result; 
                if( typeof($scope.data.message) !== "undefined"){
                    console.log("response",$scope.data.message)
                }else{
                    if( typeof($scope.data.account_id) !== "undefined"){
                        var dataPromise = omApi.getAccounts();
                        dataPromise.then(function(result) { 
                            $scope.accounts = result; 
                            console.log("$scope.accounts",$scope.accounts)
                        });                    
                    }
                }
            }); 
        }

        vm.connect =function(account_id){
            vm.data.id = account_id
            vm.data.account_id = account_id
            var dataPromise = omApi.connectAccount(vm.data);
            dataPromise.then(function(result) {
                console.log("url",result.url)
                $window.location = result.url;              
            }); 
        }

        vm.amazonAccountConnect =function(id){
            $state.go('app.order-management.amazon',{obj:{id: id}}); 
        }
        vm.shopifyAccountConnect =function(id){
            $state.go('app.order-management.shopify',{obj:{id: id}}); 
        }
       
        vm.accountDisConnect =function(id){
            var dataPromise = omApi.desconnectAccounts({id:id});
            dataPromise.then(function(result) {
                var dataPromise = omApi.getAccounts();
                dataPromise.then(function(result) { 
                    $scope.accounts = result; 
                    console.log("$scope.accounts",$scope.accounts)
                });
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
		

        
    }
})();