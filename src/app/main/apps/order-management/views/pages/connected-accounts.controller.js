(function ()
{
    'use strict';

    angular
        .module('app.order-management')
        .controller('ConnectedAccountsController', ConnectedAccountsController);

    /** @ngInject */
    function ConnectedAccountsController($mdToast,fuseTheming, $mdDialog, $document, $window, omApi, $scope, $state)
    {

        var vm = this;
        vm.data = {}
        vm.new_data = {}
        var last = {
          bottom: false,
          top: true,
          left: false,
          right: true
        };
        function sanitizePosition() {
            var current = $scope.toastPosition;
            if ( current.bottom && last.top ) current.top = false;
            if ( current.top && last.bottom ) current.bottom = false;
            if ( current.right && last.left ) current.left = false;
            if ( current.left && last.right ) current.right = false;
            last = angular.extend({},current);
        }
        $scope.toastPosition = angular.extend({},last);
        $scope.getToastPosition = function() {
        sanitizePosition();
        return Object.keys($scope.toastPosition)
          .filter(function(pos) { return $scope.toastPosition[pos]; })
          .join(' ');
        };
        vm.themes = fuseTheming.themes;

        var dataPromise = omApi.getAccounts();
        dataPromise.then(function(result) { 
            $scope.accounts = result; 
        });

        var dataPromise = omApi.getMarketplaces();
        dataPromise.then(function(result) { 
            $scope.marketplaces = result; 
        });

        vm.createMarketplace = function(){
            var dataPromise = omApi.createMarketplace(vm.new_data);
            dataPromise.then(function(result) { 
                $scope.data = result; 
                if( typeof($scope.data.message) !== "undefined"){
                    var pinTo = $scope.getToastPosition();
                    $mdToast.show(
                      $mdToast.simple()
                        .textContent($scope.data.message)
                        .position(pinTo )
                        .hideDelay(3000)
                    );
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
		
        vm.marketpalceOption =function(ev,account_id){
            $mdDialog.show({
                controller         : 'OptionAccountController',
                controllerAs       : 'vm',
                templateUrl        : 'app/main/apps/order-management/views/pages/marketpalce-option.html',
                parent             : angular.element($document.body),
                targetEvent        : ev,
                clickOutsideToClose: true,
                 locals: {
                   account_id: account_id,
                   mdDialog: $mdDialog
                 },
            });
        }

        vm.manageSalesEvent =function(ev,account_id){
            $mdDialog.show({
                controller         : 'ManageSalesEventController',
                controllerAs       : 'vm',
                templateUrl        : 'app/main/apps/order-management/views/pages/manage-sales-event.html',
                parent             : angular.element($document.body),
                targetEvent        : ev,
                clickOutsideToClose: true,
                 locals: {
                   account_id: account_id,
                   mdDialog: $mdDialog
                 },
            });
        }

    }
})();