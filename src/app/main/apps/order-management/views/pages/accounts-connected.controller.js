(function ()
{
    'use strict';

    angular
        .module('app.order-management')
        .controller('AccountConnectedController', AccountConnectedController);

    /** @ngInject */
    function AccountConnectedController($window, omApi, $scope, $state)
    {

        var vm = this;
        vm.data = {}
        vm.data.id = $state.params.obj.id

        vm.connect =function(){
            var dataPromise = omApi.connectAccount(vm.data);
            dataPromise.then(function(result) {
                console.log("url",result.url)
                $window.location = result.url;              
            }); 
        }

        vm.cancel =function(){
            $state.go('app.order-management.acc'); 
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